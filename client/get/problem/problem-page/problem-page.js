var problem;
Template.problemPage.helpers({
    pushIdToPage: function(){
        var id = this._id;
     problem = Problems.findOne({_id:id});       Meteor.subscribe('pictures',problem);
    },
    Picture: function(){
        return Pictures.find({problem:problem});}
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
    Meteor.call("insertPicture",fileLoadedEvent.target.result,problem); 
            if(numberOfFiles<files.length){
 fileReader.readAsDataURL(files[numberOfFiles++]);
            }        
        };
        
 fileReader.readAsDataURL(files[numberOfFiles++]);
    }
});