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
                itemSelected: '=',
                emptyList: '='
            },
            controller: customTimelineController,
            controllerAs: 'customTimelineCtrl',
            restrict: 'E',
            templateUrl: 'app/components/verticalTimeline.template.html'

        };
    }
    customTimelineController.$inject = ['storageService'];
    //Directive controller
    function customTimelineController(storageService) {
        var vm = this;
        vm.changePriority = changePriority;
        vm.checkStateChanged = checkStateChanged;
        vm.toggleSelection = toggleSelection;
        vm.iteminArray = iteminArray;
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

        function toggleSelection(item) { //multiple selection


            var index = vm.itemSelected.indexOf(item);
            if (index < 0) {
                vm.itemSelected.push(item);
            } else {
                vm.itemSelected.splice(index, 1);
            }
            if (vm.itemSelected.length == 0) {
                vm.emptyList = true;
            }
            else if (vm.itemSelected.length > 0) {
                vm.emptyList = false;
            }

        }
        function iteminArray(item) { //check if an item is in array for delete icon
            var indice = vm.itemSelected.indexOf(item);
            if (indice < 0) {
                return false;
            }
            else return true;
        }

    }

})();