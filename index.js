const {Get, Post, Put, Patch, Delete, port, use, IntaliseRouter, getCache, setCache,cors, deleteCache, clearCache, getAllCache} = require("./src/Server")

const {handleApiState} =require("./src/ApiState")
const {   defineSchema,
    createDocument,
    findAllDocuments,
    findOneDocument,
    findById,
    updateDocument,
    updateById,
    deleteDocument,
    deleteById,
    storeFunction,
    fetchFunction,
    executeFunction,
    getAllFunctions,
    deleteFunction} = require("./src/db")

module.exports = { Get, Post, Put, Patch, Delete, port, use, IntaliseRouter, getCache, setCache, deleteCache, cors,clearCache, getAllCache,handleApiState, defineSchema,
    defineSchema,
    createDocument,
    findAllDocuments,
    findOneDocument,
    findById,
    updateDocument,
    updateById,
    deleteDocument,
    deleteById,
    storeFunction,
    fetchFunction,
    executeFunction,
    getAllFunctions,
    deleteFunction 

};