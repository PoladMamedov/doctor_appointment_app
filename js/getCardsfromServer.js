

const checkDoctor = (doctor, element) => {
    if (doctor === "Кардіолог") {
  
      const { name, doctor, description, priority, purpose, id, age, pressure, massIndex, heartDiseases,} = element;
  
      // const newCard = new VisitCardsCardiologist(name,doctor,description,urgency,purpose,status,id,"none","show more",age, pressure, massIndex,diseases);
      // console.log(name, doctor, description, priority, purpose, id, age, pressure, massIndex, heartDiseases)
      // newCard.render();
    } else if (doctor === "Стоматолог") {
      const { name, doctor, description, priority, purpose, id, lastDate} = element;
      // console.log(name, doctor, description, priority, purpose, id,
        // lastDate)
      // const newCard = new VisitCardsDentist( name, doctor, description, urgency, purpose, status, id, "none", "show more", lastVisit);
      // newCard.render();
    } else {
      const { name, doctor, description, priority, purpose, id, age,} = element;
      // console.log(name, doctor, description, priority, purpose, id, age)
      // const newCard = new VisitCardsTherapist( name, doctor, description, urgency, purpose, status, id, "none", "show more", age);
      // newCard.render();
    }
  };

const getCardsFromServer = async () => {
    const getCards = await fetch("https://ajax.test-danit.com/api/v2/cards/", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
    }).then((res) => res.text()
    );
  
    JSON.parse(getCards).forEach((element) => {
        console.log(element)
        const { doctor } = element;
        // console.log(doctor)
        checkDoctor(doctor, element);

   
  });
}
  export default getCardsFromServer;
  