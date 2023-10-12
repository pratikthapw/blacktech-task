import { useState } from "react";
import AppointForm from "../components/AppointForm";
import InputBox from "../components/InputBox";
import ShowAppoints from "../components/ShowAppoints";

export default function Appointment() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formProps = { isFormOpen, setIsFormOpen };

  return (
    <div className="flex flex-col gap-y-8">
      <AppointForm {...formProps} />
      <InputBox type={"sortBy"} />
      <ShowAppoints {...formProps} />
    </div>
  );
}
