const handleSignin =(req,res,bcrypt,db)=>{
    const {email, password} = req.body;
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}$/;
    if(!email || !password){
        return res.status(400).json('Incorrect form submission')
    }else if(!email.match(validEmail)){
        return res.status(400).json("Incorrect Email Formate")
    }
    else if(!password.match(validPassword))
        {
            return res.status(400).json("Incorrect Password Formate")
        }
    
    db('login').select('email','hash').where('email','=',email)
    .then(data=>{
            const isValid = bcrypt.compareSync(password,data[0].hash);
            if(isValid){
                return db.select('*').from('users').
                where('email','=',email)
                .then(user=>{
                    res.status(200).json(user[0]);
                })
                .catch(err=>res.status(400).json('Unable to get user'))
            }else{
                res.status(400).send('Wrong Credentials')
            }
    }).catch(err=>res.status(400).json('WWrong Credentials'))

}
    module.exports={
        handleSignin:handleSignin
    }