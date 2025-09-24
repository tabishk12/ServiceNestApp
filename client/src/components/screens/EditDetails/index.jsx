import { useLocation } from "react-router-dom";
import AddressComponent from "@utils/AddressComponent";
import ContactComponent from "./ContactComp";
const EditDetails = () => {
 const location = useLocation();
  const section = location.state?.section;   
    console.log(section);
  const initialData={
    fullName:"",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  };
  return (
   <>
   <div className='p-4'>
   {section==='address' &&
   <div className="bg-white rounded-lg shadow-md mx-8 p-4 m-4"> 
           <h1 className="text-2xl font-bold mb-3"> UpdateAddress </h1> 
            <AddressComponent initialData={initialData} />
    </div>
   }
   {section==='contact' && <ContactComponent/>}
  </div>
   </>
  )
}

export default EditDetails