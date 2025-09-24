
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import DataRow from "@components/Utils/DataRow";
import { Link } from "react-router-dom";

const ContactDetails = ({profile}) => {

  return (
   <>
  <div className='shadow-lg min-h-40 rounded-lg p-3 sm:max-w-2xl mx-1 w-full bg-gray-100'>
      <h1 className='text-center text-gray-900 mb-3 flex  justify-between'>
        <p className="text-3xl font-bold ">User Details</p>
        <Link to="/edit" state={{ section: "contact" }} className="text-blue-700">Edit</Link>
        </h1>

          <DataRow label={'Name'} 
          value={profile?.user.name}/>

          <DataRow label={'E-mail'} 
          value={profile?.user.email} 
          Icon={<HiOutlineMail />}/>

          <DataRow label={'Location'}
          value={profile?.user.location}/>

          <DataRow label={'Ph.Number'} 
          value={profile?.user.contact} 
          Icon={<HiOutlinePhone />}/>

          <DataRow label={'Role'}
          value= {profile?.user.role}/>

  </div>
   </>
  )
}

export default ContactDetails