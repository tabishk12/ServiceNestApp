import React from 'react'
import { useSelector } from 'react-redux'
import CustomerHomeScreen from '@components/UserComponents/Screens/HomeScreen'
import ProviderHomeScreen from '@providerComponent/screens/HomeScreen'
const HomeScreen = () => {
    const UserRole = useSelector((state)=>state.auth?.userInfo?.role);
    console.log("LoggedIn user is an : ",UserRole);
  return (
    <>
    {UserRole=='provider'?<ProviderHomeScreen/>:<CustomerHomeScreen/>}  
  </>
  )
}

export default HomeScreen