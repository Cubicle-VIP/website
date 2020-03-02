var express = require('express');
var router = express.Router();

const fs = require('fs')
secrets = JSON.parse(fs.readFileSync("./config/secrets.json"));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("only post requests valid..").status(400)
});

var middleware = require("hmac-express")("sha1", secrets.update_key, "X-Hub-Signature")

router.post('/', middleware, function(req, res, next) {
    
    event_type = req.body["X-GitHub-Event"];
    delivery_guid = req.body["X-GitHub-Delivery"];
    console.log(event_type);
    console.log(delivery_guid);
    res.send("starting updater.....")
});
console.log("the updater was run.")
module.exports = router;