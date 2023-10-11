/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import {
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "../services/getApi";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

export default function ShowAppoints() {
  const { data: appoints, isLoading } = useQuery({
    queryKey: ["appoints"],
    queryFn: getAppointments,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="flex flex-col gap-y-4">
      {appoints.map((item) => (
        <AppointLayout key={item.id} rowData={item} />
      ))}
    </div>
  );
}

function AppointLayout({ rowData }) {
  function handleDelete() {
    deleteAppointment(rowData.id);
  }
  function handleUpdate() {
    updateAppointment(rowData.id);
  }
  return (
    <div className="flex items-start gap-x-4">
      <div className="flex flex-col items-center gap-y-2">
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
        <h2>{rowData.pet_name}</h2>
        <p>
          <b>Owner:</b> {rowData.owner_name}
        </p>
        <p>{rowData.note}</p>
      </div>
      <p className="flex items-center gap-x-2">
        <time>{rowData.date}</time>
        <time>{rowData.time}</time>
      </p>
    </div>
  );
}
