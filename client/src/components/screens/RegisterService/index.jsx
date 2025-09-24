import { useSelector } from 'react-redux';
import { useGetAvailableServicesQuery} from '@slices/Api/service.Api';
import Loader from '@utils/Loader'
import NoService from './NoService';
import RegisterServiceForm from './RegisterServiceForm';

const RegisterService = () => {
  const userId = useSelector((state)=>state.auth?.userInfo?._id);
  const{data:services,isloading}=useGetAvailableServicesQuery(userId);
  if(!services)return<Loader text='Loading Data'/>
  
  return (
<>
     {(services && services.length === 0)?<NoService/>:<RegisterServiceForm services={services}/>}

</>
)
}

export default RegisterService