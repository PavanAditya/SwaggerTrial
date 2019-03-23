const express = require('express')
const app = express()
const bodyParser = require('body-parser').json();
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'superheros';
const client = new MongoClient(url);
const { ObjectId } = require('mongodb');

app.delete('/delete/one', bodyParser, (req, res) => {

    json = req.body.superheros;

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        // const paramsString = req.url.split('?')[1];
        // const eachParamArray = paramsString.split('&');
        // paramValue = eachParamArray[0].split('=')[1];
        paramValue = req.query.id;
        // console.log(paramValue);

        Promise.resolve(db).then(promiseMovies).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                console.log("records deleted once");
                // resolve(docs);
            });
    });
})

const promiseMovies = (db) => (new Promise((resolve, reject) => {
    // const promiseMovies = async (db) => (new Promise((resolve, reject) => { //async-await

    // Get the documents collection
    const collection = db.collection('documents');
    // const collection = await db.collection('documents'); //async-await

    Promise.resolve(db).then(promiseMoviesGet).catch(err => {
        console.error(err);
        res.send(err);
    })
        .then(docs => {
            // console.log(docs[0].superpowers.length);

            // console.log(paramValue, 'p');
            // paramObj = `ObjectId("${paramValue}")`;
            // console.log(paramObj, 'o');

            // docs.forEach(element => {
            //     let arr = element.superpowers;
            //     arrLen = arr.length;
                // console.log(arrLen,'--')
                collection.deleteOne({ '_id': ObjectId(paramValue) }, function (err, docs) {
                    // console.log(docs.deletedCount,'del')
                    resolve(docs);
                });
            // });
        });
}))

const promiseMoviesGet = (db) => (new Promise((resolve, reject) => {
    // const promiseMoviesGet = async (db) => (new Promise((resolve, reject) => { //async-await

    // Get the documents collection
    const collection = db.collection('documents');
    // const collection = await db.collection('documents'); //async-await

    collection.find({}).toArray(function (err, docs) {

        console.log("Found the following movies");
        resolve(docs);
    });
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))