const { ObjectId } = require('mongodb');

const promiseMovies = (db, res, paramValue) => (new Promise((resolve, reject) => {
    // const promiseMovies = async (db) => (new Promise((resolve, reject) => { //async-await

    // Get the documents collection
    const collection = db.collection('documents');
    // const collection = await db.collection('documents'); //async-await

    // Find with id
    console.log(paramValue)
    collection.find({'_id': ObjectId(paramValue)}).toArray(function (err, docs) {
        console.log("Found the following movies");
        res.send(docs);
        resolve();
    }); // find with obj ID in params

}))

module.exports = promiseMovies;
