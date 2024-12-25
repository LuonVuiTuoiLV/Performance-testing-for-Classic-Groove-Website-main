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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9810606060606061, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-23"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-24"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-20"], "isController": false}, {"data": [0.875, 500, 1500, "http://localhost/Classic-Groove-main/index.php-18"], "isController": false}, {"data": [0.875, 500, 1500, "http://localhost/Classic-Groove-main/index.php-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-16"], "isController": false}, {"data": [0.875, 500, 1500, "http://localhost/Classic-Groove-main/index.php-17"], "isController": false}, {"data": [0.875, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-15"], "isController": false}, {"data": [0.875, 500, 1500, "http://localhost/Classic-Groove-main/index.php"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-30"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-29"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-27"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-28"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-25"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-26"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-1"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 128, 0, 0.0, 48.898437499999986, 1, 1132, 3.0, 194.60000000000005, 283.0, 1011.0699999999974, 16.511867905056757, 1703.3094282120744, 17.99737164602683], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://localhost/Classic-Groove-main/index.php-23", 4, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 0.568262537292229, 6.326360278448644, 0.3190927333428044], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-24", 4, 0, 0.0, 1.75, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.5685048322910744, 0.9471379334849347, 0.3175632461625924], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-21", 4, 0, 0.0, 1.75, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.5679397983813715, 1.4143032088598608, 0.3205753940082351], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-22", 4, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 0.5681818181818181, 2.455832741477273, 0.3207120028409091], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-20", 4, 0, 0.0, 3.25, 2, 4, 3.5, 4.0, 4.0, 4.0, 0.5676174258549738, 81.96972115793955, 0.32150205761316875], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-18", 4, 0, 0.0, 338.0, 201, 698, 226.5, 698.0, 698.0, 698.0, 0.5484711367064308, 48.711092828739886, 0.2870903606197724], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-19", 4, 0, 0.0, 343.25, 194, 715, 232.0, 715.0, 715.0, 715.0, 0.5453306066803, 48.40235173824131, 0.2849139400136333], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-16", 4, 0, 0.0, 4.25, 2, 9, 3.0, 9.0, 9.0, 9.0, 0.5629838142153413, 10.063885467980295, 0.3249252287121745], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-17", 4, 0, 0.0, 248.75, 107, 639, 124.5, 639.0, 639.0, 639.0, 0.5550159567087554, 1.7463490356597753, 0.2943102192313029], "isController": false}, {"data": ["Test", 4, 0, 0.0, 501.75, 283, 1132, 296.0, 1132.0, 1132.0, 1132.0, 0.5126890540886953, 846.1967884837221, 8.94101672648039], "isController": true}, {"data": ["http://localhost/Classic-Groove-main/index.php-14", 4, 0, 0.0, 2.25, 2, 3, 2.0, 3.0, 3.0, 3.0, 0.5621925509486999, 0.9547391075193253, 0.31952740688685877], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-15", 4, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 0.5629838142153413, 2.0497503958479943, 0.3249252287121745], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php", 4, 0, 0.0, 501.75, 283, 1132, 296.0, 1132.0, 1132.0, 1132.0, 0.5159958720330237, 851.6547141060372, 8.998685823013416], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-12", 4, 0, 0.0, 3.75, 3, 4, 4.0, 4.0, 4.0, 4.0, 0.5640157924421885, 1.1681020427946982, 0.32331764664410606], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-13", 4, 0, 0.0, 4.0, 2, 9, 2.5, 9.0, 9.0, 9.0, 0.5629838142153413, 2.7330005277973255, 0.3194273399014778], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-10", 4, 0, 0.0, 4.75, 2, 11, 3.0, 11.0, 11.0, 11.0, 0.5610885117127227, 1.0919034489409456, 0.3188999158367233], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-11", 4, 0, 0.0, 5.0, 3, 8, 4.5, 8.0, 8.0, 8.0, 0.5607738679377541, 1.2062935914061406, 0.3231021309406982], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-30", 4, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 0.5695571693008686, 3.5842054677488253, 0.32482557311690163], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-29", 4, 0, 0.0, 2.0, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.569313976658127, 0.7044148519783661, 0.32691076003415886], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-9", 4, 0, 0.0, 3.0, 2, 4, 3.0, 4.0, 4.0, 4.0, 0.5603810591202018, 4.228715370201737, 0.3184978285233959], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-8", 4, 0, 0.0, 4.25, 2, 6, 4.5, 6.0, 6.0, 6.0, 0.5601456378658451, 4.27753794111469, 0.32000507631984315], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-27", 4, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 0.5690709916062028, 2.5085805235453122, 0.32454829990041256], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-7", 4, 0, 0.0, 4.5, 3, 7, 4.0, 7.0, 7.0, 7.0, 0.5451819544773068, 0.6446084486166008, 0.31092408341283906], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-28", 4, 0, 0.0, 2.0, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.5692329585883023, 1.7204843816706987, 0.32519656325601254], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-6", 4, 0, 0.0, 8.75, 2, 14, 9.5, 14.0, 14.0, 14.0, 0.5449591280653951, 2.7278557135558583, 0.30973262942779295], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-25", 4, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 0.5687473339968719, 0.8581197568605147, 0.31825412341817144], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-5", 4, 0, 0.0, 4.75, 3, 6, 5.0, 6.0, 6.0, 6.0, 0.5450333832947268, 2.9187761871508378, 0.30871031475677885], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-26", 4, 0, 0.0, 1.75, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.5688282138794084, 3.1768833546643913, 0.3249653370307167], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-4", 4, 0, 0.0, 6.5, 3, 10, 6.5, 10.0, 10.0, 10.0, 0.5446623093681918, 0.7973132829520697, 0.3090320329520697], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-3", 4, 0, 0.0, 10.75, 5, 19, 9.5, 19.0, 19.0, 19.0, 0.5447364837259975, 3.5758971128966364, 0.3096060874302056], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-2", 4, 0, 0.0, 8.0, 7, 9, 8.0, 9.0, 9.0, 9.0, 0.5444399074452158, 513.7993451834081, 0.3089058459235062], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-1", 4, 0, 0.0, 7.0, 5, 10, 6.5, 10.0, 10.0, 10.0, 0.5445881552076243, 142.84962134104833, 0.31005360789652825], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-0", 4, 0, 0.0, 26.0, 18, 38, 24.0, 38.0, 38.0, 38.0, 0.5359056806002144, 4.658820672561629, 0.27109291264737406], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 128, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
