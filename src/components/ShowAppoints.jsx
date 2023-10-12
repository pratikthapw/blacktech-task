/* eslint-disable react/prop-types */
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import useAppointRows from "../Hooks/useAppointRows";
import useDeleteAppoint from "../Hooks/useDeleteAppoint";

export default function ShowAppoints(formProps) {
  const { appoints, isLoading } = useAppointRows();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="flex flex-col gap-y-4 divide-y-2">
      {appoints.map((item) => (
        <AppointLayout key={item.id} rowData={item} {...formProps} />
      ))}
    </div>
  );
}

function AppointLayout({ rowData, setIsFormOpen }) {
  const [, setSearchParams] = useSearchParams();
  const { deleteAppoint, isDeleting } = useDeleteAppoint();

  function handleDelete() {
    deleteAppoint(rowData.id);
  }
  function handleUpdate() {
    setIsFormOpen((v) => (v ? v : !v));
    setSearchParams({ id: rowData?.id });
  }

  if (isDeleting) {
    <h2>Deleting</h2>;
  }

  return (
    <div className="flex items-start justify-between gap-x-4 pt-4">
      <div className="flex items-start gap-x-2">
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
