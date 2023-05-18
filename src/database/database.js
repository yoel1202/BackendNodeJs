import mysql from "mysql";
import config from "./../config";

const connection = mysql.createPool({
  connectionLimit : 2,
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password
});

const sqlSentences = async (query) => {
  const con=getConnection()
return new Promise((resolve, reject) => {
  con.query(query, (err, result) => {
    if (err) {
        return reject(err);
    }
    resolve(result);
})
})
  
};

const getConnection = () => {
  return connection;
};



export const methods = {
  getConnection,
  sqlSentences
};
