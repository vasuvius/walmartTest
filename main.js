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
fetch(url)
  .then(function (response) {
    // All Json data found here
    return response.json();
  })
  .then(function (data){
      // apply a function to the data!
      globalData = data;
      console.log(globalData);
      appendData(data);
  })
  .catch(function (err) {
    // If an error occured, you will catch it here
    console.log(err);
  });

function appendData(data){
    //
    // this function is called after finding the data from the GET request:
    // -displays data using a for loops
    // -creates a modal for each div element as well
    var dataTable = document.getElementById("walmartIssues");
    for (i = 0; i < globalData.length; i++){
        // loop add all issues to the page
        var div = document.createElement("div"); //creates the new div
        div.innerHTML = 'Title: ' + data[i].title + ' Number: ' + data[i].number + ' State: ' + data[i].state; //adds the title, number, and state to every ID!
        div.classList.add("issue"); //this adds the className= "issue" to every created div

        // to operate the modal
        // give the div a child class named modal, ID is the data[i].number
        // the give each an onClick by calling that ID, modeled through css
        var modal = document.createElement("div");
        var modalContent = document.createElement("div");
        var closeButton = document.createElement("span");

        closeButton.classList.add("close");
        closeButton.id = data[i].number.toString();
        closeButton.innerHTML = "&times;";

        var text = document.createElement("p");
        text.innerHTML = "info on the issue!";
        modal.classList.add("modal");
        modalContent.classList.add("modal-content");
        modalContent.appendChild(closeButton);
        modalContent.appendChild(text);
        modal.appendChild(modalContent);

        
        div.onclick = function () {
            // when the div is clicked, make the modal pop up with the 
            modal.style.display = "block";
        }
        window.onclick = function(event){
            if (event.target == modal){
                modal.style.display = "none";
            }

        }

        div.appendChild(modal);
        dataTable.appendChild(div);

        var closeButtonFunctionality = document.getElementById(data[i].number.toString());
        closeButtonFunctionality.onclick = function () {
            console.log("clicked");
            modal.style.display = "none";
        }
    }
}
document.getElementById('pagination').onclick = function() {
    for (i=0; i < 15; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'Title: ' + globalData[i].title + ' Number: ' + globalData[i].number + ' State: ' + globalData[i].state;
        div.onclick = function () {
            
        }
        pagination.appendChild(div);
    }
}
function display10(upper, lower){
    var pagination = document.getElementById("pagination");
    for (lower; lower < upper; lower++) {
        var div = document.createElement("div");
        div.innerHTML = 'Title: ' + globalData[lower].title + ' Number: ' + globalData[lower].number + ' State: ' + globalData[lower].state;
        pagination.appendChild(div);
        console.log("out");
    }
}
display10(0,10);


