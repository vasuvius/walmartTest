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
let url = 'https://api.github.com/repos/walmartlabs/thorax/issues?limit=5';
let globalData;
let lowerRangeOfIssues = 1;
let upperRangeOfIssues = 11;
fetch(url)
  .then(function (response) {
    // All Json data found here
    return response.json();
  })
  .then(function (data){
      // apply a function to the data!
      globalData = data;
      showIssues(lowerRangeOfIssues,upperRangeOfIssues);
  })
  .catch(function (err) {
    // If an error occured, you will catch it here
    console.log(err);
  });
  function divClick(div, i){
      // gives the div its ability to activate the modal
    return function(){
        console.log('this worked!');
        console.log(globalData[i].id.toString());
        document.getElementById(globalData[i].id.toString()).style.display = "block";
        }
        // window.onclick = function(event){
        //     if (event.target == modal){
        //         modal.style.display = 'none';
        //     }
        // }
        // var closeButtonFunctionality = document.getElementById(globalData[lower].number.toString());
        // closeButtonFunctionality.onclick = function () {
        //     modal.style.display = 'none'
        // }
    }
  function closeButtonClick(closeButton, i){
      // gives the close button its functionality!
      return function(){
            closeButton.onclick = function() {
            console.log("clocled");
            document.getElementById(globalData[i].id.toString()).style.display = "none";
          }
      }
  }
  
  function showIssues(lower, upper) {
    var dataTable = document.getElementById("walmartIssues");
    for (lower; lower < upper; lower++){
        console.log(globalData[lower].number.toString())
        console.log(lower);
        // loop add all issues to the page
        var div = document.createElement("div"); //creates the new div
        div.id = globalData[lower].number.toString();
        div.innerHTML = 'Title: ' + globalData[lower].title + '<br> Number: ' + globalData[lower].number + '<br> State: ' + globalData[lower].state; //adds the title, number, and state to every ID!
        div.classList.add("issue"); //this adds the className= "issue" to every created div

        // to operate the modal
        // give the div a child class named modal, ID is the data[i].number
        // the give each an onClick by calling that ID, modeled through css
        // the problem is that the onClick for the div is not
        var modal = document.createElement("div");
        modal.id = globalData[lower].id.toString(); // modal holds unique ID number
        var modalContent = document.createElement("div");
        var closeButton = document.createElement("span");

        closeButton.classList.add("close");
        closeButton.id = globalData[lower].node_id.toString();
        closeButton.innerHTML = "&times;";

        var text = document.createElement("p");
        text.innerHTML = "Created at: " + globalData[lower].created_at + " by " + globalData[lower].user.login +  ".<br> " + "<br> Request at: " + globalData[lower].url;
        modal.classList.add("modal");
        modalContent.classList.add("modal-content");
        modalContent.appendChild(closeButton);
        modalContent.appendChild(text);
        modal.appendChild(modalContent);

        div.appendChild(modal);
        dataTable.appendChild(div);
        document.getElementById(globalData[lower].number.toString()).onclick = divClick(div, lower);
        document.getElementById(globalData[lower].node_id.toString()).onclick = closeButtonClick(closeButton, lower);
    }
}
document.getElementById('next').onClick = function() {
    console.log("next clicked");
    if (upperRangeOfIssues + 10 > globalData.length){
        // overflow, cap at the data.length!
        lowerRangeOfIssues = globalData.length - 10;
        upperRangeOfIssues = globalData.lengt;
    }
    else{
        // no overflow, add 10 
        lowerRangeOfIssues += 10;
        upperRangeOfIssues += 10;
    }
    // call 10 elements
    showIssues(lowerRangeOfIssues,upperRangeOfIssues);
}
document.getElementById('previous').onClick = function() {
    console.log("clicked previous");
    if (lowerRangeOfIssues -10 < 0){
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

// function appendData(data){
//     //
//     // this function is called after finding the data from the GET request:
//     // -displays data using a for loops
//     // -creates a modal for each div element as well
//     var dataTable = document.getElementById("walmartIssues");
//     for (i = 0; i < globalData.length; i++){
//         // loop add all issues to the page
//         var div = document.createElement("div"); //creates the new div
//         div.innerHTML = 'Title: ' + data[i].title + '<br> Number: ' + data[i].number + '<br> State: ' + data[i].state; //adds the title, number, and state to every ID!
//         div.classList.add("issue"); //this adds the className= "issue" to every created div

//         // to operate the modal
//         // give the div a child class named modal, ID is the data[i].number
//         // the give each an onClick by calling that ID, modeled through css
//         var modal = document.createElement("div");
//         var modalContent = document.createElement("div");
//         var closeButton = document.createElement("span");

//         closeButton.classList.add("close");
//         closeButton.id = data[i].number.toString();
//         closeButton.innerHTML = "&times;";

//         var text = document.createElement("p");
//         text.innerHTML = "info on the issue!";
//         modal.classList.add("modal");
//         modalContent.classList.add("modal-content");
//         modalContent.appendChild(closeButton);
//         modalContent.appendChild(text);
//         modal.appendChild(modalContent);

        
//         div.onclick = function () {
//             // when the div is clicked, make the modal pop up with the 
//             modal.style.display = "block";
//         }
//         window.onclick = function(event){
//             if (event.target == modal){
//                 modal.style.display = 'none';
//             }

//         }

//         div.appendChild(modal);
//         dataTable.appendChild(div);

//         var closeButtonFunctionality = document.getElementById(data[i].number.toString());
//         closeButtonFunctionality.onclick = function () {
//             modal.style.display = 'none';
//         }
//     }
// }