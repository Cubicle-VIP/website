var express = require('express');
var router = express.Router();
const crypto = require("crypto");

const fs = require('fs')
secrets = JSON.parse(fs.readFileSync("./config/secrets.json"));
const hmac = crypto.createHmac('sha1', secrets.update_key);


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("only post requests valid..").status(400)
});

// var middleware = require("hmac-express")("sha1", secrets.update_key, "X-Hub-Signature")

router.post('/', function(req, res, next) {
    console.log("received request from " + req.ip)
    signature = req.body["X-Hub-Signature"];
    console.log('signature is ' + signature);
    // hmac.update(req.body)
    
    console.log(req.body);


    event_type = req.body["X-GitHub-Event"];
    delivery_guid = req.body["X-GitHub-Delivery"];
    console.log(event_type);
    console.log(delivery_guid);
    res.send("starting updater.....")
});
console.log("the updater was run.")
module.exports = router;