var express = require('express');
var router = express.Router();
const fs = require('fs')
const ipc = require('node-ipc')
const path = require('path');

ipc.config.id = "cubicle.vip";
ipc.config.retry = 1500;

function initiateUpdate(firstcall) {
    try {
        console.log('connected, sending update message')
        ipc.of.world.emit('update', path.resolve(__dirname, ".."));
    } catch (err) {
        if (!firstcall) {
            console.log("something went wrong with updating...");
            return;
        }
        ipc.connectTo(
            "world",
            function () {
                ipc.of.world.on(
                    'connect',
                    function () {
                        initiateUpdate(true)
                    }
                )
            }
        )
    }
}

router.post('/', function (req, res, next) {
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
        initiateUpdate(true);
    } else {
        res.send("hmac failed").status(401)
    }
});
module.exports = router;