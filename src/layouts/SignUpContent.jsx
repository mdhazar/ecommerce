import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

function SignUpContent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storeFieldsVisible, setStoreFieldsVisible] = useState(false);
  const [storeRoleId, setStoreRoleId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    api
      .get("/roles")
      .then((response) => {
        console.log("Fetched roles:", response.data); // Debug
        setRoles(response.data);

        const storeRole = response.data.find(
          (role) => role.name.toLowerCase() === "mağaza"
        );
        if (storeRole) {
          setStoreRoleId(storeRole.id);
          console.log("Store role ID:", storeRole.id); // Debug
        }

        const customerRole = response.data.find(
          (role) => role.name.toLowerCase() === "müşteri"
        );
        if (customerRole) {
          setSelectedRole(customerRole.id);
          console.log("Default selected role ID:", customerRole.id); // Debug
        } else if (response.data.length > 0) {
          setSelectedRole(response.data[0].id);
          console.log("Default selected role ID:", response.data[0].id); // Debug
        }
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
        toast.error("Error fetching roles");
      });
  }, []);

  useEffect(() => {
    console.log("Current selectedRole:", selectedRole);
    console.log("Checking for Store role visibility");
    if (selectedRole == storeRoleId) {
      setStoreFieldsVisible(true);
    } else {
      setStoreFieldsVisible(false);
    }
  }, [selectedRole, storeRoleId]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    console.log("Form data before processing:", data); // Debug

    let formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: selectedRole,
    };

    if (selectedRole == storeRoleId) {
      formData.store = {
        name: data.store_name,
        phone: data.store_phone,
        tax_no: data.store_tax_no,
        bank_account: data.store_bank_account,
      };
    }
    console.log("FormData to be sent to API:", formData); // Debug
    api
      .post("/signup", formData)
      .then((response) => {
        setIsSubmitting(false);
        console.log("Signup successful:", response.data); // Debug
        toast.success(
          "Signup successful! You need to click the link in the email to activate your account. Please check your inbox and spam folder if you don't see it!"
        );
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Signup error:", error);
        toast.error(error.response?.data?.message || "Signup failed");
      });
  };

  const password = watch("password");

  return (
    <div className="max-w-md mx-auto mt-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", { required: true, minLength: 3 })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && (
            <span className="text-red-500">
              Name is required and should be at least 3 characters.
            </span>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && (
            <span className="text-red-500">Valid email is required.</span>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              validate: (value) =>
                /[a-z]/.test(value) &&
                /[A-Z]/.test(value) &&
                /[0-9]/.test(value) &&
                /[^A-Za-z0-9]/.test(value),
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && (
            <span className="text-red-500">
              Password must be at least 8 characters and include numbers,
              uppercase, lowercase, and special characters.
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            {...register("confirm_password", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.confirm_password && (
            <span className="text-red-500">
              {errors.confirm_password.message}
            </span>
          )}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            {...register("role_id", { required: true })}
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role_id && (
            <span className="text-red-500">Role is required.</span>
          )}
        </div>

        {/* Store Fields */}
        {storeFieldsVisible && (
          <>
            {/* Store Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Store Name</label>
              <input
                type="text"
                {...register("store_name", { required: true, minLength: 3 })}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.store_name && (
                <span className="text-red-500">
                  Store name is required and should be at least 3 characters.
                </span>
              )}
            </div>

            {/* Store Phone */}
            <div className="mb-4">
              <label className="block text-gray-700">Store Phone</label>
              <input
                type="tel"
                {...register("store_phone", {
                  required: true,
                  pattern: /^\+90\d{10}$/,
                })}
                placeholder="+90..."
                className="w-full px-3 py-2 border rounded"
              />
              {errors.store_phone && (
                <span className="text-red-500">
                  Valid Türkiye phone number is required.
                </span>
              )}
            </div>

            {/* Store Tax ID */}
            <div className="mb-4">
              <label className="block text-gray-700">Store Tax ID</label>
              <input
                type="text"
                {...register("store_tax_no", {
                  required: true,
                  pattern: /^T\d{4}V\d{6}$/,
                })}
                placeholder="TXXXXVXXXXXX"
                className="w-full px-3 py-2 border rounded"
              />
              {errors.store_tax_no && (
                <span className="text-red-500">
                  Tax ID must match the pattern TXXXXVXXXXXX.
                </span>
              )}
            </div>

            {/* Store Bank Account */}
            <div className="mb-4">
              <label className="block text-gray-700">Store Bank Account</label>
              <input
                type="text"
                {...register("store_bank_account", {
                  required: true,
                  validate: (value) =>
                    isValidIBAN(value) || "Invalid IBAN address",
                })}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.store_bank_account && (
                <span className="text-red-500">
                  {errors.store_bank_account.message}
                </span>
              )}
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                viewBox="0 0 24 24"
              ></svg>
              Submitting...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
}

function isValidIBAN(iban) {
  return /^TR\d{24}$/.test(iban);
}

export default SignUpContent;
