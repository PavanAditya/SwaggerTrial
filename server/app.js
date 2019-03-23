const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser').json();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'superheros';
const client = new MongoClient(url);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument =  require('./config/swagger.json');
const promiseMoviesPost = require('./controllers/moviesPost')
const promiseMoviesGet = require('./controllers/moviesGet')
const promiseMoviesPut = require('./controllers/moviesPut')
const promiseMoviesDelete = require('./controllers/moviesDelete')
const promiseMoviesGetOne = require('./controllers/moviesGetOne')
const promiseMoviesPutOne = require('./controllers/moviesPutOne')
const promiseMoviesPutHero = require('./controllers/moviesPutHero')
const promiseMoviesDeleteOne = require('./controllers/moviesDeleteOne')


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "DELETE, PUT, POST, GET");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, POST, GET");
    // res.body("Access-Control-Allow-preflight", "DELETE, PUT, POST, GET");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true
}));

app.post('/post', bodyParser, (req, res) => {
    // res.send(req.body.superheros);
    json = req.body;
    // console.table(json)

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        Promise.resolve().then(promiseMoviesPost(db, json)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(() => {
                console.log("Inserted movies");
            });
    });
})

app.get('/get', (req, res) => {
    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        Promise.resolve().then(promiseMoviesGet(db, res)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                // res.send(docs)
                console.log('data retrieved successfully');
            });
    });
})

app.put('/put', bodyParser, (req, res) => {

    json = req.body.superheros;

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        Promise.resolve().then(promiseMoviesPut(db)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                console.log("records updated once");
                //   res.send(docs)
            });
    });
})

app.delete('/delete', bodyParser, (req, res) => {

    json = req.body.superheros;

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        Promise.resolve().then(promiseMoviesDelete(db)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                console.log("records updated once");
                // resolve(docs);
            });
    });
})

app.get('/get/one', (req, res) => {
    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        let paramValue = req.query.id;

        Promise.resolve().then(promiseMoviesGetOne(db, res, paramValue)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(() => {
                // res.send(docs)
                console.log('data retrieved');
            });
    });
})

app.delete('/delete/one', bodyParser, (req, res) => {

    json = req.url;
    json = json.split('=')[1];

    // json = req.query;

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        paramValue = json;
        console.log(paramValue);

        Promise.resolve().then(promiseMoviesDeleteOne(db)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                console.log("records deleted once");
                // resolve(docs);
            });
    });
})

app.put('/put/one', bodyParser, (req, res) => {

    json = req.body.superheros;

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        paramValue = req.query.id;
        // console.log(paramValue);

        Promise.resolve().then(promiseMoviesPutOne(db)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                console.log("records updated once");
                //   res.send(docs)
            });
    });
})

app.put('/put/hero', bodyParser, (req, res) => {

    json = req.body.superheros;

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        paramValue = req.query.id;
        // console.log(paramValue);

        Promise.resolve().then(promiseMoviesPutHero(db)).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                console.log("records updated once");
                //   res.send(docs)
            });
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))