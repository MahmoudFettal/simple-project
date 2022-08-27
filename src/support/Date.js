const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const date = (day) => {
  return `${DAYS[day.getDay()]} ${day.getDate()} ${
    MONTHS[day.getMonth()]
  } ${day.getFullYear()} - ${day.getHours()}:${day.getMinutes()}`;
};

export default date;
