import { Check, CreditCard } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/common";
import { cn } from "@/lib/utils";
import type { Card } from "../../../types/card";

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
}) => {
	if (cards.length === 0) {
		return (
			<div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-muted/40 px-6 py-12 text-center">
				<span className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
					<CreditCard className="size-6" aria-hidden="true" />
				</span>
				<p className="font-medium text-foreground">No saved cards yet</p>
				<p className="mt-1 text-sm text-muted-foreground">
					Add a card to complete your order securely.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
			{cards.map((card) => {
				const isSelected = selectedCard?.id === card.id;
				return (
					// biome-ignore lint/a11y/useSemanticElements: this row wraps nested Edit/Delete buttons, so a native <button> cannot be used (buttons cannot nest); role="button" plus onKeyDown provides equivalent semantics
					<div
						key={card.id}
						className={cn(
							"cursor-pointer rounded-lg border bg-card p-5 text-card-foreground shadow-xs transition-colors",
							isSelected
								? "border-primary ring-2 ring-primary/30"
								: "border-border hover:border-primary/40",
						)}
						role="button"
						tabIndex={0}
						aria-pressed={isSelected}
						onClick={() => onSelectCard(card)}
						onKeyDown={(event) => {
							if (event.key === "Enter" || event.key === " ") {
								event.preventDefault();
								onSelectCard(card);
							}
						}}
					>
						<div className="flex items-start justify-between gap-3">
							<div className="flex items-center gap-3">
								<span className="flex size-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
									<CreditCard className="size-5" aria-hidden="true" />
								</span>
								<div>
									<p className="font-medium text-foreground">
										{card.name_on_card}
									</p>
									<p className="font-mono text-sm text-muted-foreground">
										•••• •••• •••• {card.card_no.replace(/\s+/g, "").slice(-4)}
									</p>
								</div>
							</div>
							{isSelected ? (
								<span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<Check className="size-4" aria-hidden="true" />
								</span>
							) : null}
						</div>

						<div className="mt-4 flex items-center justify-between">
							<p className="text-sm text-muted-foreground">
								Expires {card.expire_month.toString().padStart(2, "0")}/
								{card.expire_year}
							</p>
							<div className="flex items-center gap-1">
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={(event) => {
										event.stopPropagation();
										onEditCard(card);
									}}
								>
									Edit
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="text-destructive hover:text-destructive"
									onClick={(event) => {
										event.stopPropagation();
										onDeleteCard(card.id);
									}}
								>
									Remove
								</Button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CardList;
