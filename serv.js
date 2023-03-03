const fs =require('node:fs/promises')
const path=require('node:path')

const dbPath =path.join(process.cwd(), 'dataBase','users.json')

//функція яка читає файл
const reader=async()=>{
    const buffer= await fs.readFile(dbPath)
    const data= buffer.toString()
    return data? JSON.parse(data): []
};
//функція яка записувати в файл
const writer = async(user) =>{
    await fs.writeFile(dbPath, JSON.stringify(user))
};
module.exports={
    reader,
    writer
}