//For use with sample app for the KDN

(function() {
    "use strict";
    var deleteEvents = ["app.record.detail.delete.submit", "app.record.index.delete.submit"];
    kintone.events.on(deleteEvents, function(event) {
        //confirm the record deletion:
        return swal({
            title: 'Are you sure? Your record cannot be restored.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'I\'m sure.',
            cancelButtonText: 'No, cancel deletion.'
        }).then(function(result) {
            if (!result.value) {
                //if restoring the record:
                swal('Your record is not deleted.');
                return false;
            }
            return event;
        });
    });
})();
