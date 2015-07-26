Template.markupItem.onRendered(function () {

});


Template.markupItem.helpers({
    isImage: function () {
        var check = this.data.substr(0, 4);
        if (check === "data") {
            return true;
        } else {
            return false;
        }
    },

});


Template.markupItem.events({
    "click .comment": function (event) {
        if (this.position) {
            $(event.toElement).addClass('active');
            var context = this;
            var tooltips = $('#' + context._id).qtip({
                id: context._id,
                content: {
                    text: context.data
                },
                overwrite: false,
                style: {
                    classes: 'qtip-tipsy'
                },

                position: {
                    target: $('.image'),
                    at: "top left",
                    adjust: {
                        x: context.position[0],
                        y: context.position[1],
                        resize: false
                    }
                },
                show: {
                    ready: true
                },
                hide: {
                    event: {
                        target: $('#' + context._id)
                    },
                    fixed: true,
                    leave: false,
                },
                events: {
                    render: function (event, api) {
                        $(this).hammer().bind("press", function (e) {

                            e.stopPropagation();
                            event.preventDefault();
                            var id = context._id;
                            var element = $(this);

                            if ($('#deleteBox' + id)[0]) {
                                $('#edit' + id).remove();
                            } else {

                                var expandedView = $('<div id="edit' + id + '"class="row"><div class="input-field col s12"><input value="' + element[0].childNodes[1].childNodes[0].data + '" id="editBox' + id + '" id="edit" type="text" class="validate"><label class="active" for="edit">Edit Entry</label></div><div id="save' + id + '" class="col s6 indigo waves-effect waves-light btn">Save</div><div class="waves-effect waves-light btn col s6 red" id="deleteBox' + id + '">Delete</div><div id="explore'+id+'" class="col s12 waves-effect waves-light btn">Explore</div></div>');
                                $(element[0].childNodes[1]).after(expandedView);
                                $('#deleteBox' + id).click(function () {
                                    Meteor.call("deleteMarkup", id);
                                    api.destroy();
                                });

                                $('#save' + id).click(function (event) {
                                    event.preventDefault();
                                    var text = $('#editBox' + id).val();
                                    element[0].childNodes[1].childNodes[0].data = text;
                                    Meteor.call('updateMarkup', id, text);
                                    $('#edit' + id).remove();
                                });


                                $('#explore' + id).click(function () {
                                    imageArray.push(Markups.findOne({_id: id}));
                                    subs.subscribe('markups',id);
                                });
                            }

                        });


                        $(this).dblclick(function (e) {
                            e.stopPropagation();
                            event.preventDefault();
                            var id = context._id;
                            var element = $(this);

                            if ($('#deleteBox' + id)[0]) {
                                $('#edit' + id).remove();
                            } else {
                                var expandedView = $('<div id="edit' + id + '"class="row"><div class="input-field col s12"><input value="' + element[0].childNodes[1].childNodes[0].data + '" id="editBox' + id + '" id="edit" type="text" class="validate"><label class="active" for="edit">Edit Entry</label></div><div id="save' + id + '" class="col s6 indigo waves-effect waves-light btn">Save</div><div class="waves-effect waves-light btn col s6 red" id="deleteBox' + id + '">Delete</div><div id="explore' + id + '" class="col s12 waves-effect waves-light btn">Explore</div></div>');
                                $(element[0].childNodes[1]).after(expandedView);

                                $('#deleteBox' + id).click(function () {
                                    Meteor.call("deleteMarkup", id);
                                    api.destroy();
                                });

                                $('#save' + id).click(function (event) {
                                    event.preventDefault();
                                    var text = $('#editBox' + id).val();
                                    element[0].childNodes[1].childNodes[0].data = text;
                                    Meteor.call('updateMarkup', id, text);
                                    $('#edit' + id).remove();
                                });

                                $('#explore' + id).click(function () {
                                    imageArray.push(Markups.findOne({_id: id}));
                                    subs.subscribe('markups',id);
                                });
                            }

                        });
                    }
                }
            });

        }

    },


    "click .markImage": function (event) {
        var context = this;
        if (context.position) {
            $(event.toElement).addClass('active');
            var tooltip = $('#' + context._id).qtip({
                id: context._id,
                content: {
                    text: function () {
                        return "<p>" + context.pictureComment + "</p>" + "<img src='" + context.data + "' class='qtip-image'>";
                    }
                },

                show: {
                    ready: true
                },
                position: {
                    target: $('.image'),
                    at: "top left",
                    adjust: {
                        x: context.position[0],
                        y: context.position[1],
                        resize: false,

                    }
                },

                hide: {
                    event: {
                        target: $('#' + context._id)
                    },
                    fixed: true,
                    leave: false,
                },
                events: {
                    render: function (event, api) {

                        $(this).hammer().bind("press", function (e) {
                            e.stopPropagation();
                            event.preventDefault();
                            var id = context._id;
                            var element = $(this);
                            console.log(id);
                            if ($('#edit' + context._id)[0]) {
                                $('#edit' + context._id).remove();
                            } else {

                                var expandedView = $('<div id="edit' + id + '"class="row"><div class="input-field col s12"><input value="' + element[0].childNodes[1].childNodes[0].childNodes[0].data + '" id="editBox' + id + '" id="edit" type="text" class="validate"><label class="active" for="edit">Edit Entry</label></div><div id="save' + id + '" class="col s6 indigo waves-effect waves-light btn">Save</div><div class="waves-effect waves-light btn col s6 red" id="deleteBox' + id + '">Delete</div><div id="explore'+id+'" class="col s12 waves-effect waves-light btn">Explore</div><div id="zoomIn' + id + '" class="col s12 waves-effect waves-light btn">Zoom In</div></div>');
                                $(element[0].childNodes[1]).after(expandedView);

                                $('#deleteBox' + id).click(function () {
                                    Meteor.call("deleteMarkup", id);
                                    api.destroy();
                                });

                                $('#save' + id).click(function (event) {
                                    event.preventDefault();
                                    var text = $('#editBox' + id).val();
                                    element[0].childNodes[1].childNodes[0].data = text;
                                    console.log(element);
                                    //Meteor.call('updateMarkup',id,text);
                                    //$('#edit'+id).remove();
                                });

                                $('#explore' + id).click(function () {
                                    imageArray.push(Markups.findOne({_id: id}));
                                    subs.subscribe('markups',id);
                                });

                                $('#zoomIn' + id).click(function () {
                                    imageArray.push(Markups.findOne({_id: id}));
                                    subs.subscribe('markups',id);
                                    $('.image').attr('src',$(element.children().children('img')).attr('src'));
                                    api.destroy();
                                });
                            }

                        });


                        $(this).dblclick(function (e) {
                            e.stopPropagation();
                            event.preventDefault();
                            var id = context._id;
                            var element = $(this);
                            var elementText = $(element.children().children('p')).text();

                            if ($('#deleteBox' + context._id)[0]) {
                                $('#deleteBox' + context._id).remove();
                                $('#edit' + context._id).remove();
                            } else {

                                var expandedView = $('<div id="edit' + id + '"class="row"><div class="input-field col s12"><input value="' + elementText + '" id="editBox' + id + '" id="edit" type="text" class="validate"><label class="active" for="edit">Edit Entry</label></div><div id="save' + id + '" class="col s6 indigo waves-effect waves-light btn">Save</div><div class="waves-effect waves-light btn col s6 red" id="deleteBox' + id + '">Delete</div><div id="explore'+id+'" class="col s12 waves-effect waves-light btn">Explore</div><div id="zoomIn' + id + '" class="col s12 waves-effect waves-light btn">Zoom In</div></div>');
                                $(element[0].childNodes[1]).after(expandedView);

                                $('#deleteBox' + id).click(function () {
                                    Meteor.call("deleteMarkup", id);
                                    api.destroy();
                                });

                                $('#save' + id).click(function (event) {
                                    event.preventDefault();
                                    var text = $('#editBox' + id).val();
                                    $(element.children().children('p')).text(text);
                                    var data = element.children().children('img')[0].currentSrc;
                                    Meteor.call('updateMarkup',id,text,data);

                                    $('#edit'+id).remove();

                                });

                                $('#explore' + id).click(function () {
                                    imageArray.push(Markups.findOne({_id: id}));
                                    subs.subscribe('markups',id);
                                });

                                $('#zoomIn' + id).click(function () {
                                    imageArray.push(Markups.findOne({_id: id}));
                                    subs.subscribe('markups',id);
                                    $('.image').attr('src',$(element.children().children('img')).attr('src'));
                                    api.destroy();
                                });
                            }

                        });
                    }
                },
                style: {
                    classes: "qtip-tipsy"
                }
            });

        }
    },

    "click .active": function (event) {
        var api = $('#' + this._id).qtip('api');
        api.destroy();
        $(event.toElement).removeClass('active');
    }
});