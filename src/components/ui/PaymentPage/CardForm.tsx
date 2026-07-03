import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/common";
import { type CardFormData, cardSchema } from "@/schemas/card";
import CardFormInputs from "../../ui/forms/CardFormInputs";

interface CardFormProps {
	onSubmit: (data: CardFormData) => void;
	initialData?: CardFormData | null;
	onCancel: () => void;
	isSubmitting?: boolean;
}

const CardForm: React.FC<CardFormProps> = ({
	onSubmit,
	initialData = null,
	onCancel,
	isSubmitting = false,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<CardFormData>({
		resolver: zodResolver(cardSchema),
		defaultValues: initialData ?? {
			card_no: "",
			name_on_card: "",
			expire_month: "",
			expire_year: "",
			cvv: "",
		},
	});

	useEffect(() => {
		if (initialData) {
			reset(initialData);
		}
	}, [initialData, reset]);

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<CardFormInputs
				register={register}
				errors={errors}
				setValue={setValue}
				years={years}
			/>

			<div className="flex justify-end gap-3">
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{initialData ? "Update card" : "Save card"}
				</Button>
			</div>
		</form>
	);
};

export default CardForm;
