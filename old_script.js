/* PreCondition:  User Clicks "Clear Fields" button
 * PostCondition: all input fields are reset
 */
function clearFormFunc() {
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    switch (inputs[i].type) {
      case 'text':
        inputs[i].value = '';
        break;
      case 'radio':
        inputs[i].checked = false;
        break;
    }
  }
}

/* PreCondition:  User Clicks the Add Row Function
 * PostCondition: All fields have some type of input
 */
function checkFieldsFunc() {
  // Required: Stimtrode
  var emptyStimitrode = false;
  var stimInputs = document.getElementById("sq_one").value;
  if (!stimInputs) {
    emptyStimitrode = true;
  }

  // Required: Response Electron
  var emptyResponce = false;
  var resInputs = document.getElementById("sq_two").value;
  if (!resInputs) {
    emptyResponce = true;
  }

  // Required: Amplitude
  var emptyAmplitude = false;
  var ampInputs = document.getElementById("number").value;
  if (!ampInputs) {
    emptyAmplitude = true;
  }

  // Required: Direction
  var notEmptyDirectron = true;
  var dirInputs = document.getElementsByName("direction");
  for (var i = 0; i < dirInputs.length; i++) {
    if (dirInputs[i].checked) {
      notEmptyDirectron = false;
    }
  }

  if (emptyStimitrode) {
    alert("missing Stimtrode input");
  }
  else if (emptyResponce) {
    alert("missing Response input")
  }
  else if (emptyAmplitude) {
    alert("missing Amplitude input");
  }
  else if (notEmptyDirectron) {
    alert("missing direction field")
  }
  else {
    checkInputFunc();
  }





}

/* PreCondition:  Called from checkFieldsFunc
 *                So, each field has some kind of input
 * PostCondition: All inputs have been verified and match requirements
                  Inputs ready to be added to FinalTable
 */
 function checkInputFunc() {
   // Check Stimtrode: Int 1- 64
   if (isNaN(document.getElementById("sq_one").value)) {
     alert("Stimtrode value should be an integer");
   }
   else if (document.getElementById("sq_one").value > 64) {
     alert("Stimtrode value should be less than 65");
   }
   else if (document.getElementById("sq_one").value < 1) {
     alert("Stimtrode value should be greater than 0")
   }

   else {
     // Check Response Electron: Int 1- 64
     if (isNaN(document.getElementById("sq_two").value)) {
       alert("Response Electron value should be an integer");
     }
     else if (document.getElementById("sq_two").value > 64) {
       alert("Response Electron value should be less than 65")
     }
     else if (document.getElementById("sq_two").value < 1) {
       alert("Response Electron value should be greater than 0")
     }

     else {
       // Check Amplitude: Int
       if (isNaN(document.getElementById("number").value)) {
         alert("Amplitude value should be a number")
       }
       else {
         // combines optional direction into just direction
         var options = document.getElementsByName("direction");
         for (var i = 0; i < options.length; i++) {
           if (options[i].checked) {
             var c4 = options[i].value;
             break;
           }
         }
         var optional_options = document.getElementsByName("optional-dir");
         for (var i = 0; i < optional_options.length; i++) {
           if (optional_options[i].checked) {
             var c5 = optional_options[i].value;
             break;
           }
         }
         if (c5) {
           var full_dir = c4.concat(" (" + c5 + ")");
         }
         else {
           var full_dir = c4;
         }
         addRowFunc(document.getElementById("sq_one").value, document.getElementById("sq_two").value, document.getElementById("number").value, full_dir);
       }
     }
   }
 }

/* PreCondition:  Called from checkInputFunc
 * Parameters:    Receives all the input Fields
 * PostCondition: Input added to the FinalTable
 */
function addRowFunc(stimtrode, responce, amplitude, direction) {
  var finalTable = document.getElementById("FinalTable");
  var row = finalTable.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = stimtrode;
  cell2.innerHTML = responce;
  cell3.innerHTML = amplitude;
  cell4.innerHTML = direction;

  var ingoreBox = '<input id="ignoreBox" name="ignoreBox" type="radio" value="n">';
  cell5.innerHTML = ingoreBox;

  appendMasterCaseOneFunc(stimtrode, responce, amplitude, direction);
  appendMasterCaseTwoFunc(stimtrode, responce, amplitude, direction);
  appendMasterCaseThreeFunc(stimtrode, responce, amplitude, direction);
  /*
  appendMasterCaseOneTableFunc();
  appendMasterCaseTwoTableFunc();
  if (yes === 1) {
    fifthTier();
  }
  buttonBackground();
  */
  tableBackround();

  clearFormFunc();
}

function tableBackround() {
  var table = document.getElementById("FinalTable");
  var box = document.getElementsByName("ignoreBox");

  for (i = 1; i < table.rows.length; i++) {
    if (box[i-1].value === "y") {
      table.rows[i].style.backgroundColor = "#F7CAC9";
    }
    else {
      if (i % 2 === 0) {
        table.rows[i].style.backgroundColor = "white";
      }
      else {
        table.rows[i].style.backgroundColor = "#d7dfe9";
      }
    }
  }
}

/* PreCondition:  Called From addRow to check if the row just added to the
 *                FinalTable can also be added to case_one_master
 * PostCondition: If passes req., gets added to case_one_table
 */
function appendMasterCaseOneFunc(stimtrode, responce, amplitude, direction) {
  var table = document.getElementById("FinalTable");
  var box = document.getElementsByName("ignoreBox");

  // goes through each element of the FinalTable
  for (var i = 1, row; row=table.rows[i]; i++) {
    // if the element is NOT marked as ignored
    if (box[i-1].value === "n") {
      // if the responce electron matches
      if (row.cells[1].innerHTML === responce) {
        // if the inputs dir and row's dir is opposite
        if (row.cells[3].innerHTML.substring(1,4) !== direction.substring(1,4)) {
          // adds it to case_one_table
          addToTierTable(6, stimtrode, responce, amplitude, direction, row.cells[0].innerHTML, row.cells[1].innerHTML, row.cells[2].innerHTML, row.cells[3].innerHTML);
          firstTier(stimtrode, responce, amplitude, direction, row.cells[0].innerHTML, row.cells[1].innerHTML, row.cells[2].innerHTML, row.cells[3].innerHTML);
          secondTier(stimtrode, responce, amplitude, direction, row.cells[0].innerHTML, row.cells[1].innerHTML, row.cells[2].innerHTML, row.cells[3].innerHTML);
        }
      }
    }
  }
  buttonBackground();
}

function appendMasterCaseTwoFunc(stimtrode, responce, amplitude, direction) {
  var table = document.getElementById("FinalTable");
  var box = document.getElementsByName("ignoreBox");
  var forward_stimtrode, forward_responce, forward_amplitude, forward_direction;
  var reverse_stimtrode, reverse_responce, reverse_amplitude, reverse_direction;
  for (var i = 1, row; row=table.rows[i]; i++) {
    // if element is not meant to be ignored
    if (box[i-1].value === "n") {

      // if the directions are the opposite
      if (row.cells[3].innerHTML.substring(1,4) !== direction.substring(1,4)) {
        // gets the forward and reverse values
        if (row.cells[3].innerHTML.substring(0,7) === "Forward") {
          forward_stimtrode = row.cells[0].innerHTML;
          forward_responce = row.cells[1].innerHTML;
          forward_amplitude = row.cells[2].innerHTML;
          forward_direction = row.cells[3].innerHTML;
          reverse_stimtrode = stimtrode;
          reverse_responce = responce;
          reverse_amplitude = amplitude;
          reverse_direction = direction;
        }
        else {
          forward_stimtrode = stimtrode;
          forward_responce = responce;
          forward_amplitude = amplitude;
          forward_direction = direction;
          reverse_stimtrode = row.cells[0].innerHTML;
          reverse_responce = row.cells[1].innerHTML;
          reverse_amplitude = row.cells[2].innerHTML;
          reverse_direction = row.cells[3].innerHTML;
        }
        // if in the 8 surrounding
        if (eightPath(forward_responce, reverse_responce) === true) {
          addToTierTable(7, forward_stimtrode, forward_responce, forward_amplitude, forward_direction, reverse_stimtrode, reverse_responce, reverse_amplitude, reverse_direction);
          thirdTier(forward_stimtrode, forward_responce, forward_amplitude, forward_direction, reverse_stimtrode, reverse_responce, reverse_amplitude, reverse_direction);
          fourthTier(forward_stimtrode, forward_responce, forward_amplitude, forward_direction, reverse_stimtrode, reverse_responce, reverse_amplitude, reverse_direction);
        }
      }
    }
  }
  buttonBackground();
}


function appendMasterCaseThreeFunc(stimtrode, responce, amplitude, direction) {
 /* User enters an input / An item is unignored
   The value could either be forward or reverse
   for each value in finalTable
      if the value is forward
          go back to the beginning of table
          find the best match reverse amp
          add this forward val and its match to fifthTierTable
 */
  //console.log("entering appendMasterCaseThreeFunc()")
  var table = document.getElementById("FinalTable");
  var box = document.getElementsByName("ignoreBox");
  var forward_stimtrode, forward_responce, forward_amplitude, forward_direction;
  var reverse_stimtrode, reverse_responce, reverse_amplitude, reverse_direction;
  deleteRows(5);
  //console.log("rows in fifthTierTable should be 1: " + document.getElementById("fifthTierTable").rows.length)
  for (var i = 1; i < table.rows.length; i++) {
    // if element is not meant to be ignored
    if (box[i-1].value === "n") {
      // if the element is forward
      if (table.rows[i].cells[3].innerHTML.substring(0,7) === "Forward") {
        //console.log("found forward val")
        forward_stimtrode = table.rows[i].cells[0].innerHTML;
        forward_responce = table.rows[i].cells[1].innerHTML;
        forward_amplitude = table.rows[i].cells[2].innerHTML;
        forward_direction = table.rows[i].cells[3].innerHTML;
        var overAllDif = 100000000;
        var difference = 100000000;

        // go back to beginning of table to find best reverse amp
        for (var j = 1; j < table.rows.length; j++) {
          if (box[j-1].value === "n") {
            //console.log("")
            // if the element is reverse
            if (table.rows[j].cells[3].innerHTML.substring(0,7) === "Reverse") {
              //console.log("going back to beginning")
              var temp_rev_amp = table.rows[j].cells[2].innerHTML;

              // get the difference
              difference = Number(temp_rev_amp) - Number(forward_amplitude);
              if (Number(difference) < 0) {
                difference = Number(forward_amplitude) - Number(temp_rev_amp);
              }
              // if difference is better, save it
              if (Number(difference) < Number(overAllDif)) {
                overAllDif = difference;
                reverse_stimtrode = table.rows[j].cells[0].innerHTML;
                reverse_responce = table.rows[j].cells[1].innerHTML;
                reverse_amplitude = table.rows[j].cells[2].innerHTML;
                reverse_direction = table.rows[j].cells[3].innerHTML;
              }
            }
          }
        }
        if (reverse_stimtrode) {
          addToTierTable(5, forward_stimtrode, forward_responce, forward_amplitude, forward_direction, reverse_stimtrode, reverse_responce, reverse_amplitude, reverse_direction);
          sortTable(5);
          displayResults(5);
        }
      }
    }
  }
  buttonBackground();
}


function eightPath(forward_responce, reverse_responce) {
  var one, two, three, four, five, six, seven, eight
  if ( (forward_responce>8) && ((forward_responce-1)%8!==0) ) {
    one = Number(forward_responce) - 9;
  }
  else {
    one = 1000000;
  }
  if (forward_responce > 8) {
    two = Number(forward_responce) -8;
  }
  else {
    two = 1000000;
  }
  if ( (forward_responce>8) && (forward_responce%8 !== 0) ) {
    three = Number(forward_responce) - 7
  }
  else {
    three = 1000000;
  }
  if (forward_responce%8!==0) {
    four = Number(forward_responce) + 1;
  }
  else {
    four = 1000000;
  }
  if ( (forward_responce<57) && (forward_responce%8!==0) ) {
    five = Number(forward_responce) + 9;
  }
  else {
    five = 1000000;
  }
  if ( (forward_responce<57) ) {
    six = Number(forward_responce)+ 8;
  }
  else {
    six = 1000000;
  }
  if ( (forward_responce<57) && ( (forward_responce-1)%8 !== 0 ) ){
    seven = Number(forward_responce) + 7;
  }
  else {
    seven = 1000000;
  }
  if ( (forward_responce-1) %8 !== 0) {
    eight = Number(forward_responce) - 1;
  }
  else {
    eight = 1000000;
  }

  var toReturn;
  if ( (Number(reverse_responce)===one) || (Number(reverse_responce)===two) || (Number(reverse_responce)===three) || (Number(reverse_responce)===four) || (Number(reverse_responce)===five) || (Number(reverse_responce)===six) || (Number(reverse_responce)===seven) || (Number(reverse_responce)===eight)) {
    toReturn = true;
  }
  else {
    toReturn = false;
  }
  return toReturn;
}

function firstTier(stimtrode, responce, amplitude, direction, stimtrode2, responce2, amplitude2, direction2) {
  var table = document.getElementById("case_one_master");

  // checks the amp cuttoff
  //console.log("currently " + document.getElementById("firstTierTable").rows.length + " rows in the table")
  //console.log("is " + amplitude + " and " + amplitude2 + " bigger than " + firstTierAmp)
  //console.log ("is " + amplitude + " greater than or equal to " + firstTierAmp)
  if ( (Number(amplitude) >= Number(firstTierAmp)) && (Number(amplitude2) >= Number(firstTierAmp)) ) {
    //console.log("is " + amplitude2 + " greater than or equal to " + firstTierAmp)
    //if (Number(amplitude2) >= Number(firstTierAmp))  {
    // checks the percentage similar
    //console.log("is " + amplitude + " and " + amplitude2 + " within " + firstTierPercentage)
    if (checkAmplitudePercentage(firstTierPercentage, amplitude, amplitude2) === true) {
      //console.log("adding stimtrode " + stimtrode + " and " + stimtrode2 )
      addToTierTable(1, stimtrode, responce, amplitude, direction, stimtrode2, responce2, amplitude2, direction2);
      sortTable(1);
      displayResults(1);
    }
  }
}

function secondTier(stimtrode, responce, amplitude, direction, stimtrode2, responce2, amplitude2, direction2) {
  var table = document.getElementById("case_one_master");
  //console.log("in second tier, checking " + stimtrode + " and " + stimtrode2)
  // checks the amp cuttoff
  //console.log("is " + amplitude + " and " + amplitude2 + " bigger than " + secondTierAmp)
  if ( (Number(amplitude) >= Number(secondTierAmp)) && (Number(amplitude2) >= Number(secondTierAmp)) ) {
    if (checkAmplitudePercentage(secondTierPercentage, amplitude, amplitude2)) {
      //console.log("adding " + stimtrode + " and " + stimtrode2)
      addToTierTable(2, stimtrode, responce, amplitude, direction, stimtrode2, responce2, amplitude2, direction2);
      sortTable(2);
      displayResults(2);
    }
  }
}

function thirdTier(forward_stimtrode, forward_responce, forward_amplitude, forward_direction, reverse_stimtrode, reverse_responce, reverse_amplitude, reverse_direction) {
  var table = document.getElementById("case_two_master");
  if ( (Number(forward_amplitude)) >= thirdTierAmp ) {
    addToTierTable(3, forward_stimtrode, forward_responce, forward_amplitude, forward_direction, reverse_stimtrode, reverse_responce, reverse_amplitude, reverse_direction);
    sortTable(3);
    displayResults(3);
  }
}

function fourthTier(forward_stimtrode, forward_responce, forward_amplitude, forward_direction, reverse_stimtrode, reverse_responce, reverse_amplitude, reverse_direction) {
  if ( (Number(forward_amplitude)) >= fourthTierAmp ) {
    addToTierTable(4, forward_stimtrode, forward_responce, forward_amplitude, forward_direction, reverse_stimtrode, reverse_responce, reverse_amplitude, reverse_direction);
    sortTable(4);
    displayResults(4);
  }
}

/* PreCondition:  Called from firstTier()
 * PostCondition: Returns true if amps are similar enough to each other
 */
function checkAmplitudePercentage(ampPercentage, rowAmp, incomingAmp) {
  var toReturn;
  /* if incoming amp is bigger
   *    row amp must be greater than (amp/100)*incomingAmp
  */
  var biggest, lowest;
  if ( (Number(incomingAmp) >= Number(rowAmp)) === true) {
    biggest = incomingAmp;
    lowest = rowAmp;
  }
  else {
    biggest = rowAmp;
    lowest = incomingAmp;
  }
  var percentage = ampPercentage/100;
  var least = biggest*percentage;
  var leastNumber = biggest-least;
  //console.log("is this number " + lowest + " bigger than the percentage cuttoff " + least)
  if (Number(lowest) >= Number(leastNumber)) {
    toReturn = true;
  }
  else {
    toReturn = false;
  }
  //console.log("returning: " + toReturn)
  return toReturn;
}


function addToTierTable(tableNum, stimtrode, responce, amp, dir, stimtrode2, responce2, amp2, dir2) {
  var table;
  if (tableNum === 1) {
    table = document.getElementById("firstTierTable");
  }
  else if (tableNum === 2) {
    table = document.getElementById("secondTierTable");
  }
  else if (tableNum === 3) {
    table = document.getElementById("thirdTierTable");
  }
  else if (tableNum === 4) {
    table = document.getElementById("fourthTierTable");
  }
  else if (tableNum === 5) {
    table = document.getElementById("fifthTierTable");
  }
  else if (tableNum === 6) {
    table = document.getElementById("case_one_master");
  }
  else if (tableNum === 7) {
    table = document.getElementById("case_two_master");
  }
  //else if (tableNum === 8) {
  //  table = document.getElementById("case_three_master");
  //}

  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);

  cell1.innerHTML = stimtrode;
  cell2.innerHTML = responce;
  cell3.innerHTML = amp;
  cell4.innerHTML = dir;
  cell5.innerHTML = stimtrode2;
  cell6.innerHTML = responce2;
  cell7.innerHTML = amp2;
  cell8.innerHTML = dir2;
}

/* Source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table
 * Sorts the table by the forward amp (greatest to least)
 */
function sortTable(tableNum) {
  var table;
  if (Number(tableNum) == 1) {
    table = document.getElementById('firstTierTable');
  }
  else if (Number(tableNum) == 2) {
    table = document.getElementById('secondTierTable');
  }
  else if (Number(tableNum) ==3) {
    table = document.getElementById('thirdTierTable');
  }
  else if (Number(tableNum) == 4) {
    table = document.getElementById('fourthTierTable');
  }
  else if (Number(tableNum) == 5) {
    table = document.getElementById('fifthTierTable');
  }
  else if (Number(tableNum) == 6) {
    table= document.getElementById('case_three_master');
  }
  var to_swap = true; //to_swap = switching
  while (to_swap) {
    to_swap = false;
    rows = table.rows;
    for (var i = 1; i < (rows.length - 1); i++) {
      to_swap = false;


      var forwardAmp1, forwardAmp2;
      if (rows[i].cells[3].innerHTML.substring(0,7) === "Forward") {
        forwardAmp1 = rows[i].cells[2].innerHTML;
      }
      else {
        forwardAmp1 = rows[i].cells[6].innerHTML;
      }

      if (rows[i+1].cells[3].innerHTML.substring(0,7) === "Forward") {
        forwardAmp2 = rows[i+1].cells[2].innerHTML;
      }
      else {
        forwardAmp2 = rows[i+1].cells[6].innerHTML;
      }
      if (Number(forwardAmp1) < Number(forwardAmp2)) {
        to_swap = true;
        break;
      }
    }
    if (to_swap) {
      rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
      to_swap = true;
    }
  }
}

function displayResults(tableNum) {
  // gets the table to look at
  var table, place;
  if (Number(tableNum) === 1) {
    table = document.getElementById("firstTierTable");
    place = document.getElementById("firstTierResults");
  }
  else if (Number(tableNum) === 2) {
    table = document.getElementById("secondTierTable");
    place = document.getElementById("secondTierResults");
  }
  else if (Number(tableNum) === 3) {
    table = document.getElementById("thirdTierTable");
    place = document.getElementById("thirdTierResults");
  }
  else if (Number(tableNum) === 4) {
    table = document.getElementById("fourthTierTable");
    place = document.getElementById("fourthTierResults");
  }
  else if (Number(tableNum) === 5) {
    table = document.getElementById("fifthTierTable");
    place = document.getElementById("fifthTierResults")
  }
  // deletes all nodes
  while (place.firstChild) {
    place.removeChild(place.firstChild);
  }

  // goes through each row
  for (var i = 1, row; row=table.rows[i]; i++) {
    if (tableNum == 5) {
      if (table.rows[1].cells[4].innerHTML === '') {
        row = table.rows.length;
        break;
      }
    }
    var forward_stimtrode, forward_responce, forward_amplitude;
    var backward_stimtrode, backward_responce, backward_amplitude;
    if (row.cells[3].innerHTML.substring(0,7) === "Forward") {
      forward_stimtrode = row.cells[0].innerHTML;
      forward_responce = row.cells[1].innerHTML;
      forward_amplitude = row.cells[2].innerHTML;
      backward_stimtrode = row.cells[4].innerHTML;
      backward_responce = row.cells[5].innerHTML;
      backward_amplitude = row.cells[6].innerHTML;
    }
    else {
      forward_stimtrode = row.cells[4].innerHTML;
      forward_responce = row.cells[5].innerHTML;
      forward_amplitude = row.cells[6].innerHTML;
      backward_stimtrode = row.cells[0].innerHTML;
      backward_responce = row.cells[1].innerHTML;
      backward_amplitude = row.cells[2].innerHTML;
    }

    var new_item = document.createElement("div");
    var new_item2 = document.createElement("div");

    var content = document.createTextNode("Forward path: Stimtrode " + forward_stimtrode + " -> Response " + forward_responce + ", " + forward_amplitude + " uV");
    var content2 = document.createTextNode("Reverse path: Stimtrode " + backward_stimtrode + " -> Response " + backward_responce + ", " + backward_amplitude + " uV");

    new_item.appendChild(content);
    new_item2.appendChild(content2);

    place.appendChild(new_item);
    place.appendChild(new_item2);

    var linebreak = document.createElement('br');
    place.appendChild(linebreak);

  }
  buttonBackground();
}

function ignore() {
  var table = document.getElementById("FinalTable");
  var case_one_table = document.getElementById("case_one_master");
  var case_two_table = document.getElementById("case_two_master");
  // gets which box is checked
  var box = document.getElementsByName("ignoreBox");
  for (var i = 0; i < box.length; i++) {
    if (box[i].checked === true) {
      // get the values of the row:
      var stimtrode = table.rows[i+1].cells[0].innerHTML;
      var responce = table.rows[i+1].cells[1].innerHTML;
      var amplitude = table.rows[i+1].cells[2].innerHTML;
      var direction = table.rows[i+1].cells[3].innerHTML;
      // if box should be ignored
      if (box[i].value === "n") {

        // remove from case_one_table
        for (var j = 1; j < case_one_table.rows.length; j++) {
          // if stimtrode matches
          if (stimtrode === case_one_table.rows[j].cells[0].innerHTML || stimtrode === case_one_table.rows[j].cells[4].innerHTML) {
            // if responce Electron matches
            if (responce === case_one_table.rows[j].cells[1].innerHTML || responce === case_one_table.rows[j].cells[5].innerHTML) {
              // if amplitude matches
              if (amplitude === case_one_table.rows[j].cells[2].innerHTML || amplitude === case_one_table.rows[j].cells[6].innerHTML) {
                // if direction matches
                if (direction === case_one_table.rows[j].cells[3].innerHTML || direction === case_one_table.rows[j].cells[7].innerHTML) {
                  //MATCHES : DELETE IT
                  case_one_table.deleteRow(j);
                  j=0;
                }
              }
            }
          }
        }

        // delete all the rows from firstTierTable
        deleteRows(1);
        ReprocessCaseOne(1);
        // delete all the rows from second tier tableI
        deleteRows(2);
        ReprocessCaseOne(2);


        // remove from case_two_table
        for (var j = 1; j < case_two_table.rows.length; j++) {
          // if stimtrode matches
          if (stimtrode === case_two_table.rows[j].cells[0].innerHTML || stimtrode === case_two_table.rows[j].cells[4].innerHTML) {
            // if responce electrons matches
            if (responce === case_two_table.rows[j].cells[1].innerHTML || responce === case_two_table.rows[j].cells[5].innerHTML) {
              // if amplitude matches
              if (amplitude === case_two_table.rows[j].cells[2].innerHTML || amplitude === case_two_table.rows[j].cells[6].innerHTML) {
                // if direction matches
                if (direction === case_two_table.rows[j].cells[3].innerHTML || direction === case_two_table.rows[j].cells[7].innerHTML) {
                  case_two_table.deleteRow(j);
                  j=0;
                }
              }
            }
          }
        }
        // delete all the rows from thirdTierTable
        deleteRows(3);
        ReprocessCaseTwo(3);
        // delete all the rows from fourthTierTable
        deleteRows(4);
        ReprocessCaseTwo(4);

        // remove from case_three_table
        //deleteRows(5);
        appendMasterCaseThreeFunc(0,0,0,0);
        // mark element as ignored
        //table.rows[i+1].style.backgroundColor = "#F7CAC9";
        box[i].value = "y";
        box[i].checked = false;
        appendMasterCaseThreeFunc(0,0,0,0);
        sortTable(5);
        displayResults(5);

      }
      else {
        box[i].value = "n";

        // else should be unignored
        // adds the element back into case_one_table
        appendMasterCaseOneFunc(stimtrode, responce, amplitude, direction);
        appendMasterCaseTwoFunc(stimtrode, responce, amplitude, direction);
        appendMasterCaseThreeFunc(0,0,0,0);
        sortTable(5);
        displayResults(5);
        box[i].checked = false;
      }
    }
  }

  tableBackround();
}

function deleteRows(tableNum) {
  var table;

  if (tableNum == 1) {
    table = document.getElementById("firstTierTable");
  }
  else if (tableNum == 2) {
    table = document.getElementById("secondTierTable");
  }
  else if (tableNum == 3) {
    table = document.getElementById("thirdTierTable");
  }
  else if (tableNum == 4) {
    table = document.getElementById("fourthTierTable");
  }
  else if (tableNum ==5) {
    table = document.getElementById("fifthTierTable");
  }
  for (var i = table.rows.length-1; i>0; i--) {
    table.deleteRow(i);
  }
}

function ReprocessCaseOne(tableNum) {
  var table, compare_amp, percentage;
  var case_one = document.getElementById("case_one_master");
  if (tableNum == 1) {
    table = document.getElementById("firstTierTable");
    compare_amp = firstTierAmp;
    percentage = firstTierPercentage;
  }
  else if (tableNum == 2) {
    table = document.getElementById("secondTierTable");
    compare_amp = secondTierAmp;
    percentage = secondTierPercentage;
  }
  for (var i = 1; i < case_one.rows.length; i++) {
    var amp_one = case_one.rows[i].cells[2].innerHTML;
    var amp_two = case_one.rows[i].cells[6].innerHTML;
    if (Number(amp_one) >= compare_amp && Number(amp_two) >= compare_amp) {
      if (checkAmplitudePercentage(percentage, amp_one, amp_two) === true) {
        addToTierTable(tableNum, case_one.rows[i].cells[0].innerHTML, case_one.rows[i].cells[1].innerHTML, case_one.rows[i].cells[2].innerHTML, case_one.rows[i].cells[3].innerHTML, case_one.rows[i].cells[4].innerHTML, case_one.rows[i].cells[5].innerHTML, case_one.rows[i].cells[6].innerHTML, case_one.rows[i].cells[7].innerHTML);
      }
    }
  }
  sortTable(tableNum);
  displayResults(tableNum);
}

function ReprocessCaseTwo(tableNum) {
  var table, compare_amp;
  var case_two = document.getElementById("case_two_master");
  if (tableNum == 3) {
    table = document.getElementById("thirdTierTable");
    compare_amp = thirdTierAmp;
  }
  else if (tableNum == 4) {
    table = document.getElementById("fourthTierTable");
    compare_amp = fourthTierAmp;
  }
  for (var i = 1; i < case_two.rows.length; i++) {
    // if forward amp is >= compare_amp, add it to the tier table
    var forward_amp = case_two.rows[i].cells[2].innerHTML;
    if (Number(forward_amp) >= compare_amp) {
      addToTierTable(tableNum, case_two.rows[i].cells[0].innerHTML, case_two.rows[i].cells[1].innerHTML, case_two.rows[i].cells[2].innerHTML, case_two.rows[i].cells[3].innerHTML, case_two.rows[i].cells[4].innerHTML, case_two.rows[i].cells[5].innerHTML, case_two.rows[i].cells[6].innerHTML, case_two.rows[i].cells[7].innerHTML);
    }
  }
  sortTable(tableNum);
  displayResults(tableNum);
}


function buttonBackground() {
  // this will keep track of the background colors of the tier buttons
  var firstButton = document.getElementById("firstTierButton");
  if (document.getElementById("firstTierTable").rows.length > 1) {
    firstButton.style.backgroundColor = "#73c094";
  }
  else {
    firstButton.style.backgroundColor = "#ff6569";
  }

  var secondButton = document.getElementById("secondTierButton");
  if (document.getElementById("secondTierTable").rows.length > 1) {
    secondButton.style.backgroundColor = "#73c094";
  }
  else {
    secondButton.style.backgroundColor = "#ff6569";
  }

  var thirdButton = document.getElementById("thirdTierButton");
  if (document.getElementById("thirdTierTable").rows.length > 1) {
    thirdButton.style.backgroundColor = "#73c094";
  }
  else {
    thirdButton.style.backgroundColor = "#ff6569";
  }

  var fourthButton = document.getElementById("fourthTierButton");
  if (document.getElementById("fourthTierTable").rows.length > 1) {
    fourthButton.style.backgroundColor = "#73c094";
  }
  else {
    fourthButton.style.backgroundColor = "#ff6569";
  }

  var fifthButton = document.getElementById("fifthTierButton");
  if (document.getElementById("fifthTierTable").rows.length > 1) {
    if (document.getElementById("fifthTierTable").rows[1].cells[6].innerHTML.substring(0,7) === "") {
      fifthButton.style.backgroundColor = "#ff6569"
    }
    else if (document.getElementById("fifthTierTable").rows[1].cells[7].innerHTML.substring(0,7) === "Reverse") {
      fifthButton.style.backgroundColor = "#73c094"
    }
  }
  else {
    fifthButton.style.backgroundColor = "#ff6569"
  }

}

function firstTierButton() {
  var first = document.getElementById("firstTierResultsCase");
  var second = document.getElementById("secondTierResultsCase");
  var third = document.getElementById("thirdTierResultsCase");
  var fourth = document.getElementById("fourthTierResultsCase");
  var fifth = document.getElementById("fifthTierResultsCase");

  if (first.style.display === "none") {
    first.style.display = "block";
  }
  if (second.style.display !== "none") {
    second.style.display = "none";
  }
  if (third.style.display !== "none") {
    third.style.display = "none";
  }
  if (fourth.style.display !== "none") {
    fourth.style.display = "none"
  }
  if (fifth.style.display !== "none") {
    fifth.style.display = "none";
  }
}

function secondTierButton() {
  var first = document.getElementById("firstTierResultsCase");
  var second = document.getElementById("secondTierResultsCase");
  var third = document.getElementById("thirdTierResultsCase");
  var fourth = document.getElementById("fourthTierResultsCase");
  var fifth = document.getElementById("fifthTierResultsCase");

  if (first.style.display !== "none") {
    first.style.display = "none";
  }
  if (second.style.display === "none") {
    second.style.display = "block";
  }
  if (third.style.display !== "none") {
    third.style.display = "none";
  }
  if (fourth.style.display !== "none") {
    fourth.style.display = "none"
  }
  if (fifth.style.display !== "none") {
    fifth.style.display = "none";
  }
}

function thirdTierButton() {
  var first = document.getElementById("firstTierResultsCase");
  var second = document.getElementById("secondTierResultsCase");
  var third = document.getElementById("thirdTierResultsCase");
  var fourth = document.getElementById("fourthTierResultsCase");
  var fifth = document.getElementById("fifthTierResultsCase");

  if (first.style.display !== "none") {
    first.style.display = "none";
  }
  if (second.style.display !== "none") {
    second.style.display = "none";
  }
  if (third.style.display === "none") {
    third.style.display = "block";
  }
  if (fourth.style.display !== "none") {
    fourth.style.display = "none"
  }
  if (fifth.style.display !== "none") {
    fifth.style.display = "none";
  }
}

function fourthTierButton() {
  var first = document.getElementById("firstTierResultsCase");
  var second = document.getElementById("secondTierResultsCase");
  var third = document.getElementById("thirdTierResultsCase");
  var fourth = document.getElementById("fourthTierResultsCase");
  var fifth = document.getElementById("fifthTierResultsCase");

  if (first.style.display !== "none") {
    first.style.display = "none";
  }
  if (second.style.display !== "none") {
    second.style.display = "none";
  }
  if (third.style.display !== "none") {
    third.style.display = "none";
  }
  if (fourth.style.display === "none") {
    fourth.style.display = "block";
  }
  if (fifth.style.display !== "none") {
    fifth.style.display = "none";
  }
}

function fifthTierButton() {
  var first = document.getElementById("firstTierResultsCase");
  var second = document.getElementById("secondTierResultsCase");
  var third = document.getElementById("thirdTierResultsCase");
  var fourth = document.getElementById("fourthTierResultsCase");
  var fifth = document.getElementById("fifthTierResultsCase");
  if (first.style.display !== "none") {
    first.style.display = "none";
  }
  if (second.style.display !== "none") {
    second.style.display = "none";
  }
  if (third.style.display !== "none") {
    third.style.display = "none";
  }
  if (fourth.style.display !== "none") {
    fourth.style.display = "none";
  }
  if (fifth.style.display === "none") {
    fifth.style.display = "block";
  }
}

function displayPercentTiers() {
  var percent_div = document.getElementById("percentageChangeCase");
  document.getElementById("firstPerc").innerHTML="First Tier: " + firstTierPercentage + "%";
  document.getElementById("secondPerc").innerHTML="Second Tier: " + secondTierPercentage + "%";
}

function displayAmpTiers() {
  var amp_div = document.getElementById("amplitudeChangeCase");
  document.getElementById("firstAmp").innerHTML = "First Tier: " + firstTierAmp + " uV";
  document.getElementById("secondAmp").innerHTML = "Second Tier: " + secondTierAmp + " uV";
  document.getElementById("thirdAmp").innerHTML = "Third Tier: " + thirdTierAmp + " uV";
  document.getElementById("fourthAmp").innerHTML = "Fourth Tier: " + fourthTierAmp + " uV";
}

function changePercentage() {
  var percent_div = document.getElementById("percentageChangeCase");
  var amp_div = document.getElementById("amplitudeChangeCase");

  // displays the options to user if not already opened
  if (percent_div.style.display == "none") {
    if (amp_div.style.display == "block"){
      amp_div.style.display = "none";
    }
    percent_div.style.display = "block";
    displayPercentTiers();

  }
  else {
    percent_div.style.display = "none";
  }
}

function changeAmplitude() {
  var percent_div = document.getElementById("percentageChangeCase");
  var amp_div = document.getElementById("amplitudeChangeCase");

  if (amp_div.style.display == "none") {
    if (percent_div.style.display == "block") {
      percent_div.style.display = "none";
    }
    amp_div.style.display = "block";
    displayAmpTiers();
  }
  else {
    amp_div.style.display = "none";
  }
}

function checkNewPercent(num) {
  var toReturn;
  if (isNaN(num) == false) {
    if (num >= 0 && num <=100) {
      toReturn = true;
    }
    else {
      alert("enter a valid percentage");
      toReturn = false;
    }
  }
  else {
    alert ("enter a valid percentage");
  }
  return toReturn;
}

function submitPercentage() {
  var box = document.getElementsByName("selectTiers");
  var newPec = document.getElementById("changePercentage").value;
  document.getElementById("changePercentage").value='';
  var table = document.getElementById("case_one_master");
  if (checkNewPercent(newPec) == true) {
    if (box[0].checked == true) {
      firstTierPercentage = newPec;
      // delete all the rows (except first) from firstTierTable
      deleteRows(1);
      // adjust the first tier based on this new amp
      ReprocessCaseOne(1);

    }
    if (box[1].checked == true) {
      secondTierPercentage = newPec;
      // delete all the rows (except first) from secondTierTable
      deleteRows(2);
      // adjust the second tier based on this new amp
      ReprocessCaseOne(2);
    }
  }
  displayPercentTiers();
  for (var i = 0; i < 2; i++) {
    if (box[i].checked == true) {
      box[i].checked = false;
    }
  }
  buttonBackground();
}

function submitAmplitude() {
  var box = document.getElementsByName("selectTiersAmp");
  var newAmp = document.getElementById("changeAmplitude").value;
  document.getElementById("changeAmplitude").value = '';
  var table = document.getElementById("case_one_master");

  if (isNaN(newAmp) == false) {
    if (box[0].checked == true) {
      firstTierAmp = newAmp;
      deleteRows(1);
      ReprocessCaseOne(1);
    }
    if (box[1].checked == true) {
      secondTierAmp = newAmp;
      deleteRows(2);
      ReprocessCaseOne(2);
    }

    if (box[2].checked == true) {
      thirdTierAmp = newAmp;
      deleteRows(3);
      ReprocessCaseTwo(3);
    }
    if (box[3].checked == true) {
      fourthTierAmp = newAmp;
      deleteRows(4);
      ReprocessCaseTwo(4);
    }

  }
  else {
    alert("enter a number")
  }
  displayAmpTiers();
  for (var i = 0; i < 4; i++) {
    if (box[i].checked == true) {
      box[i].checked = false;
    }
  }
  buttonBackground();
}

document.getElementById("firstTierResultsCase").style.display = "block";
buttonBackground();
// GLOBALS
var firstTierAmp = 500;
var secondTierAmp = 250;
var thirdTierAmp = 500;
var fourthTierAmp = 250;

var firstTierPercentage = 50;
var secondTierPercentage = 50;
