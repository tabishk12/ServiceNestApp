import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "@slices/Api/authApi";
import ImageDiv from "./ImageDiv";
import Loader from "@components/Utils/Loader";
import ContactDetails from "./ContactDetails";
import AddressDetails from "./AddressDetails";
import ButtonsDiv from "./ButtonsDiv";

const ProfilePage = () => {
  const { data: profile, isLoading, error } = useGetProfileQuery();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white">
      {isLoading && <Loader text="Fetching Profile Information Please wait" />}
      {error && (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-white">
          <p className="text-xl font-bold">
            Error loading profile {error.message}
          </p>
          <button
            className="rounded-xl bg-purple-700 p-2 text-white"
            onClick={() => navigate("/")}
          >
            GO back home
          </button>
        </div>
      )}

      {profile && (
        <div className="w-full bg-white p-4 md:p-6">
          <ImageDiv profile={profile} />
          <div className="mt-4 grid w-full grid-cols-1 gap-10">
            <ContactDetails profile={profile} />
            <AddressDetails />
          </div>
          <div className="w-full">
            <ButtonsDiv />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
