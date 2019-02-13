const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const app = express()

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', function (req, res) {
    res.render('login')
})

app.get('/registration', (req, res) => {
    res.render('registration')
})


app.post('/login', urlencodedParser, function (req, res) {
    let obj = {} //สร้าง object เปล่าๆรอ
    fs.readFile('myuser.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data)
            if (obj.email == req.body.email) { // check ว่า email ที่ผู้ใช้กรอกมาใหม่ ตรงกับที่เราเก็บข้อมูลไว้หรือไม่
                if (obj.password == req.body.password) {
                    res.send('ยินดีด้วยคุณลงชื่อเข้าใช้งานได้แล้ว')
                } else {
                    res.send('รหัสผ่านไม่ถูกต้อง')
                }
            } else {
                res.send('ไม่พบ Email ของคุณ')
            }
        }
    })
})

app.post('/registration', urlencodedParser, (req, res) => {
    fs.readFile('myuser.json', 'utf8', function readFileCallback(err, data) {
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        obj.push({
            email: req.body.email,
            password: req.body.password
        }); //add some data
        jsonString = JSON.stringify(obj); //convert it back to json

        fs.writeFile('myuser.json', jsonString, 'utf8', () => {
            res.send('ok : ' + req.body.email + ', ' + req.body.password)
        })
    })
})

app.listen(3000, (req, res) => {
    console.log('Example app listening on port 3000!')
})