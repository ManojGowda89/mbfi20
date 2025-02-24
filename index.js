const {Get, Post, Put, Patch, Delete, port, use, IntaliseRouter, app,cors} = require("./src/Server")

const {handleApiState} =require("./src/ApiState")
const {setState,getState,getAllState} = require("./src/States")

module.exports = { Get, Post, Put, Patch, Delete, port, use, IntaliseRouter, app, handleApiState ,cors,setState,getState,getAllState};