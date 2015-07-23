Template.layout.events({
   'click #login': function(){
    Meteor.loginWithGoogle(
        {requestPermissions: ['email']},
        function(error){
            if(error){
                console.log(error.reason);
            }
        }
    );
   }
});

Template.layout.helpers({
    templateGestures: {
        "swiperight div": function(){
            $('.button-collapse').sideNav('show');

        },
        
    }
});