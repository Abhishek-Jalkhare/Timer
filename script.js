var input = document.querySelector(".input");
var form = document.querySelector("form");
var timer = document.querySelector(".timer");
var rh = document.querySelector(".timer .hours .rh");
var rm = document.querySelector(".timer .min .rm");
var rs = document.querySelector(".timer .sec .rs");
var interval;
var timesup = document.querySelector(".timesup");
var overlay = document.querySelector(".overlay");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var hours = Number(document.querySelector("#hours").value) || 0;
  var min = Number(document.querySelector("#min").value) || 0;
  var sec = Number(document.querySelector("#sec").value) || 0;

  // Input validation
  if (hours < 0 || min < 0 || min > 59 || sec < 0 || sec > 59) {
    alert("Please enter valid time values");
    return;
  }

  rh.innerHTML = hours;
  rm.innerHTML = min;
  rs.innerHTML = sec;
  var totaltime = hours * 3600 + min * 60 + sec;
  var tmp = totaltime;

  if (totaltime === 0) {
    alert("Please enter a time value greater than 0");
    return;
  }

  timer.classList.remove("hidden");
  form.style.display = "none";

  interval = setInterval(function () {
    if (totaltime <= 0) {
      clearInterval(interval);
      return;
    }
    
    totaltime -= 1;
    var hh = Math.floor(totaltime / 3600);
    var mm = Math.floor((totaltime % 3600) / 60);
    var ss = totaltime % 60;

    rh.innerHTML = String(hh).padStart(2, '0');
    rm.innerHTML = String(mm).padStart(2, '0');
    rs.innerHTML = String(ss).padStart(2, '0');
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    overlay.classList.remove("hidden");
    timesup.classList.remove("hidden");
    setTimeout(() => {
      overlay.classList.add("hidden");
      timesup.classList.add("hidden");
      timer.classList.add("hidden");
      form.style.display = "block";
      document.querySelector("#hours").value = "";
      document.querySelector("#min").value = "";
      document.querySelector("#sec").value = "";
    }, 2000);
  }, tmp * 1000 + 1);
});
