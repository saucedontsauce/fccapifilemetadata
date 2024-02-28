const express = require('express');
const cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const multer = require('multer')
const upload = multer({ dest: "/uploads" })


var app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ "extended": true }))


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single("upfile"), (req, res) => {
  let rdata = {
    "name": "",
    "type": "",
    "size": ""
  }
  if (req.file) {
    rdata.name = req.file.originalname
    rdata.size = req.file.size
    rdata.type = req.file.mimetype
  } else {
    rdata = { "error": "No file Submitted" }
  }

  res.json(rdata)
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
