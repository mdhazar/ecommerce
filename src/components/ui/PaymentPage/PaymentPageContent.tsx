import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../api/api";
import CardList from "./CardList";
import CardForm from "./CardForm";
import { Card, CardFormData } from "../../../types/card";

interface PaymentPageContentProps {
  onCardSelect?: (card: Card) => void;
}

const convertCardToFormData = (card: Card): CardFormData => ({
  card_no: card.card_no,
  name_on_card: card.name_on_card,
  expire_month: card.expire_month.toString(),
  expire_year: card.expire_year,
});

const PaymentPageContent: React.FC<PaymentPageContentProps> = ({
  onCardSelect,
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await api.get<Card[]>("/user/card");
      setCards(response.data);
    } catch (err) {
      console.error("Error fetching cards:", err);
      toast.error("Failed to fetch cards");
    }
  };

  const handleAddCard = async (data: CardFormData) => {
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
    } catch (err) {
      console.error("Error saving card:", err);
      toast.error("Failed to save card");
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await api.delete(`/user/card/${cardId}`);
        toast.success("Card deleted successfully");
        fetchCards();
      } catch (err) {
        console.error("Error deleting card:", err);
        toast.error("Failed to delete card");
      }
    }
  };

  const handleSelectCard = (card: Card) => {
    setSelectedCard(card);
    onCardSelect?.(card);
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
            initialData={
              editingCard ? convertCardToFormData(editingCard) : null
            }
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
          onSelectCard={handleSelectCard}
          onEditCard={(card: Card) => {
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
