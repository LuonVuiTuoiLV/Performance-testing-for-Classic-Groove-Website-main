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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9915824915824916, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-23"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-24"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-20"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://localhost/Classic-Groove-main/index.php-18"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://localhost/Classic-Groove-main/index.php-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-16"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://localhost/Classic-Groove-main/index.php-17"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-15"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://localhost/Classic-Groove-main/index.php"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-30"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-29"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-27"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-28"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-25"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-26"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-1"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 288, 0, 0.0, 37.36458333333335, 0, 1094, 3.0, 162.70000000000084, 243.55, 644.7400000000005, 31.774051191526915, 3277.7365729120697, 34.632629771624], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://localhost/Classic-Groove-main/index.php-23", 9, 0, 0.0, 1.6666666666666667, 1, 3, 2.0, 3.0, 3.0, 3.0, 1.0699001426533523, 11.910997681883023, 0.6007740058844507], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-24", 9, 0, 0.0, 1.5555555555555556, 1, 2, 2.0, 2.0, 2.0, 2.0, 1.070154577883472, 1.7828942479191439, 0.5977816587395957], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-21", 9, 0, 0.0, 1.7777777777777777, 1, 2, 2.0, 2.0, 2.0, 2.0, 1.0693916349809887, 2.66303580976711, 0.6036214502138783], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-22", 9, 0, 0.0, 2.111111111111111, 1, 3, 2.0, 3.0, 3.0, 3.0, 1.0695187165775402, 4.6227439839572195, 0.6036931818181819], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-20", 9, 0, 0.0, 2.0, 1, 3, 2.0, 3.0, 3.0, 3.0, 1.0690105713267608, 154.3759836381993, 0.6054942689155481], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-18", 9, 0, 0.0, 268.0, 202, 641, 223.0, 641.0, 641.0, 641.0, 1.040943789035392, 92.44746486814711, 0.544869014573213], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-19", 9, 0, 0.0, 279.3333333333333, 196, 675, 227.0, 675.0, 675.0, 675.0, 1.0421491431218157, 92.49887824224179, 0.5444822183302456], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-16", 9, 0, 0.0, 2.5555555555555554, 1, 8, 2.0, 8.0, 8.0, 8.0, 1.0644589000591367, 19.02847335156712, 0.6143507909520993], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-17", 9, 0, 0.0, 180.77777777777777, 115, 568, 128.0, 568.0, 568.0, 568.0, 1.048462255358807, 3.316148685053588, 0.5559716842381175], "isController": false}, {"data": ["Test", 9, 0, 0.0, 360.6666666666667, 241, 1094, 266.0, 1094.0, 1094.0, 1094.0, 0.986842105263158, 1628.8050601356908, 17.20998663651316], "isController": true}, {"data": ["http://localhost/Classic-Groove-main/index.php-14", 9, 0, 0.0, 2.4444444444444446, 1, 5, 2.0, 5.0, 5.0, 5.0, 1.0628247520075578, 1.8052798033774209, 0.6040664117855455], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-15", 9, 0, 0.0, 3.0, 1, 7, 2.0, 7.0, 7.0, 7.0, 1.0642071656615821, 3.874610160222301, 0.6142055028378858], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php", 9, 0, 0.0, 360.6666666666667, 241, 1094, 266.0, 1094.0, 1094.0, 1094.0, 0.9929390997352161, 1638.8682864560349, 17.316314885812], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-12", 9, 0, 0.0, 3.2222222222222223, 1, 6, 3.0, 6.0, 6.0, 6.0, 1.0608203677510608, 2.1963447739863273, 0.6081069881541725], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-13", 9, 0, 0.0, 2.5555555555555554, 2, 5, 2.0, 5.0, 5.0, 5.0, 1.0623229461756376, 5.15726898164542, 0.6027437809844193], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-10", 9, 0, 0.0, 3.0, 2, 5, 3.0, 5.0, 5.0, 5.0, 1.0598210080075365, 2.0620280484573716, 0.6023592057230334], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-11", 9, 0, 0.0, 5.0, 2, 15, 3.0, 15.0, 15.0, 15.0, 1.0601955471787017, 2.280524796795853, 0.6108548562846036], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-30", 9, 0, 0.0, 1.5555555555555556, 1, 2, 2.0, 2.0, 2.0, 2.0, 1.0719390185802762, 6.745678745831348, 0.6113402215340638], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-29", 9, 0, 0.0, 1.7777777777777777, 1, 3, 2.0, 3.0, 3.0, 3.0, 1.0714285714285714, 1.32568359375, 0.615234375], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-9", 9, 0, 0.0, 3.7777777777777777, 2, 9, 3.0, 9.0, 9.0, 9.0, 1.0596962204168139, 7.997164944660308, 0.6022882815259626], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-8", 9, 0, 0.0, 3.666666666666667, 2, 7, 3.0, 7.0, 7.0, 7.0, 1.0595714622086179, 8.091534281551684, 0.6053215872969154], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-27", 9, 0, 0.0, 1.5555555555555556, 0, 2, 2.0, 2.0, 2.0, 2.0, 1.0709186101856258, 4.720826764040933, 0.6107582698714897], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-7", 9, 0, 0.0, 3.3333333333333335, 2, 6, 3.0, 6.0, 6.0, 6.0, 1.0338885697874785, 1.2225822085008615, 0.5896395749569213], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-28", 9, 0, 0.0, 1.6666666666666667, 1, 2, 2.0, 2.0, 2.0, 2.0, 1.0710460549803642, 3.2371948634416277, 0.6118768966440556], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-6", 9, 0, 0.0, 6.0, 2, 11, 4.0, 11.0, 11.0, 11.0, 1.0332950631458093, 5.1725297789896665, 0.5872829362801377], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-25", 9, 0, 0.0, 1.6666666666666667, 1, 2, 2.0, 2.0, 2.0, 2.0, 1.0702818408847663, 1.6148295353193005, 0.598897944166964], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-5", 9, 0, 0.0, 6.222222222222222, 2, 14, 6.0, 14.0, 14.0, 14.0, 1.0337698139214335, 5.53598541953825, 0.585533683666437], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-26", 9, 0, 0.0, 1.6666666666666667, 1, 3, 2.0, 3.0, 3.0, 3.0, 1.0706638115631693, 5.97961556477516, 0.6116585251605995], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-4", 9, 0, 0.0, 3.666666666666666, 1, 8, 3.0, 8.0, 8.0, 8.0, 1.0334137099552188, 1.5125561559880585, 0.5863411772304513], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-3", 9, 0, 0.0, 5.666666666666667, 3, 16, 4.0, 16.0, 16.0, 16.0, 1.0334137099552188, 6.783683725169365, 0.5873503703065794], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-2", 9, 0, 0.0, 11.999999999999998, 6, 20, 13.0, 20.0, 20.0, 20.0, 1.032346868547832, 974.2480087892866, 0.5857358697522368], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-1", 9, 0, 0.0, 5.222222222222222, 3, 9, 5.0, 9.0, 9.0, 9.0, 1.0331764435770865, 271.0097147285042, 0.5882244791068764], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-0", 9, 0, 0.0, 16.555555555555557, 4, 38, 17.0, 38.0, 38.0, 38.0, 1.0180995475113124, 8.850705246040723, 0.5150152007918553], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 288, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
