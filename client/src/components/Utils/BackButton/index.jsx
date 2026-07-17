import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ to, label = "Back", className = "", onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (to) {
      navigate(to);
      return;
    }
    navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 rounded-lg  bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition group hover:text-purple-500 ${className}`}
    >
      <FaArrowLeft className="text-xs" />
      {label}
    </button>
  );
};

export default BackButton;
