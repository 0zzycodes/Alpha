const speak = window.speechSynthesis;
const Talk = document.querySelector('.mic');
const par = document.querySelector('p');
const dark = document.querySelector('.dark');
const light = document.querySelector('.light');
const active = document.querySelector('.overlay');

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = () => {
  active.style.display = 'block';
};

recognition.onsoundstart = () => {
  active.style.animationDuration = '.1s';
};
recognition.onsoundend = () => {
  active.style.animationDuration = '.5s';
};

recognition.onresult = event => {
  const transcript = event.results[0][0].transcript;
  alphaReply(transcript);
  // par.textContent = transcript;
};

Talk.addEventListener('click', () => {
  // window.speechSynthesis.getVoices().forEach(voice => console.log(voice));
  // console.log(window.speechSynthesis.getVoices());
  recognition.start();
});

let voices = [];
// const getVoice = () => {
//   if (speak.onvoiceschanged !== undefined) {
//     speak.onvoiceschanged = getVoice;
//   }
//   voices = speak.getVoices();
//   voices[1].default = true;
//   console.log(voices[1]);
// };

const alphaReply = message => {
  // if (speak.onvoiceschanged !== undefined) {
  //   speak.onvoiceschanged = get;
  // }
  voices = speak.getVoices();
  const alphaResponse = new SpeechSynthesisUtterance();

  if (message.includes('your name')) {
    alphaResponse.text = `Alpha`;
  } else if (message.includes('Alpha')) {
    alphaResponse.text = 'yes, how can i help you';
  } else if (message.includes('are you')) {
    alphaResponse.text = 'I am your personal assistant, Alpha';
  } else if (message.includes('my name')) {
    alphaResponse.text = 'your name is, ebrahim';
  } else if (
    message.includes('hello') ||
    message.includes('hi Alpha') ||
    message.includes('up')
  ) {
    alphaResponse.text = 'hi, ebrahim, how can i help you?';
    recognition.onend = () => {
      recognition.start();
    };
  } else if (message.includes('age') || message.includes('how old are')) {
    alphaResponse.text = 'Why do you care?';
  } else if (
    message.includes('what is the time') ||
    message.includes('what time is it')
  ) {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const am_pm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    minutes = minutes < 10 ? `o${minutes}` : minutes;
    alphaResponse.text = `The time is ${hours} ${minutes} ${am_pm}`;
  } else if (message.includes('thanks')) {
    alphaResponse.text = `you're welcome`;
  } else if (message.includes('hahah')) {
    alphaResponse.text = `what is so funny`;
  } else if (message.includes('so cool')) {
    alphaResponse.text = `I know right, hahaha`;
  } else if (message.includes('activate dark')) {
    alphaResponse.text = 'dark mode activated';
    document.body.style.background = '#1d1d1d';
    Talk.style.background = '#ffffff';
    dark.style.display = 'block';
    light.style.display = 'none';
  } else if (message.includes('activate light')) {
    alphaResponse.text = 'light mode activated';
    document.body.style.background = '#ffffff';
    Talk.style.background = '#1d1d1d';
    dark.style.display = 'none';
    light.style.display = 'block';
    par.style.color = '#1d1d1d';
  } else if (message.includes('how are you')) {
    alphaResponse.text = 'Doing gooood';
  } else if (message.includes('weather')) {
    alphaResponse.text = 'The weather is fine';
  } else if (message.includes('bye')) {
    alphaResponse.text = `bye, ebrahim`;
  } else {
    alphaResponse.text = `i dont understand`;
  }
  console.log(alphaResponse.text);

  alphaResponse.voice = voices[0];
  alphaResponse.volume = 1;
  alphaResponse.rate = 1;
  alphaResponse.pitch = 1;
  speak.speak(alphaResponse);
};
