var problem;
Template.solutionPage.helpers({
    pushIdToPage: function(){
        var id = this._id;
     problem = Problems.findOne({_id:id}); 
         if(typeof problem !== "undefined"){Meteor.subscribe('pictures',problem._id);
        }
    },
    Picture: function(){
        if(typeof problem !== "undefined"){
        return Pictures.find({problemId:problem._id});}
    }
});