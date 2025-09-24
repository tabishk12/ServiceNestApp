import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const spDetailSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  rating: {
    type: Number,
    default: 2
  },
  price: {
    type: Number,
    required: true
  },
  availability: {
    type: String,
    default:"9Am - 5PM",
  },
  description: {
    type: String,
    required: true
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  // Customer / common fields
  name: {
    type: String,
     required: true
    },
  email: {
    type: String, 
    required: true,
     unique: true
    },
  password: {
    type: String, 
    required: true
    },
      imageUrl: {
        type: String
      },
      contact: {
        type: String
      },
      location: {
        type: String
      },
  role: {
    type: String,
    enum: ['customer', 'provider', 'admin'],
    default: 'customer',
    required: true
  },

  // SP Details go here only if user is a provider
  spDetails: {
    type: [spDetailSchema],
    default: undefined // only added if role is provider
  }

}, { timestamps: true });


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.models.UserModel || mongoose.model('UserModel', userSchema);    
