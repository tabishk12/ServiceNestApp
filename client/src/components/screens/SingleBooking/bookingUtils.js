export const normalizeStatus = (status = "") => status.toLowerCase();

export const formatSchedule = (bookingDate) => {
  const date = new Date(bookingDate);
  if (Number.isNaN(date.getTime())) {
    return { dateLabel: "Date TBD", timeLabel: "Time TBD" };
  }

  const dateLabel = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeLabel = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { dateLabel, timeLabel };
};

export const formatCurrency = (amount) => {
  const value = Number(amount) || 0;
  return `₹${value.toLocaleString("en-IN")}`;
};

export const statusBadgeClass = (status) => {
  const s = normalizeStatus(status);
  if (s === "pending") return "bg-amber-200 text-amber-900";
  if (s === "confirmed") return "bg-purple-100 text-purple-800";
  if (s === "completed") return "bg-emerald-100 text-emerald-800";
  if (s === "cancelled") return "bg-rose-100 text-rose-800";
  return "bg-slate-100 text-slate-700";
};

export const getStepperStep = (status) => {
  const s = normalizeStatus(status);
  if (s === "cancelled") return -1;
  if (s === "completed") return 3;
  if (s === "confirmed") return 2;
  return 1; // pending — waiting on provider confirmation
};

export const chatHref = (contact = "") => {
  const digits = String(contact).replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}`;
};
