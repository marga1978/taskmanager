const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer  = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router();

router.post("/users", async (req, res) => {
  console.log(req.body);
  try {
    const user = new User(req.body);
    sendWelcomeEmail(user.email, user.name)
    const token=await user.generateAuthToken()
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/users/login', async (req, res) => {
  try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.send({ user, token })
      //res.send({ user:user.getPublicProfile(), token })
  } catch (e) {
      res.status(400).send(e.message)
  }
})

// router.get("/users", auth, async (req, res) => {
//   try {
//     const users = await User.find({}).exec();
//     res.send(users);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

router.get("/users/me", auth, async (req, res) => {
  res.status(200).send(req.user)
});

router.post('/users/logout', auth, async (req, res) => {
  try {
      console.log("req.user",req.user)
      req.user.tokens = req.user.tokens.filter((token) => {
          return token.token !== req.token
      })
      await req.user.save()

      res.status(200).send(req.user)
  } catch (e) {
      res.status(500).send({e})
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
      req.user.tokens = []
      await req.user.save()
      res.status(200).send(req.user)
  } catch (e) {
      res.status(500).send()
  }
})

router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const user = await User.findById(_id).exec();
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/users/me", auth, async (req, res) => {
//router.patch("/users/:id", async (req, res) => {
  try {
    //Ottengo le chiavi dell'oggetto
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ["name", "email", "password", "age"];
    //every torna true se tutti gli elementi soddisfano i requisiti
    //se tutti gli elementi dell'array updates (sono le proprietà) sono contenuti nell'array
    //allowedUpdates ritorna true
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation)
      return res.status(404).send({ Error: "Invalid updates!" });

    //const _id = req.params.id;
    //const user=await User.findByIdAndUpdate(_id, {name:'nuovonome'});
    //terzo parametro è option:
    //new: true --> restituirà il nuovo utente dopo l'aggiormaneto rispetto quello che è stato trovato
    //prima dell'aggiornamento
    //runValidators: true dice di eseguire i validatori
    //se

    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    // const user = await User.findById(_id);
    // if (!user) return res.status(404).send();
    updates.forEach(prop => req.user[prop]=req.body[prop]);
    const resUser=await req.user.save();
    res.send(resUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//router.delete("/users/:id", async (req, res) => {
router.delete("/users/me", auth, async (req, res) => {
  try {
    //const _id = req.params.id;//req.param.id non esiste più perchè il middleware torna req.user
    //const _id=req.user._id;
    // const user = await User.findByIdAndDelete(_id); //non occorre recuepare l'utente perchè già arriva dal middleware
    // if (!user) return res.status(404).send();
    await req.user.deleteOne()
    sendCancelationEmail(req.user.email, req.user.name)
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const upload = multer({
  //dest: 'avatars',
  limits: {
      fileSize: 1000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please upload an image'))
      }

      cb(undefined, true)
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  try{
    
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save();
    res.send()
  }catch(e){
    res.status(500).send({ error: e.message })
  }
  
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})


router.delete('/users/me/avatar', auth, async (req, res) => {
  try{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
  }catch(e){
    res.status(500).send({ error: e.message })
  }
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
      const user = await User.findById(req.params.id)

      if (!user || !user.avatar) {
          throw new Error()
      }

      res.set('Content-Type', 'image/png')
      res.send(user.avatar)
  } catch (e) {
      res.status(404).send()
  }
})



module.exports = router;
