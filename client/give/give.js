Template.give.helpers({
   Solution: function(){ 
       
       var cursor = Problems.findOne({$where: function(){
    if(this.user._id === Meteor.userId()){
       return true;}
       }});
       if(typeof cursor !== 'undefined'){
       return Problems.find({out:true,user:{$not: cursor.user}});
   }
   }
});