import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAddress } from "@slices/address.slice.js";
import { useUpdateAddressMutation } from "@slices/Api/address.Api";
import { useNavigate } from "react-router-dom";

const fieldClass = (readOnly) =>
  `border p-2 rounded w-full ${
    readOnly
      ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-600"
      : "bg-white"
  }`;

const AddressComponent = ({
  initialData = {},
  onSubmit,
  submitLabel = "Save Address",
  disabledFields = [],
  readOnly = false,
  redirectOnSuccess = true,
  showActions,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth?.userInfo);
  const userId = userInfo?._id;
  const [updateAddress, { isLoading }] = useUpdateAddressMutation();
  const actionsVisible = showActions ?? !readOnly;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    ...initialData,
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    if (readOnly) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
    });
  };

  const isDisabled = (field) => readOnly || disabledFields.includes(field);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (readOnly) return;

    if (onSubmit) {
      await onSubmit(form);
      return;
    }

    try {
      if (!userId) throw new Error("Missing user ID");
      await updateAddress({ id: userId, ...form }).unwrap();
      dispatch(saveAddress(form));
      alert("Saved successfully..!");
      if (onSuccess) onSuccess(form);
      if (redirectOnSuccess) navigate("/");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to save address.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={form.fullName || ""}
          onChange={handleChange}
          className={fieldClass(isDisabled("fullName"))}
          required
          disabled={isDisabled("fullName")}
          readOnly={readOnly}
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone || ""}
          onChange={handleChange}
          className={fieldClass(isDisabled("phone"))}
          required
          disabled={isDisabled("phone")}
          readOnly={readOnly}
        />
      </div>

      <input
        name="street"
        type="text"
        placeholder="Street Address"
        value={form.street || ""}
        onChange={handleChange}
        className={fieldClass(isDisabled("street"))}
        required
        disabled={isDisabled("street")}
        readOnly={readOnly}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="city"
          type="text"
          placeholder="City"
          value={form.city || ""}
          onChange={handleChange}
          className={fieldClass(isDisabled("city"))}
          required
          disabled={isDisabled("city")}
          readOnly={readOnly}
        />
        <input
          name="state"
          type="text"
          placeholder="State"
          value={form.state || ""}
          onChange={handleChange}
          className={fieldClass(isDisabled("state"))}
          required
          disabled={isDisabled("state")}
          readOnly={readOnly}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="zipCode"
          type="text"
          placeholder="Pin Code"
          value={form.zipCode || ""}
          onChange={handleChange}
          className={fieldClass(isDisabled("zipCode"))}
          required
          disabled={isDisabled("zipCode")}
          readOnly={readOnly}
        />
        <input
          name="country"
          type="text"
          placeholder="Country"
          value={form.country || ""}
          onChange={handleChange}
          className={fieldClass(true)}
          disabled
          readOnly
        />
      </div>

      {actionsVisible && (
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            Clear All
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? "Saving..." : submitLabel}
          </button>
        </div>
      )}
    </form>
  );
};

export default AddressComponent;
