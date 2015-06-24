Template.profile.helpers({
   userName: function(){
     return Meteor.user().profile.name;   
    } 
});

Template.profile.events({
   "click #edit":function(){
    $('#profileForm').show('fast');   
       $('#profileFormCheck').show('fast');   
   },
    "click #profileFormCheck": function(){
        $('form').children().each(function(checkbox){          console.log($(this).is(':checked')); 
        });
     $('#profileForm').hide('fast');   
       $('#profileFormCheck').hide('fast');     
    }
});