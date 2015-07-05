var returned = Meteor.subscribe('problems',{
 onError: function() {console.log(arguments);},
    onReady: function() { Problems.find().forEach(function(problem){
    Meteor.subscribe('pictures', problem._id);
});}
});


