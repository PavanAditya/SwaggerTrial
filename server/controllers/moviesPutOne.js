const { ObjectId } = require('mongodb');

const promiseMovies = (db) => (new Promise((resolve, reject) => {
    // const promiseMovies = async(db) => (new Promise((resolve, reject) => { //async-await
    
        // Get the documents collection
        const collection = db.collection('documents');
        // const collection = await db.collection('documents'); //async-await
    
        collection.updateOne({ '_id': ObjectId(paramValue) }, { $mul: { fightsWon: 3 } }, function (err, docs) {
    
            resolve(docs);
        });
    }))

module.exports = promiseMovies;