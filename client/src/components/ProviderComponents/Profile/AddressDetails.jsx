import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAddressByIdQuery } from "@slices/Api/address.Api";
import AddressComponent from "@utils/AddressComponent";

const AddressDetails = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const userId = useSelector((state) => state.auth?.userInfo?._id);
  const {
    data: Address,
    isLoading,
    isError,
  } = useGetAddressByIdQuery(userId, { skip: !userId });
  const address = Address?.[0];
  const hasAddress = !!address;

  const initialData = useMemo(
    () => ({
      fullName: address?.fullName || "",
      phone: address?.phone || "",
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      zipCode: address?.zipCode || "",
      country: address?.country || "India",
    }),
    [address],
  );

  return (
    <div className="w-full min-h-40 rounded-lg border border-slate-200 bg-white p-4 md:p-6">
      {isLoading && <p>Loading Address Data</p>}

      {!isLoading && !hasAddress ? (
        <div className="text-center">
          <h1 className="text-2xl font-semibold">No Address found</h1>
          <button
            type="button"
            className="mt-2 rounded-xl bg-green-600 p-2 text-white"
            onClick={() => navigate("/Add-address")}
          >
            Add Address
          </button>
        </div>
      ) : (
        !isLoading && (
          <>
            <div className="mb-3 flex items-center justify-between text-gray-900">
              <h2 className="text-3xl font-bold">Address Details</h2>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="font-semibold text-blue-700 hover:underline"
                >
                  Edit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="font-semibold text-slate-600 hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>

            <AddressComponent
              key={`${address?._id || "address"}-${isEditing}`}
              initialData={initialData}
              readOnly={!isEditing}
              redirectOnSuccess={false}
              showActions={isEditing}
              submitLabel="Save Address"
              onSuccess={() => setIsEditing(false)}
            />
          </>
        )
      )}

      {isError && !hasAddress && !isLoading && null}
    </div>
  );
};

export default AddressDetails;
