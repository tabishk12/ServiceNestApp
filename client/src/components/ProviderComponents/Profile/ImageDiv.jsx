
import coverImage from '@assets/pictures/fallback-cover.jpg'
import ProfileImage from "@assets/pictures/profile-picture.jpg"
const ImageDiv = ({profile}) => {

  return (
    <>
<div className="relative w-full shadow-sm">
<div className='h-[12em] bg-gray-400 absolute w-full z-0'>
 <img src={profile?.user?.coverImage ||coverImage} alt={`${profile?.user.name}'s CoverImage`}
  className='h-full w-full object-cover ' />
 </div>
 <div className='relative top-28 left-0 size-32'>
 <img src={profile?.user.imageUrl || ProfileImage} alt={`${profile?.user.name}'s Profile`}
  className="h-full w-full rounded-full p-2 object-cover"/>

 </div>
 <div className="h-28" />
</div>
    </>
  )
}

export default ImageDiv