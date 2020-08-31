function cheapestShipment(shipments, warehouses) {
  let result = [];
  for (let i = 0; i < warehouses.length; i++) {
    const inventory = warehouses[i].inventory;
    const warehouseName = warehouses[i].name;
    let itemsFromWarehouse = {};
    for (let itemName in inventory) {
      if (itemName in shipments) {
        const diff = inventory[itemName] - shipments[itemName];
        if (diff >= 0) {
          inventory[itemName] -= shipments[itemName];
          itemsFromWarehouse[itemName] = shipments[itemName];
          delete shipments[itemName];
        } else {
          shipments[itemName] -= inventory[itemName];
          itemsFromWarehouse[itemName] = inventory[itemName];
          inventory[itemName] = 0;
        }
        if (itemsFromWarehouse[itemName] === 0) {
          delete itemsFromWarehouse[itemName];
        }
      }
    }
    if (!isEmpty(itemsFromWarehouse)) {
      result.push({ [warehouseName]: itemsFromWarehouse });
    }
  }
  for (let item in shipments) {
    if (shipments[item] > 0) return [];
  }
  return result;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = cheapestShipment;
