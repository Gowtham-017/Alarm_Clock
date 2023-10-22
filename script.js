const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

let alarmtime,isAlarmSet = false,
ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend",option);
}

setInterval(() => {
    let time = new Date();
    let sec = time.getSeconds();
    let min = time.getMinutes();
    let hr = time.getHours();
    ampm = 'AM';
    if(hr >= 12){
        hr = hr - 12;
        ampm = 'PM';
    }
    hr = hr == 0 ? hr = 12 : hr;
    hr = hr < 10 ? "0" + hr : hr;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    currentTime.innerText = `${hr}:${min}:${sec}:${ampm}`;

    if(alarmtime == `${hr}:${min}:${sec}:${ampm}`){
        console.log("Alarm ringing");
        ringtone.play();
        ringtone.loop = true;
    }
  },1000);

function setAlarm(){
    if(isAlarmSet){
        alarmtime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}:${selectMenu[3].value}`;

    if(time.includes("Hour") || time.includes("Minute") || time.includes("Sec") || time.includes("AM/PM") ){
        return alert("Please set a valid time for Alarm!");
    }
    isAlarmSet = true;
    alarmtime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}
setAlarmBtn.addEventListener("click",setAlarm);