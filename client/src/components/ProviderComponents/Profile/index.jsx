import Loader from "@components/Utils/Loader";
import { useGetProfileQuery } from "@slices/Api/authApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddressDetails from "./AddressDetails";
import ButtonsDiv from "./ButtonsDiv";
import ContactDetails from "./ContactDetails";
import ImageDiv from "./ImageDiv";
import SpDetails from "./SpDetails";

const ProfilePage = () => {
  const userId = useSelector((state) => state?.auth?.userInfo?._id);
  const {
    data: profile,
    isLoading,
    error,
  } = useGetProfileQuery(userId, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
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
            Go back home
          </button>
        </div>
      )}

      {profile && (
        <div className="w-full bg-white p-4 md:p-6">
          <ImageDiv profile={profile} />
          <div className="mt-4 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <ContactDetails profile={profile} />
            <AddressDetails />
          </div>
          <div className="mt-6 w-full rounded-lg border border-slate-200 bg-white p-4 md:p-6">
            <div className="mb-3 flex items-center justify-between text-gray-900">
              <h2 className="text-3xl font-bold">My Service Portfolio</h2>
              <Link
                to="/ServiceList"
                state={{ spDetails: profile?.user?.spDetails }}
                className="font-semibold text-blue-700 hover:underline"
              >
                Edit
              </Link>
            </div>
            <SpDetails SpDetails={profile?.user?.spDetails} />
          </div>
          <div className="hidden w-full sm:block">
            <ButtonsDiv />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
