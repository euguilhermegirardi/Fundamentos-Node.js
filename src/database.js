import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class DataBase {
  #database = {}

  // "constructor" initiates as soon as the database is called
  // 'utf-8' = encoding
  constructor() {
    fs.readFile(databasePath, 'utf-8').then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }


  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []
    return data
  }

  insert(table, data) {
    // It first checks if the table already exists in the database.
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      // If the table doesn't exist, it creates a new array with the provided data and assigns it to the table in the database.
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }
}