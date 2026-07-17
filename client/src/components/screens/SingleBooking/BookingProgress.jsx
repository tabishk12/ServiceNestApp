import { FaCheck } from "react-icons/fa";
import { getStepperStep, normalizeStatus } from "./bookingUtils";

const STEPS = [
  "Booking Placed",
  "Provider Confirmed",
  "Service in Progress",
  "Completed",
];

const BookingProgress = ({ status }) => {
  const current = getStepperStep(status);
  const cancelled = normalizeStatus(status) === "cancelled";
  const fillPercent =
    current <= 0 ? 0 : Math.min(100, (current / (STEPS.length - 1)) * 100);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-bold text-slate-800 sm:text-lg">
          Booking Progress
        </h2>
        {cancelled && (
          <span className="rounded-[20px] bg-rose-100 px-3.5 py-1 text-xs font-bold tracking-wide text-rose-800">
            CANCELLED
          </span>
        )}
      </div>

      <div className="relative">
        {/* Track between first and last step centers (12.5% → 87.5%) */}
        <div className="absolute left-[12.5%] right-[12.5%] top-4 h-1.5 rounded-full bg-slate-200" />
        <div
          className={`absolute left-[12.5%] top-4 h-1.5 rounded-full transition-all duration-500 ${
            cancelled ? "bg-rose-400" : "bg-purple-600"
          }`}
          style={{ width: `${(fillPercent / 100) * 75}%` }}
        />

        <ol className="relative grid grid-cols-4 gap-1">
          {STEPS.map((label, index) => {
            const done = !cancelled && index < current;
            const active = !cancelled && index === current;

            return (
              <li
                key={label}
                className="flex flex-col items-center text-center"
              >
                <span
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
                    done
                      ? "border-purple-600 bg-purple-600 text-white"
                      : active
                        ? "border-purple-600 bg-white text-purple-700 ring-4 ring-purple-100"
                        : "border-slate-300 bg-slate-100 text-slate-400"
                  }`}
                >
                  {done ? <FaCheck className="text-[10px]" /> : index + 1}
                </span>
                <span
                  className={`mt-2 text-[10px] font-semibold leading-tight sm:text-xs ${
                    done || active ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default BookingProgress;
