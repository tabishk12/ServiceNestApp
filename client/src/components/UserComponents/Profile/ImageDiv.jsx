import coverImage from "@assets/Pictures/fallback-cover.jpg";
import UserAvatar from "@components/Utils/UserAvatar";

const ImageDiv = ({ profile }) => {
  const name = profile?.user?.name || "";
  const imageUrl = profile?.user?.imageUrl;

  return (
    <div className="relative w-full shadow-sm">
      <div className="absolute z-0 h-[12em] w-full bg-gray-400">
        <img
          src={profile?.user?.coverImage || coverImage}
          alt={`${name}'s CoverImage`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative left-0 top-28 size-32">
        <UserAvatar
          name={name}
          imageUrl={imageUrl}
          size="lg"
          rounded="full"
          className="p-2"
        />
      </div>
      <div className="h-28" />
    </div>
  );
};

export default ImageDiv;
