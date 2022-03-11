/**
 * Authors: Juan, Bryan, Ahmed
 * Class: CSCI 4710
 * Description: Program which determines if your classmates is a vampire based on either a certain threshold or 
 * by a random generator.
 */

//declaring variables for later use and organization
var num_vampires = 0;
var num_humans = 0;
var total = 0;
var randomNum = 0;
var classMate;
var chart;
var data;
var options; 
var min;
var max;
var themeColor = document.getElementById('themeColor');

/**
 * function used to change the themeColor when the button is clicked.
 */
function changeTheme(){
    document.body.style.color = "#0000CD";
    document.head.style.color = "#0000CD";
    document.body.style.accentColor = "#0000CD";    
    document.body.style.textEmphasisColor = "#0000CD"; 
    document.body.style.backgroundColor = "#000000";
}

/**
 * function used to login
 */
function login(){
    window.alert("LOGGED IN SUCCESSFULLY!");
}

/**
 * function that serves as a dummy emailing function that's called when the email button is clicked. 
 */
function email(){
    window.alert("FRIENDS HAVE BEEN NOTIFIED ABOUT THE VAMPIRES IN YOUR CLASS!");
}

/**
 * Function which takes in the three different features to determine if the classmates is a vampire. 
 * @param {*} shadow, if classmate has no shadow, +4, otherwise 0. Potential typo in HW4 description so assuming shadow means add 4. 
 * @param {*} pale, if classmates is pale, we add 3 to the overall total. 
 * @param {*} garlic, if classmate doesn't like garlic, we add +3 to overall total
 * @returns true if the total is greater than 6 indicating the classmate is a vampire, else returns false. 
 */
function threshold(shadowCheckbox, paleCheckbox, garlicCheckbox){
    if(shadowCheckbox){
        total += 4;
    }
    if(paleCheckbox){
        total += 3;
    }
    if(garlicCheckbox){
        total += 3;
    }

    if(total > 6){
        return true;
    }
    else{      
        return false;
    }
}

/**
 * function which will randomly determine if the classmate is a vampire by checking to see if a number 
 * is within a certain criteria/range. 
 * Code similar to example17.js
 * @returns true if the random number generated is less than the value given, else returns false. 
 */
function random(){

    min = 1;
    max = 10;

    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    //if loop which checks to see if the number is less than 5
    if (randomNum < 5){
        return true;
    }
    else{
        return false;
    }
}

/**
 * creating a new javascript object, created using link below provided. 
 * https://stackoverflow.com/questions/12070631/how-to-use-json-file-in-html-code
 */
if( JSON.parse(localStorage.getItem("list")) == null){
    var list = new Array();
 }
 else{
     var list = JSON.parse(localStorage.getItem("list"));
    
 }

 /**
  * function which will add a classmate to the table and determine whether they are a vampire by calling the method function.
  * params: none
  * returns: none
  */
 function addClassmate(){

    //start of by retreiving items from the document with their respective ids. 
     var firstName = document.getElementById('firstName').value.toString();
     var middleName = document.getElementById('middleName').value.toString()
     var lastName = document.getElementById('lastName').value.toString();
     var garlicCheckbox = document.getElementById('garlicCheckbox').checked;
     var shadowCheckbox = document.getElementById('shadowCheckbox').checked;
     var paleCheckbox = document.getElementById('paleCheckbox').checked;
     var form = document.getElementById('testForm');
     var vampire = false;

     //code similar to example 25.hole 
     var x = document.getElementById('mySelect').selectedIndex;
     var y = document.getElementById('mySelect').options;
     if(y[x].text == "Threshold Based"){
         vampire = threshold(shadowCheckbox, paleCheckbox, garlicCheckbox);   
     }
     else{
         vampire = random();   
     }

    //creating and populating our JSON data. 
    var classmate = { 
                   firstname: firstName, 
                   middlename: middleName, 
                   lastname: lastName, 
                   shadow: shadowCheckbox,
                   pale: paleCheckbox, 
                   garlic: garlicCheckbox,  
                   isVampire: vampire 
                };

    //pushing our classmate to the array and adding to the table
     list.push(classmate);
     localStorage.setItem("list", JSON.stringify(list));
     addToTable(classmate);
     //this will reset the table
     form.reset();
}

/**
 * function which keeps track of the total count of vampires and humans. 
 * code similar to example25 from the sample code 
 * params: none
 * return: no returns 
 */
function count(){

    var num_human = 0;
    var num_vampire = 0;

    //retrieving the list or array from JSON.
    var classmatesList = JSON.parse(localStorage.getItem("list"));

    //small for loop that iterates through the classmates list.length similar to example 24.update 
     for(var i = 0; i <= classmatesList.length -1 ; i++){
         if(classmatesList[i].isVampire){
             num_vampire++;
         }
         else{
             num_human++;
        }
     }
     num_humans = num_human;
     num_vampires = num_vampire;
}
 
    //Load the Visualization API and the corechart package
    google.charts.load('current', {'packages':['corechart']});
 
    //Set a callback to run when the Google Visualization API is loaded
    google.charts.setOnLoadCallback(drawChart); 
    
    /**
     * draws the chart, same as examples done in class
     * params: none
     * return: none
     */
    function drawChart() {
        count();
        // Create the data table
        data = new google.visualization.DataTable();
        data.addColumn('string', 'Element');
        data.addColumn('number', 'Number');
        data.addRows([
            ['Human', num_humans],
            ['Vampire', num_vampires]
        ]);
 
        options = {'title': 'How many vampires in the class',
                        'width': 700,
                         is3D : true,
                         'height': 600};
        chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
            
    }
 
    /**
     * function that will fill up the table with respective classmates. 
     * code is similar to example27 from the sample code where the function is called insert_row()
     * without this function, data won't remain consistent when switching between tabs.
     * params: none
     * @returns nothing
     */
    function insertRow() {

        //same thing here, we are retrieving the id of the table. 
         var table = document.getElementById("table");
         var students = JSON.parse(localStorage.getItem("list"));

         //checks to make sure that the students list isn't empty. 
         if(students == null){
             return;
         }
         //if it isn't it will add the respective cells for each. 
         else{
             for (i = 0; i < students.length; i++) {
                 
                 var row = table.insertRow(1);

                 var cell1 = row.insertCell(0);
                 var cell2 = row.insertCell(1);
                 var cell3 = row.insertCell(2);
                 var cell4 = row.insertCell(3);
                 var cell5 = row.insertCell(4);
                 var cell6 = row.insertCell(5);
                 var cell7 = row.insertCell(6);

                 cell1.innerHTML = students[i].firstname;
                 cell2.innerHTML = students[i].middleName
                 cell3.innerHTML = students[i].lastname;
                 cell4.innerHTML = students[i].shadow;
                 cell5.innerHTML = students[i].pale;
                 cell6.innerHTML = students[i].garlic;
                 cell7.innerHTML = students[i].isVampire;
             }
         }
    }

    /**
     * function to delete one row from the provided table
     * @params: none
     * return: none
     */
    function deleteRow(){
        document.getElementById("table").deleteRow(1);
    }

    function deleteLastRow(){
        var table = document.getElementById("table");
        var rowCount = table.rows.length;
        table.deleteRow(rowCount - 1);
    }
 
    /**
     * similar to the above, but this one 
     * @param {*} addStudent 
     */
    function addToTable(addStudent){

     var table = document.getElementById("table");
     var index = table.rows.length;

     var row = table.insertRow(index);

     var cell1 = row.insertCell(0);
     var cell2 = row.insertCell(1);
     var cell3 = row.insertCell(2);
     var cell4 = row.insertCell(3);
     var cell5 = row.insertCell(4);
     var cell6 = row.insertCell(5);
     var cell7 = row.insertCell(6);

     cell1.innerHTML = addStudent.firstname;
     cell2.innerHTML = addStudent.middlename;
     cell3.innerHTML = addStudent.lastname;
     cell4.innerHTML = addStudent.shadow;
     cell5.innerHTML = addStudent.pale;
     cell6.innerHTML = addStudent.garlic;
     cell7.innerHTML = addStudent.isVampire;
 }