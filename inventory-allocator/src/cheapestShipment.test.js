const cheapestShipment = require("./cheapestShipment");

test("Function returns an array", () => {
  expect(Array.isArray(cheapestShipment({}, []))).toBe(true);
});

test("Order can be shipped using one warehouse", () => {
  const shipments = { apple: 1 };
  const warehouses = [{ name: "owd", inventory: { apple: 1 } }];
  const answer = [{ owd: { apple: 1 } }];
  expect(cheapestShipment(shipments, warehouses)).toEqual(answer);
});

test("Order can be shipped using multiple warehouses", () => {
  const shipments = { apple: 10 };
  const warehouses = [
    { name: "owd", inventory: { apple: 5 } },
    { name: "dm", inventory: { apple: 5 } },
  ];
  const answer = [{ owd: { apple: 5 } }, { dm: { apple: 5 } }];
  expect(cheapestShipment(shipments, warehouses)).toEqual(answer);
});

test("Order cannot be shipped because there is not enough inventory", () => {
  let shipments = { apple: 1 };
  let warehouses = [{ name: "owd", inventory: { apple: 0 } }];
  const answer = [];
  expect(cheapestShipment(shipments, warehouses)).toEqual(answer);

  shipments = { apple: 2 };
  warehouses = [{ name: "owd", inventory: { apple: 1 } }];
  expect(cheapestShipment(shipments, warehouses)).toEqual(answer);
});

test("Multiple shipments can be shipped using multiple warehouses", () => {
  const shipments = { apple: 5, banana: 5, orange: 5 };
  const warehouses = [
    { name: "owd", inventory: { apple: 5, orange: 10 } },
    { name: "dm", inventory: { banana: 5, orange: 10 } },
  ];
  const answer = [
    { owd: { apple: 5, orange: 5 } },
    { dm: { banana: 5, orange: 5 } },
  ];
  expect(cheapestShipment(shipments, warehouses)).toEqual(answer);
});
