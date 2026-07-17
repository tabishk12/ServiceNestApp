import { NavLink } from "react-router-dom";

const LinkComponent = ({ label, to, isOpen, setIsOpen, onClick, isLogout }) => {
  const logout =
    isLogout || (typeof label === "string" && label.toLowerCase() === "logout");

  const handleClick = () => {
    if (onClick) onClick();
    if (typeof setIsOpen === "function") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={handleClick}
      className="group block text-md"
    >
      {({ isActive }) => (
        <span
          className={`
            inline-block whitespace-nowrap rounded-lg p-2 font-semibold
            transition-all duration-300 ease-in-out
            ${
              logout
                ? "text-lg text-red-600 hover:rounded-xl hover:bg-red-500 hover:text-white"
                : isActive
                  ? "bg-purple-100 text-purple-700 shadow-sm md:text-md lg:text-lg"
                  : "text-slate-800 hover:text-purple-700 md:text-md lg:text-lg"
            }
          `}
        >
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default LinkComponent;
