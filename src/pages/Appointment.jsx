import { useState } from "react";
import AppointForm from "../components/AppointForm";
import InputBox from "../components/InputBox";
import ShowAppoints from "../components/ShowAppoints";
import { useForm } from "react-hook-form";

export default function Appointment() {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const hookForm = { register, handleSubmit, errors, reset };
  const [rowId, setRowId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formProps = { isFormOpen, rowId, setRowId, setIsFormOpen, setValue };

  return (
    <div className="flex flex-col gap-y-8">
      <AppointForm hookForm={hookForm} {...formProps} />
      <InputBox type={"sortBy"} />
      <ShowAppoints {...formProps} />
    </div>
  );
}
