Template.problem.events({
    "click #add": function(){
     //Meteor.call("insertProblem"  
    }
});

Template.problem.onRendered(function(){
     $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
});