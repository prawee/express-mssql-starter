const express = require("express");
const router = express.Router();
const config = require("../config/db");
const sql = require("mssql");

const executeQuery = async (res, query) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(query);
    let resp = {
      recordTotal: result.recordset.length,
      data: result.recordset
    };
    res.send(resp);
    sql.close();
  } catch (err) {
    console.log(err);
    next(err);
    sql.close();
  }
};

router.get("/", async (req, res) => {
  let query = `select * from REGISTRATION`;
  executeQuery(res, query);
});

module.exports = router;
