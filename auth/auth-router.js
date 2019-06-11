const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model.js');

router.post('/register',(req,res) => {
    let user = req.body

    const hash = bcrypt.hashSync(user.password,8);

    user.password = hash;
    console.log('registered user ',user)

    Users.add(user)
    .then(save => {
        if(save)
        {res.status(201).json(save);}
        else{
            res.status(404).json({message:'user could not be registered'})
        }
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.username = user.username;
          res.status(200).json({ message: `Welcome ${user.username}!, have a cookie!` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.delete('/', (Req,res)=>{
    if(req.session){
      req.session.destroy();
    }
    res.status(200).json({message : 'you are successfully logged out'});
  })
module.exports = router