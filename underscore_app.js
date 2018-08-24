//For use with sample app for the KDN

(function() {
    'use strict';
    kintone.events.on('app.record.index.show', function(event) {
        //define a function that uses the REST API to get all the app's records:
        function fetchRecords(appId, opt_offset, opt_limit, opt_records) {
            var offset = opt_offset || 0;
            var limit = opt_limit || 100;
            var allRecords = opt_records || [];
            var params = {app: appId, query: 'limit ' + limit + ' offset ' + offset};
            return kintone.api('/k/v1/records', 'GET', params).then(function(resp) {
                allRecords = allRecords.concat(resp.records);
                if (resp.records.length === limit) {
                    return fetchRecords(appId, offset + limit, limit, allRecords);
                }
                return allRecords;
            });
        }
        
        //check if the header already contains the information:
        if (document.getElementById('p1') !== null) {
            return;
        }　　　

        //if it does not, get the header space and the app records:
        var header = kintone.app.getHeaderSpaceElement();
        fetchRecords(kintone.app.getId()).then(function(records) {
            
    // (1) USING THE _.max FUNCTION
           //find the student with the highest science score:
            var maxSciScore = _.max(records, function(record) {
                return parseInt(record.science.value, 10);
            });

            var p1 = document.createElement("p");
            p1.id = 'p1';
            p1.innerHTML = 'The student with the highest science score is: ' + maxSciScore.name.value;
            header.appendChild(p1);

    // (2) USING THE _.filter FUNCTION
            //find all students with a 90+ grade average in all classes:
            var highGrades = _.filter(records, function(record) {
                return (parseInt(record.math.value, 10) + parseInt(record.language_arts.value, 10) +
                        parseInt(record.science.value, 10) + parseInt(record.social_studies.value, 10) +
                        parseInt(record.pe.value, 10)) / 5 >= 90;
            });

            var highGradeStudents = '';
            for (var i = 0; i < highGrades.length; i++) {
                highGradeStudents += '• ' + highGrades[i].name.value + ' ';
            }

            var p2 = document.createElement("p");
            p2.innerHTML = 'The students with above a 90 grade average are: ' + highGradeStudents;
            header.appendChild(p2);

    // (3) USING THE _.sortBy, _.pluck, AND _.chunk FUNCTIONS
           //create study partners for math based on grades:
           //(the two people with the lowest grades work together, and then up the list)
            var sortedByMathGrades = _.sortBy(records, function(record) {
                return parseInt(record.math.value, 10);
            });

            sortedByMathGrades = _.pluck(_.pluck(sortedByMathGrades, 'name'), 'value');
            var partners = _.chunk(sortedByMathGrades, 2);

            var groups = '';
            for (var j = 0; j < partners.length; j++) {
                groups += '• ' + partners[j][0] + ' and ' + partners[j][1] + ' ';
            }

            var p3 = document.createElement("p");
            p3.innerHTML = 'The study groups for math class are: ' + groups;
            header.appendChild(p3);

        });
    });
})();
