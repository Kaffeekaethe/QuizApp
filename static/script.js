"use strict";

var questions = [];
var elem_timer = null;
var elem_question = null;

$(document).ready( function()  {
	$.ajax({
	     type: "GET",
	      url: "/questions"
	 }).done(function(data) {
	 	 questions = JSON.parse(data);
	 	 elem_timer = document.getElementById("timer");
	 	 elem_question = document.getElementById("question");
	 	 Load_Next_Question();
	 });
});

async function Start_Timer(answer) {
	elem_timer.innerHTML = 5;
	for(var i = 0; i < 5; i++) {
		await sleep(1000);
		elem_timer.innerHTML--;
	}
	elem_timer.innerHTML = answer;
	elem_question.innerHTML = "";
	await sleep(2000);
	if(questions.length > 0) {
		Load_Next_Question();
	} else {
		document.getElementById("elem_timer").innerHTML = "Alle Fragen beantwortet";
	}
}

function Load_Next_Question() {
	var question = Choose_Random_Question();
	elem_question.innerHTML = question["frage"];
	Start_Timer(question["antwort"]);
}

function Choose_Random_Question() {
	var index = Math.floor(Math.random() * questions.length);
	var question = questions[index];
	questions.splice(index, 1);
	return question;
}

function sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}
