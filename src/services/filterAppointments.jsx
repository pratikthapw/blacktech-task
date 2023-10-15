export default function filterAppointments(appointData, inputValue) {
  const higlightedFilter = appointData
    .filter(
      (item) =>
        item.owner_name.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.pet_name.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.note.toLowerCase().includes(inputValue.toLowerCase()),
    )
    .map((item) => {
      let newOwner = item.owner_name.replace(
        new RegExp(inputValue, "gi"),
        (match) =>
          `<mark style="background: #2769AA; color: white;">${match}</mark>`,
      );
      let newPet = item.pet_name.replace(
        new RegExp(inputValue, "gi"),
        (match) =>
          `<mark style="background: #2769AA; color: white;">${match}</mark>`,
      );
      let newNote = item.note.replace(
        new RegExp(inputValue, "gi"),
        (match) =>
          `<mark style="background: #2769AA; color: white;">${match}</mark>`,
      );
      return {
        ...item,
        owner_name: newOwner,
        pet_name: newPet,
        note: newNote,
      };
    });
  return higlightedFilter;
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
