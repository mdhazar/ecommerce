import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../api/api";
import { toast } from "react-toastify";

const CardForm = ({ onSubmit, initialData = null, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          {...register("card_no", {
            required: "Card number is required",
            pattern: {
              value: /^[0-9]{16}$/,
              message: "Please enter a valid 16-digit card number",
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="1234 1234 1234 1234"
          maxLength={16}
        />
        {errors.card_no && (
          <p className="text-red-500 text-sm">{errors.card_no.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name on Card
        </label>
        <input
          {...register("name_on_card", { required: "Name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name_on_card && (
          <p className="text-red-500 text-sm">{errors.name_on_card.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Month
          </label>
          <select
            {...register("expire_month", { required: "Month is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Month</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
          {errors.expire_month && (
            <p className="text-red-500 text-sm">
              {errors.expire_month.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Year
          </label>
          <select
            {...register("expire_year", { required: "Year is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.expire_year && (
            <p className="text-red-500 text-sm">{errors.expire_year.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {initialData ? "Update Card" : "Add Card"}
        </button>
      </div>
    </form>
  );
};

const PaymentPageContent = () => {
  const [cards, setCards] = useState([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await api.get("/user/card");
      setCards(response.data);
    } catch (error) {
      toast.error("Failed to fetch cards");
    }
  };

  const handleAddCard = async (data) => {
    try {
      if (editingCard) {
        await api.put("/user/card", { ...data, id: editingCard.id });
        toast.success("Card updated successfully");
      } else {
        await api.post("/user/card", data);
        toast.success("Card added successfully");
      }
      fetchCards();
      setShowCardForm(false);
      setEditingCard(null);
    } catch (error) {
      toast.error("Failed to save card");
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await api.delete(`/user/card/${cardId}`);
        toast.success("Card deleted successfully");
        fetchCards();
      } catch (error) {
        toast.error("Failed to delete card");
      }
    }
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowCardForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Payment Method</h2>
        <button
          onClick={() => {
            setShowCardForm(true);
            setEditingCard(null);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Card
        </button>
      </div>

      {showCardForm ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {editingCard ? "Edit Card" : "Add New Card"}
          </h3>
          <CardForm
            onSubmit={handleAddCard}
            initialData={editingCard}
            onCancel={() => {
              setShowCardForm(false);
              setEditingCard(null);
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedCard?.id === card.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedCard(card)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{card.name_on_card}</p>
                  <p className="text-gray-600">
                    **** **** **** {card.card_no.slice(-4)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires: {card.expire_month.toString().padStart(2, "0")}/
                    {card.expire_year}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCard(card);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCard(card.id);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button
          disabled={!selectedCard}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentPageContent;
