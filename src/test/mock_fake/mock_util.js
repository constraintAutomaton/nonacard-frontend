const sinon = require("sinon");

export const makeCard = (id, attribute) => {
  const card = { id: "" };
  card.getAttribute = () => {};
  sinon
    .stub(card, "getAttribute")
    .callThrough()
    .withArgs("data")
    .returns(attribute);
  sinon.stub(card, "id").value(id);
  return card;
};
export const makeStorage = () => {
  const storage = { setItem: () => {}, getItem: () => {} };
  const spy = sinon.spy(storage, "setItem");
  return [storage, spy];
};
