const cheapestShipment = (order, warehouses) => {
  /*
   * @param  {Object} order       An object with the items to be shipped as the keys and their amounts as the values
   * @param  {Array}  warehouses  An array containing the items and amounts to be shipped
   * @return {Array}              An array containing shipments from warehouses that offers the cheapest shipment for the order
   */
  let result = [];

  // Iterate through each warehouse
  for (let i = 0; i < warehouses.length; i++) {
    const inventory = warehouses[i].inventory; // abbreviate inventory
    const warehouseName = warehouses[i].name; // abbreviate warehouse name
    let itemsFromWarehouse = {};
    // Iterate through each inventory in the warehouse
    for (let itemName in inventory) {
      if (itemName in order) {
        // Take out the amount needed from the warehouse
        if (inventory[itemName] >= order[itemName]) {
          inventory[itemName] -= order[itemName];
          itemsFromWarehouse[itemName] = order[itemName];
          delete order[itemName]; // cross out from the order list because it's completed
        } else {
          // If the warehouse can't provide enough amount, subtract inventory amount from the amount on order list
          order[itemName] -= inventory[itemName];
          itemsFromWarehouse[itemName] = inventory[itemName];
          inventory[itemName] = 0;
        }
        // No amount of the specified item has been taken out, delete the key
        if (itemsFromWarehouse[itemName] === 0) {
          delete itemsFromWarehouse[itemName];
        }
      }
    }
    // Once we gathered items to be shipped from a warehouse, we attach them to the result array.
    if (!isEmpty(itemsFromWarehouse)) {
      result.push({ [warehouseName]: itemsFromWarehouse });
    }
  }
  // Check if there are remaining items in the shipping list. If there are, the order cannot be shipped
  for (let item in order) {
    if (order[item] > 0) return [];
  }

  // Return a sorted array based on warehouse name in an alphabetical order
  return result.sort(compare);
};

/*
 * Helper functions
 */
const compare = (a, b) => {
  const aName = Object.keys(a)[0],
    bName = Object.keys(b)[0];
  if (aName < bName) return -1;
  if (aName > bName) return 1;
  return 0;
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

module.exports = cheapestShipment;
