const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'superheros';
const client = new MongoClient(url);
const { ObjectId } = require('mongodb');

app.get('/get/one', (req, res) => {
    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        // param to string conversion
        // const paramsString = req.url.split('?')[1];
        // const eachParamArray = paramsString.split('&');
        // paramValue = eachParamArray[0].split('=')[1];
        paramValue = req.query.id;
        // Find with header
        // head = (req.headers['content-type'] == 'true');

        Promise.resolve(db).then(promiseMovies).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                res.send(docs)
            });
    });
})

const promiseMovies = (db) => (new Promise((resolve, reject) => {
    // const promiseMovies = async (db) => (new Promise((resolve, reject) => { //async-await

    // Get the documents collection
    const collection = db.collection('documents');
    // const collection = await db.collection('documents'); //async-await

    // Find with id
    collection.find({'_id': ObjectId(paramValue)}).toArray(function (err, docs) {
        console.log("Found the following movies");
        resolve(docs);
    }); // find with obj ID in params

    // Find with canFly
    // collection.find({ canFly : head }).toArray(function (err, docs) {
    //     console.log("Found the following movies");
    //     resolve(docs);
    // }); // find with can fly in headers
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))