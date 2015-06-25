Template.get.helpers({
   Problems: function(){
           var userId = Meteor.userId();
       return Problems.find({userId:userId});
   }
});

Template.get.events({
    "click #showAddForm": function(){
        $('#problemForm').show("fast");
    }
});