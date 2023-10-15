/* eslint-disable react/prop-types */
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useAppointRows from "../Hooks/useAppointRows";
import useDeleteAppoint from "../Hooks/useDeleteAppoint";
import { useDispatch, useSelector } from "react-redux";
import filterAppointments, {
  sortAppointment,
} from "../services/filterAppointments";
import { useEffect, useState } from "react";
import { addAppointData } from "./sortSlice";

export default function ShowAppoints(formProps) {
  const { appoints, isLoading } = useAppointRows();
  const dispatch = useDispatch();
  dispatch(addAppointData(appoints));

  const { inputValue } = useSelector((state) => state.search);
  const sortState = useSelector((state) => state.sort);
  const { appointmentData } = sortState;

  const [updatedAppoint, setUpdatedAppoint] = useState([]);

  useEffect(() => {
    if (inputValue.length > 0) {
      setUpdatedAppoint(filterAppointments(appointmentData, inputValue));
    } else {
      if (appointmentData) {
        sortAppointment(setUpdatedAppoint, sortState);
      }
    }
  }, [inputValue, sortState, appointmentData]);

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
  const { deleteAppoint } = useDeleteAppoint();

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
          <h2 className="text-lg font-bold capitalize text-green-600">
            {rowData.pet_name}
          </h2>
          <p className="capitalize">
            <b className=" text-green-600">Owner: </b>
            {rowData.owner_name}
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
