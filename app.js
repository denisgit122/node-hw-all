const express=require('express')
const app=express()
const fsServ =require('./serv')
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/user', async (req,res)=>{
  const users = await fsServ.reader()
    res.json(users)
})
app.post('/user', async (req,res)=>{
   const { name, age,gender}= req.body;

    if (!name ||name.length < 2){
        res.status(400).json("wrong name ")
    }
    if (!age || !Number.isInteger(age)){
        res.status(400).json("wrong age ")
    }
    if (!gender || (gender !=='male'&& gender!=='female')){
        res.status(400).json("wrong gender ")
    }
    const users = await fsServ.reader();

    const newUser={
    id: users[users.length - 1]?.id + 1 || 1, name, age,gender};

    users.push(newUser)
    await fsServ.writer(users)

    res.status(200).json(newUser)

})

app.get('/user/:userId', async (req, res)=>{
    const {userId}=req.params

   const users=await fsServ.reader()
   const user=users.find((user)=>user.id=== +userId)
    if (!user){
        res.status(400).json(" user not fount")
    }

    res.json(user)
})


app.patch('/user/:userId', async (req,res)=>{
    const { name, age,gender}= req.body;
    const {userId}=req.params

    if (name && name.length < 2){
        res.status(400).json("wrong name ")
    }
    if (age && !Number.isInteger(age)){
        res.status(400).json("wrong age ")
    }
    if (gender && (gender !=='male'&& gender!=='female')){
        res.status(400).json("wrong gender ")
    }

    const users = await fsServ.reader();

    const index=users.findIndex((user)=>user.id === +userId)
    //виведиться тільки ід
    // const user=users.find((user)=>user.id===+userId)
    // знайшли весь обєкт юзера
if (index=== -1){
    res.status(422).json('dont')
}
    users[index]={ ...users[index], ...req.body}
    await fsServ.writer(users)
    res.status(200).json(users[index])

})


app.delete('/user/:userId',async (req, res)=>{
    const {userId} =req.params
    const users=await fsServ.reader()
    const index=users.findIndex((user)=>user.id === +userId)

    if (index=== -1){
        res.status(400).json('dont have')
    }
    users.splice(index,1)
    await fsServ.writer(users)

    res.sendStatus(204)
})

const PORT=5100
app.listen(PORT,()=>{
    console.log(`server ${PORT}`)
})