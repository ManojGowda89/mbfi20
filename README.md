# mbfi-server

## Overview
`mbfi-server` is a powerful Node.js package that simplifies server-side development with Express.js. While Express is already lightweight and easy to use, `mbfi-server` reduces boilerplate code even further by providing prebuilt functions for common server tasks, including routing, API state management, logging, caching, and real-time database handling.

## Features
- **Prebuilt Express Server:** Get started with a server in just a few lines.
- **Simplified API Handling:** Predefined functions like `Get`, `Post`, `Put`, `Patch`, and `Delete` make API development seamless.
- **CORS Handling:** Built-in CORS support to manage cross-origin requests effortlessly.
- **API State Management:** `handleApiState` function includes built-in support for loading, data, and error states, making API calls easier to manage.
- **Automatic Logging:** Every API request generates logs for easy debugging and error identification.
- **Prebuilt JSON Database:** Real-time internal database for quick data storage and retrieval without external dependencies.
- **Redis-like Caching Support:** Functions for setting, retrieving, and managing cache data.
- **Global Function Storage:** Store and retrieve functions globally without the need for importing/exporting.
- **One-Line Server Setup:** Quickly initialize a server with a single line of code.

## Installation
```sh
npm install mbfi-server
```

## Quick Start
```javascript
const { port, use, Post, cors, setCache, getCache, getAllCache } = require("mbfi-server");

const page1Router = require("./page1");
const page2Router = require("./page2");
const page3Router = require("./page3");

use(cors());
use(page1Router);
use(page2Router);
use(page3Router);

setCache("name", "John Doe");
console.log(getAllCache());

Post("/data", (req, res) => {
    const data = req.body;
    res.send(data);
});

port(7000);
```

## Router Example
```javascript
const { IntaliseRouter } = require("mbfi-server");
const { router, Post } = IntaliseRouter();

Post("/page3", (req, res) => {
    res.send("Page 3");
});

module.exports = router;
```

## Cache Example
```javascript
const { IntaliseRouter, deleteById, setCache } = require("mbfi-server");
const { router } = IntaliseRouter();

setCache("name", "John Doe");

module.exports = router;
```

## Future Enhancements
- More utility functions for Express.js simplification
- Improved caching mechanisms
- Additional built-in middleware options
- Enhanced real-time database support

`mbfi-server` is designed to make backend development faster and more efficient with ready-made utilities and pre-configured setups. Get started today and streamline your Node.js backend development!

