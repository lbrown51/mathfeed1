Problems = new Mongo.Collection('problems');

Meteor.methods({ 
    insertProblem: function(title,course ,description){
        if(this.userId){
        check(title,String);
        check(course,String);
        check(description,String);
        
       var user = Meteor.users.findOne({_id:this.userId});
        var problemObj = {title: title, course:course, description: description, user: user,data:new Date()  
                         };
Problems.insert(problemObj);
        } else {
            console.log("You must be logged in for that silly");
            return "You must be logged in for that silly";
        }
        }, 
});