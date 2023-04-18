export default function checkDate(date) {
  if (Date.parse(date) > Date.now()) {
    return "Open";
  } else {
    return "Done";
  }
}
