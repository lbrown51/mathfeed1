Comments = new Mongo.Collection('comments');

Meteor.methods({
    insertComment: function(comment,pictureId){
     if(this.userId){
      check(comment,String);
         var user = Meteor.users.findOne({_id:this.userId});
        var comObj = {
         comment:comment,
            date : new Date(),
            userId: this.userId,
            pictureId: pictureId,
            userName: user.profile.name
        };
        Comments.insert(comObj);
     }
    }
});