Template.problemForm.events({
    "click #cake": function(){
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
    }
});

Template.problemForm.onRendered(function(){ 
    $('select').material_select();
             
});