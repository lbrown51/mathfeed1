

Template.markupItem.events({
    "click .markup": function (event) {
        var cardTip;
        if(this.data)cardTip=$('<div class="row">'+
            '<div class="col s12">'+
            '<div class="card indigo-text">'+
            '<div class="card-content">'+
            '<span class="card-title indigo-text">'+this.pictureComment+'</span>'+
            '<img src='+this.data +'>'+
            '<div class="col s12 waves-effect waves-teal center-align indigo-text clearMark"><i class="material-icons small">clear</i>'+
            '</div></div></div></div>');
        else cardTip=$('<div class="row">'+
            '<div class="col s12">'+
            '<div class="card indigo-text">'+
            '<div class="card-content">'+
            '<span class="card-title indigo-text">'+this.pictureComment+'</span>'+
            '<div class="col s12 waves-effect waves-teal center-align indigo-text clearMark"><i class="material-icons small">clear</i>'+
        '</div></div></div></div>');
        var position = this.position;

        $('#card-'+this._id).qtip({
            content: {
                text:cardTip
            },
            style: {
                def: false
            },
            position: {
                target: $('.image'),
                at: "top left",
                my: "top left",
                adjust: {
                    x: position[0] * $('.image').width(),
                    y: position[1] * $('.image').height(),
                    resize: false
                }
            },
            show:{
                ready:true
            },
            hide:false,
            events:{
                render:function(event,api){
                    $('.clearMark').click(function(){
                        api.destroy();
                    })
                }
            }
        });
    }
});