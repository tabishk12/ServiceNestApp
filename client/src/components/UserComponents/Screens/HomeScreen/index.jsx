import Logo from "@assets/Pictures/homeScreenLogo.png";
import WelcomeQuote from "./welcomeQuote";
import CustomerDashboard from "@components/HomeDashboard/CustomerDashboard";

const HomeScreen = () => {
  return (
    <div className="mb-4 space-y-4 p-3 pt-0">
      <div className="h-56 w-full shrink-0 overflow-hidden sm:h-72 md:h-auto">
        <img
          src={Logo}
          alt="Home Screen Logo"
          className="h-full md:h-[550px] w-full object-cover object-center  "
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex w-full flex-col items-center bg-white shadow-lg rounded-lg md:w-1/2 justify-center p-6 text-center  lg:text-3xl mb-14">
          <WelcomeQuote />
        </div>
      </div>
      <CustomerDashboard />
    </div>
  );
};
export default HomeScreen;
