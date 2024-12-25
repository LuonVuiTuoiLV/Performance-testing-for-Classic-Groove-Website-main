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

    var data = {"OkPercent": 99.55357142857143, "KoPercent": 0.44642857142857145};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9848484848484849, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-23"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-24"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-20"], "isController": false}, {"data": [0.9285714285714286, 500, 1500, "http://localhost/Classic-Groove-main/index.php-18"], "isController": false}, {"data": [0.9285714285714286, 500, 1500, "http://localhost/Classic-Groove-main/index.php-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-16"], "isController": false}, {"data": [0.7857142857142857, 500, 1500, "http://localhost/Classic-Groove-main/index.php-17"], "isController": false}, {"data": [0.9285714285714286, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-15"], "isController": false}, {"data": [0.9285714285714286, 500, 1500, "http://localhost/Classic-Groove-main/index.php"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-30"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-29"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-27"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-28"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-25"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-26"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-1"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 224, 1, 0.44642857142857145, 39.44196428571428, 1, 1089, 3.0, 171.0, 250.5, 681.0, 25.50671828740606, 2630.852702971988, 27.68068741459804], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://localhost/Classic-Groove-main/index.php-23", 7, 0, 0.0, 2.142857142857143, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.8647313156269302, 9.626891599752932, 0.48556690086473125], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-24", 7, 0, 0.0, 1.857142857142857, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.8650519031141869, 1.4411899870242213, 0.4832125865051903], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-21", 7, 0, 0.0, 1.8571428571428572, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.8646245059288538, 2.153117666131423, 0.4880400043231225], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-22", 7, 0, 0.0, 1.7142857142857144, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.8647313156269302, 3.7375984403953053, 0.48810029339098204], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-20", 7, 0, 0.0, 2.285714285714286, 2, 3, 2.0, 3.0, 3.0, 3.0, 0.8641975308641976, 124.79890046296296, 0.4894868827160494], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-18", 7, 0, 0.0, 276.57142857142856, 208, 654, 214.0, 654.0, 654.0, 654.0, 0.8397312859884837, 74.57957203694818, 0.4395468450095969], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-19", 7, 0, 0.0, 287.8571428571429, 192, 690, 219.0, 690.0, 690.0, 690.0, 0.8350232613622809, 74.11483806513182, 0.4362670359656448], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-16", 7, 0, 0.0, 3.7142857142857144, 2, 12, 2.0, 12.0, 12.0, 12.0, 0.8601622020152372, 15.37647936378717, 0.4964412708896535], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-17", 7, 1, 14.285714285714286, 187.0, 59, 583, 132.0, 583.0, 583.0, 583.0, 0.8450024142926122, 2.4797189989739254, 0.3840705727909222], "isController": false}, {"data": ["Test", 7, 0, 0.0, 391.2857142857143, 251, 1089, 280.0, 1089.0, 1089.0, 1089.0, 0.7915865656451431, 1306.3523938425874, 13.74487147319914], "isController": true}, {"data": ["http://localhost/Classic-Groove-main/index.php-14", 7, 0, 0.0, 2.857142857142857, 2, 5, 2.0, 5.0, 5.0, 5.0, 0.8588957055214724, 1.4587327453987728, 0.4881614263803681], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-15", 7, 0, 0.0, 3.285714285714286, 1, 9, 2.0, 9.0, 9.0, 9.0, 0.8595284872298625, 3.1294607226178783, 0.49607552339145383], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php", 7, 0, 0.0, 391.2857142857143, 251, 1089, 280.0, 1089.0, 1089.0, 1089.0, 0.7970849464814393, 1315.426351485994, 13.84034370729902], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-12", 7, 0, 0.0, 3.142857142857143, 2, 6, 3.0, 6.0, 6.0, 6.0, 0.8575278696557638, 1.77558993323533, 0.4915711518436849], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-13", 7, 0, 0.0, 2.8571428571428568, 2, 5, 2.0, 5.0, 5.0, 5.0, 0.8574228319451249, 4.162591675342969, 0.48648697789073986], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-10", 7, 0, 0.0, 4.571428571428572, 1, 14, 3.0, 14.0, 14.0, 14.0, 0.8567931456548348, 1.6670890070379436, 0.48696641676866587], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-11", 7, 0, 0.0, 4.857142857142858, 2, 12, 4.0, 12.0, 12.0, 12.0, 0.8572128337007102, 1.8438207965956404, 0.4939019256674014], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-30", 7, 0, 0.0, 1.4285714285714286, 1, 2, 1.0, 2.0, 2.0, 2.0, 0.8661222469685721, 5.450480233853006, 0.49396034397426375], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-29", 7, 0, 0.0, 1.7142857142857144, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.8660150934059136, 1.0715245345168873, 0.497282104416677], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-9", 7, 0, 0.0, 6.714285714285714, 2, 15, 3.0, 15.0, 15.0, 15.0, 0.8560596795890913, 6.4604559664302315, 0.48654954445395626], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-8", 7, 0, 0.0, 6.0, 2, 15, 5.0, 15.0, 15.0, 15.0, 0.8561643835616438, 6.538167158451565, 0.4891173480308219], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-27", 7, 0, 0.0, 1.857142857142857, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.865372728396588, 3.8147387656076153, 0.493532884163679], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-7", 7, 0, 0.0, 5.857142857142857, 2, 15, 4.0, 15.0, 15.0, 15.0, 0.835820895522388, 0.988339552238806, 0.4766791044776119], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-28", 7, 0, 0.0, 1.857142857142857, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.8656937917388078, 2.6165256693668066, 0.49456139469453375], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-6", 7, 0, 0.0, 4.428571428571429, 2, 7, 4.0, 7.0, 7.0, 7.0, 0.8353221957040572, 4.181155839797135, 0.4747632010739856], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-25", 7, 0, 0.0, 1.8571428571428572, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.8651588184402422, 1.305342162588061, 0.4841171903967372], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-5", 7, 0, 0.0, 5.142857142857143, 2, 8, 5.0, 8.0, 8.0, 8.0, 0.8350232613622809, 4.471824488548253, 0.4729623941309794], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-26", 7, 0, 0.0, 1.7142857142857142, 1, 3, 1.0, 3.0, 3.0, 3.0, 0.8654797230464886, 4.833670445412958, 0.4944390995919882], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-4", 7, 0, 0.0, 4.0, 3, 5, 4.0, 5.0, 5.0, 5.0, 0.8349236641221374, 1.222217355975668, 0.4737213367724236], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-3", 7, 0, 0.0, 2.7142857142857144, 2, 4, 3.0, 4.0, 4.0, 4.0, 0.8352225271447321, 5.48219652338623, 0.47470655351390045], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-2", 7, 0, 0.0, 12.857142857142856, 7, 26, 11.0, 26.0, 26.0, 26.0, 0.8338296605122096, 786.9028951384753, 0.4731006179273377], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-1", 7, 0, 0.0, 6.285714285714286, 5, 8, 6.0, 8.0, 8.0, 8.0, 0.8347245409015025, 218.95460533180304, 0.47523867904841405], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-0", 7, 0, 0.0, 19.857142857142858, 7, 40, 19.0, 40.0, 40.0, 40.0, 0.8219821512447159, 7.1457862406059185, 0.41580737728980743], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, 100.0, 0.44642857142857145], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 224, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-17", 7, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
