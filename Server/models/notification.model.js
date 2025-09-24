import mongoose from 'mongoose';



const notificationSchema = new mongoose.Schema({
    userId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User",
         required: true
         },
    title: String,
    message: String,
    type: {
         type: String, 
         enum: ["booking", "payment", "info", "status"],
         default: "info" 
        },
    bookingId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Booking" 
        },
    isRead: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;