import { useSelector } from "react-redux";
import AddressComponent from '@utils/AddressComponent'
import { useCreateAddressMutation,useGetAddressByIdQuery } from "@slices/Api/address.Api";
import { saveAddress } from "@slices/address.slice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const UpdateAddress = () => {
    const dispatch= useDispatch();
    const fullName = useSelector((state)=>state.auth?.userInfo?.name);
    const userId = useSelector((state) => state.auth.userInfo?._id);
    const navigate = useNavigate();
    const [createAddress] = useCreateAddressMutation()
    const onSubmit =(formData)=>{
       const address= formData;
        createAddress({userId,address})   
        .unwrap()
      .then((response) => {
        console.log("✅ Address created:", response)});
        dispatch(saveAddress(formData));
        navigate('/profile')
    }
  const AddressData = {
      fullName:fullName, 
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
    };
  return (
    <>
    <div className='p-6 sm:mx-10 m-4 bg-white shadow-xl rounded-xl md:max-w-3xl flex flex-col justify-center md:mx-auto mt-10'>
        <h1 className='text-center text-2xl font-semibold m-2'>Add Address</h1>
        <AddressComponent
        onSubmit={onSubmit}
        initialData={AddressData}/>
    </div>
    </>
  )
}

export default UpdateAddress