import { getConnection } from "../database/connection.js";

export const getWastes = (req, res) => {
  console.log(`Obteniendo residuos...`);
  const db = getConnection();
  const query = `
                SELECT
                  w.date,
                  w.waste_id,
                  wt.waste_type_name ,
                  w.quantity ,
                  w.weight ,
                  st.storage_type_name ,
                  w.description                   
                FROM
                  wastes w
                INNER JOIN waste_types wt ON w.waste_type_id=wt.waste_type_id
                INNER JOIN storage_types st ON w.storage_type_id=st.storage_type_id;
                `;

  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(`Residuos obtenidos correctamente.`);
    return res.json(rows).status(200);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
};

export const getWaste = (req, res) => {
  const db = getConnection();
  const query = `
                SELECT
                  w.date,
                  w.waste_id,
                  wt.waste_type_name ,
                  w.quantity ,
                  w.weight ,
                  st.storage_type_name ,
                  w.description                   
                FROM
                  wastes w
                INNER JOIN waste_types wt ON w.waste_type_id=wt.waste_type_id
                INNER JOIN storage_types st ON w.storage_type_id=st.storage_type_id
                WHERE w.waste_id= ?;
                `;

  db.get(query, req.params.id, function (err, row) {
    if (err) console.error(err.message);
    if (!row) {
      return res.status(404).json({ message: "Residuo no encontrado." });
    }
    return res.json(row).status(200);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
};

export const createWaste = (req, res) => {
  console.log(`Creando un residuo...`);
  const db = getConnection();
  const { waste_type_id, quantity, weight, storage_type_id, description } =
    req.body;
  const query = `INSERT INTO wastes (waste_type_id,quantity,weight,storage_type_id,description,date) VALUES (?,?,?,?,?,DATE('now'))`;

  db.run(
    query,
    [waste_type_id, quantity, weight, storage_type_id, description],
    function (err) {
      if (err) console.error(err.message);
      return res
        .json({
          id: this.lastID,
          waste_type_id,
          quantity,
          weight,
          storage_type_id,
          description,
        })
        .status(200);
    }
  );

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
};

export const updateWaste = (req, res) => {
  const id = req.params.id
  const data = req.body
  //revisar body

  const columns = Object.keys(data).join()
  const values = Object.values(data)
  const placeholders = values.map(value => '?').join()
  
  

  const query= `UPDATE wastes SET (${columns}) = (${placeholders}) WHERE waste_id=?`

  console.log('query', query)
  const db = getConnection();

  db.run(query, [...values, id], function (err) {
    if (err) console.error(err.message);
    if (this.changes > 0) {
      console.log(`Se actualizó el desperdicio con ID ${req.params.id}. \nNueva información: ${JSON.stringify(data)}`);
      return res.json({
        message: `Se actualizó el desperdicio con ID ${req.params.id}. `, 'new data': data
      });
    } else {
      console.log(`No se encontró el desperdicio con ID ${req.params.id}`);
      return res.json({
        message: `No se encontró el desperdicio con ID ${req.params.id}`,
      });
    }
  })
  
};

export const deleteWaste = (req, res) => {
  const db = getConnection();
  const query = `DELETE FROM wastes WHERE waste_id= ?;`;
  db.run(query, req.params.id, function (err) {
    if (err) console.error(err.message);
    if (this.changes > 0) {
      console.log(`Se eliminó el desperdicio con ID ${req.params.id}`);
      return res.json({
        message: `Se eliminó el desperdicio con ID ${req.params.id}`,
      });
    } else {
      console.log(`No se encontró el desperdicio con ID ${req.params.id}`);
      return res.json({
        message: `No se encontró el desperdicio con ID ${req.params.id}`,
      });
    }
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
};
