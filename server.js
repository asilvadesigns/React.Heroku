const express = require('express');
const server = express();

server.use(express.static(__dirname + '/dist/'));

server.listen(process.env.PORT || 8080, (error) => {
  if (error) {
    return console.log(error);
  }
});
