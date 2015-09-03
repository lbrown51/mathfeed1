Problems = new Mongo.Collection('problems');

Meteor.methods({ 
    insertProblem: function(title,course ,description){
        if(this.userId){
        check(title,String);
        check(course,String);
        check(description,String);
        
       
        var problemObj = {title: title, course:course, description: description, userId: this.userId,date:new Date(),out:false
                         };
Problems.insert(problemObj);
        } else {
            console.log("You must be logged in for that silly");
            return "You must be logged in for that silly";
        }
        },
    
    sendOutProblem: function(problem){
        
       Problems.update(problem, {$set: {out:true}});
    },
    
    deleteProblem: function(problemId){
        var problem = Problems.findOne({_id:problemId});
        var pictures = Pictures.find({problemId:problem._id});
        
        pictures.forEach(function(picture){
Comments.remove({pictureId:picture._id});
        });

        
       // console.log(problem);
    },
    
    deleteProblem: function(id){
     if(this.userId){
     if(Pictures.find({problemId:id}).count() > 0){ Pictures.find({problemId:id}).forEach(function(result, error){         Meteor.call("deletePicture",result._id);                                                         if(Problems.find({_id:id}).count()===1){
                Problems.remove({_id:id});  } 

         });
                                                 } else {
    Problems.remove({_id:id});
      }
     }   
    }
});