import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Spinner } from "@/components/ui/common";
import type { CardFormData } from "@/schemas/card";
import api from "../../../api/api";
import type { Card } from "../../../types/card";
import CardForm from "./CardForm";
import CardList from "./CardList";

interface PaymentPageContentProps {
	selectedCard: Card | null;
	onCardSelect: (card: Card | null) => void;
}

const convertCardToFormData = (card: Card): CardFormData => ({
	card_no: card.card_no,
	name_on_card: card.name_on_card,
	expire_month: card.expire_month.toString(),
	expire_year: card.expire_year,
	cvv: "",
});

const PaymentPageContent: React.FC<PaymentPageContentProps> = ({
	selectedCard,
	onCardSelect,
}) => {
	const queryClient = useQueryClient();
	const [showCardForm, setShowCardForm] = useState(false);
	const [editingCard, setEditingCard] = useState<Card | null>(null);

	const { data: cards = [], isLoading } = useQuery({
		queryKey: ["cards"],
		queryFn: async () => (await api.get<Card[]>("/user/card")).data,
	});

	const invalidateCards = () =>
		queryClient.invalidateQueries({ queryKey: ["cards"] });

	const saveCard = useMutation({
		mutationFn: async (data: CardFormData) => {
			const payload = { ...data, card_no: data.card_no.replace(/\s+/g, "") };
			if (editingCard) {
				await api.put("/user/card", { ...payload, id: editingCard.id });
			} else {
				await api.post("/user/card", payload);
			}
		},
		onSuccess: async () => {
			toast.success(editingCard ? "Card updated" : "Card saved");
			await invalidateCards();
			setShowCardForm(false);
			setEditingCard(null);
		},
		onError: () => toast.error("We couldn't save that card. Please try again."),
	});

	const deleteCard = useMutation({
		mutationFn: async (cardId: string) => {
			await api.delete(`/user/card/${cardId}`);
		},
		onSuccess: async (_data, cardId) => {
			toast.success("Card removed");
			if (selectedCard?.id === cardId) onCardSelect(null);
			await invalidateCards();
		},
		onError: () => toast.error("We couldn't remove that card."),
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between gap-4">
				<div>
					<h2 className="text-xl font-semibold tracking-tight">
						Payment method
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Choose a saved card or add a new one.
					</p>
				</div>
				{!showCardForm ? (
					<Button
						variant="outline"
						onClick={() => {
							setEditingCard(null);
							setShowCardForm(true);
						}}
					>
						<Plus className="size-4" aria-hidden="true" />
						Add card
					</Button>
				) : null}
			</div>

			{showCardForm ? (
				<div className="rounded-lg border border-border bg-card p-6 shadow-xs">
					<h3 className="mb-5 text-lg font-medium">
						{editingCard ? "Edit card" : "Add a new card"}
					</h3>
					<CardForm
						onSubmit={(data) => saveCard.mutate(data)}
						initialData={
							editingCard ? convertCardToFormData(editingCard) : null
						}
						isSubmitting={saveCard.isPending}
						onCancel={() => {
							setShowCardForm(false);
							setEditingCard(null);
						}}
					/>
				</div>
			) : isLoading ? (
				<div className="flex justify-center py-12">
					<Spinner />
				</div>
			) : (
				<CardList
					cards={cards}
					selectedCard={selectedCard}
					onSelectCard={onCardSelect}
					onEditCard={(card) => {
						setEditingCard(card);
						setShowCardForm(true);
					}}
					onDeleteCard={(cardId) => deleteCard.mutate(cardId)}
				/>
			)}
		</div>
	);
};

export default PaymentPageContent;
