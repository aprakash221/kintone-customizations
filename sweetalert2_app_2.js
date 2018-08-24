//For use with sample app for the KDN

(function() {
    "use strict";
    kintone.events.on("app.record.create.submit", function(event) {
        //confirm saving the record:
        return swal({
            title: 'Are you sure you want to save this record?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Save',
            cancelButtonColor: '#d33'
        }).then(function(result) {
            if (!(result.value)) {
                swal({
                    position: 'center',
                    timer: 1200,
                    //confirm failed record save:
                    text: 'You did not save the record',
                    type: 'success',
                    showConfirmButton: false
                });
                return false;
            }
            return event;
        });
    });
})();
