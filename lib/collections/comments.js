Comments = new Mongo.Collection('comments');

Meteor.methods({
    insertComment: function(comment,pictureId){
     if(this.userId){
      check(comment,String);
        var comObj = {
         comment:comment,
            date : new Date(),
            userId: this.userId,
            pictureId: pictureId,
            userName: Meteor.users.findOne({_id:this.userId}).name
        };
         Comments.insert(comObj);
     }
    }
});