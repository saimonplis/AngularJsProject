(function () {
    'use strict';

    angular
        .module('todoApp')
        .directive('customTimeline', directive);

    function directive() {
        return {
            scope: {},
            bindToController: {
                items: '=',
                selectedItem: '=',
                filterFunction: '=',
                filterView: '=',
                deleteSingleTask: '&' 
            },
            controller: customTimelineController,
            controllerAs: 'customTimelineCtrl',
            transclude: true,
            restrict: 'E',
            templateUrl: 'app/components/verticalTimeline.template.html'

        };
    }
    
    customTimelineController.$inject = ['storageService'];
    //Directive controller
    
    function customTimelineController(storageService) {
        var vm = this;
        vm.indice = null;
        vm.changePriority = changePriority;
        vm.checkStateChanged = checkStateChanged;
        vm.toggleSelection = toggleSelection;
        //Changes the priority of the given item
        function changePriority(item) {
            if (item.priority <= 0)
                item.priority++;
            else
                item.priority = -1;

            storageService.set(vm.items);
        }

        //Occurs when the status of an items changes
        function checkStateChanged() {
            storageService.set(vm.items);
        }

        //Select or deselect the given item
        function toggleSelection(item) {
            if (vm.selectedItem == null || vm.selectedItem != item)
                vm.selectedItem = item;
            else
                vm.selectedItem = null;
        }
    }
    
})();