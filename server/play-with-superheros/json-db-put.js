const express = require('express')
const app = express()
const bodyParser = require('body-parser').json();
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'superheros';
const client = new MongoClient(url);

app.put('/put', bodyParser, (req, res) => {

    json = req.body.superheros;

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

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

    collection.updateMany({
        $and: [{ fightsWon: { $gt: 30 }, $and: [{ superpowers: "Fly" }, { superpowers: "Swim" }] }]
    }, { $mul: { fanFollowing: 2 } }, function (err, docs) {

        resolve(docs);
    });
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))