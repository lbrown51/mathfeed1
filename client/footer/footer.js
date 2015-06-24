Template.footer.helpers({
    userName: function(){
     return Meteor.user().profile.name;   
    }
});

Template.footer.events({
    "click #logoutButton":function(){
        Meteor.logout();
    }
});