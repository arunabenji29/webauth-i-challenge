const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const UserRouter = require('./users/userRouter.js')
const AuthRouter = require('./auth/auth-router.js')

const server = express();

const sessionConfig = {
    name:'elephant',
    secret:'i am leaving it safe in your hands',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge: 1000 * 60 * 15,
        secure:false,
        httpOnly:true,
    },
    store: new KnexSessionStore({
        knex:require('./database/dbConfig.js'),
        tablename:'sessions',
        sidfieldname:'sid',
        createtable:true,
        clearInterval: 1000 * 60 * 30,
    }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.get('/',(req,res) => {
    res.send('I am screaming from port 4000')
});

server.use('/api/users',UserRouter)
server.use('/api/auth',AuthRouter)

const port = process.env.PORT || 4000

server.listen(port, ()=>{
    console.log('API running at port 4000')
})