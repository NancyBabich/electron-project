const $ = selector => document.querySelector(selector);
const web = $('webview');
const location = $('#location');
const locationForm = $('#location-form');

let address = location.value;

locationForm.addEventListener('submit', e => {
  e.preventDefault();
  address = location.value;
  web.src = address;
});

web.setAttribute('src', address);
