Template.footer.helpers({
    userName: function(){
     return Meteor.user().profile.name;   
    }
});