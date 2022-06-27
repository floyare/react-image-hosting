const express = require('express')
const app = express()
var fileupload = require('express-fileupload');
const cors = require('cors')
const fs = require('fs');
const port = 4000

app.use(cors());
app.use(fileupload());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

app.delete('/delete/:path', (req, res) => {
  const file = "../public/images/" + req.params.path;
  fs.unlinkSync(file, function(){
    res.status(200).send({
      code: 1,
      message: `File deleted`
    })
  })
})

app.post('/upload', (req, res) => {
  if(!req.files){
    console.log("no files");
    res.status(400).send({
        code: 2,
        message: `File not found`,
    })
    return;
  }


  const file = req.files.file;
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(file.name)[1];

  if(!"png,jpg,jpeg,webp,jfif".includes(ext)){
    res.status(400).send({
      code: 2,
      message: `Wrong file type`,
    })
  }
  // if(File.exists(`../public/images/${crypto.randomBytes(16).toString('hex') + "." + ext}`)){
  //   res.status(400).send({
  //     code: 2,
  //     message: `File already exists`,
  //   })
  // }
  const uname = makeid(14) + "." + ext;
  const path = `../public/images/${uname}`;
  file.mv(path, function (err){
    if(err){
      console.log(err);
      res.status(500).send({
        code: 2,
        message: `Error`,
      })
      return;
    }
    res.status(200).send({
      code: 1,
      message: `Upload success`,
      path: uname
    })
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})