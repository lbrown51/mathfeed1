Template.picture.events({
   "click #addComment": function(){
    var comment = $('#comment').val();
       var id = this._id;
       Meteor.call("insertComment",comment,id);
       $('#comment').val('');
   },
    
});

Template.picture.helpers({
    pushIdForComments: function(){
   Meteor.subscribe('comments',this._id);

},
    Comment: function(){
     return Comments.find({pictureId:this._id});   
    }
});
                             
