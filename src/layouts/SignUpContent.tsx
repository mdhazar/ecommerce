import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Role {
  id: string;
  name: string;
}

interface StoreData {
  name: string;
  phone: string;
  tax_no: string;
  bank_account: string;
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  role_id: string;
  store_name?: string;
  store_phone?: string;
  store_tax_no?: string;
  store_bank_account?: string;
}

const SignUpContent: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [storeFieldsVisible, setStoreFieldsVisible] = useState<boolean>(false);
  const [storeRoleId, setStoreRoleId] = useState<string | null>(null);

  useEffect(() => {
    api
      .get("/roles")
      .then((response) => {
        console.log("Fetched roles:", response.data); // Debug
        setRoles(response.data);

        const storeRole = response.data.find(
          (role: Role) => role.name.toLowerCase() === "mağaza"
        );
        if (storeRole) {
          setStoreRoleId(storeRole.id);
          console.log("Store role ID:", storeRole.id); // Debug
        }

        const customerRole = response.data.find(
          (role: Role) => role.name.toLowerCase() === "müşteri"
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
    if (selectedRole === storeRoleId) {
      setStoreFieldsVisible(true);
    } else {
      setStoreFieldsVisible(false);
    }
  }, [selectedRole, storeRoleId]);

  const onSubmit = (data: SignUpFormData) => {
    setIsSubmitting(true);
    console.log("Form data before processing:", data); // Debug

    let formData: any = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: selectedRole,
    };

    if (selectedRole === storeRoleId) {
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

  const isValidIBAN = (iban: string): boolean => {
    // Basic IBAN validation for Turkey (TR)
    const ibanRegex =
      /^TR[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{2}$/;
    return ibanRegex.test(iban.replace(/\s/g, "").toUpperCase());
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        {storeFieldsVisible && (
          <>
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

            <div className="mb-4">
              <label className="block text-gray-700">Store Bank Account</label>
              <input
                type="text"
                {...register("store_bank_account", {
                  required: true,
                  validate: (value) =>
                    isValidIBAN(value) || "Invalid IBAN address",
                })}
                placeholder="TR..."
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpContent;
