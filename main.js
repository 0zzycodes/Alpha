const speak = window.speechSynthesis;
const Talk = document.querySelector('.mic');
const desc = document.querySelector('#description');
const temp = document.querySelector('#temp');
const par = document.querySelector('p');
const Bat_charging = document.querySelector('#battery');
const dark = document.querySelector('.dark');
const light = document.querySelector('.light');
const active = document.querySelector('.overlay');
const api = '4d11a4dfc8cc18f3f8d580bbf2d86094';
const city = 'Kuala Lumpur';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const temperature = Math.floor(
      ((data.main.temp_max - 273.15) * 9) / 5 + 32
    );
    let description = data.weather[0].description;
    if (description.includes('broken clouds')) {
      description = 'Mostly Cloudy';
    } else if (description.includes('few clouds')) {
      description = 'Partialy Cloudy';
    } else if (description.includes('shower rain')) {
      description = 'with Showers';
    }

    temp.textContent = `${temperature} fahrenheit`;
    desc.textContent = description;
  })
  .catch(err => console.log('Error:', err));

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = () => {
  active.style.display = 'block';
};

recognition.onsoundstart = () => {
  par.textContent = 'Listening...';
  active.style.animationDuration = '.05s';
};
recognition.onsoundend = () => {
  par.textContent = '';
  active.style.animationDuration = '.5s';
};

recognition.onresult = event => {
  updateBattery();
  const transcript = event.results[0][0].transcript;
  alphaReply(transcript);
  // par.textContent = transcript;
};

Talk.addEventListener('click', () => {
  window.onloadstart;
  recognition.start();
  window.clearTimeout;
});

recognition.onend = () => {
  active.style.display = 'none';
};

const updateBattery = () => {
  navigator
    .getBattery()
    .then(battery => {
      const level = battery.level;
      const charging = battery.charging;
      const dischargingtime = Math.floor(battery.dischargingTime / 3600);
      const toHours = dischargingtime * 60;
      const dischargingtimeM = (battery.dischargingTime / 60).toFixed(0);
      const minuteLeft = dischargingtimeM - toHours;

      const timeLeft =
        dischargingtime === 0
          ? `approximately ${minuteLeft} minutes on battery`
          : `approximately ${
              dischargingtime === 1
                ? dischargingtime + 'hour'
                : dischargingtime + 'hours'
            } ${minuteLeft} minutes on battery`;

      const batteryChargeStatus = `${
        level * 100 === 100 ? 'Full' : level * 100 + '% '
      }`;
      if (charging) {
        Bat_charging.textContent =
          batteryChargeStatus === 'Full'
            ? 'Disconnect charger, your device is fully charged'
            : `Currently Charging, ${batteryChargeStatus} charged`;
      } else {
        Bat_charging.textContent =
          batteryChargeStatus === 'Full'
            ? 'Your device is fully charged'
            : `you have ${batteryChargeStatus} left, ${timeLeft}`;
      }
    })
    .catch(err => err);
};

const greetings = [
  'hi, ebrahim, how can i help you?',
  'hi, ebrahim',
  'hi, how can i help you?'
];
const choice = greetings[Math.floor(Math.random() * 3)];

const alphaReply = message => {
  voices = speak.getVoices();
  const alphaResponse = new SpeechSynthesisUtterance();
  const choice = greetings[Math.floor(Math.random() * 3)];
  active.style.display = 'block';
  if (message.includes('your name')) {
    alphaResponse.text = `Alpha`;
  } else if (message.includes('Alpha')) {
    alphaResponse.text = 'yes, how can i help you';
  } else if (message.includes('who are you')) {
    alphaResponse.text = 'I am your personal assistant, Alpha';
  } else if (message.includes('my name')) {
    alphaResponse.text = 'your name is, ebrahim';
  } else if (message.includes('battery')) {
    alphaResponse.text = ` ${Bat_charging.textContent}`;
  } else if (
    message.includes('ello') ||
    message.includes('hi Alpha') ||
    message.includes('up')
  ) {
    alphaResponse.text = choice;
  } else if (message.includes('age') || message.includes('how old are')) {
    alphaResponse.text = 'Why do you care?';
  } else if (
    message.includes('what is the time') ||
    message.includes('what time is it')
  ) {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const am_pm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    minutes = minutes < 10 ? `o${minutes}` : minutes;
    alphaResponse.text = `The time is ${hours} ${minutes} ${am_pm}`;
  } else if (message.includes('thanks')) {
    alphaResponse.text = `you're welcome`;
  } else if (message.includes('hahah')) {
    alphaResponse.text = `what is so funny`;
  } else if (message.includes('so cool')) {
    alphaResponse.text = `I know right, hahaha`;
  } else if (message.includes('dark')) {
    alphaResponse.text = 'dark mode activated';
    document.body.style.background = '#1d1d1d';
    Talk.style.background = '#ffffff';
    dark.style.display = 'block';
    light.style.display = 'none';
  } else if (message.includes('light')) {
    alphaResponse.text = 'light mode activated';
    document.body.style.background = '#ffffff';
    Talk.style.background = '#1d1d1d';
    dark.style.display = 'none';
    light.style.display = 'block';
    par.style.color = '#1d1d1d';
  } else if (message.includes('how are you')) {
    alphaResponse.text = 'Doing gooood';
  } else if (message.includes('weather')) {
    const speakTemperature = temp.innerHTML;
    const speakDescription = desc.innerHTML;

    const weatherDescription = `Right now in ${city}, it's ${speakTemperature} and ${speakDescription} `;
    alphaResponse.text = weatherDescription;
  } else if (message.includes('bye')) {
    alphaResponse.text = `bye, ebrahim`;
  } else {
    alphaResponse.text = `i dont understand`;
  }
  // alphaResponse.voice = voices[0];
  alphaResponse.volume = 1;
  alphaResponse.rate = 1;
  alphaResponse.pitch = 1;
  speak.speak(alphaResponse);
};
