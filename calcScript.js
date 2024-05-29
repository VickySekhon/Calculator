// input is where we will store our result, the location is an HTML object with id 'inputBox'
let input = document.getElementById('inputBox');

// buttons are what we have to read from, we are selecting all buttons using queryselectorAll
let buttons = document.querySelectorAll('button');

// string is the variable we will store our result inside
let string = "";

// get an array from all the buttons pressed and store it in variable arr
let arr = Array.from(buttons);

// it checks every button 
arr.forEach(button => {
     // adds event listener to track whether button is clicked or not 
     button.addEventListener('click', (e) =>{
          // if the equals sign is clicked
          if(e.target.querySelector('span').textContent == "="){
               try{
                    string = string.replace(/&#215;|×/g, '*'); // special case #1: replace '*' with 'x' for multiplication
                    string = string.replace(/&#247;|÷/g, '/'); // special case #2: replace '/' with '÷' for division
                    string = string.replace(/−/g, '-'); // special case #3: replace '−' with '-' for subtraction
                    string = string.replace(/%/g, '*0.01'); // special case #4: replace '%' with string*0.01 (equivalent)
                    const result = eval(string); 
                    if(Number.isInteger(result)){
                         input.value = result;
                         string = result;
                    } else{
                         input.value = result.toFixed(2);
                         string = result.toFixed(2);
                    }
               } catch (error){
                    input.value = 'ERROR';
                    input.classList.add('error-text');
                    setTimeout(() => {
                         input.value = '';
                         input.classList.remove('error-text');
                    }, 500); 

                    // clear the string so that the user can start over
                    string = '';


                    

               }
               
          // if all clear is clicked
          } else if(e.target.querySelector('span').textContent == "AC"){
               // we reset the value of string to a blank string
               string = "";
               input.value = "";   // the result displayed the to the user also becomes blank
          // if delete is clicked
          } else if(e.target.querySelector('span').textContent == "DEL") {
               let len = string.length; // store length of the string so far in "len"
               string = string.substring(0,len-1); // get rid of last string index (consequently removing the last element from the string)
               input.value = string; // update the display for the user to see
          // if the +/- button is clicked
          } else if (e.target.querySelector('span').textContent == "+/-") {
               if (string !== "") { // as long as some value is entered 
                    var i = 0; // declare a counter
                    while (i<string.length){ //loop through each valid index of the string
                         if (string.length == 1){ // there is only one digit entered that is positive
                              string = '-' + string;
                              break;
                         } else if (string.length == 2 && string.charAt(0) == '-'){ // there is only one digit entered that is negative 
                              string = string.substring(1); // removes the negative symbol 
                              break;
                         } else { // there is 'x' amount of digits in the expression, but we only care for the most recent one's sign 
                              var lastSign = (string.length - 2);  
                              var lastDigit = string.charAt(string.length - 1);
                              // check if the last character is '+' or '-'
                              if(string.charAt(lastSign) == '−'){
                                   string = string.substring(0,lastSign) + '+' + lastDigit;
                              } else {
                                   string = string.substring(0,lastSign) + '−' + lastDigit;
                              }
                         }
                         i++; // increment the count
                    }
                    input.value = string; // update the screen 
                }
           } 
          else {
               // button clicked is not equals sign, then we just add whatever value is clicked to the string variable
               string += e.target.querySelector('span').textContent;
               input.value = string; // pushes the value out to the inputBox
          }
          
     })
})

// using local storage to store light mode and dark mode respectively (broken...)
let lightMode = localStorage.getItem('lightMode');
const lightModeToggle = document.getElementById('light-mode-toggle');

const enableLightMode = () => {
  document.body.classList.add('lightmode');
  localStorage.setItem('lightMode', 'enabled');
};

const disableLightMode = () => {
  document.body.classList.remove('lightmode');
  localStorage.setItem('lightMode', null);
};

if (lightMode === 'enabled') {
  enableLightMode();
}

lightModeToggle = addEventListener('click', () => {
  lightMode = localStorage.getItem('lightMode');
  if (lightMode !== 'enabled') {
    enableLightMode();
  } else {
    disableLightMode();
  }
});
