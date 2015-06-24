Pictures = new Mongo.Collection('pictures');

Meteor.methods({
    insertPicture: function(data,problem){
        if(this.userId){
        check(data,String);
        
        var picObj = {
            data:data, 
            problem: problem
        };
        Pictures.insert(picObj);
        } else{
            console.log("You must sign in first, silly");    
        }
    },    
});