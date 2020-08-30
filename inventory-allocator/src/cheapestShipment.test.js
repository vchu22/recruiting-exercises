const cheapestShipment = require("./cheapestShipment");

test("Function returns an array", () => {
  expect(Array.isArray(cheapestShipment())).toBe(true);
});

test("Order can be shipped using one warehouse", () => {
  const items = { apple: 1 };
  const warehouses = [{ name: owd, inventory: { apple: 1 } }];
  const answer = [{ owd: { apple: 1 } }];
  expect(cheapestShipment(items, warehouses)).toBe(answer);
});

test("Order can be shipped using multiple warehouses", () => {
  const items = { apple: 10 };
  const warehouses = [
    { name: owd, inventory: { apple: 5 } },
    { name: dm, inventory: { apple: 5 } },
  ];
  const answer = [{ dm: { apple: 5 } }, { owd: { apple: 5 } }];
  expect(cheapestShipment(items, warehouses)).toBe(answer);
});

test("Order cannot be shipped because there is not enough inventory", () => {
  const items = { apple: 1 };
  const warehouses = [{ name: owd, inventory: { apple: 0 } }];
  const answer = [];
  expect(cheapestShipment(items, warehouses)).toBe(answer);

  items = { apple: 2 };
  warehouses = [{ name: owd, inventory: { apple: 1 } }];
  expect(cheapestShipment(items, warehouses)).toBe(answer);
});
