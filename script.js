"use strict";

var elem_timer;
var elem_question;
var elem_answer;

window.onload = Inititialize;

function Inititialize() {
	elem_timer = document.getElementById("timer");
	elem_question = document.getElementById("question");
	elem_answer = document.getElementById("answer");
	Load_Next_Question();
}

async function Start_Timer() {
	elem_timer.innerHTML = 5;
	for(var i = 0; i < 5; i++) {
		await Sleep(1000);
		elem_timer.innerHTML--;
	}
	Show_Answer();
	await Sleep(2000);
	if(questions.length > 0) {
		Load_Next_Question();
	} else {
		elem_answer.innerHTML = "Alle Fragen beantwortet";
	}
}

function Load_Next_Question() {
	Show_Question();
	var question = Choose_Random_Question();
	elem_question.innerHTML = question["frage"];
	elem_answer.innerHTML = question["antwort"];
	Start_Timer();
}

function Choose_Random_Question() {
	var index = Math.floor(Math.random() * questions.length);
	var question = questions[index];
	questions.splice(index, 1);
	return question;
}

function Sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function Show_Answer() {
	elem_timer.style.opacity = 0;
	elem_question.style.display = 'none';
	elem_answer.style.display = 'block';
}

function Show_Question() {
	elem_timer.style.opacity = 1;
	elem_question.style.display = 'block';
	elem_answer.style.display = 'none';
}
