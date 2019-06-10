const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const UserRouter = require('./users/userRouter.js')
const AuthRouter = require('./auth/auth-router.js')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/',(req,res) => {
    res.send('I am screaming from port 4000')
});

server.use('/api/users',UserRouter)
server.use('/api/auth',AuthRouter)

const port = process.env.PORT || 4000

server.listen(port, ()=>{
    console.log('API running at port 4000')
})