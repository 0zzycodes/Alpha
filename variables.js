const speak = window.speechSynthesis;
const Talk = document.querySelector('.mic');
const par = document.querySelector('p');
const Bat_charging = document.querySelector('#battery');
const dark = document.querySelector('.dark');
const light = document.querySelector('.light');
const active = document.querySelector('.overlay');

module.exports = {
  speak: speak,
  Talk: Talk,
  par: par,
  Bat_charging: Bat_charging,
  dark: dark,
  light: light,
  active: active
};
