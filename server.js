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
    let obj = {}
    fs.readFile('myuser.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data)
            if (obj.email == req.body.email) {
                if (obj.password == req.body.password) {
                    res.send('login success')
                } else {
                    res.send('Password is incorrect')
                }
            } else {
                res.send('Not found email')
            }
        }
    })
})

app.post('/registration', urlencodedParser, (req, res) => {
    var obj = []
    const json = [{
        email: req.body.email,
        password: req.body.password
    }]

    fs.readFile('myuser.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            jsonString = JSON.stringify(json);
            fs.writeFile('myuser.json', jsonString, 'utf8', () => {
                res.send('ok : ' + req.body.email + ', ' + req.body.password)
            })
        } else {
            obj = JSON.parse(data);
            obj.push({
                email: req.body.email,
                password: req.body.password
            })
            jsonString = JSON.stringify(obj);

            fs.writeFile('myuser.json', jsonString, 'utf8', () => {
                res.send('ok : ' + req.body.email + ', ' + req.body.password)
            })
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('Example app listening on port 3000!')
})