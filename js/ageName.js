export default function ageName(age) {
   let lastDigit = age % 10;
   let lastTwoDigits = age % 100;

   if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      age = `${age} лет`;
   } else if (lastDigit === 1) {
      age = `${age} год`;

   } else if (lastDigit >= 2 && lastDigit <= 4) {
      age = `${age} года`;

   } else {
      age = `${age} лет`;
   }

   return age;
}
