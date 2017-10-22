const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');
const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url,(err,db)=> {

assert.equal(err,null);

console.log('Conected correctly to server');

dboper.insertDocument(db , {name: "Vadonut" , description : "Test"}
, "dishes" , (result) => {
    console.log("Insert Document:\n" , result.ops);
    dboper.findDocuments(db , "dishes" , (docs) => {
        console.log("Found documents:\n" , docs);

    dboper.updateDocument(db , {name : "Vadonut"},
    {description : "Updated Test"} , "dishes",
    (result) => {
        console.log("updated document :\n" , result.result);
        dboper.findDocuments(db , "dishes" , (docs) => {
            console.log("Found updated doccuments:\n" , docs);
            db.dropCollection("dishes", (result)=> {
                console.log("dropped Collection:" , result);
                db.close();
            });
   });         
});
    });
});

});
