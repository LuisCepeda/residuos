import { getConnection } from "./connection.js";

const db = getConnection();

db.serialize(() => {
  //drop
  db.run(
    `
    DROP TABLE IF EXISTS waste_types;
    `,
    [],
    (err) => {
      if (err) return console.error(err.message);
      console.log(`Table waste_types dropped successfully.`);
    }
  );
  db.run(
    `
    DROP TABLE IF EXISTS storage_types;
    `,
    [],
    (err) => {
      if (err) return console.error(err.message);
      console.log(`Table storage_types dropped successfully.`);
    }
  );
  db.run(
    `
    DROP TABLE IF EXISTS wastes;
    `,
    [],
    (err) => {
      if (err) return console.error(err.message);
      console.log(`Table wastes dropped successfully.`);
      console.log("\nDatabase cleared successfully\n");
    }
  );

  //create table storage types
  db.run(
    `
    CREATE TABLE IF NOT EXISTS storage_types (
    storage_type_id INTEGER PRIMARY KEY ASC AUTOINCREMENT,
    storage_type_name TEXT,
    storage_type_description TEXT
    );
    `,
    [],
    (err) => {
      if (err) return console.error(err.message);
      console.log(`Table storage_types created successfully.`);
    }
  );
  //populate table storage types
  db.run(
    `
    INSERT INTO storage_types (storage_type_name)
    VALUES ('Bolsa Plástica'),('Recipiente'),('Bolsa Biodegradable'), ('Otro');
    `,
    [],
    (err) => {
      if (err) return console.error(err.message);
      console.log(`Table storage_types populated successfully.`);
    }
  );

  //create table waste types
  db.run(
    `
    CREATE TABLE IF NOT EXISTS waste_types (
    waste_type_id INTEGER PRIMARY KEY ASC AUTOINCREMENT,
    waste_type_name TEXT,
    waste_type_description TEXT
    );
    `,
    [],
    (err) => {
      if (err) return console.error(err.message);
      console.log(`Table waste_types created successfully.`);
    }
  );
  //populate table waste types
  db.run(
    `
    INSERT INTO waste_types (waste_type_name)
    VALUES ('Orgánico'),('Inorgánico'),('Peligroso'),('Reciclable');
    `,
    [],
    (err) => {
      if (err) return console.error(err.message);
      console.log(`Table waste_types populated successfully.`);
    }
  );

  //create table wastes
  db.run(
    `
    CREATE TABLE IF NOT EXISTS wastes (
    waste_id INTEGER PRIMARY KEY ASC AUTOINCREMENT,
    waste_type_id INTEGER,
    quantity REAL,
    weight REAL,
    storage_type_id INTEGER,
    description TEXT,
    date TEXT,
    FOREIGN KEY(waste_type_id) REFERENCES waste_types(waste_type_id),
    FOREIGN KEY(storage_type_id) REFERENCES storage_types(storage_type_id)
    );
    `,
    [],
    (err) => {
      if (err) return console.error(err.message);
      console.log(`Table wastes created successfully.`);
      console.log("\nDatabase created and populated successfully.\n");
    }
  );
});

db.close();
