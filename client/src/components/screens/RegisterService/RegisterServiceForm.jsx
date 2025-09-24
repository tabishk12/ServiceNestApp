import {useState} from 'react';
import { useSelector } from 'react-redux';
import { useGetAvailableServicesQuery,useRegisterServiceMutation } from '@slices/Api/service.Api';
import {useNavigate} from 'react-router-dom';
import InputBox from '@utils/InputBox'
import SelectBox from '@utils/SelectBox';

const RegisterServiceForm = ({services}) => {
  const userId = useSelector((state)=>state.auth?.userInfo?._id);
  const [registerService,{isloading:loading}] = useRegisterServiceMutation();
  const navigate = useNavigate();  
  
  const priceList=[
    { _id: '1000', name: '1000' },
    { _id: '1200', name: '1200' },
    { _id: '1500', name: '1500' },
    { _id: '1700', name: '1700' },
    { _id: '2000', name: '2000' },
  ];
  const [form, setForm] =useState({
    serviceName: "",
    price: "",
    availability: "9Am - 5PM",
    description: "",
    });

   const handleChange = (e) => {
    const { name,value } = e.target;
    if(name && value)setForm((prev) => ({ ...prev, [name]: value }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const { serviceName,serviceId, price, availability, description } = form;
    const serviceData = {
        name: serviceName,
        price: price,
        availability: availability,
        description: description,
        serviceId: serviceId,
        };

    const registered = await registerService({userId,serviceData}).unwrap();

    setForm({
      serviceName: "",
      price: "",
      availability: "9Am - 5PM",
      description: "",
      serviceId: "",
      });
     {registered && navigate('/ServiceList')};
        }
        
  return (
<>
      <div className="min-h-screen flex items-center justify-center bg-purple-100 p-3">
          <div className="w-full sm:max-w-lg md:max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
           <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Register Service</h2>
            
            <SelectBox
            label="Select Service"
             value={form.serviceId}
             onchange={(e)=>{ handleChange(e);}}
             item={services}
             setForm={setForm}
             Id="serviceId"
              />
                   <InputBox 
                    label="Service Name"
                    title="Category"
                    placeholder="Enter service Name"
                    type="text" 
                    required="true"
                    name="serviceName"
                    value={form.serviceName}
                    onChange={handleChange}
                  />
                 
                    <SelectBox
                      label="Select Price"
                      value={form.price}
                      onchange={(e)=>{ handleChange(e)}}
                      item={priceList}
                      setForm={setForm}
                      Id="price"
                      />

                    <InputBox 
                    label="Service Availability"    
                    title="Availability"
                    placeholder="Enter service availability"
                    value="9Am - 5PM"
                    readonly="true"
                    onChange={handleChange}
                    />
                    <button 
                    type ="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 mt-3"
                    >
                  { loading?"Registering..":'Register Service'}  
                    </button>
                    </form>
            </div>
        </div>
   </>
  )
}

export default RegisterServiceForm