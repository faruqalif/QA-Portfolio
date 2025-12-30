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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.37589285714285714, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.565, 500, 1500, "GET Get Category"], "isController": false}, {"data": [0.435, 500, 1500, "GET List Products"], "isController": false}, {"data": [0.1475, 500, 1500, "POST  Create Product"], "isController": false}, {"data": [0.51, 500, 1500, "GET List Categories"], "isController": false}, {"data": [0.2625, 500, 1500, "POST Registration"], "isController": false}, {"data": [0.495, 500, 1500, "GET List Offers"], "isController": false}, {"data": [0.5625, 500, 1500, "GET Get Product"], "isController": false}, {"data": [0.5025, 500, 1500, "DEL Delete Product"], "isController": false}, {"data": [0.0025, 500, 1500, "PUT Update Product"], "isController": false}, {"data": [0.2475, 500, 1500, "POST Login"], "isController": false}, {"data": [0.46, 500, 1500, "PUT Update Offer"], "isController": false}, {"data": [0.44, 500, 1500, "POST Create Offer"], "isController": false}, {"data": [0.08, 500, 1500, "PUT Update Profile"], "isController": false}, {"data": [0.5525, 500, 1500, "GET Get Profile"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2800, 0, 0.0, 2146.3699999999917, 37, 18777, 1267.5, 4673.700000000001, 6585.249999999994, 14547.549999999968, 8.92979585848825, 21.67221153669827, 349.6443971660256], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET Get Category", 200, 0, 0.0, 924.4999999999991, 37, 4720, 716.5, 2044.5, 2864.7499999999945, 3760.630000000002, 0.6596567146456984, 0.4696188915788224, 0.11209010580893704], "isController": false}, {"data": ["GET List Products", 200, 0, 0.0, 1255.1200000000013, 134, 5255, 1145.0, 2291.2, 2629.3999999999996, 5134.670000000008, 0.6723073251244609, 8.47949911738654, 0.11161352077261558], "isController": false}, {"data": ["POST  Create Product", 200, 0, 0.0, 2713.51, 429, 6429, 1997.5, 5632.7, 5962.0999999999985, 6332.610000000001, 0.6592805271607095, 1.3436510564146347, 16.84114079430118], "isController": false}, {"data": ["GET List Categories", 200, 0, 0.0, 1159.4499999999996, 43, 5383, 1061.5, 2308.2000000000003, 2916.2999999999984, 5302.980000000018, 0.6547052026148925, 0.6841157878886085, 0.10997001450172024], "isController": false}, {"data": ["POST Registration", 200, 0, 0.0, 1921.1949999999995, 356, 6552, 1659.5, 3720.8, 4053.3999999999996, 5784.86000000001, 0.6458029267788642, 1.1140478887087817, 0.19298407772884027], "isController": false}, {"data": ["GET List Offers", 200, 0, 0.0, 1131.1549999999997, 46, 5294, 843.5, 2330.3, 2891.2999999999993, 4635.500000000002, 0.668918692932874, 0.7375481830496003, 0.2802403508478544], "isController": false}, {"data": ["GET Get Product", 200, 0, 0.0, 983.8699999999995, 54, 5179, 857.5, 1958.8000000000002, 2465.7, 4992.590000000008, 0.6741270055278414, 1.071513025397735, 0.11652390622893354], "isController": false}, {"data": ["DEL Delete Product", 200, 0, 0.0, 1363.8550000000002, 56, 5669, 925.0, 3249.5, 4157.65, 5543.480000000001, 0.6952507421801672, 0.5970737330793351, 0.30349324390091287], "isController": false}, {"data": ["PUT Update Product", 200, 0, 0.0, 9775.914999999997, 1251, 18777, 10586.5, 15081.7, 15887.05, 17234.61, 0.6729226038067232, 1.4013317506333884, 332.2577699429025], "isController": false}, {"data": ["POST Login", 200, 0, 0.0, 2189.549999999999, 336, 5057, 2011.0, 3815.1, 4260.15, 5013.180000000002, 0.6484684795683794, 1.1188962651052627, 0.18111521987944973], "isController": false}, {"data": ["PUT Update Offer", 200, 0, 0.0, 1078.869999999999, 69, 5862, 840.0, 2061.6000000000004, 2326.3999999999996, 3592.170000000001, 0.6710801370345639, 1.9302368420059257, 0.32177768289450287], "isController": false}, {"data": ["POST Create Offer", 200, 0, 0.0, 1713.2950000000005, 101, 5661, 1151.5, 4448.0, 4764.449999999999, 5593.000000000001, 0.6643238180018468, 1.9148842114725402, 0.345136983571272], "isController": false}, {"data": ["PUT Update Profile", 200, 0, 0.0, 2855.244999999999, 938, 7894, 2175.5, 5709.200000000002, 6205.749999999999, 6911.120000000003, 0.658059251655019, 0.8969913119727301, 16.68286559201478], "isController": false}, {"data": ["GET Get Profile", 200, 0, 0.0, 983.6500000000007, 47, 5407, 857.5, 1871.8, 2515.949999999998, 3907.3400000000015, 0.6952724946724744, 0.948530932673288, 0.28381240505184996], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2800, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
