const today = new Date();
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthDay = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let day = weekday[today.getDay()];
let month = monthDay[today.getMonth()];
const day2 = today.getDate();
document.getElementById("date").innerHTML = `<pre>${day}, 
${month} ${day2}</pre>`;
