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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 8.0, "minX": 0.0, "maxY": 85494.0, "series": [{"data": [[0.0, 8.0], [0.1, 11.0], [0.2, 11.0], [0.3, 11.0], [0.4, 11.0], [0.5, 11.0], [0.6, 11.0], [0.7, 11.0], [0.8, 11.0], [0.9, 11.0], [1.0, 12.0], [1.1, 12.0], [1.2, 12.0], [1.3, 12.0], [1.4, 12.0], [1.5, 12.0], [1.6, 12.0], [1.7, 12.0], [1.8, 12.0], [1.9, 12.0], [2.0, 12.0], [2.1, 12.0], [2.2, 12.0], [2.3, 12.0], [2.4, 12.0], [2.5, 12.0], [2.6, 12.0], [2.7, 12.0], [2.8, 12.0], [2.9, 12.0], [3.0, 12.0], [3.1, 12.0], [3.2, 12.0], [3.3, 12.0], [3.4, 12.0], [3.5, 12.0], [3.6, 12.0], [3.7, 12.0], [3.8, 12.0], [3.9, 12.0], [4.0, 12.0], [4.1, 12.0], [4.2, 12.0], [4.3, 12.0], [4.4, 12.0], [4.5, 12.0], [4.6, 12.0], [4.7, 12.0], [4.8, 12.0], [4.9, 12.0], [5.0, 12.0], [5.1, 12.0], [5.2, 12.0], [5.3, 12.0], [5.4, 12.0], [5.5, 12.0], [5.6, 12.0], [5.7, 12.0], [5.8, 12.0], [5.9, 12.0], [6.0, 12.0], [6.1, 12.0], [6.2, 12.0], [6.3, 12.0], [6.4, 12.0], [6.5, 12.0], [6.6, 12.0], [6.7, 12.0], [6.8, 12.0], [6.9, 12.0], [7.0, 12.0], [7.1, 12.0], [7.2, 12.0], [7.3, 13.0], [7.4, 13.0], [7.5, 13.0], [7.6, 13.0], [7.7, 13.0], [7.8, 13.0], [7.9, 13.0], [8.0, 13.0], [8.1, 13.0], [8.2, 13.0], [8.3, 13.0], [8.4, 13.0], [8.5, 13.0], [8.6, 13.0], [8.7, 13.0], [8.8, 13.0], [8.9, 13.0], [9.0, 13.0], [9.1, 13.0], [9.2, 13.0], [9.3, 13.0], [9.4, 13.0], [9.5, 13.0], [9.6, 13.0], [9.7, 13.0], [9.8, 13.0], [9.9, 13.0], [10.0, 13.0], [10.1, 13.0], [10.2, 13.0], [10.3, 13.0], [10.4, 13.0], [10.5, 13.0], [10.6, 13.0], [10.7, 13.0], [10.8, 13.0], [10.9, 13.0], [11.0, 13.0], [11.1, 13.0], [11.2, 13.0], [11.3, 13.0], [11.4, 13.0], [11.5, 13.0], [11.6, 13.0], [11.7, 13.0], [11.8, 13.0], [11.9, 13.0], [12.0, 13.0], [12.1, 13.0], [12.2, 13.0], [12.3, 13.0], [12.4, 13.0], [12.5, 13.0], [12.6, 13.0], [12.7, 13.0], [12.8, 13.0], [12.9, 13.0], [13.0, 13.0], [13.1, 13.0], [13.2, 13.0], [13.3, 13.0], [13.4, 13.0], [13.5, 13.0], [13.6, 13.0], [13.7, 13.0], [13.8, 13.0], [13.9, 13.0], [14.0, 13.0], [14.1, 13.0], [14.2, 13.0], [14.3, 13.0], [14.4, 13.0], [14.5, 13.0], [14.6, 13.0], [14.7, 13.0], [14.8, 13.0], [14.9, 13.0], [15.0, 13.0], [15.1, 13.0], [15.2, 13.0], [15.3, 13.0], [15.4, 13.0], [15.5, 13.0], [15.6, 13.0], [15.7, 13.0], [15.8, 13.0], [15.9, 13.0], [16.0, 13.0], [16.1, 13.0], [16.2, 13.0], [16.3, 13.0], [16.4, 13.0], [16.5, 13.0], [16.6, 13.0], [16.7, 13.0], [16.8, 13.0], [16.9, 13.0], [17.0, 13.0], [17.1, 13.0], [17.2, 13.0], [17.3, 13.0], [17.4, 13.0], [17.5, 13.0], [17.6, 13.0], [17.7, 13.0], [17.8, 13.0], [17.9, 13.0], [18.0, 13.0], [18.1, 13.0], [18.2, 13.0], [18.3, 13.0], [18.4, 13.0], [18.5, 13.0], [18.6, 13.0], [18.7, 13.0], [18.8, 13.0], [18.9, 13.0], [19.0, 13.0], [19.1, 13.0], [19.2, 13.0], [19.3, 13.0], [19.4, 13.0], [19.5, 13.0], [19.6, 13.0], [19.7, 13.0], [19.8, 13.0], [19.9, 13.0], [20.0, 13.0], [20.1, 13.0], [20.2, 13.0], [20.3, 13.0], [20.4, 13.0], [20.5, 13.0], [20.6, 13.0], [20.7, 13.0], [20.8, 13.0], [20.9, 13.0], [21.0, 13.0], [21.1, 13.0], [21.2, 13.0], [21.3, 13.0], [21.4, 13.0], [21.5, 13.0], [21.6, 13.0], [21.7, 13.0], [21.8, 13.0], [21.9, 13.0], [22.0, 13.0], [22.1, 13.0], [22.2, 13.0], [22.3, 13.0], [22.4, 13.0], [22.5, 13.0], [22.6, 13.0], [22.7, 13.0], [22.8, 13.0], [22.9, 13.0], [23.0, 13.0], [23.1, 13.0], [23.2, 13.0], [23.3, 13.0], [23.4, 13.0], [23.5, 13.0], [23.6, 13.0], [23.7, 13.0], [23.8, 13.0], [23.9, 13.0], [24.0, 13.0], [24.1, 13.0], [24.2, 14.0], [24.3, 14.0], [24.4, 14.0], [24.5, 14.0], [24.6, 14.0], [24.7, 14.0], [24.8, 14.0], [24.9, 14.0], [25.0, 14.0], [25.1, 14.0], [25.2, 14.0], [25.3, 14.0], [25.4, 14.0], [25.5, 14.0], [25.6, 14.0], [25.7, 14.0], [25.8, 14.0], [25.9, 14.0], [26.0, 14.0], [26.1, 14.0], [26.2, 14.0], [26.3, 14.0], [26.4, 14.0], [26.5, 14.0], [26.6, 14.0], [26.7, 14.0], [26.8, 14.0], [26.9, 14.0], [27.0, 14.0], [27.1, 14.0], [27.2, 14.0], [27.3, 14.0], [27.4, 14.0], [27.5, 14.0], [27.6, 14.0], [27.7, 14.0], [27.8, 14.0], [27.9, 14.0], [28.0, 14.0], [28.1, 14.0], [28.2, 14.0], [28.3, 14.0], [28.4, 14.0], [28.5, 14.0], [28.6, 14.0], [28.7, 14.0], [28.8, 14.0], [28.9, 14.0], [29.0, 14.0], [29.1, 14.0], [29.2, 14.0], [29.3, 14.0], [29.4, 14.0], [29.5, 14.0], [29.6, 14.0], [29.7, 14.0], [29.8, 14.0], [29.9, 14.0], [30.0, 14.0], [30.1, 14.0], [30.2, 14.0], [30.3, 14.0], [30.4, 14.0], [30.5, 14.0], [30.6, 14.0], [30.7, 14.0], [30.8, 14.0], [30.9, 14.0], [31.0, 14.0], [31.1, 14.0], [31.2, 14.0], [31.3, 14.0], [31.4, 14.0], [31.5, 14.0], [31.6, 14.0], [31.7, 14.0], [31.8, 14.0], [31.9, 14.0], [32.0, 14.0], [32.1, 14.0], [32.2, 14.0], [32.3, 14.0], [32.4, 14.0], [32.5, 14.0], [32.6, 14.0], [32.7, 14.0], [32.8, 14.0], [32.9, 14.0], [33.0, 14.0], [33.1, 14.0], [33.2, 14.0], [33.3, 14.0], [33.4, 14.0], [33.5, 14.0], [33.6, 14.0], [33.7, 14.0], [33.8, 14.0], [33.9, 14.0], [34.0, 14.0], [34.1, 14.0], [34.2, 14.0], [34.3, 14.0], [34.4, 14.0], [34.5, 14.0], [34.6, 14.0], [34.7, 14.0], [34.8, 14.0], [34.9, 14.0], [35.0, 14.0], [35.1, 14.0], [35.2, 14.0], [35.3, 14.0], [35.4, 14.0], [35.5, 14.0], [35.6, 14.0], [35.7, 14.0], [35.8, 14.0], [35.9, 14.0], [36.0, 14.0], [36.1, 14.0], [36.2, 14.0], [36.3, 14.0], [36.4, 14.0], [36.5, 14.0], [36.6, 14.0], [36.7, 14.0], [36.8, 14.0], [36.9, 14.0], [37.0, 14.0], [37.1, 14.0], [37.2, 14.0], [37.3, 14.0], [37.4, 14.0], [37.5, 14.0], [37.6, 14.0], [37.7, 14.0], [37.8, 14.0], [37.9, 14.0], [38.0, 14.0], [38.1, 14.0], [38.2, 14.0], [38.3, 14.0], [38.4, 14.0], [38.5, 14.0], [38.6, 14.0], [38.7, 14.0], [38.8, 14.0], [38.9, 14.0], [39.0, 14.0], [39.1, 14.0], [39.2, 14.0], [39.3, 14.0], [39.4, 14.0], [39.5, 14.0], [39.6, 14.0], [39.7, 14.0], [39.8, 14.0], [39.9, 14.0], [40.0, 14.0], [40.1, 14.0], [40.2, 14.0], [40.3, 14.0], [40.4, 14.0], [40.5, 14.0], [40.6, 14.0], [40.7, 14.0], [40.8, 14.0], [40.9, 14.0], [41.0, 14.0], [41.1, 14.0], [41.2, 14.0], [41.3, 14.0], [41.4, 14.0], [41.5, 14.0], [41.6, 14.0], [41.7, 14.0], [41.8, 14.0], [41.9, 14.0], [42.0, 14.0], [42.1, 14.0], [42.2, 14.0], [42.3, 14.0], [42.4, 14.0], [42.5, 14.0], [42.6, 14.0], [42.7, 14.0], [42.8, 14.0], [42.9, 14.0], [43.0, 14.0], [43.1, 14.0], [43.2, 14.0], [43.3, 14.0], [43.4, 14.0], [43.5, 14.0], [43.6, 14.0], [43.7, 14.0], [43.8, 14.0], [43.9, 14.0], [44.0, 14.0], [44.1, 14.0], [44.2, 14.0], [44.3, 14.0], [44.4, 15.0], [44.5, 15.0], [44.6, 15.0], [44.7, 15.0], [44.8, 15.0], [44.9, 15.0], [45.0, 15.0], [45.1, 15.0], [45.2, 15.0], [45.3, 15.0], [45.4, 15.0], [45.5, 15.0], [45.6, 15.0], [45.7, 15.0], [45.8, 15.0], [45.9, 15.0], [46.0, 15.0], [46.1, 15.0], [46.2, 15.0], [46.3, 15.0], [46.4, 15.0], [46.5, 15.0], [46.6, 15.0], [46.7, 15.0], [46.8, 15.0], [46.9, 15.0], [47.0, 15.0], [47.1, 15.0], [47.2, 15.0], [47.3, 15.0], [47.4, 15.0], [47.5, 15.0], [47.6, 15.0], [47.7, 15.0], [47.8, 15.0], [47.9, 15.0], [48.0, 15.0], [48.1, 15.0], [48.2, 15.0], [48.3, 15.0], [48.4, 15.0], [48.5, 15.0], [48.6, 15.0], [48.7, 15.0], [48.8, 15.0], [48.9, 15.0], [49.0, 15.0], [49.1, 15.0], [49.2, 15.0], [49.3, 15.0], [49.4, 15.0], [49.5, 15.0], [49.6, 15.0], [49.7, 15.0], [49.8, 15.0], [49.9, 15.0], [50.0, 15.0], [50.1, 15.0], [50.2, 15.0], [50.3, 15.0], [50.4, 15.0], [50.5, 15.0], [50.6, 15.0], [50.7, 15.0], [50.8, 15.0], [50.9, 15.0], [51.0, 15.0], [51.1, 15.0], [51.2, 15.0], [51.3, 15.0], [51.4, 15.0], [51.5, 15.0], [51.6, 15.0], [51.7, 15.0], [51.8, 15.0], [51.9, 15.0], [52.0, 15.0], [52.1, 15.0], [52.2, 15.0], [52.3, 15.0], [52.4, 15.0], [52.5, 15.0], [52.6, 15.0], [52.7, 15.0], [52.8, 15.0], [52.9, 15.0], [53.0, 15.0], [53.1, 15.0], [53.2, 15.0], [53.3, 15.0], [53.4, 15.0], [53.5, 15.0], [53.6, 15.0], [53.7, 15.0], [53.8, 15.0], [53.9, 15.0], [54.0, 15.0], [54.1, 15.0], [54.2, 15.0], [54.3, 15.0], [54.4, 15.0], [54.5, 15.0], [54.6, 15.0], [54.7, 15.0], [54.8, 15.0], [54.9, 15.0], [55.0, 15.0], [55.1, 15.0], [55.2, 15.0], [55.3, 15.0], [55.4, 15.0], [55.5, 15.0], [55.6, 15.0], [55.7, 15.0], [55.8, 15.0], [55.9, 15.0], [56.0, 15.0], [56.1, 15.0], [56.2, 15.0], [56.3, 15.0], [56.4, 15.0], [56.5, 15.0], [56.6, 15.0], [56.7, 15.0], [56.8, 15.0], [56.9, 15.0], [57.0, 15.0], [57.1, 15.0], [57.2, 15.0], [57.3, 15.0], [57.4, 15.0], [57.5, 15.0], [57.6, 15.0], [57.7, 15.0], [57.8, 15.0], [57.9, 15.0], [58.0, 15.0], [58.1, 16.0], [58.2, 16.0], [58.3, 16.0], [58.4, 16.0], [58.5, 16.0], [58.6, 16.0], [58.7, 16.0], [58.8, 16.0], [58.9, 16.0], [59.0, 16.0], [59.1, 16.0], [59.2, 16.0], [59.3, 16.0], [59.4, 16.0], [59.5, 16.0], [59.6, 16.0], [59.7, 16.0], [59.8, 16.0], [59.9, 16.0], [60.0, 16.0], [60.1, 16.0], [60.2, 16.0], [60.3, 16.0], [60.4, 16.0], [60.5, 16.0], [60.6, 16.0], [60.7, 16.0], [60.8, 16.0], [60.9, 16.0], [61.0, 16.0], [61.1, 16.0], [61.2, 16.0], [61.3, 16.0], [61.4, 16.0], [61.5, 16.0], [61.6, 16.0], [61.7, 16.0], [61.8, 16.0], [61.9, 16.0], [62.0, 16.0], [62.1, 16.0], [62.2, 16.0], [62.3, 16.0], [62.4, 16.0], [62.5, 16.0], [62.6, 16.0], [62.7, 16.0], [62.8, 16.0], [62.9, 16.0], [63.0, 16.0], [63.1, 16.0], [63.2, 16.0], [63.3, 16.0], [63.4, 16.0], [63.5, 16.0], [63.6, 16.0], [63.7, 16.0], [63.8, 16.0], [63.9, 16.0], [64.0, 16.0], [64.1, 16.0], [64.2, 16.0], [64.3, 16.0], [64.4, 16.0], [64.5, 16.0], [64.6, 16.0], [64.7, 16.0], [64.8, 16.0], [64.9, 16.0], [65.0, 16.0], [65.1, 16.0], [65.2, 16.0], [65.3, 16.0], [65.4, 16.0], [65.5, 16.0], [65.6, 16.0], [65.7, 16.0], [65.8, 16.0], [65.9, 16.0], [66.0, 16.0], [66.1, 16.0], [66.2, 16.0], [66.3, 16.0], [66.4, 16.0], [66.5, 16.0], [66.6, 16.0], [66.7, 16.0], [66.8, 16.0], [66.9, 16.0], [67.0, 16.0], [67.1, 17.0], [67.2, 17.0], [67.3, 17.0], [67.4, 17.0], [67.5, 17.0], [67.6, 17.0], [67.7, 17.0], [67.8, 17.0], [67.9, 17.0], [68.0, 17.0], [68.1, 17.0], [68.2, 17.0], [68.3, 17.0], [68.4, 17.0], [68.5, 17.0], [68.6, 17.0], [68.7, 17.0], [68.8, 17.0], [68.9, 17.0], [69.0, 17.0], [69.1, 17.0], [69.2, 17.0], [69.3, 17.0], [69.4, 17.0], [69.5, 17.0], [69.6, 17.0], [69.7, 17.0], [69.8, 17.0], [69.9, 17.0], [70.0, 17.0], [70.1, 17.0], [70.2, 17.0], [70.3, 17.0], [70.4, 17.0], [70.5, 17.0], [70.6, 17.0], [70.7, 17.0], [70.8, 17.0], [70.9, 17.0], [71.0, 17.0], [71.1, 17.0], [71.2, 17.0], [71.3, 17.0], [71.4, 17.0], [71.5, 17.0], [71.6, 17.0], [71.7, 17.0], [71.8, 17.0], [71.9, 17.0], [72.0, 17.0], [72.1, 17.0], [72.2, 17.0], [72.3, 17.0], [72.4, 17.0], [72.5, 17.0], [72.6, 17.0], [72.7, 17.0], [72.8, 17.0], [72.9, 18.0], [73.0, 18.0], [73.1, 18.0], [73.2, 18.0], [73.3, 18.0], [73.4, 18.0], [73.5, 18.0], [73.6, 18.0], [73.7, 18.0], [73.8, 18.0], [73.9, 18.0], [74.0, 18.0], [74.1, 18.0], [74.2, 18.0], [74.3, 18.0], [74.4, 18.0], [74.5, 18.0], [74.6, 18.0], [74.7, 18.0], [74.8, 18.0], [74.9, 18.0], [75.0, 18.0], [75.1, 18.0], [75.2, 18.0], [75.3, 18.0], [75.4, 18.0], [75.5, 18.0], [75.6, 18.0], [75.7, 18.0], [75.8, 18.0], [75.9, 18.0], [76.0, 18.0], [76.1, 18.0], [76.2, 18.0], [76.3, 18.0], [76.4, 18.0], [76.5, 18.0], [76.6, 18.0], [76.7, 18.0], [76.8, 18.0], [76.9, 18.0], [77.0, 18.0], [77.1, 19.0], [77.2, 19.0], [77.3, 19.0], [77.4, 19.0], [77.5, 19.0], [77.6, 19.0], [77.7, 19.0], [77.8, 19.0], [77.9, 19.0], [78.0, 19.0], [78.1, 19.0], [78.2, 19.0], [78.3, 19.0], [78.4, 19.0], [78.5, 19.0], [78.6, 19.0], [78.7, 19.0], [78.8, 19.0], [78.9, 19.0], [79.0, 19.0], [79.1, 19.0], [79.2, 19.0], [79.3, 19.0], [79.4, 19.0], [79.5, 19.0], [79.6, 19.0], [79.7, 19.0], [79.8, 19.0], [79.9, 19.0], [80.0, 19.0], [80.1, 20.0], [80.2, 20.0], [80.3, 20.0], [80.4, 20.0], [80.5, 20.0], [80.6, 20.0], [80.7, 20.0], [80.8, 20.0], [80.9, 20.0], [81.0, 20.0], [81.1, 20.0], [81.2, 20.0], [81.3, 20.0], [81.4, 20.0], [81.5, 20.0], [81.6, 20.0], [81.7, 20.0], [81.8, 20.0], [81.9, 20.0], [82.0, 20.0], [82.1, 20.0], [82.2, 20.0], [82.3, 20.0], [82.4, 21.0], [82.5, 21.0], [82.6, 21.0], [82.7, 21.0], [82.8, 21.0], [82.9, 21.0], [83.0, 21.0], [83.1, 21.0], [83.2, 21.0], [83.3, 21.0], [83.4, 21.0], [83.5, 21.0], [83.6, 21.0], [83.7, 21.0], [83.8, 21.0], [83.9, 21.0], [84.0, 21.0], [84.1, 22.0], [84.2, 22.0], [84.3, 22.0], [84.4, 22.0], [84.5, 22.0], [84.6, 22.0], [84.7, 22.0], [84.8, 22.0], [84.9, 22.0], [85.0, 22.0], [85.1, 22.0], [85.2, 22.0], [85.3, 22.0], [85.4, 22.0], [85.5, 23.0], [85.6, 23.0], [85.7, 23.0], [85.8, 23.0], [85.9, 23.0], [86.0, 23.0], [86.1, 23.0], [86.2, 23.0], [86.3, 23.0], [86.4, 23.0], [86.5, 23.0], [86.6, 23.0], [86.7, 23.0], [86.8, 24.0], [86.9, 24.0], [87.0, 24.0], [87.1, 24.0], [87.2, 24.0], [87.3, 24.0], [87.4, 24.0], [87.5, 24.0], [87.6, 24.0], [87.7, 24.0], [87.8, 24.0], [87.9, 25.0], [88.0, 25.0], [88.1, 25.0], [88.2, 25.0], [88.3, 25.0], [88.4, 25.0], [88.5, 25.0], [88.6, 25.0], [88.7, 25.0], [88.8, 26.0], [88.9, 26.0], [89.0, 26.0], [89.1, 26.0], [89.2, 26.0], [89.3, 26.0], [89.4, 26.0], [89.5, 26.0], [89.6, 27.0], [89.7, 27.0], [89.8, 27.0], [89.9, 27.0], [90.0, 27.0], [90.1, 27.0], [90.2, 27.0], [90.3, 28.0], [90.4, 28.0], [90.5, 28.0], [90.6, 28.0], [90.7, 28.0], [90.8, 28.0], [90.9, 28.0], [91.0, 28.0], [91.1, 29.0], [91.2, 29.0], [91.3, 29.0], [91.4, 29.0], [91.5, 29.0], [91.6, 29.0], [91.7, 29.0], [91.8, 30.0], [91.9, 30.0], [92.0, 30.0], [92.1, 30.0], [92.2, 30.0], [92.3, 30.0], [92.4, 31.0], [92.5, 31.0], [92.6, 31.0], [92.7, 31.0], [92.8, 31.0], [92.9, 31.0], [93.0, 32.0], [93.1, 32.0], [93.2, 32.0], [93.3, 32.0], [93.4, 32.0], [93.5, 33.0], [93.6, 33.0], [93.7, 33.0], [93.8, 33.0], [93.9, 33.0], [94.0, 34.0], [94.1, 34.0], [94.2, 34.0], [94.3, 34.0], [94.4, 34.0], [94.5, 35.0], [94.6, 35.0], [94.7, 35.0], [94.8, 36.0], [94.9, 36.0], [95.0, 36.0], [95.1, 36.0], [95.2, 37.0], [95.3, 37.0], [95.4, 37.0], [95.5, 37.0], [95.6, 38.0], [95.7, 38.0], [95.8, 38.0], [95.9, 39.0], [96.0, 39.0], [96.1, 40.0], [96.2, 40.0], [96.3, 41.0], [96.4, 41.0], [96.5, 42.0], [96.6, 42.0], [96.7, 43.0], [96.8, 43.0], [96.9, 44.0], [97.0, 44.0], [97.1, 45.0], [97.2, 46.0], [97.3, 47.0], [97.4, 48.0], [97.5, 48.0], [97.6, 49.0], [97.7, 50.0], [97.8, 51.0], [97.9, 53.0], [98.0, 54.0], [98.1, 55.0], [98.2, 57.0], [98.3, 59.0], [98.4, 61.0], [98.5, 64.0], [98.6, 66.0], [98.7, 69.0], [98.8, 72.0], [98.9, 76.0], [99.0, 81.0], [99.1, 87.0], [99.2, 93.0], [99.3, 100.0], [99.4, 109.0], [99.5, 116.0], [99.6, 129.0], [99.7, 152.0], [99.8, 195.0], [99.9, 1042.0]], "isOverall": false, "label": "http://localhost/Classic-Groove-main/", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 109178.0, "series": [{"data": [[0.0, 109178.0], [66300.0, 1.0], [71500.0, 1.0], [75500.0, 1.0], [100.0, 557.0], [34700.0, 1.0], [35900.0, 1.0], [38700.0, 1.0], [37300.0, 1.0], [37500.0, 1.0], [41300.0, 1.0], [43100.0, 1.0], [43300.0, 1.0], [45300.0, 1.0], [47500.0, 1.0], [48900.0, 1.0], [50500.0, 1.0], [51100.0, 1.0], [200.0, 70.0], [52900.0, 1.0], [53500.0, 1.0], [55900.0, 1.0], [56500.0, 1.0], [57300.0, 1.0], [56700.0, 1.0], [61100.0, 1.0], [61300.0, 1.0], [62700.0, 1.0], [61500.0, 1.0], [63300.0, 1.0], [65300.0, 1.0], [65100.0, 1.0], [300.0, 13.0], [85400.0, 1.0], [84200.0, 1.0], [400.0, 2.0], [500.0, 6.0], [600.0, 5.0], [700.0, 3.0], [900.0, 8.0], [1000.0, 7.0], [2800.0, 1.0], [2700.0, 1.0], [3300.0, 1.0], [3500.0, 1.0], [3900.0, 1.0], [71300.0, 1.0], [5100.0, 1.0], [4900.0, 1.0], [5300.0, 2.0], [5600.0, 2.0], [5700.0, 1.0], [6500.0, 1.0], [7000.0, 3.0], [7400.0, 1.0], [8100.0, 1.0], [8400.0, 1.0], [9000.0, 1.0], [9400.0, 1.0], [9600.0, 1.0], [9300.0, 1.0], [9500.0, 1.0], [10100.0, 1.0], [10300.0, 1.0], [10800.0, 1.0], [13100.0, 1.0], [14100.0, 1.0], [14400.0, 1.0], [15400.0, 1.0], [15500.0, 1.0], [16000.0, 1.0], [16200.0, 1.0], [16300.0, 1.0], [16500.0, 1.0], [17000.0, 1.0], [16600.0, 1.0], [22200.0, 1.0], [22100.0, 1.0], [24000.0, 1.0], [25200.0, 1.0], [26600.0, 1.0], [27300.0, 2.0], [27100.0, 1.0], [30100.0, 2.0], [31100.0, 1.0], [34200.0, 1.0], [33600.0, 1.0], [33400.0, 1.0], [35400.0, 1.0], [41800.0, 1.0], [42200.0, 1.0], [45000.0, 1.0], [46800.0, 1.0], [46600.0, 1.0], [48200.0, 1.0], [49000.0, 1.0], [47600.0, 1.0], [48800.0, 1.0], [49400.0, 1.0], [52200.0, 1.0], [52800.0, 1.0], [53400.0, 1.0], [54400.0, 1.0], [54200.0, 1.0], [57200.0, 1.0], [62000.0, 1.0], [64200.0, 1.0]], "isOverall": false, "label": "http://localhost/Classic-Groove-main/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 85400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 29.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 109820.0, "series": [{"data": [[0.0, 109820.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 29.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 103.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 8.63061053805404, "minX": 1.7348004E12, "maxY": 9.0, "series": [{"data": [[1.73480058E12, 9.0], [1.73480088E12, 9.0], [1.7348004E12, 8.63061053805404], [1.73480094E12, 9.0], [1.73480046E12, 9.0], [1.73480076E12, 9.0], [1.73480082E12, 9.0], [1.73480064E12, 9.0], [1.7348007E12, 9.0], [1.734801E12, 8.97106109324759], [1.73480052E12, 9.0]], "isOverall": false, "label": "jp@gc - Ultimate Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.734801E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 46.335887541344995, "minX": 1.0, "maxY": 1630.121212121212, "series": [{"data": [[1.0, 1630.121212121212], [2.0, 752.3972602739726], [4.0, 352.00694444444446], [8.0, 375.46190476190475], [9.0, 46.335887541344995], [5.0, 398.8387096774194], [3.0, 484.8220338983051], [6.0, 261.4227272727273], [7.0, 569.811320754717]], "isOverall": false, "label": "http://localhost/Classic-Groove-main/", "isController": false}, {"data": [[8.963520445285225, 50.46379329161769]], "isOverall": false, "label": "http://localhost/Classic-Groove-main/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 9.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 10553.266666666666, "minX": 1.7348004E12, "maxY": 2781133.1666666665, "series": [{"data": [[1.73480058E12, 1938855.6], [1.73480088E12, 802663.6666666666], [1.7348004E12, 1596573.7], [1.73480094E12, 1022988.1666666666], [1.73480046E12, 2781133.1666666665], [1.73480076E12, 1933811.1333333333], [1.73480082E12, 799993.0666666667], [1.73480064E12, 1674021.1], [1.7348007E12, 1251621.2], [1.734801E12, 184568.13333333333], [1.73480052E12, 2326982.8]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.73480058E12, 110860.2], [1.73480088E12, 45894.833333333336], [1.7348004E12, 91289.15], [1.73480094E12, 58492.583333333336], [1.73480046E12, 159020.08333333334], [1.73480076E12, 110571.76666666666], [1.73480082E12, 45742.13333333333], [1.73480064E12, 95717.45], [1.7348007E12, 71565.4], [1.734801E12, 10553.266666666666], [1.73480052E12, 133052.6]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.734801E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 27.766177647372647, "minX": 1.7348004E12, "maxY": 464.16237942122183, "series": [{"data": [[1.73480058E12, 36.457912457912265], [1.73480088E12, 121.49741219963], [1.7348004E12, 29.15035777344118], [1.73480094E12, 81.80290065264664], [1.73480046E12, 27.766177647372647], [1.73480076E12, 51.63840724259625], [1.73480082E12, 59.5263353115728], [1.73480064E12, 45.54834707081435], [1.7348007E12, 55.42804646752024], [1.734801E12, 464.16237942122183], [1.73480052E12, 29.566118337158947]], "isOverall": false, "label": "http://localhost/Classic-Groove-main/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.734801E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 27.311122966124287, "minX": 1.7348004E12, "maxY": 463.6615755627009, "series": [{"data": [[1.73480058E12, 35.92156412610973], [1.73480088E12, 121.14510166358596], [1.7348004E12, 28.313353777529848], [1.73480094E12, 81.31907179115319], [1.73480046E12, 27.311122966124287], [1.73480076E12, 50.8810035292311], [1.73480082E12, 58.99258160237393], [1.73480064E12, 44.994770894265656], [1.7348007E12, 54.94914651493616], [1.734801E12, 463.6615755627009], [1.73480052E12, 28.559997449630295]], "isOverall": false, "label": "http://localhost/Classic-Groove-main/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.734801E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 6.2637707948243895, "minX": 1.7348004E12, "maxY": 8.2871480345693, "series": [{"data": [[1.73480058E12, 6.551346801346786], [1.73480088E12, 6.2637707948243895], [1.7348004E12, 8.2871480345693], [1.73480094E12, 6.56620739666423], [1.73480046E12, 6.422886102960801], [1.73480076E12, 6.677689120761105], [1.73480082E12, 6.5411721068249316], [1.73480064E12, 6.891429584330368], [1.7348007E12, 6.585467045993361], [1.734801E12, 6.6254019292604545], [1.73480052E12, 6.78136954858457]], "isOverall": false, "label": "http://localhost/Classic-Groove-main/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.734801E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 8.0, "minX": 1.7348004E12, "maxY": 85494.0, "series": [{"data": [[1.73480058E12, 45079.0], [1.73480088E12, 64249.0], [1.7348004E12, 9013.0], [1.73480094E12, 75574.0], [1.73480046E12, 22244.0], [1.73480076E12, 66363.0], [1.73480082E12, 71561.0], [1.73480064E12, 43110.0], [1.7348007E12, 65340.0], [1.734801E12, 85494.0], [1.73480052E12, 30163.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.73480058E12, 26.0], [1.73480088E12, 18.0], [1.7348004E12, 42.0], [1.73480094E12, 22.0], [1.73480046E12, 27.0], [1.73480076E12, 24.0], [1.73480082E12, 20.0], [1.73480064E12, 30.0], [1.7348007E12, 23.0], [1.734801E12, 24.0], [1.73480052E12, 28.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.73480058E12, 69.0], [1.73480088E12, 38.0], [1.7348004E12, 149.3799999999992], [1.73480094E12, 53.0], [1.73480046E12, 66.0], [1.73480076E12, 57.0], [1.73480082E12, 54.06999999999971], [1.73480064E12, 92.0], [1.7348007E12, 61.0], [1.734801E12, 111.54999999999995], [1.73480052E12, 70.14999999999964]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.73480058E12, 34.0], [1.73480088E12, 21.0], [1.7348004E12, 66.0], [1.73480094E12, 29.0], [1.73480046E12, 36.0], [1.73480076E12, 32.0], [1.73480082E12, 27.0], [1.73480064E12, 39.0], [1.7348007E12, 31.0], [1.734801E12, 31.75], [1.73480052E12, 36.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.73480058E12, 9.0], [1.73480088E12, 10.0], [1.7348004E12, 10.0], [1.73480094E12, 9.0], [1.73480046E12, 10.0], [1.73480076E12, 8.0], [1.73480082E12, 9.0], [1.73480064E12, 9.0], [1.7348007E12, 11.0], [1.734801E12, 11.0], [1.73480052E12, 9.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.73480058E12, 15.0], [1.73480088E12, 15.0], [1.7348004E12, 17.0], [1.73480094E12, 15.0], [1.73480046E12, 14.0], [1.73480076E12, 15.0], [1.73480082E12, 15.0], [1.73480064E12, 15.0], [1.7348007E12, 15.0], [1.734801E12, 15.0], [1.73480052E12, 15.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.734801E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 13.0, "minX": 1.0, "maxY": 66051.0, "series": [{"data": [[2.0, 64057.0], [3.0, 52940.0], [6.0, 14.0], [11.0, 25.0], [20.0, 15.5], [27.0, 14.0], [28.0, 14.0], [32.0, 14.5], [37.0, 16.0], [39.0, 13.0], [47.0, 19.0], [48.0, 20.0], [50.0, 15.0], [52.0, 15.0], [53.0, 15.0], [55.0, 17.0], [54.0, 17.0], [56.0, 17.0], [57.0, 16.0], [59.0, 15.0], [60.0, 15.0], [61.0, 16.0], [63.0, 15.0], [62.0, 15.0], [65.0, 14.0], [67.0, 14.0], [66.0, 14.0], [64.0, 14.0], [68.0, 14.0], [71.0, 13.0], [69.0, 14.0], [70.0, 14.0], [75.0, 13.0], [72.0, 13.0], [74.0, 13.0], [82.0, 31.0], [80.0, 16.0], [83.0, 14.0], [81.0, 14.0], [84.0, 14.0], [86.0, 16.0], [90.0, 23.0], [88.0, 16.0], [98.0, 16.5], [99.0, 15.0], [100.0, 16.0], [104.0, 15.0], [106.0, 15.0], [111.0, 23.0], [108.0, 14.5], [110.0, 15.0], [115.0, 15.0], [112.0, 15.0], [113.0, 16.0], [114.0, 15.0], [117.0, 15.0], [119.0, 14.0], [116.0, 17.0], [118.0, 15.0], [122.0, 14.0], [123.0, 15.0], [121.0, 14.0], [120.0, 14.0], [127.0, 15.0], [126.0, 15.0], [124.0, 14.0], [125.0, 15.0], [135.0, 14.0], [133.0, 14.0], [134.0, 14.0], [131.0, 15.0], [130.0, 15.0], [128.0, 14.0], [129.0, 17.0], [132.0, 14.0], [136.0, 14.0], [137.0, 15.0], [143.0, 16.0], [141.0, 15.0], [142.0, 16.0], [138.0, 19.0], [139.0, 15.0], [140.0, 15.0], [146.0, 14.0], [150.0, 18.0], [147.0, 18.0], [149.0, 14.0], [153.0, 15.0], [154.0, 16.0], [156.0, 15.0], [158.0, 15.0], [152.0, 15.0], [163.0, 16.0], [167.0, 15.0], [160.0, 16.0], [161.0, 19.0], [166.0, 15.0], [164.0, 15.0], [170.0, 16.0], [175.0, 15.0], [171.0, 15.0], [172.0, 17.0], [174.0, 17.0], [168.0, 18.0], [173.0, 16.0], [176.0, 14.0], [182.0, 14.0], [183.0, 15.0], [180.0, 14.0], [179.0, 15.0], [181.0, 15.0], [177.0, 15.0], [178.0, 15.0], [185.0, 15.0], [188.0, 15.0], [189.0, 16.0], [186.0, 14.0], [191.0, 16.0], [187.0, 15.0], [184.0, 14.0], [190.0, 15.0], [194.0, 15.0], [199.0, 14.0], [196.0, 14.0], [193.0, 14.0], [197.0, 14.0], [198.0, 14.0], [195.0, 15.0], [192.0, 15.0], [206.0, 16.0], [202.0, 14.0], [201.0, 15.0], [203.0, 15.0], [205.0, 15.0], [200.0, 14.0], [207.0, 16.0], [212.0, 18.0], [211.0, 14.0], [214.0, 15.0], [213.0, 15.0], [210.0, 17.0], [215.0, 16.0], [208.0, 14.0], [222.0, 15.0], [219.0, 15.0], [217.0, 15.0], [218.0, 16.0], [221.0, 16.0], [231.0, 16.0], [226.0, 16.0], [228.0, 15.0], [229.0, 14.0], [227.0, 16.0], [234.0, 14.0], [238.0, 15.0], [233.0, 14.0], [235.0, 14.0], [244.0, 14.0], [241.0, 15.0], [242.0, 15.0], [240.0, 15.0], [247.0, 14.0], [245.0, 15.0], [250.0, 14.0], [249.0, 16.0], [251.0, 14.0], [270.0, 15.0], [256.0, 16.0], [261.0, 17.0], [267.0, 16.0], [260.0, 13.0], [266.0, 15.0], [263.0, 15.0], [264.0, 14.0], [265.0, 15.0], [258.0, 14.0], [257.0, 15.0], [274.0, 17.0], [272.0, 21.5], [283.0, 14.0], [287.0, 15.0], [273.0, 17.0], [277.0, 15.0], [275.0, 14.0], [284.0, 15.0], [282.0, 17.0], [278.0, 14.0], [300.0, 16.0], [301.0, 16.0], [291.0, 14.0], [290.0, 19.0], [295.0, 19.0], [294.0, 16.0], [296.0, 16.0], [303.0, 15.0], [302.0, 14.0], [299.0, 15.0], [298.0, 19.0], [297.0, 17.0], [289.0, 15.0], [288.0, 16.0], [307.0, 14.0], [316.0, 17.0], [304.0, 16.0], [309.0, 18.0], [308.0, 16.0], [311.0, 14.0], [314.0, 14.0], [313.0, 15.0], [315.0, 15.0], [310.0, 15.0], [306.0, 16.0], [319.0, 15.0], [334.0, 14.5], [320.0, 15.0], [327.0, 16.0], [328.0, 15.0], [333.0, 13.0], [332.0, 14.0], [329.0, 13.0], [324.0, 15.0], [325.0, 15.0], [335.0, 15.0], [321.0, 14.0], [322.0, 16.0], [323.0, 15.0], [338.0, 14.0], [343.0, 15.0], [339.0, 15.0], [342.0, 15.0], [346.0, 13.0], [347.0, 16.0], [336.0, 14.0], [337.0, 14.0], [348.0, 15.0], [344.0, 15.0], [349.0, 14.0], [350.0, 15.0], [362.0, 16.0], [355.0, 15.0], [354.0, 14.0], [365.0, 15.0], [352.0, 14.0], [358.0, 14.0], [364.0, 15.0], [368.0, 13.0], [381.0, 13.0], [374.0, 14.0], [383.0, 15.0], [370.0, 15.0], [379.0, 15.0], [397.0, 17.0], [387.0, 13.0], [399.0, 14.0], [385.0, 15.0], [395.0, 15.0], [388.0, 15.0], [389.0, 15.0], [386.0, 15.0], [402.0, 16.0], [410.0, 14.0], [407.0, 14.0], [430.0, 15.0], [422.0, 14.0], [458.0, 16.0], [1.0, 66051.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 458.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 12.0, "minX": 1.0, "maxY": 66051.0, "series": [{"data": [[2.0, 64056.5], [3.0, 52940.0], [6.0, 14.0], [11.0, 25.0], [20.0, 15.0], [27.0, 14.0], [28.0, 14.0], [32.0, 14.0], [37.0, 15.0], [39.0, 13.0], [47.0, 19.0], [48.0, 19.5], [50.0, 15.0], [52.0, 14.0], [53.0, 14.0], [55.0, 17.0], [54.0, 17.0], [56.0, 17.0], [57.0, 15.0], [59.0, 15.0], [60.0, 15.0], [61.0, 15.0], [63.0, 15.0], [62.0, 14.0], [65.0, 14.0], [67.0, 14.0], [66.0, 14.0], [64.0, 14.0], [68.0, 14.0], [71.0, 13.0], [69.0, 14.0], [70.0, 14.0], [75.0, 12.0], [72.0, 13.0], [74.0, 12.0], [82.0, 31.0], [80.0, 16.0], [83.0, 14.0], [81.0, 14.0], [84.0, 14.0], [86.0, 15.0], [90.0, 22.0], [88.0, 16.0], [98.0, 16.0], [99.0, 15.0], [100.0, 16.0], [104.0, 15.0], [106.0, 15.0], [111.0, 23.0], [108.0, 14.0], [110.0, 14.0], [115.0, 15.0], [112.0, 15.0], [113.0, 16.0], [114.0, 14.0], [117.0, 15.0], [119.0, 14.0], [116.0, 16.0], [118.0, 14.0], [122.0, 14.0], [123.0, 14.0], [121.0, 14.0], [120.0, 14.0], [127.0, 15.0], [126.0, 15.0], [124.0, 14.0], [125.0, 14.0], [135.0, 14.0], [133.0, 14.0], [134.0, 14.0], [131.0, 14.0], [130.0, 14.0], [128.0, 14.0], [129.0, 17.0], [132.0, 14.0], [136.0, 13.0], [137.0, 14.0], [143.0, 16.0], [141.0, 14.0], [142.0, 16.0], [138.0, 18.0], [139.0, 15.0], [140.0, 14.0], [146.0, 14.0], [150.0, 18.0], [147.0, 17.0], [149.0, 14.0], [153.0, 15.0], [154.0, 16.0], [156.0, 15.0], [158.0, 15.0], [152.0, 15.0], [163.0, 15.0], [167.0, 14.0], [160.0, 16.0], [161.0, 19.0], [166.0, 15.0], [164.0, 15.0], [170.0, 15.0], [175.0, 15.0], [171.0, 15.0], [172.0, 17.0], [174.0, 16.0], [168.0, 18.0], [173.0, 15.0], [176.0, 13.0], [182.0, 14.0], [183.0, 14.0], [180.0, 14.0], [179.0, 15.0], [181.0, 14.0], [177.0, 14.0], [178.0, 15.0], [185.0, 15.0], [188.0, 14.0], [189.0, 15.0], [186.0, 14.0], [191.0, 15.0], [187.0, 14.0], [184.0, 14.0], [190.0, 14.0], [194.0, 14.0], [199.0, 14.0], [196.0, 14.0], [193.0, 14.0], [197.0, 14.0], [198.0, 14.0], [195.0, 15.0], [192.0, 14.0], [206.0, 15.0], [202.0, 14.0], [201.0, 15.0], [203.0, 14.0], [205.0, 15.0], [200.0, 14.0], [207.0, 16.0], [212.0, 18.0], [211.0, 14.0], [214.0, 15.0], [213.0, 15.0], [210.0, 17.0], [215.0, 16.0], [208.0, 13.0], [222.0, 15.0], [219.0, 14.0], [217.0, 15.0], [218.0, 15.0], [221.0, 16.0], [231.0, 15.0], [226.0, 15.0], [228.0, 15.0], [229.0, 14.0], [227.0, 16.0], [234.0, 14.0], [238.0, 15.0], [233.0, 14.0], [235.0, 14.0], [244.0, 14.0], [241.0, 14.0], [242.0, 15.0], [240.0, 15.0], [247.0, 14.0], [245.0, 15.0], [250.0, 14.0], [249.0, 16.0], [251.0, 14.0], [270.0, 15.0], [256.0, 16.0], [261.0, 16.0], [267.0, 16.0], [260.0, 13.0], [266.0, 15.0], [263.0, 15.0], [264.0, 14.0], [265.0, 14.0], [258.0, 14.0], [257.0, 15.0], [274.0, 16.0], [272.0, 21.0], [283.0, 14.0], [287.0, 14.0], [273.0, 15.0], [277.0, 15.0], [275.0, 14.0], [284.0, 15.0], [282.0, 16.0], [278.0, 14.0], [300.0, 16.0], [301.0, 16.0], [291.0, 14.0], [290.0, 18.0], [295.0, 19.0], [294.0, 15.0], [296.0, 15.0], [303.0, 15.0], [302.0, 14.0], [299.0, 14.0], [298.0, 18.5], [297.0, 16.0], [289.0, 14.0], [288.0, 15.0], [307.0, 14.0], [316.0, 17.0], [304.0, 16.0], [309.0, 18.0], [308.0, 15.0], [311.0, 14.0], [314.0, 14.0], [313.0, 15.0], [315.0, 15.0], [310.0, 15.0], [306.0, 16.0], [319.0, 15.0], [334.0, 14.0], [320.0, 15.0], [327.0, 16.0], [328.0, 14.0], [333.0, 13.0], [332.0, 14.0], [329.0, 13.0], [324.0, 15.0], [325.0, 14.0], [335.0, 15.0], [321.0, 14.0], [322.0, 16.0], [323.0, 15.0], [338.0, 14.0], [343.0, 14.0], [339.0, 15.0], [342.0, 15.0], [346.0, 13.0], [347.0, 15.0], [336.0, 14.0], [337.0, 14.0], [348.0, 15.0], [344.0, 14.0], [349.0, 14.0], [350.0, 15.0], [362.0, 16.0], [355.0, 15.0], [354.0, 14.0], [365.0, 14.0], [352.0, 14.0], [358.0, 14.0], [364.0, 15.0], [368.0, 13.0], [381.0, 13.0], [374.0, 14.0], [383.0, 14.0], [370.0, 14.5], [379.0, 15.0], [397.0, 16.0], [387.0, 13.0], [399.0, 14.0], [385.0, 14.0], [395.0, 15.0], [388.0, 14.0], [389.0, 15.0], [386.0, 15.0], [402.0, 15.0], [410.0, 14.0], [407.0, 13.0], [430.0, 15.0], [422.0, 14.0], [458.0, 16.0], [1.0, 66051.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 458.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 20.583333333333332, "minX": 1.7348004E12, "maxY": 312.4166666666667, "series": [{"data": [[1.73480058E12, 217.8], [1.73480088E12, 90.16666666666667], [1.7348004E12, 179.5], [1.73480094E12, 114.91666666666667], [1.73480046E12, 312.4166666666667], [1.73480076E12, 217.23333333333332], [1.73480082E12, 89.86666666666666], [1.73480064E12, 188.05], [1.7348007E12, 140.6], [1.734801E12, 20.583333333333332], [1.73480052E12, 261.4]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.734801E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 20.733333333333334, "minX": 1.7348004E12, "maxY": 312.4166666666667, "series": [{"data": [[1.73480058E12, 217.8], [1.73480088E12, 90.16666666666667], [1.7348004E12, 179.35], [1.73480094E12, 114.91666666666667], [1.73480046E12, 312.4166666666667], [1.73480076E12, 217.23333333333332], [1.73480082E12, 89.86666666666666], [1.73480064E12, 188.05], [1.7348007E12, 140.6], [1.734801E12, 20.733333333333334], [1.73480052E12, 261.4]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.734801E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 20.733333333333334, "minX": 1.7348004E12, "maxY": 312.4166666666667, "series": [{"data": [[1.73480058E12, 217.8], [1.73480088E12, 90.16666666666667], [1.7348004E12, 179.35], [1.73480094E12, 114.91666666666667], [1.73480046E12, 312.4166666666667], [1.73480076E12, 217.23333333333332], [1.73480082E12, 89.86666666666666], [1.73480064E12, 188.05], [1.7348007E12, 140.6], [1.734801E12, 20.733333333333334], [1.73480052E12, 261.4]], "isOverall": false, "label": "http://localhost/Classic-Groove-main/-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.734801E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 20.733333333333334, "minX": 1.7348004E12, "maxY": 312.4166666666667, "series": [{"data": [[1.73480058E12, 217.8], [1.73480088E12, 90.16666666666667], [1.7348004E12, 179.35], [1.73480094E12, 114.91666666666667], [1.73480046E12, 312.4166666666667], [1.73480076E12, 217.23333333333332], [1.73480082E12, 89.86666666666666], [1.73480064E12, 188.05], [1.7348007E12, 140.6], [1.734801E12, 20.733333333333334], [1.73480052E12, 261.4]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.734801E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

