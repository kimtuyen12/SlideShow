
// ********************** ajax *************************************   
// Make an ajax call to the given url, then if the call was successful, 
// call the Success Callback fn, otherwise, set an error message into the 
// DOM element that has id 'errorId'.
function ajax3 (params){
    
    // expecting params properties url, successFn, and errorEle
    if (!params || !params.url || !params.successFn || !params.errorEle) {
        alert ("function ajax requires an input parameter object with properties: url, successFn, and errorEle (DOM obj)");
        return;
    }

    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest(); //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); //For IE 5+
    } else {
        alert('ajax not supported');
    }

    console.log("ready to get content " + params.url);
    httpReq.open("GET", params.url); // specify which page you want to get

    // Ajax calls are asyncrhonous (non-blocking). Specify the code that you 
    // want to run when the response (to the http request) is available. 
    httpReq.onreadystatechange = function () {

        // readyState == 4 means that the http request is complete
        if (httpReq.readyState === 4) {
            if (httpReq.status === 200) {
                var obj = JSON.parse(httpReq.responseText);
                params.successFn(obj);  // like the jQuery ajax call, pass back JSON already parsed to JS objecg
            } else {
                var errMsg = "Error (" + httpReq.status + " " + httpReq.statusText +
                        ") while attempting to read '" + params.url + "'. For AJAX to work, you must RUN not VIEW your page.";
                console.log(errMsg);
                params.errorEle.innerHTML = errMsg;
            }
        }
    }; // end of anonymous function

    httpReq.send(null); // initiate ajax call

} // end function ajax2