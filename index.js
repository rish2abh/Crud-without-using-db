const express = require('express');
const fs = require('fs');
// const bodyParser = require('body-Parser');

const app = express();
app.use(express.json())

app.post('/user/add',(req,res)=>{
    const existUsers = getUserData()
    const userData = req.body
    console.log(userData)
    existUsers.push(userData)
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
})

app.get('/user/read',(req,res)=>{
    const users = getUserData()
    res.send(users)
})

app.patch('/user/update/:username', (req, res) => {
    const username = req.params.username
    const userdata = req.body;
    const userExist = getUserData();
    const updateUser = userExist.filter( user => user.username !== username )
    updateUser.push(userdata)
    saveUserData(updateUser)
    res.send({success: true, msg: 'User data updated successfully'})
})

app.delete('/user/delete/:username', (req, res) => {
    const username = req.params.username
    const existUsers = getUserData()
    const filterUser = existUsers.filter( user => user.username !== username )
    if ( existUsers.length === filterUser.length ) {
        return res.status(409).send({error: true, msg: 'username does not exist'})
    }
    saveUserData(filterUser)
    res.send({success: true, msg: 'User removed successfully'})
})

const getUserData = () => {
    const jsonData = fs.readFileSync('users.json')
    return JSON.parse(jsonData)    
}
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}

app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
})