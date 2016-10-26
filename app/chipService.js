(function(){
    'use strict'
    angular
        .module('todoApp')
        .service('chipService',chipService);
    function chipService(){
        //variabili esposte
        this.tags=tags;
        this.editableTags=editableTags;
        

        var tags=['University','Office'];
        console.log(tags);
        var editableTags=angular.copy(tags,editableTags);
        var removable=true;
        var readonly=false;
        function getTags(){
            return tags;
        }
        function geteditableTags(){
            return editableTags;
        }


    }

})();