Template.footer.helpers({
    userName: function(){
     return Meteor.user().profile.name; 
        Problems.find().forEach(function(problem){
    console.log(this);
    Meteor.subscribe('pictures', problem._id);
});
    }
});

Template.footer.events({
    "click #logoutButton":function(){
        Meteor.logout();
    }
});