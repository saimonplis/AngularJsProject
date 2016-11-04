(function (angular) {

    'use strict';

    angular.module('todoApp', ['ngMaterial', 'ngAnimate', 'ngTouch']).controller('TodoController', TodoController);
    TodoController.$inject = ['storageService', '$mdDialog'];
    function TodoController(storageService, $mdDialog) {
        var vm = this;
        var priorities = {
            lowpriority: 0,
            highpriority: 1
        };
        vm.tags = [];
        vm.priorities = priorities;
        vm.empty= true;
        vm.itemSelected = [];
        vm.selectedItem = null;
        vm.items = storageService.get() || [];

        vm.notDone = function (item) {
            return item.done == false;
        }

        vm.done = function (item) {
            return item.done == true;
        }

        vm.all = function (item) {
            return true;
        }


        //Delete the current selected item, if any
        vm.deleteItem = function (ev) {

            if (vm.itemSelected.length != 0) {
                var confirm = $mdDialog.confirm()
                    .textContent('The task   will be deleted. Are you sure?')
                    .ariaLabel('Delete task')
                    .targetEvent(ev)
                    .ok('Yes')
                    .cancel('No');

                $mdDialog.show(confirm).then(function (result) {
                  /*  if (result) {
                        var index = vm.items.indexOf(vm.selectedItem);
                        if (index != -1) {
                            vm.selectedItem = null;
                            vm.items.splice(index, 2);
                            storageService.set(vm.items);
                        }
                    }
                    vm.selectedItem = null;*/
                    var i;
                    var indici=[];
                    console.log(vm.itemSelected.length);
                    for(i=0;i<vm.itemSelected.length;i++){
                        var indice=vm.items.indexOf(vm.itemSelected[i]);
                        
                        console.log(vm.itemSelected[i]);
                        if(indice>=0){
                            
                            vm.items.splice(indice,1);
                          
                            console.log(vm.itemSelected);
                        }

                    }
                vm.itemSelected.splice(0,vm.itemSelected.length);//svuoto arrayselezionati
                storageService.set(vm.items);
                    
                });
            }
        }

        vm.deleteSingleTask = function (ev) {
            var confirm = $mdDialog.confirm()

                .textContent('Are you sure to delete?')
                .ariaLabel('Delete task')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function (result) {
                if (result) {
                    if (vm.indice != -1) {
                        vm.items.splice(vm.indice, 1);
                        storageService.set(vm.items);
                    }
                }
                vm.selectedItem = null;
            });
        }

        //Creates a new item with the given parameters
        vm.createItem = function (task) {

            vm.items.push({
                title: task.title,
                description: task.description,
                done: task.done || false,
                priority: task.priority || 0,
                tag: task.tags || 'generic',
                ework: task.ework || 'notspecified',
                date: task.date || Date.now()
            });
            storageService.set(vm.items);
            console.log(vm.items);
        };

     


        //Add a new task to the items list 
        vm.addTask = function (ev) {
            showDialog(ev);
        };

        function showDialog($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'app/components/customDialog.template.html',
                locals: {
                    items: vm.items,
                    priorities: vm.priorities,
                    tags: vm.tags
                },
                controller: DialogController,
                controllerAs: 'dctrl',
                clickOutsideToClose: true,

            }).then(function (task) {

                vm.createItem(task);
                vm.tags = [];
            });
        };


        function DialogController($mdDialog, items, priorities, tags) {
            var vm = this;
            vm.items = items;
            vm.priorities = priorities;

            vm.tags = tags;
            console.log(vm.tags);
            vm.editableTags = angular.copy(vm.tags);
            vm.removable = true;
            vm.readonly = false;
            vm.closeDialog = function () {
                $mdDialog.cancel();
            }
            vm.createTask = function (title, description, priority, date, tags) {

                var task = {
                    title: title,
                    description: description,
                    priority: priority,
                    date: date,
                    tags: tags,

                };


                $mdDialog.hide(task);
            }
            vm.newTag = function (chip) {
                vm.tags.push(chip);
                console.log(vm.tags);
            }
        };
    }
})(window.angular);