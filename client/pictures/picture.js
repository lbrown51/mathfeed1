Template.picture.onRendered(function(){

});

Template.picture.events({
   "click #addComment": function(){
    var comment = $('#comment').val();
       var id = this._id;
       Meteor.call("insertComment",comment,id);
       $('#comment').val('');
   },
    "click a": function(e){
        e.preventDefault();
    },
    "click img": function(e){
        e.preventDefault();
        Router.go('/get/'+this.problemId+'/'+ this._id);
                  //
    },
    "click div.editButton":function(event){
             event.preventDefault();
        var context = this;
    var id = $(event.toElement).attr('id');
    var element = $(event.toElement);
        if ($('#deleteBox'+id)[0]){
            $('#deleteBox'+id).remove();
        } else {
       
        var deleteBox = $('<div class="waves-effect waves-light btn col s12 red" id="deleteBox'+id+'">Delete</div>');
        element.after(deleteBox);
        $('#deleteBox'+id).click(function(){
 Meteor.call("deletePicture",context._id); 
        });
    }
}

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
                             
