import type React from "react";
import { useId } from "react";
import type {
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import { Input, Label, Select } from "@/components/ui/common";
import { type CardFormData, formatCardNumber } from "@/schemas/card";

interface CardFormInputsProps {
	register: UseFormRegister<CardFormData>;
	errors: FieldErrors<CardFormData>;
	setValue: UseFormSetValue<CardFormData>;
	years: number[];
}

const FieldError: React.FC<{ message?: string }> = ({ message }) =>
	message ? <p className="mt-1.5 text-sm text-destructive">{message}</p> : null;

const CardFormInputs: React.FC<CardFormInputsProps> = ({
	register,
	errors,
	setValue,
	years,
}) => {
	const cardNoId = useId();
	const nameOnCardId = useId();
	const expireMonthId = useId();
	const expireYearId = useId();
	const cvvId = useId();

	const cardNoField = register("card_no");

	return (
		<div className="space-y-5">
			<div>
				<Label htmlFor={cardNoId}>Card number</Label>
				<Input
					id={cardNoId}
					inputMode="numeric"
					autoComplete="cc-number"
					placeholder="1234 5678 9012 3456"
					maxLength={19}
					aria-invalid={errors.card_no ? true : undefined}
					className="mt-1.5 font-mono tracking-wider"
					{...cardNoField}
					onChange={(event) => {
						setValue("card_no", formatCardNumber(event.target.value), {
							shouldValidate: true,
						});
					}}
				/>
				<FieldError message={errors.card_no?.message} />
			</div>

			<div>
				<Label htmlFor={nameOnCardId}>Name on card</Label>
				<Input
					id={nameOnCardId}
					autoComplete="cc-name"
					placeholder="As printed on the card"
					aria-invalid={errors.name_on_card ? true : undefined}
					className="mt-1.5"
					{...register("name_on_card")}
				/>
				<FieldError message={errors.name_on_card?.message} />
			</div>

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
				<div>
					<Label htmlFor={expireMonthId}>Month</Label>
					<Select
						id={expireMonthId}
						autoComplete="cc-exp-month"
						aria-invalid={errors.expire_month ? true : undefined}
						className="mt-1.5"
						{...register("expire_month")}
					>
						<option value="">MM</option>
						{Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
							<option key={month} value={month}>
								{month.toString().padStart(2, "0")}
							</option>
						))}
					</Select>
					<FieldError message={errors.expire_month?.message} />
				</div>

				<div>
					<Label htmlFor={expireYearId}>Year</Label>
					<Select
						id={expireYearId}
						autoComplete="cc-exp-year"
						aria-invalid={errors.expire_year ? true : undefined}
						className="mt-1.5"
						{...register("expire_year")}
					>
						<option value="">YYYY</option>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</Select>
					<FieldError message={errors.expire_year?.message} />
				</div>

				<div className="col-span-2 sm:col-span-1">
					<Label htmlFor={cvvId}>Security code</Label>
					<Input
						id={cvvId}
						inputMode="numeric"
						autoComplete="cc-csc"
						placeholder="CVV"
						maxLength={4}
						aria-invalid={errors.cvv ? true : undefined}
						className="mt-1.5 font-mono tracking-wider"
						{...register("cvv")}
					/>
					<FieldError message={errors.cvv?.message} />
				</div>
			</div>
		</div>
	);
};

export default CardFormInputs;
