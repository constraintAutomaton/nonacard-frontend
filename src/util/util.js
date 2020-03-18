export const save = (cards, name3x3, username, storage) => {
  const data = getCardData(cards);
  data["name3x3"] = name3x3;
  data["username"] = username;
  const stringJson = JSON.stringify(data);
  storage.setItem("data", stringJson);
};

const getCardData = cards => {
  const data = {};
  data.card = {};
  cards.forEach(el => {
    data.card[el.id] = el.getAttribute("data");
  });
  return data;
};
export const load = (card, name3x3Element, userNameElement, storage) => {
  const data = JSON.parse(storage.getItem("data"));
  if (data !== null) {
    card.forEach(el => {
      el.setAttribute("data", data["card"][el.id]);
    });
    name3x3Element.value = data["name3x3"];
    userNameElement.value = data["username"];
  }
};
