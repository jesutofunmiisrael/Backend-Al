const express = require("express");
const {signup, login} = require("../Controller/auth");
// const login = require ("../Controller/auth")


const auth = express.Router()

auth.post("/signup",  signup)
auth.post("/login", login)


module.exports = auth