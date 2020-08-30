const cheapestShipment = require("./cheapestShipment");

test("function returns an array", () => {
  expect(Array.isArray(cheapestShipment())).toBe(true);
});
