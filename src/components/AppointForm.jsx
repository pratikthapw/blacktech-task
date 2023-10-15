import { useNavigate } from "react-router-dom";
import useAddAppoint from "../Hooks/useAddAppoint";
import useUpdateAppoint from "../Hooks/useUpdateAppoint";

/* eslint-disable react/prop-types */
export default function AppointForm({
  isFormOpen,
  setIsFormOpen,
  hookForm,
  rowId,
  setRowId,
}) {
  const navigate = useNavigate();
  const { handleSubmit, reset } = hookForm;

  const { addAppoint, isAdding } = useAddAppoint();
  const { updateAppoint } = useUpdateAppoint();

  function onSubmit(data) {
    if (!rowId) {
      addAppoint(data, {
        onSuccess: () => {
          reset();
          setIsFormOpen((v) => !v);
        },
      });
    } else {
      updateAppoint([rowId, data], {
        onSuccess: () => {
          setRowId(() => null);
          setIsFormOpen((v) => !v);
          navigate("/");
        },
      });
    }
  }

  if (isAdding) {
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
            hookForm={hookForm}
            forId={"owner_name"}
            label={"Owner Name"}
          />
          <FormInputs
            hookForm={hookForm}
            forId={"pet_name"}
            label={"Pet Name"}
          />
          <FormInputs
            hookForm={hookForm}
            forId={"date"}
            label={"Apt Date"}
            inputType={"date"}
          />
          <FormInputs
            hookForm={hookForm}
            forId={"time"}
            label={"Apt Time"}
            inputType={"time"}
          />
          <FormInputs
            hookForm={hookForm}
            forId={"note"}
            label={"Appointment Notes"}
            type={"textarea"}
          />
          <button
            type="submit"
            className="self-end rounded-md bg-green-600 px-3 py-2 text-sm font-bold"
          >
            Submit
          </button>
        </form>
      ) : null}
    </div>
  );
}

function FormInputs({
  forId,
  label,
  hookForm,
  type = "input",
  inputType = "text",
  defaultValue = "",
}) {
  const { register, errors } = hookForm;
  return (
    <div className="flex flex-col items-start justify-between gap-x-4 gap-y-2 sm:flex-row">
      <label htmlFor={forId} className="font-medium">
        {label} {type !== "textarea" && "*"}
      </label>
      {type !== "textarea" ? (
        <div className=" w-full rounded-md sm:w-6/12 sm:max-w-xs">
          <div className="h-8 ">
            <input
              id={forId}
              type={inputType}
              className="border-1 h-full w-full rounded-md border border-slate-400 bg-transparent px-2 py-1 text-slate-800 outline-none focus:border-green-500 dark:text-slate-100"
              defaultValue={defaultValue}
              {...register(forId, { required: true })}
            />
          </div>
          {errors[forId]?.type === "required" && (
            <span className="text-xs text-red-500">{forId} is required</span>
          )}
        </div>
      ) : (
        <textarea
          id={forId}
          cols="30"
          rows="3"
          defaultValue={defaultValue}
          className="border-1 w-full rounded-md border border-slate-400 bg-transparent px-2 py-1 text-slate-800 outline-none focus:border-green-500 dark:text-slate-100 sm:w-8/12"
          placeholder="Detailed comments about the condition"
          {...register(forId)}
        ></textarea>
      )}
    </div>
  );
}
