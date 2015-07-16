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
    },
    
    getPicture: function(){
        return this;
    },
    picturePage: function(){
     var locArry = window.location.pathname.split('/');
        if (locArry[1] === "give"){
         return "givePicturePage";
        } else {
         return "picturePage";   
        }
    }
});
                             
