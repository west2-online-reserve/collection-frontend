// dateUtils.ts

export function getYear(date: Date): number {
    const year = new Date(date).getFullYear();
    return year;
  }
  
export function getMonth(date: Date): number {
    const month = new Date(date).getMonth() + 1;
    return month;
  }
  
export function getMonthName(date: Date) {
    const monthNames = 
    [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    const monthIndex = new Date(date).getMonth();
    return monthNames[monthIndex];
}

export const CurrentYMD ={
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDay(),
};