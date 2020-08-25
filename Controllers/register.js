
const handleRegister = (req,res,bcrypt,db)=>{
    const {name, email, password} = req.body;
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}$/;
    const validName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if(!email || !name || !password){
        return res.status(400).json('Incorrect form submission')
    }
    else if(!name.match(validName))
    {
        return res.status(400).json("Incorrect Name Formate")
    }
    else if(!email.match(validEmail)){
        return res.status(400).json("Incorrect Email Formate")
    }
    else if(!password.match(validPassword))
        {
            return res.status(400).json("Incorrect Password Formate")
        }
   
    
    const hash = bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx('login').insert({
            hash: hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
        return trx('users')
            .returning('*')
            .insert({
                name: name,
                email:email,
                joined: new Date()
            })
            .then(user=>{
                res.json(user[0])
            })
        })
        .then(trx.commit).catch(trx.rollback)
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json('Unable to register')
        })
    
}
module.exports={
    handleRegister:handleRegister
}