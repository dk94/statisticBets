const connection = require('./connection');
var result;
module.exports = function selectDataFromDb() {
    return new Promise((resolve) => {
        connection(function (err, db) {
            if (err) throw err;

            let collections = [
                'forebetStrategy',
                'forebetValueBetsBiggerThan1',
                'forebetValueBetsBiggerThan3', 
                'forebetValueBetsBiggerThan5',
                'forebetValueBetsBiggerThan7',
                'vitisportStrategy',
                'vitisportValueBetsBiggerThan1',
                'vitisportValueBetsBiggerThan3',
                'vitisportValueBetsBiggerThan5',
                'vitisportValueBetsBiggerThan6',
            ];

            Promise.all(collections.map((collection) => {
                let dbCollection = db.collection(collection);
                return dbCollection.find().toArray()

            }))
            .then((result)=>{
                resolve(result)
            })


        })
    })
}

