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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9621212121212122, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-23"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-24"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-20"], "isController": false}, {"data": [0.75, 500, 1500, "http://localhost/Classic-Groove-main/index.php-18"], "isController": false}, {"data": [0.75, 500, 1500, "http://localhost/Classic-Groove-main/index.php-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-16"], "isController": false}, {"data": [0.75, 500, 1500, "http://localhost/Classic-Groove-main/index.php-17"], "isController": false}, {"data": [0.75, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-15"], "isController": false}, {"data": [0.75, 500, 1500, "http://localhost/Classic-Groove-main/index.php"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-30"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-29"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-27"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-28"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-25"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-26"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-1"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 64, 0, 0.0, 66.25, 1, 1126, 3.0, 225.0, 664.5, 1126.0, 12.260536398467433, 1264.7588152538315, 13.36356561302682], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://localhost/Classic-Groove-main/index.php-23", 2, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.4402377283733216, 4.9010840854061195, 0.24720380255337882], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-24", 2, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.44033465433729635, 0.7336044143549098, 0.24596818582122415], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-21", 2, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 0.43975373790677225, 1.0950898746701847, 0.24822037159190852], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-22", 2, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.4399472063352398, 1.901568686757589, 0.24832957545094586], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-20", 2, 0, 0.0, 5.0, 2, 8, 5.0, 8.0, 8.0, 8.0, 0.43898156277436345, 63.39361041758121, 0.24864190079016682], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-18", 2, 0, 0.0, 460.5, 222, 699, 460.5, 699.0, 699.0, 699.0, 0.4158004158004158, 36.92989864864865, 0.21764553014553017], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-19", 2, 0, 0.0, 457.0, 228, 686, 457.0, 686.0, 686.0, 686.0, 0.41841004184100417, 37.13675143828452, 0.21860290271966526], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-16", 2, 0, 0.0, 2.5, 2, 3, 2.5, 3.0, 3.0, 3.0, 0.4350663476180118, 7.777235833152055, 0.2510978627365673], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-17", 2, 0, 0.0, 363.5, 127, 600, 363.5, 600.0, 600.0, 600.0, 0.42498937526561836, 1.3372224288142796, 0.2253605769230769], "isController": false}, {"data": ["Test", 2, 0, 0.0, 702.5, 279, 1126, 702.5, 1126.0, 1126.0, 1126.0, 0.37921880925293894, 625.9045331460941, 6.613368648084945], "isController": true}, {"data": ["http://localhost/Classic-Groove-main/index.php-14", 2, 0, 0.0, 6.5, 3, 10, 6.5, 10.0, 10.0, 10.0, 0.43421623968736434, 0.7376163563829787, 0.24679087060356059], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-15", 2, 0, 0.0, 9.0, 1, 17, 9.0, 17.0, 17.0, 17.0, 0.4365858982754857, 1.5896587126173323, 0.2519748690242305], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php", 2, 0, 0.0, 702.5, 279, 1126, 702.5, 1126.0, 1126.0, 1126.0, 0.3831417624521073, 632.3794076269157, 6.68178280651341], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-12", 2, 0, 0.0, 6.0, 3, 9, 6.0, 9.0, 9.0, 9.0, 0.43280675178532785, 0.8962565597273316, 0.24810308915819085], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-13", 2, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.4338394793926247, 2.1060703633405637, 0.2461530639913232], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-10", 2, 0, 0.0, 8.0, 2, 14, 8.0, 14.0, 14.0, 14.0, 0.4318721658389117, 0.8403371976894839, 0.24545859425610017], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-11", 2, 0, 0.0, 7.5, 2, 13, 7.5, 13.0, 13.0, 13.0, 0.4322455154527772, 0.9297077615085368, 0.2490477090987681], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-30", 2, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.4417936823503424, 2.780193836978131, 0.2519604594654296], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-29", 2, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.44159858688452197, 0.5463920015455951, 0.2535741885625966], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-9", 2, 0, 0.0, 6.0, 2, 10, 6.0, 10.0, 10.0, 10.0, 0.43159257660768235, 3.2569644880233057, 0.24529968709538194], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-8", 2, 0, 0.0, 4.0, 2, 6, 4.0, 6.0, 6.0, 6.0, 0.4318721658389117, 3.2978753913841503, 0.24672384474195636], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-27", 2, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.44111160123511245, 1.9445095390383769, 0.2515714600794001], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-7", 2, 0, 0.0, 2.5, 2, 3, 2.5, 3.0, 3.0, 3.0, 0.41467965996267886, 0.4902048128758034, 0.23649699357246526], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-28", 2, 0, 0.0, 2.0, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.44120891242003085, 1.3335367030664018, 0.252057825943084], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-6", 2, 0, 0.0, 4.5, 4, 5, 4.5, 5.0, 5.0, 5.0, 0.4142502071251035, 2.0736782829328915, 0.2354429888152444], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-25", 2, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.4406256884776382, 0.6648112194315929, 0.2465610541969597], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-5", 2, 0, 0.0, 5.0, 3, 7, 5.0, 7.0, 7.0, 7.0, 0.413992962119644, 2.2171263713516867, 0.23448820120057956], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-26", 2, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.4409171075837742, 2.4625048225308643, 0.25189112103174605], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-4", 2, 0, 0.0, 2.5, 2, 3, 2.5, 3.0, 3.0, 3.0, 0.41433602651750573, 0.6063306013051585, 0.23508714004557696], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-3", 2, 0, 0.0, 5.5, 4, 7, 5.5, 7.0, 7.0, 7.0, 0.413992962119644, 2.7176373939143033, 0.2352967812047195], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-2", 2, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 9.0, 0.41373603640877116, 390.45166722693426, 0.23474671597021102], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-1", 2, 0, 0.0, 4.5, 3, 6, 4.5, 6.0, 6.0, 6.0, 0.41433602651750573, 108.68329351823078, 0.23589639009736896], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-0", 2, 0, 0.0, 31.0, 20, 42, 31.0, 42.0, 42.0, 42.0, 0.40314452731304173, 3.5046802559967745, 0.20393443862124572], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 64, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
