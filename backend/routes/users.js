const express = require("express");
const router = express.Router();

const User = require("../models").user;
const Article = require("../models").articles;
const model = require("../models").sequelize;

/* GET users listing. */
// router.get("/", async (req, res, next) => {
//   // const result = await User.findAll();
//   // res.json(result);

//   // const [result] = await model.query(`select * from users`);
//   // let a = "";
//   // for (const iterator of result) {
//   //   a += iterator.name + "<br>";
//   // }
//   // res.send(a);

//   const sql = 'select * from users where id = ?'
//   const result = await model.query(sql,{
//     replacements: [1],
//     type: model.QueryTypes.SELECT
//   })
//   res.json(result)

// });

// /* GET users listing by id. */
// router.get("/:id", async (req, res, next) => {
//   // const result = await User.findOne({
//   //   where : 1
//   // });
//   // res.json(result);

//   const [result, meta] = await model.query(`select * from users where id = ${req.params.id}`)
//   res.json(result)
// });

router.post("/login", async (req, res, next) => {
  // console.log(req.body)

  if (req.body.username === 'putra' && req.body.password === 'secret') {
    res.json({
      message: 'Sukses'
    })
  } else {
    res.status(401).json({
      message: 'Gagal'
    })
  }
  // res.json(result);
});


router.get("/", async (req, res, next) => {
  const result = await User.findAll({
    include: Article
  });
  res.json(result);
});

router.post("/", async (req, res, next) => {
  //RAW QUERY
  const sql =
    "INSERT INTO users (name, email, password, created_at, updated_at) VALUES(?,?,?,?,?) RETURNING *";
  const [[result]] = await model.query(sql, {
    replacements: [
      req.body.name,
      req.body.email,
      req.body.password,
      new Date(),
      new Date()
    ],
    type: model.QueryTypes.INSERT,
  });

  console.log(result.email)

  //ORM Sequelize
  // const result = await User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   created_at: new Date,
  //   updated_at: new Date
  // })
  res.json(sql)
});

//Menggunakan res.render() jika di backend terdapat view
//jika tidak ada bisa menggunakan res.json()

module.exports = router;


