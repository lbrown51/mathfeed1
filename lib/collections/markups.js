Markups = new Mongo.Collection('markups');

Meteor.methods({
    upsertMarkup: function(data,picture){
        if(this.userId){
        check(data,String);
        
        var markupObj = {
            data:data,
            date: new Date(),
            pictureId: picture._id
        };
        Markups.upsert({pictureId:picture._id},markupObj);
        } else{
            console.log("You must sign in first, silly");    
        }
    },    
});