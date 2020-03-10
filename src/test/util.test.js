import "./../util/util.js";
const sinon = require("sinon");


const test = () => {
  return document.createElement("a");
};
const mock = sinon.mock(document);
mock
  .expects("createElement")
  .withExactArgs("a")
  .returns(3);
const assert = require("assert");
describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal(test(), 3);
    });
  });
});
