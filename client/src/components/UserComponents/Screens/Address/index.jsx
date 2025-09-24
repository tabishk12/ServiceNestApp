import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateAddressMutation,useGetAddressByIdQuery } from "@slices/Api/address.Api";
import { useDispatch, useSelector} from "react-redux";
import { saveAddress } from "@slices/address.slice.js";
import {useEffect } from 'react'
import AddressComponent from "@components/utils/AddressComponent";
const AddressPage = () => {
  const navigate = useNavigate();
 const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userInfo?._id);
  const storedAddress = useSelector((state) => state.address?.address);
  const { data: fetchedAddress, isSuccess } = useGetAddressByIdQuery(userId, {
    skip: !userId,
  });

  const Getaddress = useSelector((state) => state.address?.address) || {
     fullName: "", 
     phone: "",
     street: "",
     city: "",
     state: "",
     zipCode: "",
     country: "India",
   };
    useEffect(() => {
    if (!storedAddress && isSuccess && fetchedAddress) {
      dispatch(saveAddress(fetchedAddress[0])); // Since API returns an array
    }
    
    {if(Getaddress==null){dispatch(saveAddress(address))}}
  }, [storedAddress, isSuccess, fetchedAddress, dispatch]);
  
  const [createAddress] = useCreateAddressMutation();

  const [address, setAddress] = useState({
    fullName: Getaddress.fullName || "",
    phone: Getaddress.phone || "",
    street: Getaddress.street || "",
    city: Getaddress.city || "",
    state: Getaddress.state || "",
    zipCode: Getaddress.zipCode || "",
    country: "India", // Default country
  });

  const handleSubmit = (formData) => {
    if (!userId) {
      console.error("User ID is missing.");
      return;
    }
  dispatch(saveAddress(formData));//saving address in redux
    createAddress({ userId, address })// API call to create address
      .unwrap()
      .then((response) => {
        console.log("✅ Address created:", response);
        navigate("/payment"); 
      })
      .catch((error) => {
        console.error("❌ Failed to create address:", error);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
     <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Address</h2>
            <button className="text-white p-2 mb-6 bg-red-500 hover:bg-red-700 rounded-lg cursore-pointer"
             onClick={() => navigate('/order-history')}
            >
              Cancle Booking 
              </button>
     </div>
       <AddressComponent
                initialData={address}
                onSubmit={handleSubmit}
                submitLabel='Proceed'
               
              />
      
          </div>
  );
};

export default AddressPage;
