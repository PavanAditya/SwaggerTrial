const promiseMovies = (db, json) => (new Promise((resolve, reject) => {
    // const promiseMovies = async (db) => (new Promise((resolve, reject) => { //async-await
    // console.log(db)
    const collection = db.collection('documents');
    // const collection = await db.collection('documents'); //async-await
    // console.table(json);
    let heros = JSON.stringify(json);
    // console.table(herosArray);
    // herosArray.forEach(element => {
    //     let obj = JSON.stringify(element);
        collection.insertOne(JSON.parse(heros),
            function (err, docs) {
                resolve(docs);
            }
        );
    // });
}))
module.exports = promiseMovies;
