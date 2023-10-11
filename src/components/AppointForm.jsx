import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addAppointment } from "../services/getApi";

/* eslint-disable react/prop-types */
export default function AppointForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { register, control, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    console.log(data);
    addAppointment(data);
    reset();
  }

  return (
    <div className="border">
      <button
        onClick={() => setIsFormOpen((v) => !v)}
        className=" w-full bg-slate-500 p-4 text-center font-bold"
      >
        Add Appointment
      </button>
      {isFormOpen ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-y-4"
        >
          <FormInputs
            forId={"owner_name"}
            label={"Owner Name"}
            register={register}
          />
          <FormInputs
            forId={"pet_name"}
            label={"Pet Name"}
            register={register}
          />
          <FormInputs
            forId={"date"}
            label={"Apt Date"}
            register={register}
            inputType={"date"}
          />
          <FormInputs
            forId={"time"}
            label={"Apt Time"}
            register={register}
            inputType={"time"}
          />
          <FormInputs
            forId={"note"}
            label={"Appointment Notes"}
            type={"textarea"}
            register={register}
          />
          <button
            type="submit"
            className="self-end rounded-lg bg-purple-700 p-2"
          >
            Submit
          </button>
        </form>
      ) : null}
      <DevTool control={control} />
    </div>
  );
}

function FormInputs({
  forId,
  label,
  register,
  type = "input",
  inputType = "text",
}) {
  return (
    <div className="flex items-center justify-between gap-x-4">
      <label htmlFor={forId}>{label}</label>
      {type !== "textarea" ? (
        <input
          id={forId}
          type={inputType}
          className="text-slate-800"
          {...register(forId)}
        />
      ) : (
        <textarea
          id={forId}
          cols="30"
          rows="2"
          className="text-slate-800"
          placeholder="Detailed comments about the condition"
          {...register(forId)}
        ></textarea>
      )}
    </div>
  );
}
