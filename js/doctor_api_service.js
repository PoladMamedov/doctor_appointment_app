export default class DoctorAPIService {
  async getToken(email, password) {
    try {
      const response = await fetch(
        "https://ajax.test-danit.com/api/v2/cards/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );
      if (response.ok) {
        const token = await response.text();
        return token;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async postCard(token, cardInfo) {
    try {
      const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cardInfo),
      });
      const createdCard = response.json();
      return createdCard;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteCard(token, cardId) {
    try {
      const response = await fetch(
        `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async getAllCards(token) {
    try {
      const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allCards = response.json();
      return allCards;
    } catch (e) {
      console.log(e);
    }
  }

  async getCard(token, cardId) {
    try {
      const response = await fetch(
        `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const Card = response.json();
      return Card;
    } catch (e) {
      console.log(e);
    }
  }

  async updateCard(token, cardId, newCardInfo) {
    try {
      const response = await fetch(
        `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newCardInfo),
        }
      );
      const updatedCard = response.json();
      return updatedCard;
    } catch (e) {
      console.log(e);
    }
  }
}