import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BrowseServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:5000/api/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
      // console.log("Services fetched:", services);
  }, []);
  return (
  
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {services.map(service => (
        <Link key={service._id} to={`/services/${service._id}`}>
          <div className="border rounded-lg p-3 text-center shadow hover:shadow-md">
            <img src={service.imageUrl} alt={service.name} className="h-32 mx-auto object-cover rounded-lg mb-2" />
            <h2 className="font-bold text-lg">{service.name}</h2>
            <p className="text-gray-500 text-sm">{service.category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BrowseServices;
