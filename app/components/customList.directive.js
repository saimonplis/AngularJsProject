(function () {
    'use strict';

    angular
        .module('todoApp')
        .directive('customList', directive);

    function directive() {
        return {
            scope: {},
            bindToController: {
                items: '=',
                selectedItem: '=',
                filterFunction: '=',
                filterView: '=',
                itemSelected: '='
            },
            controller: customListController,
            controllerAs: 'customListCtrl',
            transclude: true,
            restrict: 'E',
            templateUrl: 'app/components/customList.template.html'

        };
    }
    customListController.$inject = ['storageService'];
    //Directive controller
    function customListController(storageService) {
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
        
        function toggleSelection(item) {
            /*
            if (vm.selectedItem == null || vm.selectedItem != item)
                vm.selectedItem = item;
            else
                vm.selectedItem = null;
                */
            var index = vm.itemSelected.indexOf(item);
            if(index<0){
                vm.itemSelected.push(item);
            }else{
                vm.itemSelected.splice(index, 1);
            }
            console.log(vm.itemSelected);
        }
        function iteminArray(item){
            var indice = vm.itemSelected.indexOf(item);
            if(indice<0){
                return false;
            }
            else return true;
        }
        
    }

})();