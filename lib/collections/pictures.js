Pictures = new Mongo.Collection('pictures');

Meteor.methods({
    insertPicture: function(data,problemId){
        if(this.userId){
        check(data,String);
        
        var picObj = {
            data:data,
            date: new Date(),
            userId: this.userId,
            problemId: problemId
        };
        Pictures.insert(picObj);
        } else{
            console.log("You must sign in first, silly");    
        }
    }, 
    deletePicture: function(id){
     if(this.userId){
     if(Markups.find({pictureId:id}).count() > 0){ Markups.find({pictureId:id}).forEach(function(result, error){         Meteor.call("deleteMarkup",result._id);
                                                                                                                if(Pictures.find({_id:id}).count()===1){
                Pictures.remove({_id:id});  } 

         });
                                                 } else {
    Pictures.remove({_id:id})
      }
     }
    }
});