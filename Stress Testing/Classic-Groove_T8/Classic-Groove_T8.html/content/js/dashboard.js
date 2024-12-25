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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.990530303030303, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-23"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-24"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-20"], "isController": false}, {"data": [0.9375, 500, 1500, "http://localhost/Classic-Groove-main/index.php-18"], "isController": false}, {"data": [0.9375, 500, 1500, "http://localhost/Classic-Groove-main/index.php-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-16"], "isController": false}, {"data": [0.9375, 500, 1500, "http://localhost/Classic-Groove-main/index.php-17"], "isController": false}, {"data": [0.9375, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-15"], "isController": false}, {"data": [0.9375, 500, 1500, "http://localhost/Classic-Groove-main/index.php"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-30"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-29"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-27"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-28"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-25"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-26"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-1"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 256, 0, 0.0, 39.00390624999998, 1, 1097, 3.0, 165.70000000000056, 238.89999999999986, 690.6100000000001, 28.49827451853501, 2939.786219456195, 31.062145163085827], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://localhost/Classic-Groove-main/index.php-23", 8, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.9624639076034649, 10.7149302213667, 0.54044604186718], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-24", 8, 0, 0.0, 1.375, 1, 2, 1.0, 2.0, 2.0, 2.0, 0.9624639076034649, 1.6034799085659288, 0.537626323387873], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-21", 8, 0, 0.0, 1.8749999999999998, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.9621166566446182, 2.3961308628983766, 0.5430697534576068], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-22", 8, 0, 0.0, 1.75, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.9621166566446182, 4.158641198135899, 0.5430697534576068], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-20", 8, 0, 0.0, 2.25, 2, 4, 2.0, 4.0, 4.0, 4.0, 0.96188529517855, 138.9062406065889, 0.5448178429722256], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-18", 8, 0, 0.0, 268.24999999999994, 200, 679, 205.5, 679.0, 679.0, 679.0, 0.9350163627863488, 83.04045589352502, 0.48942262739597947], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-19", 8, 0, 0.0, 297.125, 210, 706, 240.5, 706.0, 706.0, 706.0, 0.931098696461825, 82.64228351955306, 0.48646269785847296], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-16", 8, 0, 0.0, 2.75, 1, 6, 2.5, 6.0, 6.0, 6.0, 0.9567089213106913, 17.102339825998566, 0.5521630590767759], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-17", 8, 0, 0.0, 188.125, 106, 625, 125.5, 625.0, 625.0, 625.0, 0.9449562957713206, 2.973290219702339, 0.501085223245925], "isController": false}, {"data": ["Test", 8, 0, 0.0, 383.0, 231, 1097, 286.0, 1097.0, 1097.0, 1097.0, 0.8851515822084532, 1460.9481970222946, 15.436559526443903], "isController": true}, {"data": ["http://localhost/Classic-Groove-main/index.php-14", 8, 0, 0.0, 2.375, 1, 4, 2.0, 4.0, 4.0, 4.0, 0.9555661729574773, 1.622899434125657, 0.5431049928332538], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-15", 8, 0, 0.0, 2.5, 1, 5, 2.0, 5.0, 5.0, 5.0, 0.956594523496353, 3.4826019371039103, 0.5520970345569772], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php", 8, 0, 0.0, 383.0, 231, 1097, 286.0, 1097.0, 1097.0, 1097.0, 0.890571078704219, 1469.8931097280974, 15.531072581542913], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-12", 8, 0, 0.0, 3.8749999999999996, 2, 7, 3.5, 7.0, 7.0, 7.0, 0.9546539379474941, 1.9766650507159902, 0.5472479116945107], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-13", 8, 0, 0.0, 2.25, 1, 4, 2.0, 4.0, 4.0, 4.0, 0.9547678720611051, 4.635029724609142, 0.54171888053467], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-10", 8, 0, 0.0, 5.5, 2, 18, 3.5, 18.0, 18.0, 18.0, 0.9540846750149076, 1.8566916368515207, 0.542262969588551], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-11", 8, 0, 0.0, 3.125, 2, 6, 3.0, 6.0, 6.0, 6.0, 0.9543122986997495, 2.052377206847191, 0.5498479064773948], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-30", 8, 0, 0.0, 1.375, 1, 2, 1.0, 2.0, 2.0, 2.0, 0.9642039291310113, 6.067705194648668, 0.5498975533325298], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-29", 8, 0, 0.0, 1.25, 1, 2, 1.0, 2.0, 2.0, 2.0, 0.9639715628388963, 1.1927265333172672, 0.5535305458488975], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-9", 8, 0, 0.0, 6.375, 2, 16, 3.5, 16.0, 16.0, 16.0, 0.9535160905840286, 7.195950350119189, 0.5419398092967819], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-8", 8, 0, 0.0, 4.75, 3, 13, 4.0, 13.0, 13.0, 13.0, 0.9532888465204957, 7.279766071854147, 0.5446034914204004], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-27", 8, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.9633911368015414, 4.246941421302987, 0.549434007707129], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-7", 8, 0, 0.0, 5.875, 2, 19, 4.0, 19.0, 19.0, 19.0, 0.9307737056428156, 1.1006353621291447, 0.5308318789994182], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-28", 8, 0, 0.0, 1.25, 1, 2, 1.0, 2.0, 2.0, 2.0, 0.9637393085170461, 2.912864413926033, 0.5505737260571015], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-6", 8, 0, 0.0, 7.375, 3, 17, 4.0, 17.0, 17.0, 17.0, 0.9305571711061998, 4.657897558741421, 0.5288908921716878], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-25", 8, 0, 0.0, 1.75, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.9626955475330926, 1.452504512635379, 0.5386958483754513], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-5", 8, 0, 0.0, 3.875, 2, 6, 3.5, 6.0, 6.0, 6.0, 0.9301244041390535, 4.981252179979072, 0.5268282757818857], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-26", 8, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.963159162051529, 5.379206296653022, 0.5502422947267036], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-4", 8, 0, 0.0, 4.125, 2, 7, 3.5, 7.0, 7.0, 7.0, 0.9303407372950343, 1.361668144551692, 0.5278593441097802], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-3", 8, 0, 0.0, 4.0, 2, 11, 3.0, 11.0, 11.0, 11.0, 0.930232558139535, 6.106013808139535, 0.5287063953488372], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-2", 8, 0, 0.0, 10.999999999999998, 6, 19, 9.5, 19.0, 19.0, 19.0, 0.9286128845037726, 876.3517710751596, 0.526878990133488], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-1", 8, 0, 0.0, 5.0, 3, 7, 5.0, 7.0, 7.0, 7.0, 0.9301244041390535, 243.97837551592835, 0.5295532496221369], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-0", 8, 0, 0.0, 19.5, 5, 38, 21.5, 38.0, 38.0, 38.0, 0.9173259947253755, 7.974644536177044, 0.46403795436303175], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 256, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
