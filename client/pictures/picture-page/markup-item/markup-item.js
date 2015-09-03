Template.markupItem.onRendered(function(){
    var context = Template.currentData();
    var cardTip =     $('<div id="markup-point-' + context._id + '" class="indigo lighten-1" style="border-radius:' +
        ' 50%;width: 15px;' +
        ' height: 15px; opacity:.9;">');


    var position = context.position;
    $('#card-'+context._id).qtip({
        id:""+context._id,
        content: {
            text:cardTip
        },
        style: {
            def: false
        },
        position: {
            target: $('#image-'+context.pictureId),
            at: "top left",
            my: "top left",
            adjust: {
                x: position[0] * $('#image-'+context.pictureId).width(),
                y: position[1] * $('#image-'+context.pictureId).height(),
                resize: false
            }
        },
        show:{
            ready:true
        },
        hide:false,
        events:{
            render:function(){
                var api = $('#qtip-'+context._id).qtip('api');
                api.set('opened',false);
                var hold = api.get('content.text');
                $('#qtip-'+context._id).click(function(){
                    if(!api.get('opened')) {
                        if (context.data)cardTip = $('<div id="markup-' + context._id + '" class="row">' +
                            '<div class="col s12">' +
                            '<div class="card indigo-text">' +
                            '<div class="card-content">' +
                            '<span class="card-title indigo-text">' + context.pictureComment + '</span>' +
                            '<img src=' + context.data + '>' +
                            '</div></div></div>');
                        else cardTip = $('<div id="markup-' + context._id + '" class="row">' +
                            '<div class="col s12">' +
                            '<div class="card indigo-text">' +
                            '<div class="card-content">' +
                            '<span class="card-title indigo-text">' + context.pictureComment + '</span>' +
                            '</div></div></div>');
                        api.set("content.text", cardTip);
                        api.set('opened', true);

                    } else {
                        api.set('content.text',hold);
                        api.set('opened',false);
                    }
                });
                $('#qtip-'+context._id).hover(function(){
                    $('#qtip-'+context._id).css("opacity",1.0);
                    if(context.data)cardTip=$('<div id="markup-'+context._id+'" class="row">'+
                        '<div class="col s12">'+
                        '<div class="card indigo-text">'+
                        '<div class="card-content">'+
                        '<span class="card-title indigo-text">'+context.pictureComment+'</span>'+
                        '<img src='+context.data +'>'+
                        '</div></div></div>');
                    else cardTip=$('<div id="markup-'+context._id+'" class="row">'+
                        '<div class="col s12">'+
                        '<div class="card indigo-text">'+
                        '<div class="card-content">'+
                        '<span class="card-title indigo-text">'+context.pictureComment+'</span>'+
                        '</div></div></div>');
                    api.set('content.text',cardTip);
                },function(){
                    api.set('content.text',hold);
                    $('#qtip-'+context._id).css("opacity",.9);
                })
            }
        }
    });
});
Template.markupItem.events({
    "click .markup": function(event){
        var context = this;
        $('#qtip-'+context._id).ready(function(){
            $('#qtip-'+context._id).css("opacity",.9);});
            var cardTip;
            if(context.data)cardTip=$('<div id="markup-'+context._id+'" class="row">'+
                '<div class="col s12">'+
                '<div class="card indigo-text">'+
                '<div class="card-content">'+
                '<span class="card-title indigo-text">'+context.pictureComment+'</span>'+
                '<img src='+context.data +'>'+
                '<div class="col card-action s12 waves-effect waves-teal center-align indigo-text clearMark"><i class="material-icons small">clear</i>'+
                '</div></div></div></div>');
            else cardTip=$('<div id="markup-'+context._id+'" class="row">'+
                '<div class="col s12">'+
                '<div class="card indigo-text">'+
                '<div class="card-content">'+
                '<span class="card-title indigo-text">'+context.pictureComment+'</span>'+
                '<div class="col card-action s12 waves-effect waves-teal center-align indigo-text clearMark"><i class="material-icons small">clear</i>'+
                '</div></div></div></div>');
            var position = context.position;
            $('#card-'+this._id).qtip({
                id:this._id,
                content: {
                    text:cardTip
                },
                style: {
                    def: false
                },
                position: {
                    target: $('#image-'+context.pictureId),
                    at: "top left",
                    my: "top left",
                    adjust: {
                        x: position[0] * $('#image-'+context.pictureId).width(),
                        y: position[1] * $('#image-'+context.pictureId).height(),
                        resize: false
                    }
                },
                show:{
                    ready:true
                },
                hide:false,
                events:{
                    render:function(){
                        $('#qtip-'+context._id).css("opacity",.9);
                        $('#qtip-'+context._id).click(function(){
                            var api = $('#qtip-'+context._id).qtip('api');
                            api.destroy();
                        })

                        $('#qtip-'+context._id).hover(function(){
                            $('#qtip-'+context._id).css("opacity",1.0);
                        },function(){
                            $('#qtip-'+context._id).css("opacity",.9);
                        })
                    }
                }
            });
        },
    "click .deleteMark": function(event){
        event.preventDefault();
        element = $(event.toElement);
        $('#qtip-'+element.attr('id')).remove();
        Meteor.call("deleteMarkup",element.attr('id'))
    },
    "click .push":function(event){
        event.preventDefault();
        var item;
        var picture = "";
        if(this.data){
            picture = "<img src="+this.data+">";

        }
        item = $('<div class="row"><div class="col s12">' +
                    '<div id="owlItem-'+this._id+'"class="card indigo-text markup waves-effect waves-teal">' +
                        '<div class="card-content"><span class="card-title indigo-text">'+this.pictureComment+'</span>' +
                            picture +
                        '</div>' +
                        '<div id="'+this._id+'" class="deleteMark card-action s6 waves-effect waves-teal">' +
                            '<i id="'+this._id+'"class="material-icons small">clear</i></div>' +
                        '<div id="'+this._id+'"class="unPush card-action s6 waves-effect waves-teal">' +
                            '    <i id="'+this._id+'" class="material-icons small">call_made</i></div>' +
                    '</div></div></div>');
        var owl = $('.owl-carousel');
        if($('.qtip')[0])$('.qtip').qtip('api').hide();
        owl.data('owlCarousel').addItem(item,-1);
        //owl.trigger('add.owl.carousel', [item]);

        //$("#card-"+this._id).hide("fast");

    },
    "click .stack": function(event){
        var context = this;

    },
});
