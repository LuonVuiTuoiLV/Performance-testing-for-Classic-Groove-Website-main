/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9929292929292929, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-9"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://localhost/Classic-Groove-main/-18"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://localhost/Classic-Groove-main/-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-15"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-1"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-16"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-2"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://localhost/Classic-Groove-main/-17"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-20"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-0"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-29"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-25"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-26"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-27"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-28"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "http://localhost/Classic-Groove-main/"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-23"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-24"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/-30"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 480, 0, 0.0, 37.65416666666667, 0, 1190, 3.0, 170.70000000000044, 252.79999999999995, 584.4199999999997, 50.35669324381032, 5194.614604096727, 54.88707445971465], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://localhost/Classic-Groove-main/-9", 15, 0, 0.0, 5.8, 2, 21, 4.0, 17.400000000000002, 21.0, 21.0, 1.6782277914522266, 12.664938325128663, 0.9538364986574177], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-18", 15, 0, 0.0, 264.6, 197, 731, 218.0, 548.6000000000001, 731.0, 731.0, 1.6440157825515125, 146.00508446131082, 0.8605395111793073], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-19", 15, 0, 0.0, 285.3333333333333, 196, 774, 244.0, 579.6000000000001, 774.0, 774.0, 1.646723021187836, 146.15460156164232, 0.8603484534526292], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-3", 15, 0, 0.0, 4.666666666666667, 1, 16, 3.0, 13.000000000000002, 16.0, 16.0, 1.6377333770062235, 10.75007762173818, 0.9308211185718964], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-14", 15, 0, 0.0, 2.6000000000000005, 1, 9, 2.0, 7.200000000000001, 9.0, 9.0, 1.6818028927009754, 2.856218115820159, 0.9558684409687184], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-4", 15, 0, 0.0, 5.3999999999999995, 2, 13, 4.0, 11.200000000000001, 13.0, 13.0, 1.638448935008192, 2.398151624795194, 0.9296277648825779], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-15", 15, 0, 0.0, 2.4666666666666663, 1, 5, 2.0, 3.8000000000000007, 5.0, 5.0, 1.6827462418667265, 6.126467144379628, 0.9711943642023784], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-1", 15, 0, 0.0, 8.466666666666667, 3, 21, 6.0, 20.4, 21.0, 21.0, 1.6359472134365798, 429.12120238711964, 0.9314035404624277], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-16", 15, 0, 0.0, 4.133333333333333, 1, 28, 2.0, 15.400000000000007, 28.0, 28.0, 1.6787912702853947, 30.01036128987129, 0.9689117585338556], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-2", 15, 0, 0.0, 10.933333333333334, 6, 37, 8.0, 26.800000000000004, 37.0, 37.0, 1.6346992153443765, 1542.7005571599825, 0.9275002383936356], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-17", 15, 0, 0.0, 182.86666666666667, 105, 680, 136.0, 482.0000000000001, 680.0, 680.0, 1.6611295681063123, 5.22671823089701, 0.8808528862126247], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-7", 15, 0, 0.0, 3.8000000000000003, 3, 7, 3.0, 5.800000000000001, 7.0, 7.0, 1.638986013986014, 1.938079620574738, 0.9347342111013986], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-10", 15, 0, 0.0, 3.8000000000000003, 2, 10, 3.0, 8.200000000000001, 10.0, 10.0, 1.6787912702853947, 3.2670851986569667, 0.9541567571348628], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-8", 15, 0, 0.0, 4.2, 1, 9, 4.0, 7.800000000000001, 9.0, 9.0, 1.678040049222508, 12.814501412350374, 0.9586459265577805], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-11", 15, 0, 0.0, 3.466666666666667, 1, 19, 2.0, 10.600000000000005, 19.0, 19.0, 1.6791671331019813, 3.6114118647151012, 0.9674888755177432], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-5", 15, 0, 0.0, 4.8, 2, 15, 4.0, 11.400000000000002, 15.0, 15.0, 1.638448935008192, 8.774342060349536, 0.928027717094484], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-12", 15, 0, 0.0, 3.1999999999999993, 1, 10, 3.0, 7.000000000000002, 10.0, 10.0, 1.679919363870534, 3.478614276514727, 0.9630006509687534], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-6", 15, 0, 0.0, 5.866666666666666, 2, 17, 4.0, 15.200000000000001, 17.0, 17.0, 1.6370184437411328, 8.194577546927862, 0.9304147795481829], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-13", 15, 0, 0.0, 2.400000000000001, 1, 5, 2.0, 4.4, 5.0, 5.0, 1.680483979386063, 8.158115162166704, 0.9534777265852565], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-20", 15, 0, 0.0, 3.133333333333333, 2, 6, 3.0, 6.0, 6.0, 6.0, 1.6897600540723217, 244.01895347527315, 0.9570906556269009], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-0", 15, 0, 0.0, 18.2, 4, 57, 17.0, 40.80000000000001, 57.0, 57.0, 1.6141181534488325, 14.032109181642097, 0.8165168002797806], "isController": false}, {"data": ["Test", 15, 0, 0.0, 356.13333333333327, 248, 1190, 283.0, 813.2000000000003, 1190.0, 1190.0, 1.5649452269170578, 2582.9455610980694, 27.29178892801252], "isController": true}, {"data": ["http://localhost/Classic-Groove-main/-29", 15, 0, 0.0, 1.9333333333333331, 0, 4, 2.0, 3.4000000000000004, 4.0, 4.0, 1.693002257336343, 2.0948698504514676, 0.9721536399548534], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-25", 15, 0, 0.0, 1.9333333333333333, 1, 6, 2.0, 4.200000000000001, 6.0, 6.0, 1.6914749661705006, 2.5520789284506087, 0.946499175405954], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-26", 15, 0, 0.0, 1.5999999999999999, 1, 3, 2.0, 2.4000000000000004, 3.0, 3.0, 1.6912842485060322, 9.445756462115233, 0.9662121927500282], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-27", 15, 0, 0.0, 2.066666666666667, 1, 4, 2.0, 3.4000000000000004, 4.0, 4.0, 1.6918565305662079, 7.458157392003159, 0.9648869275885406], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-28", 15, 0, 0.0, 1.666666666666667, 1, 3, 2.0, 2.4000000000000004, 3.0, 3.0, 1.6922382671480145, 5.114724059397563, 0.9667572131656136], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/", 15, 0, 0.0, 356.13333333333327, 248, 1190, 283.0, 813.2000000000003, 1190.0, 1190.0, 1.5736466638690725, 2597.3073020483635, 27.443537229857323], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-21", 15, 0, 0.0, 2.2, 1, 5, 2.0, 4.4, 5.0, 5.0, 1.690712353471596, 4.21049016568981, 0.954327871393147], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-22", 15, 0, 0.0, 1.7333333333333332, 1, 3, 2.0, 3.0, 3.0, 3.0, 1.690712353471596, 7.307928032010821, 0.954327871393147], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-23", 15, 0, 0.0, 1.7999999999999998, 1, 3, 2.0, 3.0, 3.0, 3.0, 1.6912842485060322, 18.828860532472657, 0.9496957450107115], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-24", 15, 0, 0.0, 2.0666666666666664, 1, 6, 2.0, 4.200000000000001, 6.0, 6.0, 1.6909029421711192, 2.817070722015556, 0.9445278153533987], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/-30", 15, 0, 0.0, 1.6666666666666665, 0, 3, 2.0, 3.0, 3.0, 3.0, 1.694915254237288, 10.66604872881356, 0.9666313559322034], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 480, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
