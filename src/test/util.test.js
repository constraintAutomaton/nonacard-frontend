const expect = require("chai").expect;
import { save, load } from "./../util/util.js";
import { makeStorage, makeCard, makeElement } from "./mock_fake/mock_util.js";

let storage;
let spySetItemStorage;
const username = "foo";
const name3x3 = "bar";
describe("test the function of util", () => {
  beforeEach(() => {
    [storage, spySetItemStorage] = makeStorage();
  });
  describe("test the save(cards, name3x3, username, storage) function", () => {
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

      expect(spySetItemStorage.args).to.have.length(1);
      expect(spySetItemStorage.args[0][0]).to.be.deep.equal("data");
      expect(JSON.parse(spySetItemStorage.args[0][1])).to.be.deep.equal(
        expectedValue
      );
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

      expect(spySetItemStorage.args).to.have.length(1);
      expect(spySetItemStorage.args[0][0]).to.be.deep.equal("data");
      expect(JSON.parse(spySetItemStorage.args[0][1])).to.be.deep.equal(
        expectedValue
      );
    });
    it("given no card, a name3x3, and username and a storage when saving then the storage setItem should have been call one time with the expected value", function() {
      const expectedValue = {
        name3x3: name3x3,
        username: username,
        card: {}
      };
      const cards = [];
      save(cards, name3x3, username, storage);

      expect(spySetItemStorage.args).to.have.length(1);
      expect(spySetItemStorage.args[0][0]).to.be.deep.equal("data");
      expect(JSON.parse(spySetItemStorage.args[0][1])).to.be.deep.equal(
        expectedValue
      );
    });
  });
  describe("test of load(cards, name3x3, username, storage) function", () => {
    it("given an empty storage when loading data then it should not change the value arguement of an element and should return false", () => {
      const cards = [];
      const id = ["a", "b", "c"];
      const attribute = ["d", "e", "f"];
      attribute.forEach((el, i) => {
        cards.push(makeCard(id[i], el));
      });
      const [name3x3, spy3x3] = makeElement();
      const [username, spyUsename] = makeElement();

      const haveLoad = load(cards, name3x3, username, storage);
      expect(haveLoad).to.be.false;
      expect(spy3x3.set.notCalled).to.be.true;
      expect(spyUsename.set.notCalled).to.be.true;
      expect(spySetItemStorage.notCalled).to.be.true;
      cards.forEach(el => {
        expect(el.setAttribute.notCalled).to.be.true;
      });
    });
    it("given a storage when loading data then it should not change the value arguement of an element and should return false", () => {
      const id = ["3", "2", "1"];
      const attribute = ["boo", "foo", "koo"];
      const expectedValue = {
        name3x3: "test",
        username: "john",
        card: {}
      };
      const cards = [];
      attribute.forEach((el, i) => {
        cards.push(makeCard(id[i], el));
        expectedValue.card[id[i]] = el;
      });

      [storage, spySetItemStorage] = makeStorage(JSON.stringify(expectedValue));
      const [name3x3, spy3x3] = makeElement();
      const [username, spyUsename] = makeElement();
      const haveLoad = load(cards, name3x3, username, storage);
      expect(haveLoad).to.be.true;

    });
  });
});
