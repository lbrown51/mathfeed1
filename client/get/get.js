Template.get.helpers({
   Problems: function(){
           var userId = Meteor.userId();
       return Problems.find({userId:userId}, {sort: {date: -1}});
   }
});

Template.get.events({
    "click #showAddForm": function(){
        $('#problemForm').show("fast");
        $('#showAddForm').attr('id',"opened").click(function(){
            var title = $('#title').val();
            var course = $('select').val();
            var description = $('#description').val();
            Meteor.call('insertProblem',title,course,description,function(error,result){
                if(error){
                    Materialize.toast('Your thingy has not been entered into the thingy because '+error, 4000);
                } else {
                    Materialize.toast('Your thingy has been entered into the thingy', 4000);
                    $('#problemForm').hide('fast');
                }
            });
            $('#opened').attr("id","showAddForm");
        });
    },
    "click #delete": function(){
       var problemId = $('.active').attr('id');
       if(typeof problemId !== "undefined"){
    Meteor.call('deleteProblem',problemId);}
    }
});