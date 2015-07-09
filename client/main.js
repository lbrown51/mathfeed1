window.onbeforeunload = function(event){
    console.log(event);
    event.preventDefault();
};
