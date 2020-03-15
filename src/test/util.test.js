import "./../util/util.js";
import { save } from "./../util/util.js";
const sinon = require("sinon");
const expect = require("chai").expect;

describe("test the function of util", function() {
  describe("test the save(cards, name3x3, username, storage) function", function() {
    it("given a card, a name3x3, and username and a storage when saving then the storage should return the card data, the username and the 3x3 name at the data item", function() {
      const id = "3";
      const attribute = "boo";

      const card = makeCard(id, attribute);
      const cards = [card];

      const username = "foo";
      const name3x3 = "bar";
      const storage = makeStorage();

      const expectedValue = {
        name3x3: name3x3,
        username: username,
        card: { [id]: attribute }
      };

      save(cards, name3x3, username, storage);
      expect(JSON.parse(storage.getItem("data"))).to.deep.eql(expectedValue);
    });
  });
});

const makeCard = (id, attribute) => {
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
const makeStorage = () => {
  const storage = { data: "" };
  storage.setItem = (property, data) => {
    this[property] = data;
  };
  storage.getItem = data => {
    return this[data];
  };
  return storage;
};
