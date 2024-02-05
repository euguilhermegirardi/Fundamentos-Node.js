export class DataBase {
  database = {}

  select(table) {
    const data = this.database[table] ?? []
    return data
  }

  insert(table, data) {
    // It first checks if the table already exists in the database.
    if(Array.isArray(this.database[table])) {
      this.database[table].push(data)
    } else {
      // If the table doesn't exist, it creates a new array with the provided data and assigns it to the table in the database.
      this.database[table] = [data]
    }

    return data
  }
}