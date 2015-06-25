Meteor.publish("problems", function() {
    return Problems.find({$or: [{userId:this.userId},{out:true}]});
});

Meteor.publish('pictures', function(problemId){   
return Pictures.find({problemId:problemId}); 
});


Meteor.publish('comments', function(pictureId)
               {  
    return Comments.find({pictureId:pictureId}); 
});