import Logo from '@assets/pictures/homeScreenLogo.png';
import WelcomeQuote from './welcomeQuote';

const HomeScreen = () => {
  return (
    <div className="bg-red-500 min-h-screen p-3 flex items-center justify-center">
      <div className="flex flex-row bg-white rounded-lg shadow-lg ">

        {/* Image container */}
        <div className="w-1/2 flex p-2 lg:p-15">
          <img
            src={Logo}
            alt="Home Screen Logo"
            className="object-cover w-full h-auto max-h-[400px] max-w-[450px] rounded-lg shadow-md transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Quote container */}
        <div className="p-6 flex flex-col items-center justify-center text-center 
        lg:text-3xl w-1/2 transition-all duration-500 ease-in-out
        ">
          <WelcomeQuote />
        </div>

      </div>
    </div>
  );
};

export default HomeScreen;
