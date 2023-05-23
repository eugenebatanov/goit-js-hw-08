import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('form');
const formData = {};

inputData();

form.addEventListener('input', throttle(inputEvent, 500));
form.addEventListener('submit', submitEvent);

function inputEvent(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function submitEvent(evt) {
  evt.preventDefault();
  if (form.elements.email.value === '' || form.elements.message.value === '') {
    alert('Please, fill in the form fields!');
  } else {
    console.log('The formData: ', formData);
    localStorage.removeItem(STORAGE_KEY);
    evt.currentTarget.reset();
  }
}

function inputData() {
  const storageData = localStorage.getItem(STORAGE_KEY);
  if (storageData) {
    console.log('Data in local storage was found!');
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    console.log('savedData: ', savedData);
    form.elements.email.value = savedData.email;
    form.elements.message.value = savedData.message;
    formData.email = savedData.email;
    formData.message = savedData.message;
  } else {
    console.log('There is no data in the storage!');
  }
}
