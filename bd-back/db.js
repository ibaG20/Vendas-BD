/* 
import { Pool } from 'pg';

const pools = {
  normal: new Pool({
    host: "localhost",
    user: "normal_user",
    password: "normal_password",
    database: "mydb"
  }),
  admin: new Pool({
    host: "localhost",
    user: "admin_user",
    password: "admin_password",
    database: "mydb"
  })
};

export const db = {
  normal: pools.normal,
  admin: pools.admin
};
 */


/* import pkg from 'pg';
const { Client } = pkg;

export const db = new Client({
    host: "localhost",
    user: "administrador",
    password: "root", 
    database: "attdb2" 
});

db.connect();  */

import pkg from 'pg';
const { Client } = pkg;

export const db = {
    host: "localhost",
    user: "postgres",
    password: "root", 
    database: "banco-vendas" 
};
//db.connect();