Template.get.helpers({
   Problems: function(){
       return Problems.find();
   }
});

Template.get.events({
    "click #showAddForm": function(){
        $('#problemForm').show("fast");
    }
});