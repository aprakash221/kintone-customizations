//For use with sample app for the KDN

(function() {
  'use strict';
    kintone.events.on('app.record.detail.process.proceed' , function(event) {
      var record = event.record;
      var status = event.nextStatus.value;
      
      if (status === 'Sent for Review') {
          var creator = record['reviewer'].value[0].name;
          toastr.info('Sent to ' + creator + ' for review!');
      } else if (status === 'In progress') {
          var assigned = record['assignee'].value[0].name;
          toastr.info(assigned + ' has been notified of their task!');
      }
       
  });
   
})();
