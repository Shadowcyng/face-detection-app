const express = require('express');
const   bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/register')
const signin = require('./Controllers/signin')
const profile = require('./Controllers/profile')
const image = require('./Controllers/image')

const db = knex({
client:'pg',
connection:{
    host:'localhost',
    user:'postgres',
    password:'Shadowcyng@123',
    database:'face'
    }
        })
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());
        app.get('/',(req,res)=>{res.json('data')});
        app.post('/signin',(req,res)=>signin.handleSignin(req,res,bcrypt,db));
        app.post('/register',(req,res)=>register.handleRegister(req,res,bcrypt,db));
        app.get('/profile/:id',(req,res) => profile.getProfile(req,res,db));
        app.put('/image',(req,res) => image.handleImage(req,res,db));
        app.post('/imageAPI',(req,res) => image.handleApiCall(req,res));

        app.listen(3000, ()=>{
            console.log('app is running on port 3000');
        })

