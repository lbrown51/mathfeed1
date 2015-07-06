Markups = new Mongo.Collection('markups');

Meteor.methods({
    insertMarkup: function(data,picture,userId,pictureComment){
        if(this.userId){
        var markupObj;
        check(data,String);
        if (pictureComment){    
        markupObj = {
            data:data,
            pictureComment: pictureComment,
            date: new Date(),
            userId: userId,
            pictureId: picture._id
        }; } else {
            markupObj = {
            data:data,
            date: new Date(),
            userId: userId,
            pictureId: picture._id
        };
    }
 Markups.insert(markupObj);
        } else{
            console.log("You must sign in first, silly");    
        }
    },    
});