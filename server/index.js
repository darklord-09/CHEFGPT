import express from 'express'
import { query } from './suggest.js';
import { saveToMyList, createUser, findUser, deleteEntry, fetchAll } from './database.js';
import cors from 'cors';
import dotenv from 'dotenv';
const app= express();

dotenv.config();
// app.use(cors({
//   origin: [
//     'https://ogchefgptclient.vercel.app',
//     'https://ogchefgptclient-chirag-nandas-projects-2b2a0883.vercel.app'
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
  res.send('Hello');
});

app.post('/', (req,res)=>{
  let user_id=req.body.userid;
  fetchAll(user_id).then((r)=>{if(r.status===202){res.send(r.message)}}).catch(err=>{res.send(err)});
});

app.post('/ingredients', (req,result)=>{
   let commandString="What dishes can we make with ";
   req.body.ingredients.forEach((item)=>{commandString+=item; commandString+=", "});
   commandString+="?";
   query({"inputs" : commandString}).then(res=>{
    result.send(res[0].generated_text)});
});

app.post('/recipe', (req,result)=>{
  let commandString="How to make ";
   commandString+=req.body.name;
   commandString+="?";
   console.log(req.body.name);
   
  query({"inputs": commandString}).then(res=>{result.send(res[0].generated_text)});
});

app.post('/store',(req,result)=>{
  let userid=req.body.userid;
  let name=req.body.name;
  let recipe=req.body.recipes;
  let ingredient=req.body.ingredients;
  saveToMyList(userid,name,ingredient,recipe).then(res=>{result.send(res);}).catch(err=>{result.send(err)});
});

app.post('/delete',(req,result)=>{
  let userid=req.body.userid;
  let index=req.body.index;
  
  deleteEntry(index,userid).then(res=>{result.send(res);}).catch(err=>{result.send(err)});
});

app.post('/createUser',(req,result)=>{
  let username=req.body.username;
  let password=req.body.password;
   createUser(username,password).then((res)=>{result.send(res);
  }
  );
})

app.post('/findUser',(req,result)=>{
  let username=req.body.username;
  let password=req.body.password;
   findUser(username,password).then((res)=>{result.send(res);
  }
  );
})

const PORT = process.env.PORT||3000

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
  
});




