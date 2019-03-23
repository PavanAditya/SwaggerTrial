const express = require('express')
const app = express()
const bodyParser = require('body-parser').json();
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'superheros';
const client = new MongoClient(url);
const { ObjectId } = require('mongodb');

app.put('/putone', bodyParser, (req, res) => {

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
                console.log("records updated once");
                //   res.send(docs)
            });
    });
})

const promiseMovies = (db) => (new Promise((resolve, reject) => {
// const promiseMovies = async(db) => (new Promise((resolve, reject) => { //async-await

    // Get the documents collection
    const collection = db.collection('documents');
    // const collection = await db.collection('documents'); //async-await

    // console.log(paramValue, 'p');
    // paramObj = `ObjectId("${paramValue}")`;
    // console.log(paramObj, 'o');

    collection.updateOne({ '_id': ObjectId(paramValue) }, { $mul: { fightsWon: 3 } }, function (err, docs) {

        resolve(docs);
    });
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))