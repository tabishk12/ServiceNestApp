import bookingModel from "../models/booking.model.js";
import User from "../models/user.model.js";

const createBooking = async (req, res) => {
     try {
        const { userId,ProviderId,serviceId,addressId, totalAmount, paymentMethod } = req.body;
        // Create order
        const newbooking = new bookingModel({
            providerId:ProviderId,
            userId,
            addressId,
            serviceId,
            totalPrice:totalAmount,
            paymentMethod,
        });
    
        const savedBooking = await newbooking.save();
   

        res.status(201).json(savedBooking);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
     }

 const getBookings = async (req, res) => {
    try {
        const { userId } = req.params;
    
        // Validate user
        const user = await User.findById(userId);
        if (!user) {    
        return res.status(404).json({ message: "User not found" });
        }
        // Fetch orders for the user
        const orders = await bookingModel.find({ userId })    
        .populate("addressId", "street city state zipCode country")
        .populate("serviceId", "_id name description price")
        .populate("providerId", "name contact imageUrl spDetails");
        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error); 
        res.status(500).json({ message: "Internal server error" });
    }
}
 const getProvidersBookings = async (req, res) => {
    try {
        const { ProviderId } = req.params;
        console.log(ProviderId)
        // Validate user
        const user =    await User.findById(ProviderId);
        if (!user) {    
        return res.status(404).json({ message: "User not found" });
        }
        // Fetch orders for the user
        const orders = await bookingModel.find({ providerId:ProviderId })    
        .populate("addressId", "street city state zipCode country")
        .populate("providerId", "spDetails")
        .populate("serviceId", "_id name description price")
        .populate("userId", "name contact imageUrl ");
        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error); 
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateOrderStatus =async(req,res)=>{
    const {id}= req.params;
    const {orderStatus}= req.body;
    console.log({id,orderStatus});
    try{
      const booking = await bookingModel.findByIdAndUpdate(
        id,
        { status:orderStatus}
          )
          
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("✅ Updated Booking:", booking);
    res.json({ message: "Booking status updated successfully", booking });
    } catch (error) {
    console.error("❌ Error updating booking:", error);
    res.status(500).json({ message: error.message });
  }
}

const getSingleBooking= async (req,res)=>{
    const {id} = req.params;
    try{
        const booking = await bookingModel.findById(id)
        .populate("addressId", "street city state zipCode country")
        .populate("serviceId", "_id name description price")
        .populate("providerId", "name contact imageUrl spDetails")
        .populate("userId", "name contact imageUrl");
  
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }   
            res.json(booking);
    } catch (error) {
        console.error("❌ Error fetching booking:", error);
        res.status(500).json({ message: error.message });
    }  

    }
    
//     const createRating = async(req,res)=>{
//         console.log("Hit create Rating endPoint ")
//         const {bookingId,providerId,rating,comment} = req.body;
//         try{
//         const booking = await bookingModel.findByIdAndUpdate(
//             bookingId,
//            {$set:{rating:{stars:rating,comment:comment}}}
//         );
//          if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     const user = await User.findById(providerId);
//     const userRating = user.spDetails.rating;
//     spDetails.rating = (userRating + rating)/2;
//     user.save();
//     console.log("✅Rating Created:", booking);
//     res.json({ message: "Rating Created successfully", booking });
//     } catch (error) {
//     console.error("❌ Error Creating Rating:", error);
//     res.status(500).json({ message: error.message });
//   }

// }
    

 const createRating = async (req, res) => {
  console.log("Hit create Rating endpoint");

  const { bookingId, providerId, rating, comment, serviceId, customerId } = req.body;

  try {
    // 1. Update booking with rating
    const booking = await bookingModel.findByIdAndUpdate(
      bookingId,
      {
        $push: {
          ratings: { customerId, stars: rating, comment }
        }
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 2. Update provider’s average rating
    const user = await User.findById(providerId);
    if (!user) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // find the correct service in spDetails
    const spDetail = user.spDetails.find(
      (detail) => detail.serviceId.toString() === serviceId.toString()
    );

    if (spDetail) {
      spDetail.totalRating = (spDetail.totalRating || 0) + rating;
      spDetail.ratingCount = (spDetail.ratingCount || 0) + 1;
      spDetail.rating = spDetail.totalRating / spDetail.ratingCount;
    }

    await user.save();

    console.log("✅ Rating Created:", booking);
    res.json({ message: "Rating Created successfully", booking });
  } catch (error) {
    console.error("❌ Error Creating Rating:", error);
    res.status(500).json({ message: error.message });
  }
};
 export { 
    createBooking, 
    getBookings,
    getProvidersBookings,
    updateOrderStatus,
    getSingleBooking,
    createRating,
};