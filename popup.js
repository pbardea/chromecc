window.onload = function() {

    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById("files");

        filesInput.addEventListener("change", function(event) {
            var files = event.target.files; //FileList object
            var output = document.getElementById("result");

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Allow only srt files

                var picReader = new FileReader();
                picReader.addEventListener("load", function(event) {
                    var textFile = event.target;
                    if(file.name.split('.').pop() != "srt") alert("Wrong file type!");//File type checking
                    var div = document.createElement("div");
                    div.innerText = textFile.result;
                    output.insertBefore(div, null);
                });
                //Read the text file
                picReader.readAsText(file);
            }
        });
    }
    else {
        console.log("Your browser does not support File API");
    }
}
