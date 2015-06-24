Pictures = new Mongo.Collection('pictures');

Meteor.methods({
    insertPicture: function(data,problemId){
        if(this.userId){
        check(data,String);
        
        var picObj = {
            data:data, 
            problemId: problemId
        };
        Pictures.insert(picObj);
        } else{
            console.log("You must sign in first, silly");    
        }
    },    
});