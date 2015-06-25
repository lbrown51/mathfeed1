Template.get.helpers({
   Problems: function(){
           var user = Meteor.user();
       var cursor = Problems.findOne({$where: function(){
    if(this.user._id === user._id){
       return true;}
       }});
       return Problems.find({user:cursor.user});
   }
});

Template.get.events({
    "click #showAddForm": function(){
        $('#problemForm').show("fast");
    }
});