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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9848484848484849, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-23"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-24"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-20"], "isController": false}, {"data": [0.9, 500, 1500, "http://localhost/Classic-Groove-main/index.php-18"], "isController": false}, {"data": [0.9, 500, 1500, "http://localhost/Classic-Groove-main/index.php-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-16"], "isController": false}, {"data": [0.9, 500, 1500, "http://localhost/Classic-Groove-main/index.php-17"], "isController": false}, {"data": [0.9, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-15"], "isController": false}, {"data": [0.9, 500, 1500, "http://localhost/Classic-Groove-main/index.php"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-30"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-29"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-27"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-28"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-25"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-26"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-1"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 160, 0, 0.0, 45.10625, 1, 1084, 3.0, 210.60000000000042, 282.5499999999999, 838.7799999999945, 19.365770999757927, 1997.7071702523601, 21.10802847373517], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://localhost/Classic-Groove-main/index.php-23", 5, 0, 0.0, 2.0, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.6630420368651372, 7.38152267603766, 0.3723136437475136], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-24", 5, 0, 0.0, 1.8, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.6633939233116625, 1.1052246417672815, 0.37056769934987394], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-21", 5, 0, 0.0, 1.8, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.6626027034190299, 1.6500360290219984, 0.37400816657831965], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-22", 5, 0, 0.0, 1.6, 1, 3, 1.0, 3.0, 3.0, 3.0, 0.6628662335940607, 2.8650839354368287, 0.37415691700914755], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-20", 5, 0, 0.0, 2.4, 1, 4, 2.0, 4.0, 4.0, 4.0, 0.6623393826996954, 95.64866310935223, 0.3751531659822493], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-18", 5, 0, 0.0, 314.4, 218, 667, 228.0, 667.0, 667.0, 667.0, 0.638814360546825, 56.73370224862655, 0.3343793918487288], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-19", 5, 0, 0.0, 340.8, 223, 682, 274.0, 682.0, 682.0, 682.0, 0.6361323155216285, 56.46171278625954, 0.3323542859414758], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-16", 5, 0, 0.0, 2.2, 2, 3, 2.0, 3.0, 3.0, 3.0, 0.6585879873551106, 11.772903426304005, 0.3801030278582719], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-17", 5, 0, 0.0, 221.6, 109, 596, 137.0, 596.0, 596.0, 596.0, 0.6481721545242416, 2.039463556520612, 0.3437084764713508], "isController": false}, {"data": ["Test", 5, 0, 0.0, 455.6, 264, 1084, 319.0, 1084.0, 1084.0, 1084.0, 0.6010337780983291, 992.0096550441759, 10.481700399687462], "isController": true}, {"data": ["http://localhost/Classic-Groove-main/index.php-14", 5, 0, 0.0, 3.6, 2, 7, 3.0, 7.0, 7.0, 7.0, 0.6580679126085812, 1.1176872203211372, 0.37401906751776787], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-15", 5, 0, 0.0, 3.2, 2, 4, 3.0, 4.0, 4.0, 4.0, 0.6586747464102226, 2.398116396061125, 0.3801531007113687], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php", 5, 0, 0.0, 455.6, 264, 1084, 319.0, 1084.0, 1084.0, 1084.0, 0.6051803437424352, 998.8535851261801, 10.554014236867586], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-12", 5, 0, 0.0, 3.2, 1, 6, 2.0, 6.0, 6.0, 6.0, 0.6563402467839328, 1.3589576086243107, 0.37624191881071145], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-13", 5, 0, 0.0, 3.4, 2, 8, 2.0, 8.0, 8.0, 8.0, 0.6577216521967902, 3.193033083399105, 0.37317996086556166], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-10", 5, 0, 0.0, 4.4, 2, 7, 4.0, 7.0, 7.0, 7.0, 0.6565988181221273, 1.2776746142481943, 0.373184093893631], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-11", 5, 0, 0.0, 3.4, 2, 4, 4.0, 4.0, 4.0, 4.0, 0.6569438969911969, 1.4129426159505978, 0.37851259689922484], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-30", 5, 0, 0.0, 1.2, 1, 2, 1.0, 2.0, 2.0, 2.0, 0.6648052120728626, 4.183598424411647, 0.3791467225103045], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-29", 5, 0, 0.0, 1.6, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.6645401382243488, 0.8222386280568846, 0.3815914074960128], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-9", 5, 0, 0.0, 3.6, 2, 6, 3.0, 6.0, 6.0, 6.0, 0.6558237145855194, 4.949291505443337, 0.3727435565320042], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-8", 5, 0, 0.0, 5.2, 2, 11, 4.0, 11.0, 11.0, 11.0, 0.6556517178075006, 5.006899709874115, 0.3745666551927616], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-27", 5, 0, 0.0, 1.6, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.6641870350690755, 2.927871363575983, 0.3787941684378321], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-7", 5, 0, 0.0, 5.6, 2, 13, 4.0, 13.0, 13.0, 13.0, 0.6387327542156361, 0.7552515808635667, 0.364277273888605], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-28", 5, 0, 0.0, 1.6, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.6643635397289397, 2.0080128471299497, 0.3795436237709275], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-6", 5, 0, 0.0, 2.8, 2, 4, 3.0, 4.0, 4.0, 4.0, 0.638325035107877, 3.1952406884335502, 0.362798018000766], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-25", 5, 0, 0.0, 1.4, 1, 2, 1.0, 2.0, 2.0, 2.0, 0.6637461834594451, 1.001452981879729, 0.371412659299084], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-5", 5, 0, 0.0, 4.6, 1, 9, 4.0, 9.0, 9.0, 9.0, 0.6384065372829417, 3.4188415714376914, 0.36159745275791627], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-26", 5, 0, 0.0, 1.2, 1, 2, 1.0, 2.0, 2.0, 2.0, 0.6639224538573895, 3.7079809703226663, 0.37929163623688755], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-4", 5, 0, 0.0, 4.6, 2, 9, 4.0, 9.0, 9.0, 9.0, 0.6377551020408163, 0.9333396444515306, 0.36185128348214285], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-3", 5, 0, 0.0, 4.2, 2, 8, 4.0, 8.0, 8.0, 8.0, 0.638325035107877, 4.190254771479637, 0.362798018000766], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-2", 5, 0, 0.0, 12.4, 8, 21, 11.0, 21.0, 21.0, 21.0, 0.6378364587319811, 601.9399696230387, 0.36189744387039163], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-1", 5, 0, 0.0, 4.0, 3, 5, 4.0, 5.0, 5.0, 5.0, 0.638325035107877, 167.43751895027447, 0.3634213822928635], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-0", 5, 0, 0.0, 22.4, 7, 35, 23.0, 35.0, 35.0, 35.0, 0.6279040562602034, 5.458595614090167, 0.31763115345975135], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 160, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
