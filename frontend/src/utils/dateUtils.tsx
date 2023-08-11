export function getDateByCustomerCreationDate(date: string) {
  const newDate = new Date(date);
  return (
    newDate.getDate() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    newDate.getFullYear()
  );
}
export function getDateForField(dateString: string) {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
