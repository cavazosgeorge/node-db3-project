const express = require("express");

const SchemeRouter = require("./schemes/scheme-router.js");

const server = express();

server.use(express.json());
server.use("/api/schemes", SchemeRouter);

// eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});
module.exports = server;
