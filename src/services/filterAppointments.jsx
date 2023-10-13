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
