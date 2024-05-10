const connection=require('../module/module')

const db = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "Nav@gur1",
    database: "proj2",
  },
});

// to get all data
exports.getAllUsers=(req,res)=> {
  return db
    .select("*")
    .from("data")
    .then(rows => {
      res.send(rows)
    })

}

// to get data by id
exports.getbyID=((req,res)=>{
  const id=req.params.id
  return db
  .select('*')
  .from('data')
  .where('id', id)
  .then((rows=>{
    res.send(rows)
  }))
})

// to insert new data
exports.post=((req,res)=>{
  const data_={
    id:req.body.id,
    name:req.body.name,
    logo:req.body.logo,
    days_to_complete:req.body.days_to_complete,
    short_description:req.body.short_description,
    type:req.body.type

  }
  // console.log(data_)
  return db('data')
  .insert(data_)
  .then(() => console.log("DATA INSERTED"))
  .then((rows=>{
    res.send("DATA INSERTED")
  }))
});

// to update data by id
exports.putin=(async (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  return db('data')
  .where({id})
  .update(changes)
  .then(() => console.log("DATA UPDATED"))
  .then((rows=>{
    res.send("DATA UPDATED")
  }))
});

// to delet data by id
exports.delet=((req,res)=>{
  const {id}=req.params
  return  db('data')
  .where({ id: id })
  .del()
  .then(() => console.log("DATA DELETED"))
  .then((rows=>{
    res.send("DATA DELETED")
  }))
  
})


     











