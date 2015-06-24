Template.problemForm.events({
   "click #problemForm": function(){
    $('#problemForm').show();   
   },
    "click #cake": function(){
        
    }
});

Template.problemForm.onRendered(function(){
   
  $(document).ready(function() {
    $('select').material_select();
  });
             
});