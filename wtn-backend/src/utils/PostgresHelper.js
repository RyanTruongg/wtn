// Get non-undefined keys of data
const getKeys = (data) => {
  const keys = Object.keys(data).filter((k) => data[k] !== undefined);

  return keys;
};

// Get value from non-undefined keys
const getValues = (data, keys) => {
  const values = keys.map((k) => {
    const timeKeys = ["start_time", "end_time"];
    if (timeKeys.includes(k)) {
      return new Date(data[k]);
    }
    return data[k];
  });

  return values;
};

class PostgresHelper {
  // This function used to create INSERT query string
  static createInsert(table, data) {
    if (!table || typeof table !== "string") {
      throw new TypeError("Parameter 'table' must be a non-empty string.");
    }
    if (!data || typeof data !== "object") {
      throw new TypeError("Parameter 'data' must be an object.");
    }

    const keys = getKeys(data);
    const values = getValues(data, keys);

    // Generate $i columns
    const valueColumns = Array.from({ length: keys.length }, (_, i) => `$${i + 1}`);

    const queryString = `
        INSERT INTO ${table}(${keys.join(", ")}) 
        VALUES(${valueColumns.join(", ")}) 
        RETURNING *
    `;

    return { queryString, values };
  }

  // This function used to create UPDATE query string
  static createUpdate(table, id, data) {
    if (!table || typeof table !== "string") {
      throw new TypeError("Parameter 'table' must be a non-empty string.");
    }
    if (!data || typeof data !== "object") {
      throw new TypeError("Parameter 'data' must be an object.");
    }

    const keys = getKeys(data);

    // From keys map to column name in Postgresql
    const names = keys.map((k, index) => `${k} = $${index + 2}`).join(", ");

    const values = getValues(data, keys);

    let idColumn = "id";
    switch (true) {
      case table.includes("student"):
      case table.includes("staff"):
        idColumn = "user_id";
        break;

      case table.includes("voucher"):
        idColumn = "code";
        break;

      default:
        idColumn = "id";
    }

    const queryString = `
        UPDATE ${table} 
        SET ${names} 
        WHERE ${idColumn} = $1 
        RETURNING *
    `;

    return { queryString, values: [id, ...values] };
  }
}

export default PostgresHelper;
