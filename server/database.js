import dotenv from 'dotenv';
import {neon} from '@neondatabase/serverless';
dotenv.config();





console.log(process.env.DATABASE_URL);
const sql = neon(process.env.DATABASE_URL);
 
 async function testFunc(userid) {
  const result = await sql`SELECT index from recipes_table WHERE user_id=${userid}`
  
  return result.length;
};




async function saveToMyList(userid,name,ingredients, recipe){
  
  let counter =await testFunc(userid);
  if(counter<5){
  
    
  const result = await sql`INSERT INTO recipes_table (index,user_id,recipe_name,ingredients,recipe) VALUES (${counter+1},${userid},${name},${ingredients},${recipe})`;
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
  const result =await sql`SELECT * FROM users_table WHERE username= ${username} AND passwords=${password}`;
  if(result.length>0){
     let obj= {status : 404,error: "SAME NAME OR PASSWORD"};
     
     return obj;
  }

  else{
    const num=await sql`SELECT COUNT(user_id) FROM USERS_TABLE`;
    
    const insertres=await sql`INSERT INTO users_table(user_id,username,passwords) VALUES(${parseInt(num[0].count)+1},${username} , ${password})`;
    
    let obj= {status : 202, user_id: parseInt(num[0].count)+1};
    return obj;
  }

}

async function findUser(username,password) {
  const result =await sql`SELECT * FROM users_table WHERE username= ${username} AND passwords=${password}`;
  if(result.length===0){
    let obj= {status : 404,error: "WRONG USER OR PASSWORD"};
    
    return obj;
 }
 else{
  let obj= {status : 202, user_id: result[0].user_id};
    return obj;
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