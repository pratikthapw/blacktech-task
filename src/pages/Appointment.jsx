import AppointForm from "../components/AppointForm";
import InputBox from "../components/InputBox";
import ShowAppoints from "../components/ShowAppoints";

export default function Appointment() {
  return (
    <div className="flex flex-col gap-y-4 px-6">
      <AppointForm />
      <InputBox />
      <ShowAppoints />
    </div>
  );
}
