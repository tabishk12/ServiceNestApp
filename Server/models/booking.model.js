import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', // reference to your ServiceProvider model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', // reference to your User model
        required: true,
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address', // reference to your Address model
        required: true,
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service', // reference to your Service model
        required: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        default: 'COD', // Cash on Delivery
    },
     rating: {
    stars: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now },
  },
  
}, { timestamps: true });
export default mongoose.model('Booking', bookingSchema);
