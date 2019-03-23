const endpoints = (app) => {

const bodyParser = require('body-parser').json();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'superheros';
const client = new MongoClient(url);
const promiseMoviesPost = require('../controllers/moviesPost')
const promiseMoviesGet = require('../controllers/moviesGet')
const promiseMoviesPut = require('../controllers/moviesPut')
const promiseMoviesDelete = require('../controllers/moviesDelete')
const promiseMoviesGetOne = require('../controllers/moviesGetOne')
const promiseMoviesPutOne = require('../controllers/moviesPutOne')
const promiseMoviesDeleteOne = require('../controllers/moviesDeleteOne')

    /**
         * @swagger
         * /post:
         *   post:
         *     tags:
         *       - Heros
         *     description: Save Heros
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: Heros
         *         description: Heros object
         *         in: body
         *         required: true
         *     responses:
         *       200:
         *         description: Store your Heros
         */
    app.post('/post', bodyParser, (req, res) => {
        // res.send(req.body.superheros);
        json = req.body.superheros;
        // console.table(json)

        client.connect(function (err) {
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            Promise.resolve().then(promiseMoviesPost(db, json)).catch(err => {
                console.error(err);
                res.send(err);
            })
                .then(docs => {
                    console.log("Inserted movies");
                    res.send(docs)
                });
        });
    })

    /**
         * @swagger
         * /get:
         *   get:
         *     tags:
         *       - Heros
         *     description: Get Heros
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Get all Heros
         */
    app.get('/get', (req, res) => {
        client.connect(function (err) {
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            Promise.resolve().then(promiseMoviesGet(db, res)).catch(err => {
                console.error(err);
                res.send(err);
            })
                .then(docs => {
                    console.log('data retrieved successfully');
                    // res.send(docs)
                });
        });
    })

    /**
         * @swagger
         * /put:
         *   put:
         *     tags:
         *       - Heros
         *     description: Update Heros
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Update your Heros
         *         schema:
         *           $ref: '#/definitions/Heros'
         */
    app.put('/put', bodyParser, (req, res) => {

        json = req.body.superheros;

        client.connect(function (err) {
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            Promise.resolve().then(promiseMoviesPut(db, res)).catch(err => {
                console.error(err);
                res.send(err);
            })
                .then(docs => {
                    console.log("records updated once");
                    //   res.send(docs)
                });
        });
    })

    /**
         * @swagger
         * /delete:
         *   delete:
         *     tags:
         *       - Heros
         *     description: Delete Heros
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Remove your Heros
         *         schema:
         *           $ref: '#/definitions/Heros'
         */
    app.delete('/delete', bodyParser, (req, res) => {

        json = req.body.superheros;

        client.connect(function (err) {
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            Promise.resolve().then(promiseMoviesDelete(db, res)).catch(err => {
                console.error(err);
                res.send(err);
            })
                .then(docs => {
                    console.log("records updated once");
                    // resolve(docs);
                    // res.send(docs)
                });
        });
    })

    /**
         * @swagger
         * /get/one:
         *   get:
         *     tags:
         *       - Heros
         *     description: Get specific Heros
         *     produces:
         *       - application/json
	     *     parameters:
	     *       - name: id
	     *         description: Heros id
	     *         in: query
	     *         required: true
	     *         type: string
         *     responses:
         *       200:
         *         description: Get Heros by id
         */
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
                    res.send(docs)
                    console.log('data retrieved');
                });
        });
    })

    /**
         * @swagger
         * /delete/one:
         *   delete:
         *     tags:
         *       - Heros
         *     description: Delete sepicific Heros
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         description: Heros object
         *         in: query
         *         required: true
         *         schema:
         *           $ref: '#/definitions/Heros'
         *     responses:
         *       200:
         *         description: Remove Heros by id
         *         schema:
         *           $ref: '#/definitions/Heros'
         */
    app.delete('/delete/one', bodyParser, (req, res) => {

        json = req.body.superheros;

        client.connect(function (err) {
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            paramValue = req.query.id;
            // console.log(paramValue);

            Promise.resolve().then(promiseMoviesDeleteOne(db, res)).catch(err => {
                console.error(err);
                res.send(err);
            })
                .then(docs => {
                    console.log("records deleted once");
                    // resolve(docs);
                    // res.send(docs)
                });
        });
    })

    /**
         * @swagger
         * /put/one:
         *   put:
         *     tags:
         *       - Heros
         *     description: Updating specific Heros
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         description: Heros object
         *         in: query
         *         required: true
         *         schema:
         *           $ref: '#/definitions/Heros'
         *     responses:
         *       200:
         *         description: Update Heros by id
         *         schema:
         *           $ref: '#/definitions/Heros'
         */
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
                    res.send(docs)
                });
        });
    })
}

module.exports = endpoints;