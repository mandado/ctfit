import { format, utcToZonedTime } from "date-fns-tz";

type DateFormat = string;

export const formatDate = (date: DateFormat, formatDate: string = "dd/MM/yyyy") => {
  return format(utcToZonedTime(date, 'UTC'), formatDate);
}
export const formatAsDateComplete = (date: DateFormat) => formatDate(date, "dd/MM/yyyy 'ás' HH:mm:ss");
export const formatAsMonthYear = (date: DateFormat) => formatDate(date, "Myyyy");
