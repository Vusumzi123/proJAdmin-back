"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require("basic-auth");
const securityService = require("../services/security.service");
const cypher_1 = require("../util/cypher");
exports.authorize = function (req, res, next) {
    let admins = new Array;
    const cypher = new cypher_1.Cypher();
    securityService.readCredentials({ user: "admin" })
        .then(fetched => {
        admins[fetched.user] = { password: cypher.decrypt(fetched.password) };
        var user = auth.parse(req.header('Authorization'));
        if (!user || !admins[user.name] || admins[user.name].password !== user.pass)
            res.status(401).json({ error: "unauthorized" });
        return next();
    });
};
