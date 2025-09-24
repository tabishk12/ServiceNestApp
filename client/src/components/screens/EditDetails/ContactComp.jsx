import ContactComponent from '@utils/ContactComponent';

const ContactComp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-100 to-purple-200 p-3">
      <div className="w-full sm:max-w-lg md:max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">UpdateDetails</h2>
            <div className='items-center justify-center max-5w-xl mx-auto'>
              <ContactComponent /> 
              </div>      
        </div>
    </div>
  );
};

export default ContactComp;
