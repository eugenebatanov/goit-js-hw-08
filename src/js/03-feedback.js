var throttle = require('lodash.throttle');

const form = document.querySelector('form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

inputData();

console.log(form);
// console.log(formData);
form.addEventListener('input', throttle(inputEvent, 500));
form.addEventListener('submit', submitEvent);

function inputEvent(event) {
  // console.log(event);
  // console.log(event.target.name);
  // console.log(event.type);
  // console.log(event.currentTarget);
  if (event.target.name === 'email') {
    // console.log('target: ', event.target);
    // console.log('value: ', event.target.value);
    // console.log("You've just pressed email area");
    formData.email = event.target.value;
    // console.log(formData);
    // localStorage.setItem(FORM_STATE.email, event.target.value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } else if (event.target.name === 'message') {
    // console.log('target: ', event.target);
    // console.log('value: ', event.target.value);
    // console.log("You've just pressed message area");
    formData.message = event.target.value;
    // console.log(formData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } else {
    console.log('Something went wrong!');
  }
}

function submitEvent(event) {
  event.preventDefault();
  if (input.value === '' || textarea.value === '') {
    alert('Somthing wrong with email or message!');
  } else {
    console.log(event.currentTarget);
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    input.value = '';
    textarea.value = '';
  }
}

function inputData() {
  if (localStorage.getItem(STORAGE_KEY)) {
    console.log('Yahoo! Data in local storage was founded!');
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    console.log('savedData: ', savedData);
    input.value = savedData.email;
    textarea.value = savedData.message;
  } else {
    input.value = '';
    textarea.value = '';
    console.log('There is not any data in the local storage');
  }
}
