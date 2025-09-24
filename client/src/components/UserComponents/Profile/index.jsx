import { useNavigate } from 'react-router-dom';
import  {useGetProfileQuery,useUpdateProfileMutation  }from '@slices/Api/authApi';
import ImageDiv from './ImageDiv';
import Loader from '@components/Utils/Loader';
import ContactDetails from './ContactDetails';
import AddressDetails from './AddressDetails';
import ButtonsDiv from './ButtonsDiv';

const ProfilePage = () => {
  const { data: profile, isLoading, error } = useGetProfileQuery();
  const navigate = useNavigate();
 return (
<>
{isLoading && <Loader text="Fetching Profile Information Please wait"/>}
{error && <div className='flex flex-col min-h-[20em] gap-3 bg-purple-200 justify-center items-center '>
  <p className='font-bold text-xl'>Error loading profile {error.message}</p>
  <button className='bg-purple-700 p-2 rounded-xl text-white '
  onClick={()=>{navigate('/')}}>GO back home</button>
  </div>}

{profile && <div className={`p-1 h-full bg-gray-100 ${isLoading && "hidden"} bg-white`}>
  <ImageDiv profile={profile}/>
 <div className='flex flex-col md:flex-row gap-4 p-2'> 
  <ContactDetails profile={profile}/>
  <AddressDetails/>
  </div>
  <div className='w-full '>
      <ButtonsDiv/>
  </div>
 </div>}
</>
)
}

export default ProfilePage