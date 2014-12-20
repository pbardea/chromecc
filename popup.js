var fileContents = "NULL";
window.onload = function() {

    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById("files");

        filesInput.addEventListener("change", function(event) {
            var files = event.target.files; //FileList object
            var output = document.getElementById("result");

            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                var reader = new FileReader();
                reader.addEventListener("load", function(event) {
                    var textFile = event.target;
                    if(file.name.split('.').pop() != "srt") alert("Wrong file type!");//File type checking
                    fileContents = textFile.result;
                    //INSERT PARSING FUNCTION HERE, use fileContents as @param, bool values if needing ms or s time values.
                    var parsedData = parser.fromSrt(fileContents, true);
                    for(var i = 0; i < 14; i++){
                        console.log(parsedData[i].text);
                        console.log(parsedData[i].startTime);
                        console.log(parsedData[i].endTime);
                    }
                    //HOLY SHIT THIS WORKS omg
                });
                //Read the text file
                reader.readAsText(file);
            }
        });
    }
    else {
        console.log("Your browser does not support File API");
    }
}
var parser = (function() {
    var pItems = {};

    /**
     * STILL NEED TO ADD <i>/<b>/html tags support
     * Converts srt subtitles into array of objects using regex ofc
     * [{
     *     id:        `Number of subtitle`
     *     startTime: `Start time of subtitle`
     *     endTime:   `End time of subtitle
     *     text: `Text of subtitle`
     * }]
     *
     * @param  {String}  data srt file string
     * @param  {Boolean} ms   Optional: use milliseconds for startTime and endTime
     * @return {Array}
     */
    pItems.fromSrt = function(data, ms) {
        var useMs = ms ? true : false;

        data = data.replace(/\r/g, '');
        var regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
        data = data.split(regex);
        data.shift();

        var items = [];
        for (var i = 0; i < data.length; i += 4) {
            items.push({
                id: data[i].trim(),
                startTime: useMs ? timeMs(data[i + 1].trim()) : data[i + 1].trim(),
                endTime: useMs ? timeMs(data[i + 2].trim()) : data[i + 2].trim(),
                text: data[i + 3].trim()
            });
        }

        return items;
    };

    var timeMs = function(val) {
        var regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
        var parts = regex.exec(val);

        if (parts === null) {
            return 0;
        }

        for (var i = 1; i < 5; i++) {
            parts[i] = parseInt(parts[i], 10);
            if (isNaN(parts[i])) parts[i] = 0;
        }

        // hours + minutes + seconds + ms
        return parts[1] * 3600000 + parts[2] * 60000 + parts[3] * 1000 + parts[4];
    };

    var msTime = function(val) {
        var measures = [ 3600000, 60000, 1000 ];
        var time = [];

        for (var i in measures) {
            var res = (val / measures[i] >> 0).toString();

            if (res.length < 2) res = '0' + res;
            val %= measures[i];
            time.push(res);
        }

        var ms = val.toString();
        if (ms.length < 3) {
            for (i = 0; i <= 3 - ms.length; i++) ms = '0' + ms;
        }

        return time.join(':') + ',' + ms;
    };

    return pItems;
})();

// ignore exports for browser
if (typeof exports === 'object') {
    module.exports = parser;
}
