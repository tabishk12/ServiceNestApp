import { FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import ProfileImage from "@assets/pictures/profile-picture.jpg"
import UpdateOrder from './UpdateOrder';

const Orders = ({ bookings }) => {
  return (
    <>
      {bookings && bookings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
          {bookings.map(order => {
            const {
              _id: orderId,
              bookingDate,
              status,
              paymentMethod,
              serviceId: { name: serviceName,_id },
              addressId: { street, city, state, zipCode, country },
             userId : { name,imageUrl, contact},
             providerId:{spDetails},

            } = order;
      const detail=  spDetails.find((detail)=> detail.serviceId ===_id  )
              const price = detail.price;
            return (
              <div key={orderId} className="max-md:max-w-2xl new-md:mx-auto bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"> 
                <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-6`}>
                  <img
                    src={imageUrl || ProfileImage}
                    alt={name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow-sm"
                  />

                  <div className="flex-1 space-y-2 text-gray-700">
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-semibold">
                      <strong>Service: </strong> {serviceName}
                    </p>
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            :status ==='Confirmed'?
                            `bg-purple-100 text-purple-700`
                      
                            :'bg-red-100 text-red-700'
                        }`}
                      >
                        {status.toUpperCase()}
                      </span>
                    </div>

                    <p className="flex items-center gap-2 text-sm">
                      <FaPhoneAlt className="text-gray-500" />
                      {contact} 
                    </p>
                      <h2 className="flex items-center gap-2 text-sm"><strong>{name}</strong></h2>

                    <p className="flex items-center gap-2 text-sm text-green-600 font-medium">
                      <FaRupeeSign className="text-green-500" />
                      {price}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCalendarAlt />
                      {new Date(bookingDate).toLocaleString()}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-green-600 font-medium">
                     
                      {paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <FaMapMarkerAlt />
                      {street}, {city}, {state}, {zipCode}, {country}
                    </p>
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                     <UpdateOrder status={status} bookingId={orderId} /></div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      ) : (
        <div className="text-center text-lg text-gray-700 mt-10"> </div>
      )}
    </>
  );
};

export default Orders;
