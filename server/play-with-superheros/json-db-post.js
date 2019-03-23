const express = require('express')
const app = express()
const bodyParser = require('body-parser').json();
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'superheros';
const client = new MongoClient(url);

app.post('/post', bodyParser, (req, res) => {
    // res.send(req.body.superheros);
    json = req.body.superheros;
    // console.log(json)

    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        Promise.resolve(db).then(promiseMovies).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(() => {
                console.log("Inserted movies");
            });
    });
})

const promiseMovies = (db) => (new Promise((resolve, reject) => {
// const promiseMovies = async (db) => (new Promise((resolve, reject) => { //async-await
    const collection = db.collection('documents');
    // const collection = await db.collection('documents'); //async-await
    // console.log(json);
    let heros = JSON.stringify(json);
    let herosArray = JSON.parse(heros);
    herosArray.forEach(element => {
        let obj = JSON.stringify(element);
        collection.insertOne(JSON.parse(obj),
            function (err, docs) {
                resolve(docs);
            }
        );
    });
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))