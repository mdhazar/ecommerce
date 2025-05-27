import React from "react";
import { Card } from "../../../types/card";

interface CardListProps {
  cards: Card[];
  selectedCard: Card | null;
  onSelectCard: (card: Card) => void;
  onEditCard: (card: Card) => void;
  onDeleteCard: (cardId: string) => void;
}

const CardList: React.FC<CardListProps> = ({
  cards,
  selectedCard,
  onSelectCard,
  onEditCard,
  onDeleteCard,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {cards.map((card) => (
      <div
        key={card.id}
        className={`p-4 border rounded-lg cursor-pointer ${
          selectedCard?.id === card.id
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200"
        }`}
        onClick={() => onSelectCard(card)}
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
                onEditCard(card);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteCard(card.id);
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
);

export default CardList;
