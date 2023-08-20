export function getDateByCustomerCreationDate(date: string) {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}
export function getDateForField(dateString: string) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getDateBeforeDays(days: number) {
  const today = new Date();
  const previousDate = new Date(today);
  previousDate.setDate(today.getDate() - days);
  const year = previousDate.getFullYear();
  const month = previousDate.getMonth() + 1;
  const day = previousDate.getDate();
  return `${year}-${month}-${day}`;
}
