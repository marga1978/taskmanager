const express = require("express");
const multer  = require('multer')
require('./db/mongoose');
const userRouters=require('./routers/user');
const taskRouters=require('./routers/task');
const User=require('./models/user');
const Task=require('./models/task');

const app = express();
//const port=process.env.port || 3000;
const port=process.env.PORT;




//cartella destinazione immagini
const upload = multer({
  dest: 'images',
  limits: {
      fileSize: 1000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(doc|docx)$/)) {
          return cb(new Error('Please upload a Word document'))
      }

      cb(undefined, true)
  }
})

//end point (il campo che è arriva è upload)
app.post('/upload', upload.single('upload'), (req, res) => {
  
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    //console.log(req.file, req.body)
    res.status(200).send({upload:1})
  
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})


app.use(express.json());
app.use(userRouters)
app.use(taskRouters)

app.listen(port, () => {
  console.log("server is up on port "+port);
});

// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('red12345!', hashedPassword)
//     console.log(isMatch)
// }
// myFunction()

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     //token che ritorna dal login
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction()



// const main = async () => {
//     // const task = await Task.findById('5c2e505a3253e18a43e612e6')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('654276158f954f620c0e2c46')
//     await user.populate('tasks')
//     // await user.populate('tasks').exec(function (err, tasks) {
//     //   if (err) {
//     //       res.status(500).send(err)
//     //   }
//     //   res.status(200).send(departments)
//     // });
//     console.log(user.tasks)
// }

// main()