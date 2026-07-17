import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const role = useSelector((state) => state.auth?.userInfo?.role);
  const year = new Date().getFullYear();

  const customerLinks = [
    { to: "/", label: "Home" },
    { to: "/browse-services", label: "Browse Services" },
    { to: "/order-history", label: "Order History" },
    { to: "/profile", label: "Profile" },
  ];

  const providerLinks = [
    { to: "/", label: "Home" },
    { to: "/bookingDetails", label: "Bookings" },
    { to: "/ServiceList", label: "My Services" },
    { to: "/profile", label: "Profile" },
  ];

  const quickLinks = role === "provider" ? providerLinks : customerLinks;

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-100 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-base font-bold uppercase tracking-wide text-slate-700">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-base font-semibold text-slate-600 transition hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold uppercase tracking-wide text-slate-700">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-base font-semibold text-slate-600">
              <li className="flex items-center gap-2">
                <FaEnvelope className="shrink-0 text-slate-500" />
                <a
                  href="mailto:support@servicenest.app"
                  className="transition hover:text-slate-900"
                >
                  support@servicenest.app
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="shrink-0 text-slate-500" />
                <a
                  href="tel:+910000000000"
                  className="transition hover:text-slate-900"
                >
                  +91 00000 00000
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-slate-500" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-center text-base font-semibold text-slate-500 sm:text-left">
            © {year} ServiceNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
