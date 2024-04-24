export const emailRegex =  /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

//  Name Regex validation regex pattern
export const nameRegex = /^[a-zA-Z ]{2,150}$/;

// Phone number validation regex pattern
export const phoneNumberRegex = /^\d{10}$/;

// Function to check if a string matches a regex pattern
export const matchesRegex = (str, regex) => regex.test(str);