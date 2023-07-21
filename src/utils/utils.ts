export const dateFormatter = (date: Date): string => {
   const dateObject = new Date(date);
   const year = dateObject.getFullYear();
   const month = dateObject.getMonth() + 1; // Months are zero-indexed, so add 1
   const day = dateObject.getDate();
   return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`
}

export const reviewDateFormat = (date: Date): string => {
   const createdAtDate = new Date(date);
   return createdAtDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });
}