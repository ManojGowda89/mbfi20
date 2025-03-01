const express = require("express");
const http = require("http");
const NodeCache = require("node-cache");
const cors = require("cors");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const cache = new NodeCache();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let isPortSet = false;

const port = (portNumber) => {
    if (isPortSet) return console.error("Port already set!");
    isPortSet = true;
    server.listen(portNumber, () => {
        console.log(`Server is running on port ${portNumber}`);
    });
};

const Get = (route, handler) => app.get(route, handler);
const Post = (route, handler) => app.post(route, handler);
const Put = (route, handler) => app.put(route, handler);
const Patch = (route, handler) => app.patch(route, handler);
const Delete = (route, handler) => app.delete(route, handler);
const use = (middleware) => app.use(middleware);

const IntaliseRouter = () => {
    const router = express.Router();
    return {
        Get: (route, handler) => router.get(route, handler),
        Post: (route, handler) => router.post(route, handler),
        Put: (route, handler) => router.put(route, handler),
        Patch: (route, handler) => router.patch(route, handler),
        Delete: (route, handler) => router.delete(route, handler),
        use: (middleware) => router.use(middleware),
        router
    };
};

// Caching functions
const getCache = (key) => cache.get(key);
const setCache = (key, value, ttl = 3600) => cache.set(key, value, ttl);
const deleteCache = (key) => cache.del(key);
const clearCache = () => cache.flushAll();
const getAllCache = () => cache.keys().map(key => ({ key, value: cache.get(key) }));

module.exports = { Get, Post, Put, Patch, Delete, port, use, IntaliseRouter, cors,getCache, setCache, deleteCache, clearCache, getAllCache };
