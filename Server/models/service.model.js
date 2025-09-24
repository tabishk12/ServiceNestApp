import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { 
    
    type: String,
     required: true
   },
  imageUrl: {
     type: String,
     required: true 
    
  },
  category: {
     type: String,
     required: true
    
   },
  description: { 
    type: String, 
    required: true
    
   }
},
 { timestamps: true });

export default mongoose.models.service || mongoose.model('service', serviceSchema);
