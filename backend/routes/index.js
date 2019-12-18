const express = require("express");
const router = express.Router();
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");
const util = require("util");
const mkdir = util.promisify(fs.mkdir);
const Queue = require("bull");
const csvParse = require("csv-parse/lib/sync");
const WebSocket = require("ws");
const Log = require("../models").log;

const model = require("../models").sequelize;

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/upload", async (req, res) => {
  if (req.files.file.length > 1) {
    req.files.file.map(items => {
      items.mv("uploads/" + items.name, err => {
        if (err) return res.status(500).send(err);
      });
    });
  } else {
    req.files.file.mv("uploads/" + req.files.file.name, err => {
      if (err) return res.status(500).send(err);
    });
  }
  res.json({
    message: "File has been uploaded!",
    data: req.files
  });
});

router.get("/download", function(req, res, next) {
  const uploadPath = path.resolve(__dirname, "../uploads");

  //sendFile cocok untuk embed file
  res.sendFile(uploadPath + "/sample.pdf");

  //download cocok untuk langsung download file
  // res.download(uploadPath + "/sample.pdf");
  console.log(uploadPath);
});

router.get("/download/:filename", async (req, res) => {
  // await mkdir('folder')

  res.sendFile(process.cwd() + "/uploads/" + req.params.filename);
});

router.get("/download-pdf", async (req, res) => {
  console.log("asup backend");
  res.download(process.cwd() + "/uploads/sample.pdf");
});

router.get("/preview-pdf", async (req, res) => {
  res.sendFile(process.cwd() + "/uploads/sample.pdf");
});

router.get("/mail-queue", async (req, res) => {
  const mailQueue = new Queue("mail queue");

  mailQueue.add({
    from: req.body.from || "mul14.net@gmail.com",
    to: req.body.to || "mul14.net@gmail.com",
    subject: req.body.subject || "Lorem ipsum",
    text: req.body.message || "Hello World!"
    // html: "<b>Hello world?</b>" // html body
  });
});

router.post("/sendmail", async function(req, res, next) {
  // console.log(req.body)

  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5be92a925bcb70",
      pass: "a929dae2c8daee"
    }
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: req.body.from || " <foo@example.com>", // sender address
    to: req.body.to || " baz@example.com", // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.message // plain text body
    // html: "<b>Hello woasdasrld?</b>" // html body
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.end();
});

router.get("/csv", async (req, res) => {
  const file = fs.readFileSync(process.cwd() + "/uploads/master_personil.csv");

  const csvContent = file.toString();

  const parsed = csvParse(csvContent);

  console.log(parsed);

  for (let i = 1; i < parsed.length; i++) {
    $sql =
      "INSERT INTO master_personil (npp, nama_lengkap, email_internet) VALUES (?, ?, ?)";
    const [[result]] = await sequelize.query($sql, {
      replacements: [parsed[i][0], parsed[i][1], parsed[i][21]],
      type: sequelize.QueryTypes.INSERT
    });

    console.log(result);
  }

  res.end();
});

router.get("/view-html", async (req, res) => {
  const html = `
    <div>NAMA ORANG: ME</div>
    <div>AGE: 322</div>
    <div>NAMA ORANG: ME</div>
    <div>NAMA ORANG: ME</div>
  `;
  res.send(html);
});

router.get("/create-pdf", async (req, res) => {
  const { spawn } = require("child_process");
  const pdf = spawn("/usr/local/bin/wkhtmltopdf", [
    "http://localhost:3001/view-html",
    process.cwd() + "/uploads/output" + Date.now() + ".pdf"
  ]);

  pdf.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });

  res.end();
});

//Real Time Notifications
router.post("/sendnotif", async (req, res) => {
  // const sql = "INSERT INTO logs (log, created_at, updated_at) VALUES(?,?,?)";
  // const [[result]] = await model.query(sql, {
  //   replacements: [
  //     req.body.message,
  //     new Date(),
  //     new Date()
  //   ],
  //   type: model.QueryTypes.INSERT
  // });
  // console.log(result)

  //REAL TIME INSERT DATA
  const ws = new WebSocket("ws:/localhost:8000");

  ws.on("open", function open() {
    const data = JSON.stringify({
      from: req.body.from,
      to: req.body.to,
      private: req.body.private,
      message: req.body.message
    });   
    ws.send(data);
  });

  const result = await Log.create({
    from: req.body.from,
    to: req.body.to,
    message: req.body.message,
    created_at: new Date,
    updated_at: new Date
  });
  // console.log(result)
  res.json(result);

  res.end();
});

module.exports = router;
