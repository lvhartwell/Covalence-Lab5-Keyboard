//sentences should already be shown
let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'];
//this is the array position of the sentence
let senPos = -1;
//this is the position of the individual character within the sentence
let charPos = 0;
//starts the timer
let startTime;
//beginning mistake number
let mistakes = 0;

$(document).ready(function () {
    //set the uppercase keys to be automatically hidden when the page is loaded
    $('#keyboard-upper-container').hide();
    //call function to load next sentence upon the page loading
    nextSentence();

    //style highlight (what portion, color)
    function addHighlight(code, color) {
        $('#' + code).css('background-color', 'green');
    }
    function removeHighlight(code, defaultColor) {
        $('#' + code).css('background-color', '#f5f5f5');
    }
    // when a keyPRESS event happens... pass a parameter through the function
    //set keyboard to equal key.which and add to the class keypress to the keyboard  
    $(document).keypress(function (key) {
        // set the keyboard to be the targeted event aka .which
        ascii = key.which;
        //the # calls ALL divs 
        $('#' + ascii).addClass('keypress');
        //remove the previous highlights when the key is no longer pressed
        $(document).keyup(function (key) {
            //sets the key to the default color
            $("#" + which).css('backgroundColor', "#F5F5F5");
        })
        //if the characters from sentence matches the keystroke then 
        //update the feedback id with green checkmark
        //if current sentence in current array equals the string from the current character from the 
        //keycode event add this glyphicon to the feedback id
        if (sentences[senPos].charAt(charPos) == String.fromCharCode(key.keyCode)) {
            $("#feedback").append($("<span class='glyphicon glyphicon-ok' aria-hidden='true'></span>"));
            //for each mistake show red x in feedback
            //if current sentence in current array does not the string from the current character from the 
            //keycode event add this glyphicon to the feedback id
        } else {
            mistakes++;
            $("#feedback").append($("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"));
        }
        //create a function to move the character to the next position   
        moveCarat();
        //specify which key
        var which = key.which;
        //make it so that the previously keyed character disappears and the next one is up


    });

    // pass a parameter through the function so that it will work
    //when the shift key is held down the lower keys are hidden and the upper keys are shown
    $(document).keydown(function (key) {
        //when the shift key is pressed the lower keys are hidden & the upper keys are shown
        //the .which specifies which event or parameter
        if (key.which === 16) {
            $("#keyboard-lower-container").hide();
            $("#keyboard-upper-container").show();
        }
        //if the the corresponding keys are pressed they will highlight    
        if (key.which >= 48 || key.which <= 57) {
            addHighlight(key.which);
        }
        if (key.which >= 65 || key.which <= 90) {
            addHighlight(key.which + 32);
        }
    });
    // pass a parameter through the function so that it will work
    $(document).keyup(function (key) {
        //when the shift key is up the upper keys are hidden and the lower keys are shown 
        // the .which specifies which event or parameter
        if (key.which === 16) {
            $("#keyboard-lower-container").show();
            $("#keyboard-upper-container").hide();
        }
        //if the the keys are not pressed they will not be highlighted
        if (key.which >= 48 || key.which <= 57) {
            removeHighlight(key.which);
        }
        if (key.which >= 65 || key.which <= 90) {
            removeHighlight(key.which + 32);
        }



    })
    //create function to move highlight to each character
    function moveCarat() {
        //add 1 to the character number to move along each character
        charPos++;
        //if the list of characters typed is equal or greater than the current sentence length
        //then call the function for the next sentence
        if (charPos >= sentences[senPos].length) {
            nextSentence();
            //if characters typed is less than sentence length 
            //move character to next position   
        } else {
            //get this id and move the letter highlight to the right by +=17.5px
            $("#purple-block").css("left", "+=17.5px");
            //take this id & set it's text to equal the next sentence in array
            //add .charAt (which is a standard call )at the original character position
            $("#target-letter").text(sentences[senPos].charAt(charPos));
        }
    }
    //make function for sentences to load
    function nextSentence() {
        //if this is the 1st sentence, start the starTime function
        //start time will equal right now
        if (senPos === -1) startTime = new Date();
        //we are adding 1 to the array position to get the next sentence
        senPos++;
        //if sentence position is equal to or greater than the sentences array
        //end the game 
        if (senPos >= sentences.length) {
            
            endGame();
            //if there is another array element after the sentence position
            //reset character and feedback positions    
        } else {
            //get div with this id and the text should equal the current position in the array
            $("#sentence").text(sentences[senPos]);
            charPos = 0;
            $("#purple-block").css("left", "17.5px");
            //this is needed to make the first character displayed be the 1st letter 
            $("#target-letter").text(sentences[senPos].charAt(charPos));
            //empty out feedback id when next sentence is loaded
            $("#feedback").empty();
        }

    }
    // define engame function
    function endGame() {
        let endTime = new Date();
        let wpm = 54 / (endTime.getMinutes() - startTime.getMinutes()) - 2 * mistakes;
        if (confirm("Congratulations, you won! WPM: " + wpm )) {
            location.reload();
        } else {
            location.href = "Http://google.com";
        }
    }
});













// //this will make uppercase toggle
// $(document).ready(function () {
//     $(document).keyup(function (key) {
//         if (key.which == 16) {
//             $('#keyboard-upper-container').toggle();
//         } else {
//             return false;
//         }
//     })
// })


// //this is correct below to get lowercase to toggle 
// $(document).ready(function () {
//     $(document).keydown(function (key) {
//         if (key.which == 16) {
//             $('#keyboard-lower-container').toggle(); {
//                 console.log("uppercase keyboard");
//             }
//         }
//         else {
//             return false;

//         }

//     })


// })