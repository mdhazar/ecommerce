import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface CardFormData {
  card_no: string;
  name_on_card: string;
  expire_month: string;
  expire_year: string;
}

interface CardFormInputsProps {
  register: UseFormRegister<CardFormData>;
  errors: FieldErrors<CardFormData>;
  years: number[];
}

const CardFormInputs: React.FC<CardFormInputsProps> = ({
  register,
  errors,
  years,
}) => (
  <>
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
        className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
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
        className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Month</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {month.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        {errors.expire_month && (
          <p className="text-red-500 text-sm">{errors.expire_month.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Expiry Year
        </label>
        <select
          {...register("expire_year", { required: "Year is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500"
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
  </>
);

export default CardFormInputs;
