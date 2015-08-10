Template.layout.events({
   'click #login': function(){
    Meteor.loginWithGoogle(
        {requestPermissions: ['email']},
        function(error){
            if(error){
                console.log(error.reason);
            }
        }
    );
   }
});

Template.layout.helpers({
    templateGestures: {

    }
});

createTourItemContent = function(title, description){
    return $('<div class="row">' +
        '<div class="col s12">' +
            '<div class="card indigo-text">'+
                '<div class="card-content">'+
                    '<span class="card-title indigo-text">'+title+'</span>'+
                        '<h6>'+description+'</h6>'+
                '</div>'+
                    '<div id="backward-tour" class="card-action col s6 center-align waves-effect waves-teal">'+
                        '<i class="material-icons small">chevron_left</i>'+
                    '</div>'+
                    '<div id="forward-tour" class="card-action col s6 center-align waves-effect waves-teal">'+
                        '<i class="material-icons small">chevron_right</i>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>');
}
createTourItem = function(item,orientation,placement,title,description,next,prev,tourItems,extraFunction){
    $('#'+item).qtip({
        content: {
            text: createTourItemContent(title, description)
        },
        style: {
            def: false
        },

        position: {
            target: $('#'+item),
            my: orientation,
            at: placement,
        },
        show: {
            ready: true
        },
        hide: false,
        events: {
            show: function (event, api) {
                $('#forward-tour').click(function(){
                            api.destroy(true);
                            if(typeof extraFunction === "function"){
                                var nextControl = extraFunction();
                                if(nextControl === "timeOut" ){
                                    Meteor.setTimeout(function() {
                                        createTourItem(tourItems[next][0], tourItems[next][1], tourItems[next][2], tourItems[next][3], tourItems[next][4],next + 1, prev + 1, tourItems, tourItems[next][5]);
                                    },250);
                                } else if(nextControl==="goToProblem") {
                                    createTourItem(tourItems[next][0], tourItems[next][1], tourItems[next][2], tourItems[next][3], tourItems[next][4], next + 1, prev + 1, tourItems, function () {
                                        Router.go('/get/' + Problems.findOne()._id);
                                        return "timeOut";
                                    });
                                } else if(nextControl === "goToPhoto") {
                                    createTourItem(tourItems[next][0], tourItems[next][1], tourItems[next][2], tourItems[next][3], tourItems[next][4], next + 1, prev + 1, tourItems, function () {
                                        Router.go('/get/'+Pictures.findOne().problemId+'/'+Pictures.findOne()._id);
                                        return "timeOut";
                                    });

                            } else {
                                    createTourItem(tourItems[next][0], tourItems[next][1], tourItems[next][2], tourItems[next][3], tourItems[next][4], next + 1, prev + 1, tourItems, tourItems[next][5]);

                                }
                            } else {
                                createTourItem(tourItems[next][0],tourItems[next][1],tourItems[next][2],tourItems[next][3],tourItems[next][4],next+1,prev+1,tourItems,tourItems[next][5]);
                            }

                    }
                );
                $('#backward-tour').click(function(){
                        api.destroy(true);
                        if(typeof extraFunction ==="function"){extraFunction();}
                        createTourItem(tourItems[prev][0],tourItems[prev][1],tourItems[prev][2],tourItems[prev][3],tourItems[prev][4],next-1,prev-1,tourItems,tourItems[prev][5]);
                });
            }
        }
    });
}

Template.layout.onRendered(function(){
    tourItems =     [
                            ["header-cake","top left","bottom center","Home Button","This button returns you to the home screen."],
                            ["header-give","top center","bottom center","Give Help","Click this link to give help."],
                            ["header-get","top center","bottom center","Get Help","Click this link if you need help."],
                            ["header-help","top right","bottom center","About","Click if you want to know more about this application or contact me.",function(){Router.go('get');return "timeOut";}],
                            ["get-problemForm","top center","bottom center","Add Problem","This button will show you the form to ask for help.",function(){$('#showAddForm').trigger("click");$('#title').focus().val("A test problem for starting out"); $('select').focus().val("161");$('#description').focus().val("This problem will help you learn how to use the site!");}],
                            ["get-problemForm","bottom center","top center","Add Problem II", "Click this button again in order to add the problem to your list.",function(){$('#opened').trigger("click");return "goToProblem"}],
        ["get-zoomIn","bottom center","top center","Zoom In","Clicking this button will bring you to the page for this problem"],
        ["addPhoto","top left","bottom center","Add Photo","Clicking this button allows you to add photos to your problem. We'll ask you to add one of your photos when you click next here!",function(){
            $('#addPhoto').click();
        }],
        ["deleteButton","top left","bottom center","Delete Button","This button will delete the problem and everything in it. Let's not click that!"],
        ["sendOut","top center","bottom center","Share Problem","This button shares your problem so that other people can help you solve it",function(){return "goToPhoto";}],
        ["get-image","right center","left center","Inserted Image","Clicking this image will bring you to a page totally for investigating it."],
        ["get-problem-picture","bottom center","center","Picture","This picture would be of some work you've done. Here you will interact with other people in order to solve your problems. We'll open the picture option and you can insert another picture.",function(){
            var height = $('.image').height()/2;
            var width = $('.image').width()/2;
            var event = $.Event('click')
            event.offsetX = width;
            event.offsetY = height;
            $('.image').trigger(event);
            return "timeOut";
        }],
        ['qtipForm',"bottom-center","top center","Some Options","You click on the image in order to communicate -- adding feedback or responding to it -- you have two options: comment or picture",function(){
            $('#pictureClick').click();
        }],
        ['commentForm',"right center","left center","Add a comment","You can add a caption to your picture. Then, we click the Add button in order to insert it onto the original picture.",function(){
            $('#addComment').click(); return "timeOut";
        }],

    ];
        //createTourItem(tourItems[0][0],tourItems[0][1],tourItems[0][2],tourItems[0][3],tourItems[0][4],1,-1,tourItems,tourItems[0][5]);


    function deletePhoto(photoId) {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this photo?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#ec6c62"
        }, function() {
            $.ajax({
                url: "/api/photos/" + photoId,
                type: "DELETE"
            })
                .done(function(data) {
                    swal("Deleted!", "Your file was successfully deleted!", "success");
                })
                .error(function(data) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });
        });
    };
    });