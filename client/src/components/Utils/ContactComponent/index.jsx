import { useState, useEffect } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@slices/Api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@slices/authSlice";
import { useNavigate } from "react-router-dom";
import InputBox from "@utils/InputBox";

const ContactComponent = ({
  readOnly = false,
  redirectOnSuccess = true,
  showActions,
  onCancel,
  onSuccess,
}) => {
  const userRole = useSelector((state) => state.auth.userInfo?.role);
  const { data: profile } = useGetProfileQuery();
  const [errorMessage, setErrorMessage] = useState("");
  const actionsVisible = showActions ?? !readOnly;

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    location: "",
    image: "",
    password: "",
    confirmPassword: "",
    role: userRole,
  });

  useEffect(() => {
    if (profile?.user) {
      setForm((prev) => ({
        ...prev,
        name: profile.user.name || "",
        email: profile.user.email || "",
        contact: profile.user.contact || "",
        location: profile.user.location || "",
        image: profile.user.imageUrl || "",
        role: userRole,
        password: "",
        confirmPassword: "",
      }));
    }
  }, [profile, userRole]);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateField = (field) => (e) => {
    if (readOnly) return;
    setForm({ ...form, [field]: e.target.value });
    setErrorMessage("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (readOnly) return;

    if (form.password !== form.confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }

    try {
      const userData = await updateProfile(form).unwrap();
      dispatch(setCredentials(userData));
      if (onSuccess) onSuccess(userData);
      if (redirectOnSuccess) navigate("/");
    } catch (err) {
      alert(
        "Failed to Update details : " + (err?.data?.message || err.message),
      );
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className="space-y-5">
        <div className="space-x-3 md:grid md:grid-cols-2 md:gap-4">
          <InputBox
            type="text"
            label="Full Name"
            value={form.name}
            onChange={updateField("name")}
            placeholder="Your Name"
            required
            disabled={readOnly}
          />
          <InputBox
            label="Email"
            type="email"
            value={form.email}
            onChange={updateField("email")}
            placeholder="you@example.com"
            required
            disabled={readOnly}
          />
          <InputBox
            type="text"
            label="Contact"
            value={form.contact}
            onChange={updateField("contact")}
            placeholder="+91-123456985"
            required
            disabled={readOnly}
          />
          <InputBox
            type="text"
            label="Location"
            value={form.location}
            onChange={updateField("location")}
            placeholder="Location"
            disabled={readOnly}
          />
          <InputBox
            type="text"
            label="Image URL"
            value={form.image}
            onChange={updateField("image")}
            placeholder="Add Image Url"
            disabled={readOnly}
          />
          <InputBox
            type="text"
            label="Role"
            value={form.role || ""}
            onChange={() => {}}
            placeholder="Role"
            disabled
          />
          {!readOnly && (
            <>
              <InputBox
                type="password"
                label="Enter Password"
                value={form.password}
                onChange={updateField("password")}
                placeholder="Enter Password"
                required
              />
              <InputBox
                type="password"
                label="Re-Enter Password"
                value={form.confirmPassword}
                onChange={updateField("confirmPassword")}
                placeholder="Confirm Password"
              />
            </>
          )}
        </div>

        {actionsVisible && (
          <div className="flex gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full rounded-xl border border-slate-300 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-purple-600 py-2 font-semibold text-white transition duration-200 hover:bg-purple-700 disabled:opacity-60"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </form>

      {errorMessage && (
        <p className="text-center text-red-500">{errorMessage}</p>
      )}
    </>
  );
};

export default ContactComponent;
