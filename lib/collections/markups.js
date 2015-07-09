Markups = new Mongo.Collection('markups');

Meteor.methods({
    insertMarkup: function(data,pictureId,userId, pictureComment,position){
        if(this.userId){
        var markupObj;
        check(data,String);
        if (pictureComment){    
        markupObj = {
            data:data,
            pictureComment: pictureComment,
            date: new Date(),
            userId: userId,
            pictureId: pictureId
        }; } else {
            markupObj = {
            data:data,
            date: new Date(),
            userId: userId,
            pictureId: pictureId,
            position:position
        };
    }
 Markups.insert(markupObj);
        } else{
            console.log("You must sign in first, silly");    
        }
    },    
});