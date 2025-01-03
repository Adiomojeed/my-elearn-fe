const regex = /^[A-Za-z]{3}\. [A-Za-z]{3}\. \d{1,2}, \d{4}, \d{1,2}:\d{2} [APM]{1,2}\. [A-Za-z]{3}$/;

// The string to test
const testString = "Fri. Dec. 16, 2022, 8:00 AM. CST";
console.log(regex.test(testString))