const express = require('express')
const app = express();
const port = 3000;
const sequelize = require('sequelize');
const db = require('./models')
var bodyParser = require('body-parser');
const sendSMS = require('./SpeedSMS')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var user = db.users, sms = db.smsdata;

app.post('/', (req, res) => {
    let shop = req.body.shop;
    let fullnames = req.body.fullnames;
    let phone = req.body.phone;
    let email = req.body.email;
    let address = req.body.address;

    user.create({
        shop: shop,
        fullnames: fullnames,
        phone: phone,
        email: email,
        address: address
    }).then(result => {
        res.send("xong");
    }).catch(err => {
        console.log(err);
        res.send("không xong");
    })
    res.end();
})

app.post('/sendSMS', (req, res) => {
    let shop = req.body.shop, email = req.body.email, contents = req.body.contents;

    user.findOne({
        where: {
            shop: shop,
            email: email
        }
    }).then(async result => {
        let stt = await sendSMS([result.dataValues.phone], contents, 2, '');

        sms.create({
            shop: shop,
            email: email,
            contents: contents,
            phone: result.dataValues.phone,
            status: stt
        }).then(resl => {
            res.send("Add complete");
        }).catch(err => {
            res.send("error");
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
        res.send("Không có người dùng này!");
    })
    res.end();
})

app.listen(port, () => console.log(port));