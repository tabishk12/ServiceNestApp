import { useNavigate } from 'react-router-dom';
import  {useGetProfileQuery,useUpdateProfileMutation  }from '@slices/Api/authApi';
import ImageDiv from './ImageDiv';
import Loader from '@components/Utils/Loader';
import ContactDetails from './ContactDetails';
import AddressDetails from './AddressDetails';
import ButtonsDiv from './ButtonsDiv';
import { Link } from "react-router-dom";
import SpDetails from './SpDetails';
import { useSelector } from 'react-redux';
const ProfilePage = () => {
  const userId = useSelector((state)=>state?.auth?.userInfo?._id);
  const { data: profile, isLoading, error } = useGetProfileQuery(userId,{
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
});
  const navigate = useNavigate();
 const spDetails = profile?.user?.spDetails || [];


 return (
<>
{isLoading && <Loader text="Fetching Profile Information Please wait"/>}
{error && <div className='flex flex-col min-h-[20em] gap-3 bg-purple-200 justify-center items-center min-h-screen '>
  <p className='font-bold text-xl'>Error loading profile {error.message}</p>
  <button className='bg-purple-700 p-2 rounded-xl text-white '
  onClick={()=>{navigate('/')}}>Go back home</button>
  </div>}

{profile && <div className={`p-1 h-full bg-gray-100 ${isLoading && "hidden"}`}>
  <ImageDiv profile={profile}/>
 <div className='flex flex-col md:flex-row gap-4 p-2'> 
  <ContactDetails profile={profile}/>
  <AddressDetails/>
  </div>
  <div className='w-full '>
    <div className='bg-white min-h-[10em] p-3 rounded-lg shadow-lg m-3'>
     <h1 className='text-center text-gray-900 mb-3 flex  justify-between'>
<p className='text-3xl font-bold'> 
       My Service Portfolio</p>
    <Link 
      to="/ServiceList" 
      state={{ 
        spDetails: profile?.user?.spDetails 
      }}
      className="text-blue-700"
    >
      Edit
    </Link>
</h1>
  <SpDetails SpDetails={profile?.user?.spDetails} />
    </div>
   <div className='hidden sm:block'><ButtonsDiv/></div>
  </div>
 </div>}
</>
)
}

export default ProfilePage