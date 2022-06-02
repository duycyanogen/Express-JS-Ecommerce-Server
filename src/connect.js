const sql = require('mssql/msnodesqlv8');

const config = {
    server: "localhost",
    user: "sa",
    password: "123",
    database: "GUITARSHOP_HDV",
    driver: "msnodesqlv8"
};

const conn = new sql.ConnectionPool(config).connect().then(pool => {
    return pool;
});

module.exports = {
    conn: conn,
    sql: sql
}