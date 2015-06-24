var problem;
Template.problemPage.helpers({
    pushIdToPage: function(){
        var id = this._id;
     problem = Problems.findOne({_id:id});       Meteor.subscribe('pictures',problem._id);
    },
    Picture: function(){
        return Pictures.find({problemId:problem._id});}
});


Template.problemPage.events({
   "click #addPhoto": function(){
document.getElementById("pictureInput").click();
   },
    "change #pictureInput": function(){
            var files = $('#pictureInput')[0].files;
        var fileReader = new FileReader();
        var numberOfFiles = 0;

        fileReader.onload = function(fileLoadedEvent){     
    Meteor.call("insertPicture",fileLoadedEvent.target.result,problem._id); 
            if(numberOfFiles<files.length){
 fileReader.readAsDataURL(files[numberOfFiles++]);
            }        
        };
        
 fileReader.readAsDataURL(files[numberOfFiles++]);
    },
    "click #sendOut": function(){
     Meteor.call("sendOutProblem",problem);     
    }
});