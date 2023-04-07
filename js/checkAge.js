export default function ageCheck(checkData) {
   let { age } = checkData;

   if ('age' in checkData) {
      age = `${age} года`
   } else {
      age = ''
   }
   return age;
}
