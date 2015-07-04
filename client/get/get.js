Template.get.helpers({
   Problems: function(){
           var userId = Meteor.userId();
       return Problems.find({userId:userId});
   }
});

Template.get.events({
    "click #showAddForm": function(){
        $('#problemForm').show("fast");
    },
    "click #delete": function(){
       var problemId = $('.active').attr('id');
       if(typeof problemId !== "undefined"){
    Meteor.call('deleteProblem',problemId);}
    }
});