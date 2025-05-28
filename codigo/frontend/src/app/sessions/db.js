import  dotenv  from "dotenv";
import  {Pool}  from "pg";

dotenv.config();

// Configuração do banco de dados
const pool = new Pool({
    user:process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

//Método execute e queryOne são o mesmo. Mas coloquei para seguir a documentação do luci auth
db = {
        execute: async (query,params) =>{
            const client = await pool.connect();
            try { 
                const res = await client.query(query,params);
                return res.rows;
            }catch(err){
                console.log("Erro ao executar a query:", err);
                throw err;
            }finally{
                client.release();
            }
        },


        queryOne: async (query, params) => {
              const client = await pool.connect();
            try { 
                const res = await client.query(query,params);
                return res.rows;
            }catch(err){
                console.log("Erro ao executar a query:", err);
                throw err;
            }finally{
                client.release();
            }
        }
};

export default db;