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
            pictureId: pictureId,
            position:position
        }; } else {
            markupObj = {
            data:data,
            date: new Date(),
            userId: userId,
            pictureId: pictureId,
            position:position
        };
    }
   var id = Markups.insert(markupObj);
        } else{
            console.log("You must sign in first, silly");    
        }
    },   
    deleteMarkup: function(id){
     if(this.userId){
         Markups.remove({_id:id});
     }
    },
    
    updateMarkup: function(id, data, image){
     if (this.userId){
      if(image){
          Markups.update({_id:id},{$set: {data:image}});
          Markups.update({_id:id},{$set: {pictureComment:data}});
      } else {
          Markups.update({_id:id},{$set: {data:data}});
      }
     }
    }
});