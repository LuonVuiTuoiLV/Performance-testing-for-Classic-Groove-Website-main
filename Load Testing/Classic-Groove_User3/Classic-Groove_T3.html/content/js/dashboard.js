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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9747474747474747, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-23"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-24"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-20"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://localhost/Classic-Groove-main/index.php-18"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://localhost/Classic-Groove-main/index.php-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-16"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://localhost/Classic-Groove-main/index.php-17"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-15"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://localhost/Classic-Groove-main/index.php"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-30"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-29"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-27"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-28"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-25"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-26"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-1"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 96, 0, 0.0, 55.01041666666666, 1, 1155, 3.0, 213.79999999999998, 358.9999999999978, 1155.0, 13.862815884476534, 1430.0377933212997, 15.109995487364621], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://localhost/Classic-Groove-main/index.php-23", 3, 0, 0.0, 2.3333333333333335, 1, 4, 2.0, 4.0, 4.0, 4.0, 0.48488766769031844, 5.398163487958623, 0.27227578996282525], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-24", 3, 0, 0.0, 2.6666666666666665, 2, 4, 2.0, 4.0, 4.0, 4.0, 0.48527984471044966, 0.8084838037851827, 0.27107428825622776], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-21", 3, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 0.4844961240310077, 1.206508902616279, 0.2734753512596899], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-22", 3, 0, 0.0, 1.6666666666666667, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.48457438216766274, 2.0944591947989015, 0.2735195243094815], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-20", 3, 0, 0.0, 3.0, 2, 4, 3.0, 4.0, 4.0, 4.0, 0.48410521219945135, 69.90970933516218, 0.2742002178473455], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-18", 3, 0, 0.0, 361.0, 212, 653, 218.0, 653.0, 653.0, 653.0, 0.4664179104477612, 41.422526041666664, 0.24414062499999997], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-19", 3, 0, 0.0, 406.6666666666667, 239, 716, 265.0, 716.0, 716.0, 716.0, 0.46253469010175763, 41.05311560476411, 0.24165630781683628], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-16", 3, 0, 0.0, 3.3333333333333335, 2, 5, 3.0, 5.0, 5.0, 5.0, 0.4803843074459568, 8.587494995996797, 0.2772530524419536], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-17", 3, 0, 0.0, 272.3333333333333, 116, 580, 121.0, 580.0, 580.0, 580.0, 0.4733354370463869, 1.4893425568002525, 0.2509972092931524], "isController": false}, {"data": ["Test", 3, 0, 0.0, 593.0, 304, 1155, 320.0, 1155.0, 1155.0, 1155.0, 0.4298610116062473, 709.4864392283995, 7.496540962172231], "isController": true}, {"data": ["http://localhost/Classic-Groove-main/index.php-14", 3, 0, 0.0, 2.6666666666666665, 1, 4, 3.0, 4.0, 4.0, 4.0, 0.47992321228603424, 0.8150258458646616, 0.2727688569828827], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-15", 3, 0, 0.0, 3.0, 2, 5, 2.0, 5.0, 5.0, 5.0, 0.4805382027871216, 1.7494593945218644, 0.27734187289764534], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php", 3, 0, 0.0, 593.0, 304, 1155, 320.0, 1155.0, 1155.0, 1155.0, 0.4332129963898917, 715.0188966606498, 7.554997743682311], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-12", 3, 0, 0.0, 3.3333333333333335, 2, 6, 2.0, 6.0, 6.0, 6.0, 0.47785919082510353, 0.9894734091271106, 0.2739290478655623], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-13", 3, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 0.47961630695443647, 2.3284497402078337, 0.27212604916067146], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-10", 3, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 0.47808764940239046, 0.9301855079681275, 0.2717255976095617], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-11", 3, 0, 0.0, 2.3333333333333335, 2, 3, 2.0, 3.0, 3.0, 3.0, 0.47816385081287854, 1.028394714297099, 0.2755045624800765], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-30", 3, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 0.4867759208177836, 3.063265657958786, 0.2776143923413922], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-29", 3, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 0.4864601913410086, 0.6018994750283768, 0.27933456299659476], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-9", 3, 0, 0.0, 3.3333333333333335, 2, 6, 2.0, 6.0, 6.0, 6.0, 0.4774789113480821, 3.603318229746936, 0.2713796156294763], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-8", 3, 0, 0.0, 3.6666666666666665, 2, 6, 3.0, 6.0, 6.0, 6.0, 0.4774789113480821, 3.6462167256883653, 0.2727784796275664], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-27", 3, 0, 0.0, 2.6666666666666665, 2, 3, 3.0, 3.0, 3.0, 3.0, 0.48598736432852746, 2.1423310181435284, 0.27716466871861334], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-7", 3, 0, 0.0, 7.333333333333333, 3, 10, 9.0, 10.0, 10.0, 10.0, 0.460617227084293, 0.5445839091048672, 0.2626957623215108], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-28", 3, 0, 0.0, 2.3333333333333335, 2, 3, 2.0, 3.0, 3.0, 3.0, 0.4862236628849271, 1.4695920279578607, 0.27777426053484605], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-6", 3, 0, 0.0, 4.333333333333333, 3, 6, 4.0, 6.0, 6.0, 6.0, 0.4611128189363664, 2.3081158257762064, 0.26207779357516137], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-25", 3, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 0.4855154555753358, 0.7325404090467713, 0.2716800351998705], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-5", 3, 0, 0.0, 3.3333333333333335, 2, 5, 3.0, 5.0, 5.0, 5.0, 0.46125461254612543, 2.4699343673124234, 0.2612574953874539], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-26", 3, 0, 0.0, 2.3333333333333335, 2, 3, 2.0, 3.0, 3.0, 3.0, 0.48575129533678757, 2.712902009795984, 0.277504402121114], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-4", 3, 0, 0.0, 5.0, 3, 6, 6.0, 6.0, 6.0, 6.0, 0.4611128189363664, 0.6748578235474946, 0.26162748808791886], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-3", 3, 0, 0.0, 5.666666666666667, 4, 7, 6.0, 7.0, 7.0, 7.0, 0.4609002919035182, 3.025558361499462, 0.26195700184360116], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-2", 3, 0, 0.0, 8.666666666666666, 6, 12, 8.0, 12.0, 12.0, 12.0, 0.4608294930875576, 434.89463325652844, 0.26146673387096775], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-1", 3, 0, 0.0, 7.0, 5, 10, 6.0, 10.0, 10.0, 10.0, 0.4609002919035182, 120.89750729758795, 0.26240709978491317], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-0", 3, 0, 0.0, 33.333333333333336, 30, 38, 32.0, 38.0, 38.0, 38.0, 0.452147701582517, 3.930682460437076, 0.22872315373021854], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 96, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
