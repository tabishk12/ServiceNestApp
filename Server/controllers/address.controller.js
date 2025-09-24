import addressModel from "../models/address.model.js";

const createAddress = async (req, res) => {
  try {
    const { userId, fullName, phone, street, city, state, country, zipCode } = req.body;
    console.log( { userId, fullName, phone, street, city, state, country, zipCode } )
    const existingAddress = await addressModel.findOne({ userId });
    if (existingAddress) {
      console.log("Address already exists for this user");
      const updatedAddress = await addressModel.findByIdAndUpdate(
        existingAddress._id, 
        {  
        fullName,
        phone,
        street,   
        city,
        state,
        country,
        zipCode
      },
        { new: true }
      );
      console.log("Address updated successfully");
      return res.status(200).json(updatedAddress);
    }
    else{ 
      const newAddress = new addressModel({
      userId,
      fullName,
      phone,
      street,
      city,
      state,
      country,
      zipCode
    });

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  }} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating address", error });
  }
}

const getAddressByUserId = async (req, res) => {
  const userId = req.params.userId;
  console.log("Fetching address for user:", userId);
    try {
        const addresses = await addressModel.find({ userId }).populate('userId', 'name email');
        
        if (!addresses.length) {
        return res.status(404).json({ message: "No addresses found for this user" });
        }
    
        res.status(200).json(addresses);
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ message: "Error fetching addresses", error });
    }
    }

const updateAddress = async (req, res) => {
  try {
    const {addressId} = req.params;
    const form = req.body.form || req.body;
    const updatedAddress = await addressModel.findOneAndUpdate(
      { userId:addressId},
        form,
        { new: true }
        );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    console.log('Address Updated Successfully......', updatedAddress);
    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating address", error });
  }     
}


const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const deletedAddress = await addressModel.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address", error });
  }
}   
export { createAddress, getAddressByUserId, updateAddress, deleteAddress };