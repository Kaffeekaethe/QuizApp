"use strict";

var elem_topics;
var elem_timer;
var elem_question;
var elem_answer;

var count;
var topics = [];
var current_question;
var with_assignment = false;
//window.onload = Inititialize;
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

function Inititialize() {
	elem_timer = document.getElementById("timer");
	elem_question = document.getElementById("question");
	elem_answer = document.getElementById("answer");
	elem_topics = document.getElementById("topics");

	Array.from(elem_topics.selectedOptions).forEach(function(thema) {
		topics.push(thema.value);
	});

	/*if (topics.length > 0 && topics[0] == "quizduell") {
		with_assignment = true;
	}*/

	console.log(with_assignment);

	count = document.getElementById("anzahl_fragen").value;
	document.getElementById("cur_fragen").innerHTML = 0;
	document.getElementById("max_fragen").innerHTML = count;
	Load_Next();
}

function Load_Next() {
	if(count <= 0) {
		window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, onInitFs, errorHandler);
		elem_question.innerHTML = "Alle Fragen beantwortet";
		return;
	} else {
		var source = topics[Math.floor(Math.random() * topics.length)];
		console.log("SOURCE", source);
		current_question = Choose_Random(questions[source]);
		if(questions[source].length == 0) {
			topics.remove(topics.indexOf(source));
		}
	}
	console.log(current_question);
	count--;
	document.getElementById("cur_fragen").innerHTML++;
	Show_Question();
	Start_Timer(current_question["antwort"]);
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
	if (with_assignment) {
		Show_Assigment();
	} else {
		Load_Next();
	}
}


function Assign_Topic() {
	var topic = document.getElementById("topic_assigment").value;
	console.log("TOPIC", topic, questions[topic]);
	if(questions[topic] == undefined) {
		questions[topic] = [];
	}
	console.log(questions[topic].length);
	questions[topic].push(current_question);
	console.log(questions[topic]);
	Show_Game();
	Load_Next();
}

function Choose_Random(source) {
	console.log(source);
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
	elem_question.innerHTML = current_question["frage"];
	elem_timer.style.opacity = 1;
	elem_question.style.display = 'block';
	elem_answer.style.display = 'none';
}

function Show_Assigment() {
	document.getElementById("game").hidden = true;
	document.getElementById("assigment").hidden = false;
}

function Show_Game() {
	document.getElementById("game").hidden = false;
	document.getElementById("assigment").hidden = true;
}

function Start_Game() {
	document.getElementById("game").hidden = false;
	document.getElementById("selection").hidden = true;
	Inititialize();
}

function onInitFs(fs) {
	fs.root.getFile('log.txt', {create: true},
      function(fileEntry) {
        console.log(fileEntry);
		fileEntry.createWriter(WriteJson, ErrorOnWrite);
      },
      errorHandler
  );
}


function errorHandler(e) {
	console.log(e);
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

function WriteJson(writer) {
	console.log(JSON.stringify(questions));
    writer.write(new Blob([JSON.stringify(questions)]));
}

function ErrorOnWrite(error) {
    alert(error);
}

