import Service from '../models/service.model.js';
import UserModel from '../models/user.model.js';

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get providers by serviceId and optional location
export const getProvidersByService = async (req, res) => {
  console.log("✅ Hit getProvidersByService endpoint");
  try {
    const { id } = req.params;
    const { location } = req.query;
    console.log(id)
    let query = { "spDetails.serviceId": id };
    if (location) query.location = location;
    let serviceName = await Service.findById({_id:id})
          serviceName= serviceName.name;
   
   
          let providers = await UserModel.find(query).lean(); // use .lean() for plain JS objects

    // Filter spDetails array for each provider
    providers = providers.map(provider => ({
      ...provider,
      spDetails: provider.spDetails.filter(
        detail => detail.serviceId.toString() === id
      )
    }));
    res.json({providers,serviceName});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Available Services For user to register

const AvailableServices = async(req,res)=>{
   try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const registeredIds = user.spDetails?.map(sp => sp.serviceId._id.toString()) || [];
    const availableServices = await Service.find({ _id: { $nin: registeredIds } });
    res.json(availableServices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
//Register a service
const RegisterService = async (req,res)=>{
  try{
    const {userId,serviceData}=req.body;
    const {name,serviceId,price,availability,description}=serviceData;
    console.log(req.body);
    const user = await UserModel.findById(userId);
    if(!user) return res.status(404).json({message:"User not found"});
   const alreadyAdded = user.spDetails?.some(sp => sp.serviceId.toString() === serviceId);
    if (alreadyAdded) {
    return res.status(400).json({ error: "Service already registered" });
    }
    user.spDetails.push({serviceId:serviceId,price,availability,description});
    const data = await user.save();
    console.log("Registered successfully....",data);
    res.status(200).json({message:"Service registered successfully"});

  }catch(error){
      console.error("Error registering service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//Delete from registered Service
const DeleteService = async(req,res)=>{
  const {userId,ServiceId}= req.body;
  const user =await UserModel.findById(userId);
  if(!user){
    return res.status(404).json({ message: "User not found" });

  }
  try{
    user.spDetails = user.spDetails.filter(
     (detail)=>detail.serviceId.toString()!== ServiceId.toString()
    );
    await user.save();
    res.status(200).json({ message: "Service deleted successfully", user });
  }catch(error){
    console.log(error);
  }
}

export {
  AvailableServices,
  RegisterService,
  DeleteService,
};