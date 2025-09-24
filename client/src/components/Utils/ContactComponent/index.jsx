import React, { useState,useEffect } from 'react';
import  {useGetProfileQuery,useUpdateProfileMutation  }from '@slices/Api/authApi';
import { useDispatch,useSelector} from 'react-redux';
import { setCredentials } from '@slices/authSlice';
import { useNavigate } from 'react-router-dom';
import InputBox from '@utils/InputBox';

const ContactComponent = () => {
  const userRole = useSelector((state) => state.auth.userInfo?.role);  
  const { data: profile, isloading, error } = useGetProfileQuery();

  const[errorMessage,setErrorMessage]=useState('');
const [form, setForm] = useState({
  name: '',
  email: '',
  contact: '',
  location: '',
  image: '',
  password: '',
  confirmPassword: '',
  role: userRole
});

// Update form once profile is fetched
useEffect(() => {
  if (profile?.user) {
    setForm((prev) => ({
      ...prev,
      name: profile.user.name || '',
      email: profile.user.email || '',
      contact: profile.user.contact || '',
      location: profile.user.location || '',
      image: profile.user.imageUrl || '',
      role: userRole
    }));
  }
}, [profile, userRole]);


  const [updateProfile,{isLoading} ] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
     return setErrorMessage('Passwords do not match');
    } else {
        if(form.password !== profile?.user?.password){
        setErrorMessage("Password didn't match Please enter correct password...");
        }
        else{
      try {
        const userData = await updateProfile(form).unwrap();
        dispatch(setCredentials(userData));
        console.log(userData);
        navigate('/');
      } catch (err) {
        alert('Failed to Update details : ' + err?.data?.message || err.message);
      }
    }
  }
  };

  return (<>
 <form onSubmit={submitHandler} className="space-y-5">
      <div className='md:grid grid-cols-2 gap-4 space-x-3 '>
        <InputBox
                  type="text"
                  label={'Full Name'}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value },setErrorMessage(""))}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
        <InputBox
                  label={"Enter-email"}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value },setErrorMessage(""))}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
          <InputBox
                  type="text"
                  label ={"Contact"}
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value },setErrorMessage(""))}
                  placeholder="+91-123456985"
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
          <InputBox
                  type="tel"
                  label={"Location "}
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value },setErrorMessage(""))}
                  placeholder="location"
                  
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
          <InputBox
                  type="text"
                  label={"Add Image"}
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value },setErrorMessage(""))}
                  placeholder="Add Image Url"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
          <InputBox
                  type="password"
                  label={"Enter Password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value },setErrorMessage(""))}
                  placeholder="Enter Password"
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
          <InputBox
                  type="password"
                  label={"Re-Enter Password"}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value },setErrorMessage(""))}
                  placeholder="Confirm Password"
                
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
        </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition duration-200"
              >
                {isLoading ? 'Submiting...' : 'Submit'}
              </button>
            </form>

          <p className='text-red-500 text-center'>{errorMessage}</p>
      
    </>
  );
};

export default ContactComponent;
