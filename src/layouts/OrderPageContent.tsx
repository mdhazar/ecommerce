import React, { useState, useEffect } from "react";
import { setAddress } from "@/redux/actions/shoppingCartActions";
import { useForm } from "react-hook-form";
import api from "@/api/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

interface Address {
  id?: number;
  title: string;
  name: string;
  surname: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  address: string;
}

interface AddressFormProps {
  onSubmit: (data: Address) => void;
  initialData?: Address | null;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  onSubmit,
  initialData = null,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Address>({
    defaultValues: initialData || undefined,
  });

  const [cities] = useState<string[]>([
    "Istanbul",
    "Ankara",
    "Izmir",
    "Bursa",
    "Antalya",
    "Adana",
    "Konya",
    "Gaziantep",
    "Mersin",
    "Diyarbakır",
  ]);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address Title
        </label>
        <input
          {...register("title", { required: "Address title is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Surname
          </label>
          <input
            {...register("surname", { required: "Surname is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.surname && (
            <p className="text-red-500 text-sm">{errors.surname.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^05[0-9]{9}$/,
              message: "Please enter a valid Turkish phone number",
            },
          })}
          placeholder="05XXXXXXXXX"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <select
          {...register("city", { required: "City is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city.toLowerCase()}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          District
        </label>
        <input
          {...register("district", { required: "District is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.district && (
          <p className="text-red-500 text-sm">{errors.district.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Neighborhood
        </label>
        <input
          {...register("neighborhood", {
            required: "Neighborhood is required",
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.neighborhood && (
          <p className="text-red-500 text-sm">{errors.neighborhood.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address Details
        </label>
        <textarea
          {...register("address", { required: "Address details are required" })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-xs text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-xs text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Save Address
        </button>
      </div>
    </form>
  );
};

const OrderPageContent: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<Address | null>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<Address | null>(null);
  const [useSameAddress, setUseSameAddress] = useState<boolean>(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async (): Promise<void> => {
    try {
      const response = await api.get("/user/address");
      setAddresses(response.data);
    } catch (error) {
      toast.error("Failed to fetch addresses");
    }
  };

  const handleAddAddress = async (data: Address): Promise<void> => {
    try {
      if (editingAddress) {
        await api.put("/user/address", { ...data, id: editingAddress.id });
        toast.success("Address updated successfully");
      } else {
        await api.post("/user/address", data);
        toast.success("Address added successfully");
      }
      fetchAddresses();
      setShowAddressForm(false);
      setEditingAddress(null);
    } catch (error) {
      toast.error("Failed to save address");
    }
  };

  const handleDeleteAddress = async (addressId: number): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await api.delete(`/user/address/${addressId}`);
        toast.success("Address deleted successfully");
        fetchAddresses();
      } catch (error) {
        toast.error("Failed to delete address");
      }
    }
  };

  const handleEditAddress = (address: Address): void => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleContinueToPayment = (): void => {
    if (
      !selectedShippingAddress ||
      (!useSameAddress && !selectedBillingAddress)
    ) {
      toast.error("Please select both shipping and billing addresses");
      return;
    }

    dispatch(setAddress(selectedShippingAddress));

    history.push("/payment");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Order</h1>

      {/* Address Management Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shipping Addresses</h2>
          <button
            onClick={() => {
              setEditingAddress(null);
              setShowAddressForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Address
          </button>
        </div>

        {showAddressForm ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h3>
            <AddressForm
              onSubmit={handleAddAddress}
              initialData={editingAddress}
              onCancel={() => {
                setShowAddressForm(false);
                setEditingAddress(null);
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{address.title}</h3>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditAddress(address)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        address.id && handleDeleteAddress(address.id)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">
                  {address.name} {address.surname}
                </p>
                <p className="text-gray-600">{address.phone}</p>
                <p className="text-gray-600">
                  {address.address}, {address.neighborhood}
                </p>
                <p className="text-gray-600">
                  {address.district}, {address.city}
                </p>
                <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="shippingAddress"
                      checked={selectedShippingAddress?.id === address.id}
                      onChange={() => setSelectedShippingAddress(address)}
                      className="form-radio text-blue-600"
                    />
                    <span>Use as shipping address</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="radio"
                      name="billingAddress"
                      checked={selectedBillingAddress?.id === address.id}
                      onChange={() => setSelectedBillingAddress(address)}
                      className="form-radio text-blue-600"
                    />
                    <span>Use as billing address</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Use Same Address Checkbox */}
      <div className="mb-8">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={useSameAddress}
            onChange={(e) => {
              setUseSameAddress(e.target.checked);
              if (e.target.checked) {
                setSelectedBillingAddress(selectedShippingAddress);
              }
            }}
            className="form-checkbox text-blue-600"
          />
          <span>Use shipping address as billing address</span>
        </label>
      </div>

      {/* Continue to Payment Button */}
      <div className="flex justify-end">
        <button
          onClick={handleContinueToPayment}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderPageContent;
