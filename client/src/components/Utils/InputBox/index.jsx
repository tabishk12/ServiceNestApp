import React from "react";

const InputBox = ({
  type,
  label,
  value,
  placeholder,
  onChange,
  required,
  name,
  disabled = false,
}) => {
  return (
    <div className="mt-2 flex flex-col gap-2 p-1">
      <label className="mb-1 block text-md font-medium leading-6 text-slate-900">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name || undefined}
        required={!!required}
        disabled={disabled}
        className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-600"
            : "bg-white"
        }`}
      />
    </div>
  );
};

export default InputBox;
