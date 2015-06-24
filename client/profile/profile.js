Template.profile.helpers({
   userName: function(){
     return Meteor.user().profile.name;   
    } 
});