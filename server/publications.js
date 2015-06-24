Meteor.publish("problems", function() {
    var user = Meteor.users.findOne({_id:this.userId});
    return Problems.find({user:user});
});

Meteor.publish('pictures', function(problem){
    return Pictures.find({problem:problem}); 
});

