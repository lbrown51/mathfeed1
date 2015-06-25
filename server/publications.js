Meteor.publish("problems", function() {
    var user = Meteor.users.findOne({_id:this.userId});
    return Problems.find({$or: [{user:user},{out:true}]});
});

Meteor.publish('pictures', function(problemId){   
return Pictures.find({problemId:problemId}); 
});

