
import { useSelector } from 'react-redux'
import CustomerHeadder from '@userComponent/CustomerHeadder'
import ProviderHeadder from '@providerComponent/ProviderHeadder';
const Headder = () => {
    const UserRole = useSelector((state)=>state.auth?.userInfo?.role);
  return (
<>
{UserRole === 'provider' 
  ? <ProviderHeadder /> 
  : UserRole === 'customer' 
    ? <CustomerHeadder /> 
    : null
}
</>
)
}

export default Headder