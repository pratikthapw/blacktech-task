import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAppointRows from "../Hooks/useAppointRows";
import useAddAppoint from "../Hooks/useAddAppoint";
import useUpdateAppoint from "../Hooks/useUpdateAppoint";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
export default function AppointForm({ isFormOpen, setIsFormOpen }) {
  const navigate = useNavigate();
  const { appoints, isLoading } = useAppointRows();
  const [searchParams] = useSearchParams();
  const rowId = searchParams.get("id");
  const selectedRow = appoints?.filter((item) => item.id == rowId)[0];
  const { register, control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (selectedRow === undefined) {
      reset({ owner_name: "", pet_name: "", date: "", time: "", note: "" });
    } else {
      reset(selectedRow);
    }
  }, [selectedRow, reset]);

  const { addAppoint, isAdding } = useAddAppoint();
  const { updateAppoint } = useUpdateAppoint();

  function onSubmit(data) {
    if (selectedRow === undefined) {
      addAppoint(data, {
        onSuccess: () => {
          reset();
          setIsFormOpen((v) => !v);
        },
      });
    } else {
      updateAppoint([rowId, data], {
        onSuccess: () => {
          setIsFormOpen((v) => !v);
          navigate("/");
        },
      });
    }
  }

  if (isLoading || isAdding) {
    return <h2></h2>;
  }

  return (
    <div className="">
      <button
        onClick={() => setIsFormOpen((v) => !v)}
        className={`w-full ${
          isFormOpen ? "rounded-t-lg" : "rounded-lg"
        } bg-green-600 py-2 text-center font-bold hover:bg-green-500`}
      >
        Add Appointment
      </button>
      {isFormOpen ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-1 flex flex-col gap-y-4 rounded-b-lg border border-t-0 border-slate-400 px-2 py-4 pt-4 dark:border-slate-600"
        >
          <FormInputs
            forId={"owner_name"}
            label={"Owner Name"}
            register={register}
            defaultValue={selectedRow?.owner_name || ""}
          />
          <FormInputs
            forId={"pet_name"}
            label={"Pet Name"}
            register={register}
            defaultValue={selectedRow?.pet_name || ""}
          />
          <FormInputs
            forId={"date"}
            label={"Apt Date"}
            register={register}
            inputType={"date"}
            defaultValue={selectedRow?.date || ""}
          />
          <FormInputs
            forId={"time"}
            label={"Apt Time"}
            register={register}
            inputType={"time"}
            defaultValue={selectedRow?.time || ""}
          />
          <FormInputs
            forId={"note"}
            label={"Appointment Notes"}
            type={"textarea"}
            register={register}
            defaultValue={selectedRow?.note || ""}
          />
          <button
            type="submit"
            className="self-end rounded-md bg-green-600 px-3 py-2 text-sm font-bold"
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
  defaultValue = "",
}) {
  return (
    <div className="flex items-start justify-between gap-x-4">
      <label htmlFor={forId} className="font-medium">
        {label}
      </label>
      {type !== "textarea" ? (
        <div className="h-8 w-6/12 max-w-xs rounded-md">
          <input
            id={forId}
            type={inputType}
            className="border-1 h-full w-full rounded-md border border-slate-400 bg-transparent px-2 py-1 text-slate-800 outline-none focus:border-green-500 dark:text-slate-100"
            defaultValue={defaultValue}
            {...register(forId)}
          />
        </div>
      ) : (
        <textarea
          id={forId}
          cols="30"
          rows="3"
          defaultValue={defaultValue}
          className="border-1 w-8/12 rounded-md border border-slate-400 bg-transparent px-2 py-1 text-slate-800 outline-none focus:border-green-500 dark:text-slate-100"
          placeholder="Detailed comments about the condition"
          {...register(forId)}
        ></textarea>
      )}
    </div>
  );
}
