const expect = require("chai").expect;
import { save } from "./../util/util.js";
import { makeCard } from "./mock_fake/mock_util.js";
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
describe("test the function of util", () => {
  describe("test the save(cards, name3x3, username, storage)  and load(cards, name3x3, username, storage) function", () => {
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
    it("given no card when saving the storage should contain only the 3x3name, the username and an empty card attribue", () => {
      const cards = [];

      const username = "foo";
      const name3x3 = "bar";
      const storage = makeStorage();

      const expectedValue = {
        name3x3: name3x3,
        username: username,
        card: {}
      };
      save(cards, name3x3, username, storage);
      expect(JSON.parse(storage.getItem("data"))).to.deep.eql(expectedValue);
    });
    it("given multiple cards, a name3x3, and username and a storage when saving then the storage should return the card data, the username and the 3x3 name at the data item", () => {
      const id = ["3", "2", "1"];
      const attribute = ["boo", "coo", "moo"];

      const cards = id.map((el, i) => {
        return makeCard(el, attribute[i]);
      });

      const username = "foo";
      const name3x3 = "bar";
      const storage = makeStorage();

      const expectedValue = {
        name3x3: name3x3,
        username: username,
        card: {}
      };
      id.forEach((el, i) => {
        expectedValue.card[el] = attribute[i];
      });
      save(cards, name3x3, username, storage);
      expect(JSON.parse(storage.getItem("data"))).to.deep.eql(expectedValue);
    });
    it("aaa", () => {
      const id = ["3", "2", "1"];
      const attribute = ["boo", "coo", "moo"];

      const cards = id.map((el, i) => {
        return makeCard(el, attribute[i]);
      });
      const username = "foo";
      const name3x3 = "bar";
      const expectedValue = {
        name3x3: name3x3,
        username: username,
        card: {}
      };
      id.forEach((el, i) => {
        expectedValue.card[el] = attribute[i];
      });

      //const storage = makeStorage();
      console.log(storage.getItem);
      save(cards, name3x3, username, storage);

      expect(0).to.eql(0);
    });
  });
});
