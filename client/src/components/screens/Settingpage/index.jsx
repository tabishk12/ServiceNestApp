import React, { use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAddress } from "@slices/address.slice.js";
import { useUpdateAddressMutation } from "@slices/Api/address.Api";
import AddressForm from "@components/utils/AddressComponent";
import ContactComponent from "@utils/ContactComponent";
import {useGetAddressByIdQuery} from "@slices/Api/address.Api";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth?.userInfo);
  const userId = userInfo?._id;
  const{data:Address}= useGetAddressByIdQuery(userId);
  const address = useSelector((state) => state.address?.address) || {
    fullName: Address?.[0]?.fullName || "",
    phone: Address?.[0]?.phone||"",
    street: Address?.[0]?.street || "",
    city:Address?.[0]?.city || "",
    state:Address?.[0]?.state || "",
    zipCode:Address?.[0]?.zipCode || "",
    country: "India",
  };

  const [updateAddress, { isLoading }] = useUpdateAddressMutation();

  const handleSave = async (formData) => {
    try {
      if (!userId) throw new Error("Missing user ID");
      await updateAddress({ id: userId, ...formData }).unwrap(); // matches your mutation shape
      dispatch(saveAddress(formData));
      alert("Settings saved!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to save address.");
    }
  };

  return (
    <div className="max-w-5xl md:mx-auto p-4 sm:mx-10 mt-10 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

      {/* Profile Section (same as before) */}
      <div className="border border-1 p-3 mb-6 bg-gray-100 shadow  rounded-xl">
        <h3 className="text-lg font-medium mb-2">Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={userInfo?.name || ""}
            disabled
            className="border p-2 rounded"
            placeholder="Full Name"
          />
          <input
            type="email"
            value={userInfo?.email || ""}
            disabled
            className="border p-2 rounded"
            placeholder="Email"
          />
        </div>
      </div>

      {/* Address Form */}
      <div className="border border-1 p-3 mb-6 bg-gray-100 shadow  rounded-xl">
        <h3 className="text-xl font-medium mb-2">Address</h3>
        <AddressForm
          initialData={address}
          onSubmit={handleSave}
          submitLabel={isLoading ? "Saving..." : "Save Changes"}
        />
      </div>
 <div className="border border-1 p-3 mb-6 bg-gray-100 shadow  rounded-xl">
        <h3 className="text-xl font-medium mb-2">Details</h3>
<ContactComponent
          initialData={userInfo?.contact || {}}
          onSubmit={handleSave}
          submitLabel={isLoading ? "Saving..." : "Save Contact"}
        />

 </div>
      {/* Change Password Placeholder */}
      <div className="border border-1 p-3 mb-6 bg-gray-100 shadow  rounded-xl">
        <h3 className="text-lg font-medium mb-2">Change Password</h3>
        <p className="text-sm text-gray-600">
          Password change option coming soon.
        </p>
      </div>

      <div className="border border-1 p-3 mb-6 bg-gray-100 shadow  rounded-xl">
        <h3 className="text-lg font-medium mb-2">Delete Account</h3>
        <p className="text-sm text-red-600">
          Deleting your account is permanent and cannot be undone. Please contact support for assistance.
        </p>
        <button
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => alert("Account deletion feature coming soon!")}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
