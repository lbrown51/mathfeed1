Meteor.publish("problems", function() {
    var user = Meteor.users.findOne({_id:this.userId});
    return Problems.find({user:user});
});