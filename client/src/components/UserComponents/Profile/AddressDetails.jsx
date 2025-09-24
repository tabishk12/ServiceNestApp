import { useGetAddressByIdQuery } from "@slices/Api/address.Api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DataRow from "@components/Utils/DataRow";


export const AddressDetails = () => {
  
 const UserId = useSelector((state)=>state.auth?.userInfo._id);
 const {data:Address,isloading,error} = useGetAddressByIdQuery(UserId);
 const address= Address?.[0];

 return (
    <>
    {isloading && <p>Loading Address Data</p>}
    {error && <p>Failed to Load Data</p>}
   
    <div className={`shadow-lg min-h-40 rounded-lg p-3 sm:max-w-2xl mx-1 mt-3 w-full bg-gray-100
       ${isloading||error}:hidden`}>
<h1 className='text-center text-gray-900 mb-3 flex  justify-between'>
<p className='text-3xl font-bold'> 
        AddressDetails</p>
        <Link to="/edit" state={{ section: "address" }} className="text-blue-700">Edit</Link>

</h1>
    
            <DataRow label={"Street"}
            value={address?.street}/>

            <DataRow label={"City"}
            value= {address?.city} />

            <DataRow label={"State"}
            value={address?.state}  />

            <DataRow label={"Country"}
            value={address?.country}/>

            <DataRow label={"ZipCode"}
            value={address?.zipCode}/>
    
    </div>
    </>
  )
}

export default AddressDetails;