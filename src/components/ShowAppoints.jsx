/* eslint-disable react/prop-types */
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useAppointRows from "../Hooks/useAppointRows";
import useDeleteAppoint from "../Hooks/useDeleteAppoint";
import { useSelector } from "react-redux";
import filterAppointments from "../services/filterAppointments";
import { useEffect, useState } from "react";

export default function ShowAppoints(formProps) {
  const { appoints, isLoading } = useAppointRows();
  const { inputValue } = useSelector((state) => state.search);
  const [updatedAppoint, setUpdatedAppoint] = useState([]);

  useEffect(() => {
    if (inputValue.length > 0) {
      setUpdatedAppoint(filterAppointments(appoints, inputValue));
    } else {
      setUpdatedAppoint(appoints);
    }
  }, [inputValue, appoints]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="flex flex-col gap-y-4 divide-y-2">
      {updatedAppoint?.map((item) => (
        <AppointLayout
          key={item.id}
          rowData={item}
          {...formProps}
          appointment={appoints}
        />
      ))}
    </div>
  );
}

function AppointLayout({
  rowData,
  setIsFormOpen,
  setValue,
  appointment,
  setRowId,
}) {
  const { deleteAppoint, isDeleting } = useDeleteAppoint();

  function handleDelete() {
    deleteAppoint(rowData.id);
  }
  function handleUpdate() {
    const selectedRow = appointment?.filter((item) => item.id == rowData.id)[0];
    setIsFormOpen((v) => (v ? v : !v));
    setRowId(() => rowData.id);
    setValue("owner_name", selectedRow?.owner_name, { shouldDirty: true });
    setValue("pet_name", selectedRow?.pet_name, { shouldDirty: true });
    setValue("date", selectedRow?.date, { shouldDirty: true });
    setValue("time", selectedRow?.time, { shouldDirty: true });
    setValue("note", selectedRow?.note, { shouldDirty: true });
  }

  if (isDeleting) {
    <h2>Deleting</h2>;
  }

  return (
    <div className="flex flex-col items-start justify-between gap-4 pt-4 sm:flex-row">
      <div className="flex flex-col items-start gap-2 sm:flex-row">
        <div className="flex items-center gap-2 sm:flex-col">
          <p
            className="cursor-pointer rounded-sm bg-blue-500 p-1 hover:bg-blue-400"
            onClick={handleUpdate}
          >
            <FaEdit />
          </p>
          <p
            className="cursor-pointer bg-red-500 p-1 hover:bg-red-400"
            onClick={handleDelete}
          >
            <RiDeleteBinFill />
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold capitalize text-green-500">
            {rowData.owner_name}
          </h2>
          <p className="capitalize">
            <b className=" text-green-500">Owner: </b>
            {rowData.pet_name}
          </p>
          <p>{rowData.note}</p>
        </div>
      </div>

      <p className="flex items-center gap-x-1">
        <time>{rowData.date}</time>
        <time>{rowData.time.slice(0, 5)}</time>
      </p>
    </div>
  );
}
