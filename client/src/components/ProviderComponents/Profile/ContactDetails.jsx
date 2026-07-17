import { useState } from "react";
import ContactComponent from "@utils/ContactComponent";

const ContactDetails = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full min-h-40 rounded-lg border border-slate-200 bg-white p-4 md:p-6">
      <div className="mb-3 flex items-center justify-between text-gray-900">
        <h2 className="text-3xl font-bold">User Details</h2>
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

      <ContactComponent
        key={`${profile?.user?._id || "contact"}-${isEditing}`}
        readOnly={!isEditing}
        redirectOnSuccess={false}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
        showActions={isEditing}
      />
    </div>
  );
};

export default ContactDetails;
