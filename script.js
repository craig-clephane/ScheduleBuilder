var mon;
var tue;
var wed;
var thu;
var fri;
var sat;
var sun;
var maxID = 0;

var dragItemTemplate = `<div class="dragItem"><textarea class="newEventText" id="text${maxID}" wrap="soft" style="overflow:hidden; resize:none;"></textArea>
<div class="timeInput"><label style="float: left" for="startTime">Start time:</label><input style="float: right" name="startTime" type="time"></input></div>
<div class="timeInput"><label style="float: left" for="endTime">End time:</label><input style="float: right" name="endTime" type="time"></input></div>
</div>`;

function ScheduledEvent(desc, start, end){
  this.desc = desc;
  this.start = start;
  this.end = end;
}

function addEvent(day, desc, start, end){
  switch(day){
    case "mon":
      mon.push(new ScheduledEvent(desc, start, end));
    break;
    case "tue":
      tue.push(new ScheduledEvent(desc, start, end));
    break;
    case "wed":
      wed.push(new ScheduledEvent(desc, start, end));
    break;
    case "thu":
      thu.push(new ScheduledEvent(desc, start, end));
    break;
    case "fri":
      fri.push(new ScheduledEvent(desc, start, end));
    break;
    case "sat":
      sat.push(new ScheduledEvent(desc, start, end));
    break;
    case "sun":
      sun.push(new ScheduledEvent(desc, start, end));
    break;
  }
  save();
}

$(document).ready(function(){
  load();
  $('.dayArea').droppable({
    tolerance: "pointer",
    drop: function(event, ui){
      ui.draggable.css({
        top:'50%',
        left:'50%',
        revert: 'invalid'
      });
      var text = $(ui.draggable[0].firstChild).val();
      var start = $(ui.draggable[0].children[1].lastChild).val();
      var end = $(ui.draggable[0].children[2].lastChild).val();
      console.log($(ui.draggable[0].children));
      console.log(text);
      if(text.trim() != ""){
        ui.draggable.draggable('disable');
        ui.draggable.removeClass("dragItem");
        ui.draggable.addClass("droppedItem")
        ui.draggable[0].innerHTML = `<p>${text}</p>`;
        ui.draggable[0].innerHTML += `<p class="time">${start} - ${end}</p>`;;
        $(this).append(ui.draggable);
        addEvent($(this)[0].id, text, $(ui.draggable[0].children[1]).val(), $(ui.draggable[0].children[2]).val());
        addDragItem();
      }
    }
  });
  addDragItem();
});

function addDragItem(id){
  $('#toolbar').append(parseHTML(dragItemTemplate));
  $(`#toolbar div`).draggable({
    cursor: "move",
    revert: 'invalid',
    helper: 'clone',
    appendTo: 'body',
    scroll: false
  });
}

function parseHTML(str){
  var tmp = document.implementation.createHTMLDocument();
  tmp.body.innerHTML = str;
  return tmp.body.children;
}

function load(){
  var days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  var nullStoarage = false;
  if(localStorage){
    for(var i = 0; i < days.length; i++){
      if(localStorage.getItem(days[i]) == null){
        nullStoarage = true;
      }
    }
  }
  else{
    nullStoarage = true;
  }
  if(!nullStoarage){
    mon = JSON.parse(localStorage.getItem("mon"));
    tue = JSON.parse(localStorage.getItem("tue"));
    wed = JSON.parse(localStorage.getItem("wed"));
    thu = JSON.parse(localStorage.getItem("thu"));
    fri = JSON.parse(localStorage.getItem("fri"));
    sat = JSON.parse(localStorage.getItem("sat"));
    sun = JSON.parse(localStorage.getItem("sun"));
  }
  else{
    mon = [];
    tue = [];
    wed = [];
    thu = [];
    fri = [];
    sat = [];
    sun = [];
  }
}

function save(){
  var days = [["mon", mon], ["tue", tue], ["wed", wed], ["thu", thu], ["fri", fri], ["sat", sat], ["sun", sun]];
  for(var i = 0; i < days.length; i++){
    localStorage.setItem(days[i][0], JSON.stringify(days[i][1]));
  }
}

function inIframe(){
  try{
    return window.self !== window.top;
  }
  catch(e){
    return true;
  }
}

function reset(){
  window.location.reload();
}