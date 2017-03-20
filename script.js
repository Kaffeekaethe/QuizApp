"use strict";

var elem_timer;
var elem_question;
var elem_answer;
var count;
//window.onload = Inititialize;

function Inititialize() {
	elem_timer = document.getElementById("timer");
	elem_question = document.getElementById("question");
	elem_answer = document.getElementById("answer");
	count = document.getElementById("anzahl_fragen").value;
	document.getElementById("cur_fragen").innerHTML = 0;
	document.getElementById("max_fragen").innerHTML = count;
	Load_Next(questions);
}

async function Start_Timer(answer) {
	elem_timer.innerHTML = 5;
	for(var i = 0; i < 5; i++) {
		await Sleep(1000);
		elem_timer.innerHTML--;
	}
	if(typeof answer == "string") {
		Show_Answer(answer);
		await Sleep(2000);
	} else {
		for(var i = 0; i < answer.length; i++) {
			Show_Answer(answer[i]);
			await Sleep(4000);
		}
	}
	if(count == 0) {
		elem_answer.innerHTML = "Alle Fragen beantwortet";
	} else {
		if(count % 10 == 0 && lists.length > 0) {
			Load_Next(lists);
		} else if(questions.length > 0) {
			Load_Next(questions);
		}
	}
	
}

function Load_Next(source) {
	count--;
	document.getElementById("cur_fragen").innerHTML++;
	Show_Question();
	var question = Choose_Random(source);
	elem_question.innerHTML = question["frage"];
	Start_Timer(question["antwort"]);
}

function Choose_Random(source) {
	var index = Math.floor(Math.random() * source.length);
	var question = source[index];
	source.splice(index, 1);
	return question;
}


function Sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function Show_Answer(answer) {
	elem_timer.style.opacity = 0;
	elem_question.style.display = 'none';
	elem_answer.innerHTML = answer;
	elem_answer.style.display = 'block';
}

function Show_Question() {
	elem_timer.style.opacity = 1;
	elem_question.style.display = 'block';
	elem_answer.style.display = 'none';
}

function Start_Game() {
	document.getElementById("game").hidden = false;
	document.getElementById("selection").hidden = true;
	Inititialize();
}
