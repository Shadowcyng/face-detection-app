const getProfile = (req,res,db) => {
    const {id} =  req.params;
    db.select('*').from('users').where({id:id}).then(user=>{
        if(user.length){
            res.status(200).json(user[0]);
        }else{
            res.json('Not Found');
        }
    }).catch(err=>res.status(400).json('Error getting user'))
}
module.exports = {
    getProfile:getProfile
}