(function() {
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
            },
            controller: customListController,
            controllerAs: 'customListCtrl',
            transclude: true,
            restrict: 'E',
            templateUrl: 'app/components/customList.template.html'
//             template:  ''+
// '            <md-content class="md-padding scroll tab-content">'
// +'    <md-list>'
// +'        <md-list-item class="md-2-line" ng-repeat="item in customListCtrl.items | filter: customListCtrl.filterFunction" ng-class="customListCtrl.selectedItem == item ? \'selected\':\'\'" ng-click="customListCtrl.toggleSelection(item)">'

// +'            <md-button ng-click="customListCtrl.changePriority(item)" class="md-icon-button" aria-label="Priority">'
// +'                <md-icon style="color: green" ng-if="item.priority == -1">low_priority</md-icon>'
// +'                <md-icon ng-if="item.priority == 0">label</md-icon>'
// +'                <md-icon style="color: red" ng-if="item.priority == 1">priority_high</md-icon>'
// +'            </md-button>'
// +'            <div class="md-list-item-text">'
// +'                <h3>{{item.title}}</h3>'
// +'                <p> {{item.date | date: "dd-MM-yyyy HH:mm"}}</p>'
// +'            </div>'
// +'            <md-checkbox ng-model="item.done" ng-change="customListCtrl.checkStateChanged()" class="md-primary md-align-top-right">'
// +'            </md-checkbox>'
// +'            <md-divider></md-divider>'
// +'        </md-list-item>'
// +'    </md-list>'
// +'</md-content>'
        };
    }
    customListController.$inject=['storageService'];
    //Directive controller
    function customListController(storageService) {
        var vm = this;
        vm.changePriority=changePriority;
        vm.checkStateChanged=checkStateChanged;
        vm.toggleSelection=toggleSelection;
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