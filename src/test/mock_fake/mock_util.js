const sinon = require("sinon");

export const makeCard = (id, attribute) => {
  const card = { id: "", getAttribute: () => {}, setAttribute: () => {} };
  sinon
    .stub(card, "getAttribute")
    .callThrough()
    .withArgs("data")
    .returns(attribute);
  sinon.stub(card, "id").value(id);
  sinon.stub(card, "setAttribute").callThrough().returns(true);
  return card;
};
export const makeStorage = (storedValue = null) => {
  const storage = {
    setItem: () => {},
    getItem: () => {}
  };
  sinon
    .stub(storage, "getItem")
    .callThrough()
    .withArgs("data")
    .returns(storedValue);
  const spySetItem = sinon.spy(storage, "setItem");
  return [storage, spySetItem];
};
export const makeElement = () => {
  const element = {
    get value() {
      return this._value;
    },
    set value(_value) {
      this._value = _value;
    }
  };
  const spy = sinon.spy(element, "value", ["get", "set"]);
  return [element, spy];
};
