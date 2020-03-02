var express = require('express');
var router = express.Router();
const crypto = require("crypto");

const fs = require('fs')
secrets = JSON.parse(fs.readFileSync("./config/secrets.json"));

// const hmac = crypto.createHmac('sha1', secrets.update_key);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("only post requests valid..").status(400)
});

// var middleware = require("hmac-express")("sha1", secrets.update_key, "X-Hub-Signature")
const hmac = crypto.createHmac('SHA1', 'a secret');

// hmac.update('some data to hash');
// console.log(hmac.digest('hex'));
router.post('/', function(req, res, next) {
    console.log("received request from " + req.ip)
    signature = req.header("X-Hub-Signature");
    console.log('signature is ' + signature);
    console.log('generated signature is ' + req.hashHmac)
    // console.log(req.body);


    event_type = req.header("X-GitHub-Event");
    delivery_guid = req.header("X-GitHub-Delivery");
    console.log(event_type);
    console.log(delivery_guid);


    res.send("starting updater.....")
});
console.log("the updater was run.")
module.exports = router;