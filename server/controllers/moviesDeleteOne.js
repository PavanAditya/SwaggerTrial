const { ObjectId } = require('mongodb');

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

        resolve(docs);
    });
}))

module.exports = promiseMovies;