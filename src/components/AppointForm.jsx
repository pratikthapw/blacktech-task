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
          // if (selectedRow === undefined) {
          //   reset({
          //     owner_name: "",
          //     pet_name: "",
          //     date: "",
          //     time: "",
          //     note: "",
          //   });
          // }
          setIsFormOpen((v) => !v);
          navigate("/");
        },
      });
    }
  }

  if (isLoading || isAdding) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="border">
      <button
        onClick={() => setIsFormOpen((v) => !v)}
        className="w-full bg-slate-500 p-4 text-center font-bold"
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
  defaultValue = "",
}) {
  return (
    <div className="flex items-center justify-between gap-x-4">
      <label htmlFor={forId}>{label}</label>
      {type !== "textarea" ? (
        <input
          id={forId}
          type={inputType}
          className="text-slate-800"
          defaultValue={defaultValue}
          {...register(forId)}
        />
      ) : (
        <textarea
          id={forId}
          cols="30"
          rows="2"
          defaultValue={defaultValue}
          className="text-slate-800"
          placeholder="Detailed comments about the condition"
          {...register(forId)}
        ></textarea>
      )}
    </div>
  );
}
