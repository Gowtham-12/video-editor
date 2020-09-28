var express = require('express')
var path = require('path')
var cloud = require('./cloud')
var hbs = require('hbs');
var fs = require('fs')
const bodyParser = require('body-parser')
const expressfileUpload = require('express-fileupload')

var app = express()

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(
  expressfileUpload({
    useTempFiles: true,
    tempFileDir: "../tmp/"
  })
);

app.use(express.static(path.join(__dirname,"../public")))

app.set('view engine','hbs')
app.set('views', path.join(__dirname,"../views"))
hbs.registerPartials(path.join(__dirname,"../views/partials"), function (err) { });

app.get("",(req,res)=>{
    res.render("start")
})

app.post("/upload", (req,res)=> {
  let file = req.files.file
  file.mv("../tmp/" + file.name, function (err) {
    if (err) { return res.sendStatus(500).send(err); }
    console.log("File Uploaded successfully");
    cloud.uploadToCloud(file.name, (url,public_id)=>{
      fs.unlink("../tmp/" + file.name, () => {
        console.log("Removed tmp file from server "+ file.name)
      })
      res.send({url , public_id})
    });   
  });
})

app.listen(process.env.PORT || 3000,()=> console.log("listening"))