import { Pool } from "pg";

//string de conexão (ainda não cofigurei variáveis de ambiente)
const connectionString = "postgres://DB_USER:DB_PASS@DB_HOST:DB_PORT/DB_NAME";

const db = new Pool({ connectionString });

export default db;
