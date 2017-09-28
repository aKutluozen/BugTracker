angular.module('myBugs')
    // Main bugs controller
    .controller("BugsController", ["$scope", "$firebaseArray", "$firebaseObject", "$sce", "$timeout", "$location", function ($scope, $firebaseArray, $firebaseObject, $sce, $timeout, $location) {
        // Firebase reference link
        var reference = new Firebase("https://bugs-d0753.firebaseio.com/");
        $scope.bugs = $firebaseArray(reference);
        $scope.where = $location.path();
        
        // Variable to hide the manager's page
        $scope.showSite = false;
        if ($.cookie("loggedin") === "true") {
            $scope.showSite = true;
        }
        
        // Filtering variable and function
        $scope.filtering = "All";
        $scope.filterType = function(type){
            $scope.filtering = type;
        }
        
        // Shows add bug form
        $scope.showAddForm = function () {
            clearFields();
            $scope.addFormShow = true;
            $scope.bugShow = false;
        }
        
        // Shows edit form, populates the values
        $scope.showEditForm = function (bug) {
            clearFields();
            $scope.editFormShow = true;
            $scope.bugShow = false;
            $scope.id = bug.$id;
            $scope.type = bug.type;
            $scope.platform = bug.platform;
            $scope.bugDate = bug.date;
            $scope.name = bug.name;
            $scope.assigned = bug.assigned;
            $scope.status = bug.status;
            $scope.description = bug.description;
        }
        
        // Hides open views, resets fields
        $scope.hide = function () {
            $scope.addFormShow = false;
            $scope.editFormShow = false;
            $scope.bugShow = false;
            clearFields();
        }
        
        // Sets the variables and adds them to Firebase DB on promise
        $scope.addFormSubmit = function () {
            $scope.bugShow = false;
            console.log("Adding bug...");
            // Assign values
            if ($scope.status) {
                var status = $scope.status;
            }
            else {
                var status = null;
            }
            if ($scope.platform) {
                var platform = $scope.platform;
            }
            else {
                var platform = null;
            }
            if ($scope.name) {
                var name = $scope.name
            }
            else {
                var name = null;
            }
            if ($scope.description) {
                var description = $scope.description;
            }
            else {
                var description = null;
            }
            if ($scope.type) {
                var type = $scope.type;
            }
            else {
                var type = null;
            }
            if ($scope.assigned) {
                var assigned = $scope.assigned;
            }
            else {
                var assigned = null;
            }
            // Get date and format it
            var dt = new Date();
            dt = dt.toLocaleString();
            $scope.bugs.$add({
                name: name
                , status: 'Open'
                , description: description
                , type: type
                , assigned: assigned || "Jake Friedfeld"
                , platform: platform
                , date: dt
            }).then(function (reference) {
                var id = reference.key();
                console.log("Added bug with ID: " + id);
                clearFields();
                $scope.addFormShow = false;
                $scope.msg = "Added!";
                $timeout(function () {
                    $scope.msg = "";
                }, 2000);
            });
        }
        
        // Submits the updates to Firebase DB.
        $scope.editFormSubmit = function () {
            var id = $scope.id;
            var record = $scope.bugs.$getRecord(id);
            record.name = $scope.name;
            record.assigned = $scope.assigned;
            record.status = $scope.status;
            record.description = $scope.description;
            record.type = $scope.type;
            record.platform = $scope.platform;
            $scope.bugs.$save(record).then(function (reference) {
                console.log(reference.key);
            });
            clearFields();
            $scope.editFormShow = false;
            $scope.msg = "Bug updated!";
            $timeout(function () {
                $scope.msg = "";
            }, 2000);
        }
        
        // Shows an individual bug in a small window
        $scope.showBug = function (bug) {
            $scope.name = bug.name;
            $scope.assigned = bug.assigned;
            $scope.description = bug.description;
            $scope.status = bug.status;
            $scope.type = bug.type;
            $scope.platform = bug.platform;
            $scope.bugDate = bug.date;
            $scope.bugShow = true;
        }
        
        // Deletes a given bug
        $scope.removeBug = function (bug) {
                console.log("Deleting a bug");
                $scope.bugShow = false;
                $scope.bugs.$remove(bug);
                $scope.msg = "Bug is removed!";
                $scope.bugShow = false;
                $timeout(function () {
                    $scope.msg = "";
                }, 2000);
            }
        
        // Clear all $scope Fields
        function clearFields() {
            console.log('Clearing All Fields...');
            $scope.name = '';
            $scope.description = '';
            $scope.type = '';
            $scope.platform = '';
            $scope.assigned = 'Jake Friedfeld';
        }
}]);