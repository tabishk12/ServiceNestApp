import { useState } from "react";

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "?";

const UserAvatar = ({
  name = "",
  imageUrl,
  size = "md",
  rounded = "lg",
  className = "",
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showInitials = !imageUrl || imgFailed;

  const sizeClass =
    {
      sm: "h-12 w-12 text-base",
      md: "h-24 w-24 text-2xl",
      lg: "h-32 w-32 text-3xl",
    }[size] || "h-24 w-24 text-2xl";

  const roundedClass = rounded === "full" ? "rounded-full" : "rounded-lg";

  if (showInitials) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center bg-gray-200 font-bold text-gray-700 ${sizeClass} ${roundedClass} ${className}`}
        aria-label={name}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      className={`shrink-0 object-cover ${sizeClass} ${roundedClass} ${className}`}
      onError={() => setImgFailed(true)}
    />
  );
};

export default UserAvatar;
