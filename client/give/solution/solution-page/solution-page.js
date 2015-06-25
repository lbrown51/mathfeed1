var problem;
Template.solutionPage.helpers({
    pushIdToPage: function(){
        var id = this._id;
     problem = Problems.findOne({_id:id});       Meteor.subscribe('pictures',problem._id);
    },
    Picture: function(){
        return Pictures.find({problemId:problem._id});}
});