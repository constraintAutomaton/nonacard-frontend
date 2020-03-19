const expect = require("chai").expect;
import { save } from "./../util/util.js";
import { makeStorage, makeCard } from "./mock_fake/mock_util.js";

let storage;
let spySetItem;
const username = "foo";
const name3x3 = "bar";
describe("test the function of util", () => {
  describe("test the save(cards, name3x3, username, storage) function", () => {
    beforeEach(() => {
      [storage, spySetItem] = makeStorage();
    });
    it("given a card, a name3x3, and username and a storage when saving then the storage setItem should have been call one time with the expected value", function() {
      const id = "3";
      const attribute = "boo";

      const card = makeCard(id, attribute);
      const cards = [card];

      const expectedValue = {
        name3x3: name3x3,
        username: username,
        card: { [id]: attribute }
      };

      save(cards, name3x3, username, storage);

      expect(spySetItem.args).to.have.length(1);
      expect(spySetItem.args[0][0]).to.be.deep.equal("data");
      expect(JSON.parse(spySetItem.args[0][1])).to.be.deep.equal(expectedValue);
    });
    it("given multiple cards, a name3x3, and username and a storage when saving then the storage setItem should have been call one time with the expected value", function() {
      const id = ["3", "2", "1"];
      const attribute = ["boo", "foo", "koo"];
      const expectedValue = {
        name3x3: name3x3,
        username: username,
        card: {}
      };
      const cards = [];
      attribute.forEach((el, i) => {
        cards.push(makeCard(id[i], el));
        expectedValue.card[id[i]] = el;
      });

      save(cards, name3x3, username, storage);

      expect(spySetItem.args).to.have.length(1);
      expect(spySetItem.args[0][0]).to.be.deep.equal("data");
      expect(JSON.parse(spySetItem.args[0][1])).to.be.deep.equal(expectedValue);
    });
    it("given no card, a name3x3, and username and a storage when saving then the storage setItem should have been call one time with the expected value", function() {
      const expectedValue = {
        name3x3: name3x3,
        username: username,
        card: {}
      };

      save(cards, name3x3, username, storage);

      expect(spySetItem.args).to.have.length(1);
      expect(spySetItem.args[0][0]).to.be.deep.equal("data");
      expect(JSON.parse(spySetItem.args[0][1])).to.be.deep.equal(expectedValue);
    });
  });
  describe("test of load(cards, name3x3, username, storage) function", () => {});
});
