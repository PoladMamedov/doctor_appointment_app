export default function parameters(parameter1, parameter2, parameter3, DOM) {
   if (parameter1) {

      let pressureP = document.createElement('p')
      pressureP.textContent = `Давление: ${parameter1}`
      let pressureIm = document.createElement('p')
      pressureIm.textContent = `Индекс Массы Тела: ${parameter2}`
      let heartDiseases = document.createElement('p')
      pressureIm.textContent = `Перенесенные болезни: ${parameter3}`
      DOM.append(pressureP, pressureIm, heartDiseases)
   }
}