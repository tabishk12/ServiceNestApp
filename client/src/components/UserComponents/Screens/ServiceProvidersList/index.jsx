import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetProvidersByServiceQuery } from '@slices/Api/service.Api';
import { setSelectedService } from '@slices/service.slice.js';
import Loader from '@components/Utils/Loader';
import DataRow from '@components/Utils/DataRow';

import { useDispatch } from 'react-redux';
const ServiceProviderList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [location, setLocation] = useState('');

    const { data, isLoading,isError } = useGetProvidersByServiceQuery({ serviceId: id, location });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    setTimeout(() => {
  setLoading(false); 
}, 1000); // Simulate loading delay

const handleAction = (provider) => {
  dispatch(setSelectedService(provider)); 
  navigate('/address'); 
  
}
const providers = data?.providers || [];
const serviceName = data?.serviceName || "";  
console.log(providers);

return (    
    <div className="p-4 bg-white min-h-screen">
      <h1 className='p-2 text-center font-bold my-3 cursore-pointer'>
        <span className='text-2xl text-black p-3 rounded-xl'>
          Showing results for {serviceName}</span></h1>
      <div className="mb-4">
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Filter by location"
          className="border px-3 py-2 rounded w-full"
          />
      </div>
{loading ? (<div className='flex items-center justify-center mt-0'>
   <Loader  text="Loading providers..."/> </div> 
   ):
   ( <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white'>
      {providers.map(provider =>
  {    const [{ rating, price, availability, description: serviceDescription } = {}] = provider.spDetails;
       
       return(<div key={provider._id} className="border border-gray-800 shadow-xl rounded-lg p-3 mb-4 shadow hover:bg-gray-100 ">
          <div className="flex items-center gap-4">
            <img src={provider.imageUrl} alt={provider.name} className="w-24 h-24 object-cover rounded-lg" />
            <div>
              <h3 className="text-xl font-bold">{provider.name}</h3>
              <DataRow label ={"Location"} value={provider.location} />
              <DataRow label ={"Rating"} value={rating} />
              <DataRow label ={"Price"} value={price} />
            </div>
          </div>
             <div className='flex flex-col item-center mt-3'> <DataRow label ={"Availability"} value={availability} className='text-xl'/>
              <DataRow label ={"Description"} value={serviceDescription} />
            </div>
            <button className='p-3 bg-gray-800 rounded-2xl  mt-2 text-white font-bold hover:shadow-lg'
            onClick={()=>{handleAction(provider)}}>Book Now </button>
        </div>)}
    )}
      </div> )
}
      {providers?.length === 0 && <p>No providers found.</p>}
    </div>
  );
};

export default ServiceProviderList;
