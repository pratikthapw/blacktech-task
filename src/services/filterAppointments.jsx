export default function filterAppointments(appointData, inputValue) {
  const result = appointData?.filter((item) => {
    return (
      item?.owner_name.toLowerCase().includes(inputValue.toLowerCase()) ||
      item?.pet_name.toLowerCase().includes(inputValue.toLowerCase()) ||
      item?.note.toLowerCase().includes(inputValue.toLowerCase())
    );
  });
  return result;
}

export function sortAppointment(setUpdatedAppoint, sortState) {
  const { sortByType } = sortState;
  switch (sortByType) {
    case "pet name":
      return setUpdatedAppoint(sortLayout(sortState, "pet_name"));
    case "owner name":
      return setUpdatedAppoint(sortLayout(sortState, "owner_name"));
    case "date":
      return setUpdatedAppoint(sortLayout(sortState, "date"));
    default:
      return setUpdatedAppoint(sortLayout(sortState, "pet_name"));
  }
}

function sortLayout(sortState, type) {
  const { appointmentData, sortByOrder } = sortState;
  return [...appointmentData].sort((a, b) => {
    if (sortByOrder === "asc") {
      return a[type].localeCompare(b[type]);
    } else {
      return b[type].localeCompare(a[type]);
    }
  });
}
