import DoctorAPIService from "./doctor_api_service.js";
async function ok() {
  const request = new DoctorAPIService();
  const token = await request.getToken("poladikksp@gmail.com", "12345");
  console.log(token);

  const allCards = await request.qetAllCards(token);
  console.log(allCards);
}
ok();
