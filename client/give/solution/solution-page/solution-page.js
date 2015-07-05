var problem;
Template.solutionPage.helpers({
    pushIdToPage: function(){
        var id = this._id;
     problem = Problems.findOne({_id:id}); 
    },
    Picture: function(){
        if(typeof problem !== "undefined"){
        return Pictures.find({problemId:problem._id});}
    }
});