import React from "react";
import { useState,useRef,useEffect } from "react";
import MenuList from "./ProvidersMenulist";
import MenuIcon from "@components/Header/MenuIcon";

const Navbar = () => {
  
  const[isOpen, setIsOpen] = useState(false);
    const handlechange = () => {
        setIsOpen(!isOpen);
         };
   const navRef = useRef(null);
 
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false); 
      }
    };
   document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-xl z-50" ref={navRef}>
      <h1 className="text-2xl font-bold cursor-pointer p-2 rounded-xl transition-all ease 3s 
      text-purple-600
      ">
       ServiceNestApp</h1>
<div className="hidden lg:block lg:flex items-center gap-5">
        <MenuList isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>    


       {/* Mobile Menu */}
         <MenuIcon isOpen={isOpen} setIsOpen={setIsOpen}/>
     {isOpen && (
      <div className="block lg:hidden absolute top-14 right-4 bg-white shadow-md rounded-lg p-4 w-40 flex flex-col">
        <MenuList isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>     
      )}
    </nav>
  );
};

export default Navbar;
