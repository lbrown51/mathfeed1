Meteor.publish("problems", function() {
    return Problems.find({$or: [{userId:this.userId},{out:true}]});
});

Meteor.publish('pictures', function(problemId,pictureId){
    if(pictureId){
        return Pictures.find({_id:pictureId});
    } else {
return Pictures.find({problemId:problemId});
    }
});


Meteor.publish('comments', function(pictureId)
               {  
    return Comments.find({pictureId:pictureId}); 
});

Meteor.publish('markups', function(pictureId)
               {
    return Markups.find({pictureId:pictureId});
});