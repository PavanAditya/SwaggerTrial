const promiseMovies = (db, res) => (new Promise((resolve, reject) => {
    // const promiseMovies = async (db) => (new Promise((resolve, reject) => { //async-await
    
        // Get the documents collection
        const collection = db.collection('documents');
        // const collection = await db.collection('documents'); //async-await
    
        Promise.resolve(db).then(promiseMoviesGet).catch(err => {
            console.error(err);
            res.send(err);
        })
            .then(docs => {
                    collection.deleteMany({ $where:'this.superpowers.length < 3' } , function (err) {
                        // console.log(docs.deletedCount,'del')
                        console.log(docs);
                        // resolve(docs);
                        res.send(docs);
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

module.exports = promiseMovies;