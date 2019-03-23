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

module.exports = promiseMovies;