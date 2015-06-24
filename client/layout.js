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