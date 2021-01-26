// PROBLEMS TO SOLVE:
//PAGINATION:
// idea1: 
// limit data pulls to only a certain number, recall EVERY time to get a certain number of issues
// this is lighter client side since it doesn't man you have to pull data from the website every time
// idea2: get all data into a data object to cache results (will be faster after first load!)
// very heavy client side work
//implement pagination button -> clickthrough using .onClick with JS button
// NEED TO:
// add className Modal to the objexta?
let url = 'https://api.github.com/repos/walmartlabs/thorax/issues';
let globalData;
let lowerRangeOfIssues = 0;
let upperRangeOfIssues = 10;
fetch(url)
  .then(function (response) {
    // Response
    return response.json();
  })
  .then(function (data){
      // this is all the data in a global form -> cached for quick navigation
      // Once the json is made global, run showIssues() which displays issue data
      globalData = data;
      showIssues(lowerRangeOfIssues,upperRangeOfIssues);
  })
  .catch(function (err) {
    // If an error occured, it catches here
    console.log(err);
  });
  function divClick(i){
      // gives the div its ability to activate the modal
      // called in showIssues to return onClick functionality
    return function(){
        // since this function is returned, it guarantees on every for loop that the onclick functionality exists
        document.getElementById(globalData[i].id.toString()).style.display = "block";
        }
        // var closeButtonFunctionality = document.getElementById(globalData[lower].number.toString());
        // closeButtonFunctionality.onclick = function () {
        //     modal.style.display = 'none'
        // }
}
  function closeButtonClick(i){
      return function(){
      // gives the close button its functionality!
      // called in showIssues to reutrn onClick functionality
        document.getElementById(globalData[i].id.toString()).style.display = "none";
      }
}
  function showIssues(lower, upper) {
      // -----
      // this main function shows 10 issues at a time. It runs a for loop which creates all needed elements
      // the foor loop then creates onclick functionality for the issue class and closebutton class
      // maps parts to unique issue ID's so that onclick can be found through elementID.
      // -----
    var dataTable = document.getElementById("walmartIssues");
    while (dataTable.firstChild) {
        //get rid of all previous datapoints before showing new
        dataTable.removeChild(dataTable.lastChild);
      }
    for (lower; lower < upper; lower++){
        // loop adds all issues to the page

        // div holds the outside issue data AND the modal
        // give it "number" as id
        var div = document.createElement("div");
        div.id = globalData[lower].number.toString();
        div.innerHTML = 'Title: ' + globalData[lower].title + '<br> Number: ' + globalData[lower].number + '<br> State: ' + globalData[lower].state; //adds the title, number, and state to every ID!
        div.classList.add("issue"); //this adds the className= "issue" to every created div

      
        // make the modal for each issue, and modal-content
        // give it "id" as id
        var modal = document.createElement("div");
        modal.id = globalData[lower].id.toString(); // modal holds unique ID number
        var modalContent = document.createElement("div");
        modal.classList.add("modal");
        modalContent.classList.add("modal-content");

        // make the close button for each issue
        // give it "node_id" as id
        var closeButton = document.createElement("div");
        closeButton.classList.add("close");
        closeButton.id = globalData[lower].node_id.toString();
        closeButton.innerHTML = "Exit";

        var text = document.createElement("p");
        text.innerHTML = "Created at: " + globalData[lower].created_at + " by " + globalData[lower].user.login +  ".<br> " + "<br> Request at: " + globalData[lower].url;
        text.innerHTML += "<br> Comments URL: " + globalData[lower].comments_url + "<br> Number of Comments: " + globalData[lower].comments;
        
        
        // datatable -> div -> modal -> modalContent -> closebutton/text
        // connect all elements together
        modalContent.appendChild(closeButton);
        modalContent.appendChild(text);
        modal.appendChild(modalContent);
        div.appendChild(modal);
        dataTable.appendChild(div);

        // add onclick functonality for closeButton and the issue div
        document.getElementById(globalData[lower].node_id.toString()).onclick = closeButtonClick(lower);
        document.getElementById(globalData[lower].number.toString()).onclick = divClick(lower);
       
    }
}
document.getElementById('next').onclick = function() {
    //-----
    // This gets the next button, and calls showIssues to display the next 10 id's
    // utilizes a global and upper bound (lowerRangeofIssues and upperRangeOfIssues) to pass through showIssues
    //-----
    if (upperRangeOfIssues + 10 > globalData.length){
        // overflow, cap at the globalData.length!
        lowerRangeOfIssues = globalData.length - 10;
        upperRangeOfIssues = globalData.length;
    }
    else{
        // no overflow, add 10 
        lowerRangeOfIssues += 10;
        upperRangeOfIssues += 10;
    }
    // call 10 elements
    showIssues(lowerRangeOfIssues,upperRangeOfIssues);
}
document.getElementById('previous').onclick = function() {
    //-----
    // This gets the previous button, and calls showIssues to display the next 10 id's
    // utilizes a global and upper bound (lowerRangeofIssues and upperRangeOfIssues) to pass through showIssues
    //-----
    if (lowerRangeOfIssues - 10 < 0){
        // overflow, must cap at 0
        lowerRangeOfIssues = 0;
        upperRangeOfIssues = 10;
    }
    else{
        // no overflow, minus 10
        lowerRangeOfIssues -= 10;
        upperRangeOfIssues -= 10;
    }
    // call 10 elements
    showIssues(lowerRangeOfIssues,upperRangeOfIssues);
}