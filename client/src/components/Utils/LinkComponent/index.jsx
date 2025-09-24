import React from 'react';
import { Link } from 'react-router-dom';

const LinkComponent = ({ label, to, isOpen, setIsOpen, onClick }) => {
  const isLogout = typeof label === "string" && label.toLowerCase() === "logout";

  return (
    <Link
      to={to}
      className="group block text-md"
      onClick={() => {
        if (onClick) onClick();
        setIsOpen(!isOpen);
      }}
    >
      <span
       className={`
          inline-block font-semibold transition-all  ease duration-300 whitespace-nowrap
          ${isLogout
            ? "hover:bg-red-500 rounded-xl text-red-600 hover:text-white p-2 text-lg"
            : "p-2 hover:bg-black hover:text-white rounded-lg text-slate-800 text-md md:text-md lg:text-lg"
          }
        `}
      >
        {label}
      </span>
    </Link>
  );
};

export default LinkComponent;
