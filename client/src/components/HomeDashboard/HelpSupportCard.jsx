import { FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom";

const HelpSupportCard = ({ role }) => {
  const isProvider = role === "provider";

  return (
    <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white">
          <FaHeadset />
        </span>
        <h3 className="text-base font-bold text-slate-800">Help & Support</h3>
      </div>
      <p className="text-sm text-slate-600">
        {isProvider
          ? "Need help with bookings, payouts, or your profile? Chat with support anytime."
          : "Having an issue with an order? Get instant help from our support team."}
      </p>
      <Link
        to="/setting"
        className="mt-3 inline-flex rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
      >
        Contact Support
      </Link>
    </div>
  );
};

export default HelpSupportCard;
