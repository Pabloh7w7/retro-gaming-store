"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
async function testConnection() {
    try {
        const conn = await db_1.pool.getConnection();
        const rows = await conn.query('SELECT 1 AS test');
        console.log('Conexión exitosa:', rows);
        conn.release();
    }
    catch (err) {
        console.error('Error de conexión:', err);
    }
}
testConnection();
//# sourceMappingURL=test-db.js.map