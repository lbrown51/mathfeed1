Meteor.publish("problems", function() {
    console.log("publish");
    return Problems.find({$or: [{userId:this.userId},{out:true}]});
});

Meteor.publish('pictures', function(problemId,pictureId){
    if(pictureId){
        return Pictures.find({_id:pictureId});
    } else {
        console.log("publish Pictures");
return Pictures.find({problemId:problemId});
    }
});


Meteor.publish('comments', function(pictureId)
               {  
    return Comments.find({pictureId:pictureId}); 
});

Meteor.publish('markups', function(pictureId)
               {
    console.log(Markups.find().count());
    return Markups.find();//{pictureId:pictureId}); 
});