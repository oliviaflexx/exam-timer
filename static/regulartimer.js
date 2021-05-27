// Functions for overall timer
function makedeadline(length) {
    const deadline = new Date(Date.parse(new Date()) + length * 60 * 60 * 1000);
    return deadline;
}
function getTimeRemaining(endtime) {
  const ototal = Date.parse(endtime) - Date.parse(new Date());
  const oseconds = Math.floor((ototal / 1000) % 60);
  const ominutes = Math.floor((ototal / 1000 / 60) % 60);
  const ohours = Math.floor((ototal / (1000 * 60 * 60)) % 24);
  
  return {
    ototal,
    ohours,
    ominutes,
    oseconds
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const ohoursSpan = clock.querySelector('.ohours');
  const ominutesSpan = clock.querySelector('.ominutes');
  const osecondsSpan = clock.querySelector('.oseconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    ohoursSpan.innerHTML = ('0' + t.ohours).slice(-2);
    ominutesSpan.innerHTML = ('0' + t.ominutes).slice(-2);
    osecondsSpan.innerHTML = ('0' + t.oseconds).slice(-2);
    
    percent = (t.ototal / (length * 3600000)) * 100;
    progressBarOverall.style.setProperty('--width', percent);
    
    if (t.ototal <= 0) {
      clearInterval(timeinterval);
      stopit = 1;
    }
  }
  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

// Functions for per question timer
  function makeQuestionDeadline(length, mc_count) {
    const qdeadline = new Date(Date.parse(new Date()) + (length / mc_count) * 60 * 60 * 1000);
    return qdeadline;
}
  

function initializeClockp(id, endtime, pendtime) {
  const clock = document.getElementById(id);
  const phoursSpan = clock.querySelector('.phours');
  const pminutesSpan = clock.querySelector('.pminutes');
  const psecondsSpan = clock.querySelector('.pseconds');
  var treset = 1;
  document.getElementById('question').innerHTML = "Question #" + up;
  document.getElementById('left').innerHTML = left + " question(s) left";

  function updateClockp() {
    const t = getTimeRemaining(pendtime);
    const ot = getTimeRemaining(endtime);

    phoursSpan.innerHTML = ('0' + t.ohours).slice(-2);
    pminutesSpan.innerHTML = ('0' + t.ominutes).slice(-2);
    psecondsSpan.innerHTML = ('0' + t.oseconds).slice(-2);
    
    
    percent = (t.ototal / ((length / mc_count) * 3600000)) * 100;
    progressBarQuestion.style.setProperty('--width', percent);
    
    if (t.ototal <= 0) {
      clearInterval(timeintervalp);
      treset = 0;
      if (stopit == 1) {
        document.getElementById('question').innerHTML = "Exam is over";
        document.getElementById('left').innerHTML = "0 questions left";
        treset = 1;
      }
    }
    
    if (treset == 0) {
      const qdeadline = makeQuestionDeadline(length, mc_count);
      initializeClockp('pclockdiv', endtime, qdeadline);
      up = up + 1;
      document.getElementById('question').innerHTML = "Question # " + up;
      left = mc_count - up + 1;
      document.getElementById('left').innerHTML = left + " question(s) left";
      treset = 1;
    }
  }
  updateClockp();
  const timeintervalp = setInterval(updateClockp, 1000);
}
  // find out how much time per question there is

var length0 = document.getElementById('length');
var length = Number(length0.innerHTML);
var mc_count0 = document.getElementById('mc_count');
var mc_count = Number(mc_count0.innerHTML);
var up = 1;
var left = mc_count;
var stopit = 0;
const progressBarOverall = document.getElementById('overall-bar');
const progressBarQuestion = document.getElementById('question-bar');

document.getElementById('start').addEventListener('click', function () {
  const deadline = makedeadline(length);
  const qdeadline = makeQuestionDeadline(length, mc_count);
  initializeClock('oclockdiv', deadline);
  initializeClockp('pclockdiv', deadline, qdeadline);
  document.getElementById('start').style.visibility = "hidden";
});