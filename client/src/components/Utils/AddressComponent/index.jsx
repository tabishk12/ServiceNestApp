import{ useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAddress } from "@slices/address.slice.js";
import { useUpdateAddressMutation } from "@slices/Api/address.Api";
import { useNavigate } from "react-router-dom";

const AddressComponent = ({
  initialData = {}, onSubmit,submitLabel = "Save Address",disabledFields = [], }) =>   {

 const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth?.userInfo);
  const userId = userInfo?._id;
    const [updateAddress, { isLoading }] = useUpdateAddressMutation();

  const [form, setForm] = useState({
    fullName:"",
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    else{
      try {
            if (!userId) throw new Error("Missing user ID");
            await updateAddress({ id: userId, ...form }).unwrap(); // matches your mutation shape
            dispatch(saveAddress(form));
            alert(" saved successfully..!");
          } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to save address.");
          }
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
          disabled={disabledFields.includes("fullName")}
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 rounded"
          required
          disabled={disabledFields.includes("phone")}
        />
      </div>

      <input
        name="street"
        type="text"
        placeholder="Street Address"
        value={form.street}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
        disabled={disabledFields.includes("street")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="city"
          type="text"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border p-2 rounded"
          required
          disabled={disabledFields.includes("city")}
        />
        <input
          name="state"
          type="text"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="border p-2 rounded"
          required
          disabled={disabledFields.includes("state")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="zipCode"
          type="text"
          placeholder="Pin Code"
          value={form.zipCode}
          onChange={handleChange}
          className="border p-2 rounded"
          required
          disabled={disabledFields.includes("zipCode")}
        />
        <input
          name="country"
          type="text"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="border p-2 rounded"
          disabled
        />
      </div>

      <div className="flex gap-4 flex-wrap">
       
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Clear All
        </button>        
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default AddressComponent;
