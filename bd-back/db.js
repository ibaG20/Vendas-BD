

/* import pkg from 'pg';
const { Client } = pkg;

export const db = {
    host: "localhost",
    user: "ADMINISTRADOR",
    password: "root", 
    database: "postgres" 
}; */
//db.connect();

//------------------------------
import pkg from 'pg';
const { Client } = pkg;

export const dbAdmin = new Client({
    host: "localhost",
    user: "administrador",
    password: "root",
    database: "postgres"
});

export const dbUser = new Client({
    host: "localhost",
    user: "vendedor",
    password: "root",
    database: "postgres"
});

async function startApp() {
  try {
      await dbAdmin.connect();
      console.log('Connected as admin');

      // fazer consultas como admin...

      await dbUser.connect();
      console.log('Connected as user');

      // fazer consultas como usuário...
  } catch (err) {
      console.error('Connection error', err.stack);
  }
}

startApp();
