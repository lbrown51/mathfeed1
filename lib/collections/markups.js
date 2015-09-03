Markups = new Mongo.Collection('markups');

Meteor.methods({
    insertMarkup: function(data,pictureId,userId, pictureComment,position){
        if(this.userId){
        var markupObj;
            check (pictureComment,String);
        if (data){
        markupObj = {
            data:data,
            pictureComment: pictureComment,
            date: new Date(),
            userId: userId,
            pictureId: pictureId,
            position:position
        }; } else {
            markupObj = {
            pictureComment:pictureComment,
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
    
    updateMarkup: function(id, text, image){
     if (this.userId){
      if(image){
          Markups.update({_id:id},{$set: {data:image}});
          Markups.update({_id:id},{$set: {pictureComment:text}});
      } else {
          Markups.update({_id:id},{$set: {data:text}});
      }
     }
    }
});