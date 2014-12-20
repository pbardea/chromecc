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
                    //INSERT PARSING FUNCTION HERE, use fileContents as @param
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

function parseSrt(inFile){

}
