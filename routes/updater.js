var express = require('express');
var router = express.Router();
const crypto = require("crypto");
const { exec} = require('child_process');
const fs = require('fs')
secrets = JSON.parse(fs.readFileSync("./config/secrets.json"));

// const hmac = crypto.createHmac('sha1', secrets.update_key);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("only post requests valid..").status(400)
});

// hmac.update('some data to hash');
// console.log(hmac.digest('hex'));
router.post('/', function(req, res, next) {
    console.log("received request from " + req.ip)
    signature = req.header("X-Hub-Signature");
    console.log('signature is ' + signature);
    console.log('generated signature is ' + req.hashHmac)
    // console.log(req.body);
    if (signature === "sha1=" + req.hashHmac) {
        console.log("verification worked!");
        event_type = req.header("X-GitHub-Event");
        delivery_guid = req.header("X-GitHub-Delivery");
        console.log(event_type);
        console.log(delivery_guid);
        res.send("starting updater").status(200)
        // exec() todo communicate with open updater process

    } else {
        res.send("hmac failed").status(401)
    }
});

module.exports = router;