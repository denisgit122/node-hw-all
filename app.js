// const {sayHello} = require('./help')
// sayHello()

const path = require('path');

const fs = require('fs')

// fs.writeFile(path.join('test','test1.txt'),'helooo',(err)=>{
//     if (err) throw  new Error(err.message)
// })

// fs.mkdir(path.join( 'test2'),(err)=>{
//         if (err) throw new Error(err.message)
// })

// fs.mkdir(path.join( 'test2','derect1'),(err)=>{
//         if (err) throw new Error(err.message)
// })

// fs.stat(path.join('test2'),(err,stats)=>{
//         if (err) throw new Error()
//         console.log(stats.isFile());
// })
// fs.stat(path.join('test2','derect1'),(err,stats)=>{
//         if (err) throw new Error()
//         console.log(stats.isFile());
// // })
// fs.writeFile(path.join('test2','derect1','derect1.txt'),'hello',(err)=>{
//         if (err) throw new Error()
// })
// fs.writeFile(path.join('test2','derect2','derect2.txt'),'bye',(err)=>{
//         if (err) throw new Error()
// })
// fs.writeFile(path.join('test2','derect3','derect3.txt'),'bye',(err)=>{
//         if (err) throw new Error()
// })

// fs.stat(path.join('test2','derect1'),(err,stats)=>{
//         if (err) throw new Error()
//         console.log(stats.isFile());
// })
fs.truncate(path.join('test2','derect3','derect3.txt'),(err)=>{
        if (err) throw new Error()
})
fs.unlink(path.join('test2','derect3','derect3.txt'),(err)=>{
        if (err) throw new Error()
})
