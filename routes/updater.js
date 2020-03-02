var express = require('express');
var router = express.Router();
const fs = require('fs')
const ipc = require('node-ipc')
const path = require('path');

ipc.config.id = "cubicle.vip";
ipc.config.retry = 1500;


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("only post requests valid..").status(400)
});
function initiateUpdate() {
    ipc.connectTo(
        "world",
        function() {
            ipc.of.world.on(
                'connect',
                function () {
                    console.log('connected, sending update message')
                    ipc.of.world.emit('update', path.resolve(__dirname, ".."));
                }
            )
        }
    )
}


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
        initiateUpdate();

        // exec() todo communicate with open updater process

    } else {
        res.send("hmac failed").status(401)
    }
});
module.exports = router;