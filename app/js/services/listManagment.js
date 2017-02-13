(function() {

    var listManagmentService = function() {
        var ListManager = function(getList, createEmpty, saveNewObject, updateObject, deleteObject, getFullObject) {
            var manager = this;
            //this.displayList = getList() || [];
            manager.displayList = [];
            //Start by filling list
            var fillList = function() {
                if (getList) {
                    getList().then(function(list) {
                        manager.displayList = list;
                    });
                } else {
                    manager.displayList = [];
                }
            };
            fillList();

            var focusedIndex = -1;
            manager.getFocusedIndex = function() {
                return focusedIndex;
            };

            var clearFocusedObject = function() {
                manager.focusedObject = createEmpty();
                focusedIndex = -1;
            };
            clearFocusedObject();

            //assumes focused index is pointing at correct location
            function fillFocusedObject(listObject) {
                if (getFullObject) {
                    getFullObject(manager.displayList[focusedIndex])
                        .then(function(fullObject) {
                            manager.focusedObject = fullObject;
                        });
                } else {
                    manager.focusedObject = manager.displayList[focusedIndex];
                }
            }

            manager.Delete = function() {
                if (focusedIndex === -1) { return; }
                deleteObject(manager.focusedObject).then(function() {
                    manager.displayList.splice(focusedIndex, 1);

                    //keep an ellement selected after delete
                    if (manager.displayList.length > 0) {
                        if (focusedIndex >= manager.displayList.length) {
                            focusedIndex = manager.displayList.length - 1;
                        }
                        fillFocusedObject();
                    } else {
                        //nothing left
                        clearFocusedObject();
                    }
                });
            };

            manager.Save = function() {
                if (focusedIndex === -1) {
                    saveNewObject(manager.focusedObject).then(function() {
                        getList().then(function(list) {
                            manager.displayList = list;
                            clearFocusedObject();
                        });
                    });
                } else {
                    updateObject(manager.focusedObject);
                }
            };

            manager.Create = function() {
                clearFocusedObject();
            };

            manager.Select = function(object, index) {
                if (!index && index !== 0) {
                    focusedIndex = manager.displayList.indexOf(object);
                } else {
                    focusedIndex = index;
                }

                fillFocusedObject();
            };
        };

        return {
            getListManager: function(getList, createEmpty, saveNewObject, updateObject, deleteObject, getFullObject) {
                return new ListManager(getList, createEmpty, saveNewObject, updateObject, deleteObject, getFullObject);
            }
        };

    };



    var app = angular.module('SimpleWorkoutPlanner');
    app.factory('listManagment', listManagmentService);

}());