import sqlite3 from "sqlite3";
import path from "node:path";
import process from "node:process";

//const dbDirName = process.cwd();
const dbDirName = "../../";
const dbName = "wastes.db";
//const dbPath = path.join(dbDirName, dbName);
const dbPath = dbDirName.concat("", dbName);

const dbSettings = {
  dbDirName,
  dbName,
  dbPath,
};

export const getConnection = () => {
  const db = new sqlite3.Database(
    "./wastes.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Connected with ${dbSettings.dbName}\n`);
    }
  );
  return db;
};
