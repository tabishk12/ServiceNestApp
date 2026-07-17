import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuList from "./ProvidersMenulist";
import MenuIcon from "@components/Header/MenuIcon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 flex w-full items-center justify-between bg-white p-4 shadow-xl"
      ref={navRef}
    >
      <Link to="/" className="flex items-center bg-transparent">
        <img
          src="/images/Servicenest-logo.png"
          alt="ServiceNest"
          className="h-12 w-auto object-contain bg-transparent sm:h-14"
        />
      </Link>
      <div className="hidden lg:flex items-center gap-5">
        <MenuList isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <MenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div className="block lg:hidden absolute top-14 right-4 bg-white shadow-md rounded-lg p-4 w-40 flex flex-col">
          <MenuList isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
