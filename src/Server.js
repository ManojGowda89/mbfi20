const express = require("express");
const http = require("http");
const { logRequest } = require("./Loger");
const cors = require("cors");
const app = express();
app.use(express.json()); 
app.use(logRequest);
const server = http.createServer(app);

let isPortSet = false; 

const port = (portNumber) => {
    if (isPortSet) return console.error("Port already set!");
    isPortSet = true;
    server.listen(portNumber, () => {
        console.log(`Server is running on port ${portNumber}`);
    });
};

// Define shared functions
const Get = (route, handler) => {
    app.get(route, handler);
};

const Post = (route, handler) => {
    app.post(route, handler);
};

const Put = (route, handler) => {
    app.put(route, handler);
};

const Patch = (route, handler) => {
    app.patch(route, handler);
};

const Delete = (route, handler) => {
    app.delete(route, handler);
};

const use = (middleware) => {
    app.use(middleware);
};

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


module.exports = { Get, Post, Put, Patch, Delete, port, use, IntaliseRouter, app,cors };