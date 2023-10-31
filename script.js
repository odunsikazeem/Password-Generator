// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

/// Function to prompt user for password options
function getPasswordOptions() {
  var passwordLength = Number(prompt('Enter password length (Must be between 8 and 128 characters)'));

  // Validate length
  if (! passwordLength || passwordLength < 8 || passwordLength > 128) {
    alert('You must enter a number between 8 and 128');
    return [];
  }
      
  var characterType = prompt('Enter one or more character types seperated with comma (Lowercase, Uppercase, Numeric or Special). E.g. Uppercase, Special')?.toLowerCase().trim();

  // Split multiple entries seperated with commas
  var userInput = characterType?.split(',') || [];

  // Validate character types
  if (! characterType || ! userInput.every(el => ['lowercase', 'uppercase', 'numeric', 'special'].includes(el.trim()))) {
    alert('You must enter at least one of the following character type: Lowercase, Uppercase, Numeric or Special.Seperate multiple entries with comma');
    return [];
  }

  return [
    passwordLength,
    userInput
  ];
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();

  // options is an array so we need to check if it has an item with .length before we proceed.
  // If it does not have an item, we return because there is no data to work with.
  if (! options.length) {
    return '';
  }

  var passwordLength = options[0];
  var characterType = options[1];

  // We add all of our charater types to an object so we can get them easily with the user's input.
  var chars = {
    lowercase: lowerCasedCharacters,
    uppercase: upperCasedCharacters,
    numeric: numericCharacters,
    special: specialCharacters
  };

  // We get the character type data from the chars objects.
  var charSet = [];
  characterType.forEach((el) => {
    charSet = charSet.concat(chars[el.trim()])
  }) 

  // We create the password by running a loop until we get to the password length the user specified.
  var password = '';
  for (var index = 0; index < passwordLength; index++) {
    password += getRandom(charSet);
  }

  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);