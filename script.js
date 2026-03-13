function login(){

window.location.href="dashboard.html"

}

function openCalendar(){

window.location.href="calendar.html"

}

function openQuiz(){

window.location.href="quiz.html"

}

function goDashboard(){

window.location.href="dashboard.html"

}

function openPatient(name,age,disease){

localStorage.setItem("patientName",name)
localStorage.setItem("patientAge",age)
localStorage.setItem("patientDisease",disease)

window.location.href="patient.html"

}

window.onload=function(){

if(document.getElementById("patientName")){

document.getElementById("patientName").innerText=
localStorage.getItem("patientName")

document.getElementById("patientAge").innerText=
localStorage.getItem("patientAge")

document.getElementById("patientDisease").innerText=
localStorage.getItem("patientDisease")

}

}

function goBack(){

window.history.back()

}