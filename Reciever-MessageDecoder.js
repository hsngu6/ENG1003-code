/*
 * Morse Code receiver app information:
 *
 * Function: messageFinished(): stops the capturing process
 *
 *     You can call this function to let the app know that the 
 *     end-of-transmission signal has been received.
 *
 * -------------------------------------------------------
 *
 * ID: messageField: id of the message text area
 *
 *     This will be a textarea element where you can display
 *     the recieved message for the user.
 * 
 * -------------------------------------------------------
 *
 * ID: restartButton: id of the Restart button
 *
 *     This is a button element.  When clicked this should 
 *     cause your app to reset its state and begin recieving
 *     a new message.
 *
 */


// ADD YOUR ADDITIONAL FUNCTIONS AND GLOBAL VARIABLES HERE


/*
 * This function is called once per unit of time with camera image data.
 * 
 * Input : Image Data. An array of integers representing a sequence of pixels.
 *         Each pixel is representing by four consecutive integer values for 
 *         the 'red', 'green', 'blue' and 'alpha' values.  See the assignment
 *         instructions for more details.
 * Output: You should return a boolean denoting whether or not the image is 
 *         an 'on' (red) signal.
 */
function decodeCameraImage(data)
{
    // ADD YOUR CODE HERE

    return false;
}


function morseCodeToEnglish(dataArray)
{
    var message = "";
    var currentLetter = "";
    for(i=0; i<dataArray.length; i++)
        {
            // code adds a dot or a dash to form the morsecode letter
            if( dataArray === "dot")
                {
                    currentLetter += ".";
                }
            else if( dataArray === "dash")
                {
                    currentLetter += "-";
                }
            //letter is looked up in the morsecode table, appended to a string, and the word is cleared
            else if( dataArray[i] === "wordSpace")
                {
                    message += morseTable[currentLetter];
                    message += " ";
                    currentLetter = "";
                }
            else if( dataArray[i] === "letterSpace")
                {
                    messgae += morseTable[currentLetter];
                    currentLetter = "";
                    
                }
        }
    return message;
}




