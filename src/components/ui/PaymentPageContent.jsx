import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import CardList from "./PaymentPage/CardList";
import CardForm from "./PaymentPage/CardForm";

const PaymentPageContent = ({ onCardSelect }) => {
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
        <CardList
          cards={cards}
          selectedCard={selectedCard}
          onSelectCard={setSelectedCard}
          onEditCard={(card) => {
            setEditingCard(card);
            setShowCardForm(true);
          }}
          onDeleteCard={handleDeleteCard}
        />
      )}
    </div>
  );
};

export default PaymentPageContent;
