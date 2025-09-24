import DataRow from "@utils/DataRow";
import Loader from "@utils/Loader";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link} from "react-router-dom";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useLocation } from "react-router-dom";
import { useDeleteServiceMutation } from "@slices/Api/service.Api";
import { useSelector } from "react-redux";
import  {useGetProfileQuery,useUpdateProfileMutation}from '@slices/Api/authApi';

const SpDetails = () => {
  const userId = useSelector((state) => state.auth?.userInfo?._id);
const [DeleteService]= useDeleteServiceMutation();
const location = useLocation();
const {data:profile,isloading}=useGetProfileQuery(userId);

{if(isloading)return(<Loader text="Loading Details" />)}
if(!profile)return
const SpDetails = profile?.user?.spDetails; 
const pathName = location.pathname || {};

const handleDelete = async(ServiceId)=>{
  const confirmed = window.confirm("Are you sure you want to delete this service?");
  if (!confirmed) return;
  else{
    const data = await DeleteService({ userId, ServiceId }).unwrap();
    console.log("Deleted:", data);
  }}
  const  title= "My Service Portfolio";
  
  // Function to print stars based on rating
  const printStars = (rating) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 > 0;
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          stars.push(<FaStar key={i} className="inline text-yellow-500" />);
        } else if (i === fullStars && hasHalfStar) {
          stars.push(<FaStarHalfAlt key={i} className="inline text-yellow-500" />);
        } else {
          stars.push(<FaRegStar key={i} className="inline text-yellow-500" />);
        }
      }

      return stars;
    };
  return (
    <div className='m-3'>
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        {pathName==='/ServiceList' && title}
      </h2>
      {SpDetails && SpDetails.length > 0 ? (
        SpDetails.map((detail, index) => (
          <div key={index} className="mt-4 p-3 border rounded-lg bg-white shadow-sm flex justify-between">
            <div> 
              <DataRow label="Description" value={detail.description} />
              <DataRow label="Price" value={`₹${detail.price}`} />
              <DataRow label="Availability" value={detail.availability} />
              <DataRow label="Rating" value={<>{detail.rating} {printStars(detail.rating)}</>} />
            </div>  
            <div className={`${pathName==='/ServiceList'?'block':"hidden"}`}
            onClick={()=>{handleDelete(detail.serviceId)}}>
               <XMarkIcon 
               title="Remove Service"
               className="h-5 w-5 text-white bg-red-500"/>
             </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4 cursore-pointer">No services registered yet.</p>
      )}
      <div className={`flex justify-between md:justify-center gap-6 lg:gap-[5em] ${pathName==='/ServiceList'?'block':"hidden"}`}>
        <button type ="button" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Link to="/Add-Services">Add New Service</Link>
        </button>
        <button type ="button" className="mt-4 px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-900">
          <Link to="/profile">Visit Profile</Link>
        </button>
     </div>
    </div>
  );
};

export default SpDetails;
