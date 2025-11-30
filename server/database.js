import dotenv from 'dotenv';
import {neon} from '@neondatabase/serverless';
import bcrypt from 'bcrypt';



const saltRounds = 10; 

dotenv.config();


const sql = neon(`${process.env.DATABASE_URL}`);
 
 async function testFunc(userid) {
  const result = await sql`SELECT COUNT(index) from recipes_table WHERE user_id=${userid}`
  
  return result.length;
};




async function saveToMyList(userid,name,ingredients, recipe){
  
  let counter =await testFunc(userid);
  if(counter<5){
  
    
  const result = await sql`INSERT INTO recipes_table (user_id,recipe_name,ingredients,recipe) VALUES (${userid},${name},${ingredients},${recipe})`;
  console.log(result);
  let obj= {status : 202,message: "INSERTED"};
  return obj;
  }
  else{
    let obj= {status : 404,error: "Size limit exceeded"};
    return obj;
  }

};




async function createUser(username, password) {
  const existingUser = await sql`SELECT * FROM users_table WHERE username = ${username}`;

  if (existingUser.length > 0) {
  
    return { status: 404, error: "USERNAME ALREADY EXISTS" };
  } else {
  
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    
    const num = await sql`SELECT COUNT(user_id) FROM users_table`;
    const newUserId = parseInt(num[0].count) + 1;


    const insertres = await sql`
      INSERT INTO users_table(user_id, username, passwords)
      VALUES(${newUserId}, ${username}, ${hashedPassword})
    `;

    return { status: 202, user_id: newUserId }; 
  }
}



async function findUser(username, password) {
  
  const result = await sql`SELECT user_id, passwords FROM users_table WHERE username = ${username}`;

  if (result.length === 0) {
    
    return { status: 404, error: "WRONG USERNAME OR PASSWORD" };
  }

  const storedHash = result[0].passwords;
  const userId = result[0].user_id;

  
  const match = await bcrypt.compare(password, storedHash);

  if (match) {
  
    return { status: 202, user_id: userId }; 
  } else {
  
    return { status: 404, error: "WRONG USERNAME OR PASSWORD" }; 
  }
}

async function deleteEntry(index,user_id) {
  const result =await sql`DELETE FROM recipes_table WHERE index= ${index} AND user_id=${user_id}`;
  
  let obj= {status : 202, message: "DELETED"};
  
  return obj;
}

async function fetchAll(user_id) {
  const result =await sql`SELECT index,recipe_name,ingredients,recipe FROM recipes_table WHERE  user_id=${user_id}`;
  
  let obj= {status : 202, message: result};
  
  return obj;
}

export {saveToMyList,createUser,findUser,deleteEntry,fetchAll};