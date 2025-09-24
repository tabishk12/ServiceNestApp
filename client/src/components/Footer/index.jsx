const Footer = () => {
  return (
    <footer className="w-full bg-gray-900">
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-700 sm:text-left text-white">
          Copyright {new Date().getFullYear()} ServiceNset. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
