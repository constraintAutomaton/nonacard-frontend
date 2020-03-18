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
    const storage = { data: "" };
    storage.setItem = (property, data) => {
      this[property] = data;
    };
    storage.getItem = data => {
      return this[data];
    };
    return storage;
  };