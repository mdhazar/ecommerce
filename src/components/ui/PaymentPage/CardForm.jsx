import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CardFormInputs from "@/components/ui/forms/CardFormInputs";

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
      <CardFormInputs register={register} errors={errors} years={years} />

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
export default CardForm;
