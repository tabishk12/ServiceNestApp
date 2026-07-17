import { FaChevronDown } from "react-icons/fa";

const FilterDropdown = ({
  label,
  icon,
  value,
  options,
  onChange,
  open,
  onToggle,
  menuRef,
}) => {
  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full min-w-[9rem] items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
      >
        <span className="flex items-center gap-2">
          {icon}
          <span>{selected?.shortLabel || label}</span>
        </span>
        <FaChevronDown
          className={`text-xs text-slate-700 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full min-w-[12rem] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value || "any"}
              type="button"
              onClick={() => {
                onChange(opt.value);
                onToggle();
              }}
              className={`block w-full px-4 py-2.5 text-left text-sm font-medium transition hover:bg-purple-50 ${
                value === opt.value
                  ? "bg-purple-50 text-purple-700"
                  : "text-slate-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
