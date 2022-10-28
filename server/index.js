require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');
const mongo = require("./controller");


const app = express();
// Compress all HTTP responses
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressStaticGzip(path.join(__dirname, "/../client/dist"), { index: false }));
app.use(compression());

app.get('.js*', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

let port = process.env.PORT;


app.get("/products", (req, res) => {
  //console.log(req.query);
  let endpoint = req.query.endpoint;
  let prod_id = req.query.p_id;

  if (endpoint === 'styles') {
    //console.log('styles')
    mongo.getStyles(parseInt(prod_id)).then((products) => {
      //console.log(products[0]);
      return res.status(200).send(products[0]);
    })
    .catch((err) => {
      throw new Error(err);
      return res.status(500);
    });
  } else if (endpoint === 'related') {
    //console.log('related')
    mongo.getIds(parseInt(prod_id)).then((products) => {
      //console.log(products[0].related);
      return res.status(200).send(products[0].related);
    })
    .catch((err) => {
      throw new Error(err);
      return res.status(500);
    });
  } else if (prod_id) {
    mongo.getOne(parseInt(prod_id)).then((products) => {
      //console.log(products[0]);
      return res.status(200).send(products[0]);
    }).catch((err) => {
      throw new Error(err);
      return res.status(500);
    });
  } else {
    mongo.getAll().then((products) => {
      //console.log(products);
      return res.status(200).send(products);
    }).catch((err) => {
      throw new Error(err);
      return res.status(500);
    });
  }
});

app.get('/products/:product_id', function(req, res) {
  mongo.getOne(req.params.product_id).then(product => {
    return res.status(200).send(product[0]);
  }).catch((err) => {
    throw new Error(err);
    return res.status(500);
  });
});

app.get('/products/:product_id/styles', function(req, res) {
  mongo.getStyles(req.params.product_id).then(product => {
    return res.status(200).send(product[0]);
  }).catch((err) => {
    throw new Error(err);
    return res.status(500);
  });
});

app.get('/products/:product_id/related', function(req, res) {
  mongo.getIds(req.params.product_id).then(product => {
    return res.status(200).send(product[0]);
  }).catch((err) => {
    throw new Error(err);
    return res.status(500);
  });
});

app.get("/[0-9]{0,5}$", (req, res) => {
  res.sendFile('index.html', { root: './client/dist/' })
})

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});