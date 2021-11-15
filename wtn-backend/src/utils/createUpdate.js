// Convert camel case to snake case
const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

// This function used to create UPDATE query string
const createUpdate = (table, id, data) => {
  if (!table || typeof table !== "string") {
    throw new TypeError("Parameter 'table' must be a non-empty string.");
  }
  if (!data || typeof data !== "object") {
    throw new TypeError("Parameter 'data' must be an object.");
  }

  // Get non-undefined keys of data
  const keys = Object.keys(data).filter((k) => data[k] !== undefined);

  // From keys map to column name in Postgresql
  const names = keys.map((k, index) => `${camelToSnakeCase(k)} = $${index + 2}`).join(", ");

  // Get value from non-undefined keys
  const values = keys.map((k) => data[k]);

  return {
    queryString: `UPDATE ${table} SET ${names} WHERE id = $1 RETURNING *`,
    values: [id, ...values],
  };
};

export default createUpdate;
