Template.give.helpers({
   Solution: function(){
       return Problems.find({out:true,userId:{$not: Meteor.userId()}});
   }
   
});