var timer;

var socket = io.connect('http://localhost:3001', { 'forceNew': true });

socket.on('messages', function(data) {
  console.log(data);
  sendHour();
})

socket.on('setHour', function(data) {
    console.log(data);
    cambiarHora(data.seconds);
})

function sendHour() {
    var hours = parseInt(document.getElementById("horas").innerHTML);
    var minutes = parseInt(document.getElementById("minutos").innerHTML);
    var seconds = parseInt(document.getElementById("segundos").innerHTML);
    var message = {
      "hour": hours,
      "minute": minutes,
      "seconds": seconds
    };
    socket.emit('time', message);
    return false;
  }


window.onload = function onload() {
    showTime();
}

function showTime() {
    var hours = parseInt(document.getElementById("horas").innerHTML);
    var minutes = parseInt(document.getElementById("minutos").innerHTML);
    var seconds = parseInt(document.getElementById("segundos").innerHTML);

    seconds++;
    if (seconds == 60) {
        seconds = 00;
        minutes++;
        if (minutes == 60) {
            minutes = 00;
            hours++;
            if (hours == 24) {
                hours = 0;
            }
        }
    }

    document.getElementById("horas").innerHTML = setZero(hours);
    document.getElementById("minutos").innerHTML = setZero(minutes);
    document.getElementById("segundos").innerHTML = setZero(seconds);

    timer = setTimeout(showTime, 1000);
}

function showWindow() {
    document.getElementById("ventana").style.display = "block";
    document.getElementById("nueva-hora").value = "";
    document.getElementById("nuevos-minutos").value = "";
    document.getElementById("nuevos-segundos").value = "";
    clearTimeout(timer);
}

function closeWindow() {
    document.getElementById("ventana").style.display = "none";
    showTime();
}

function cambiarHora(segundos) {
    
    var hours = parseInt(document.getElementById("horas").innerHTML);
    var minutes = parseInt(document.getElementById("minutos").innerHTML);
    var seconds = parseInt(document.getElementById("segundos").innerHTML);

    var seconds = ((hours*3600) + (minutes * 60) + (seconds*1));

    console.log("####" + seconds);
    seconds = seconds + segundos;
    createFormat(seconds);
    
}

function createFormat(seconds){

    var r_min = seconds % 3600;
    var hours = seconds / 3600;
    hours = hours.toString().split('.')[0];

    var seg = r_min % 60;

    var minute = r_min / 60;
    minute = minute.toString().split('.')[0];
    console.log("···········" + hours + " m "+  minute+" s "+seg);
    setTime(hours,minute,seg);

}

function setTime(horas, minutos, segundos){

    var hour = horas;
    var minutes = minutos;
    var seconds = segundos;

    var newhour = { hour, minutes, seconds };
    setDifference(newhour);

    document.getElementById("horas").innerHTML = hour;
    document.getElementById("minutos").innerHTML = minutes;
    document.getElementById("segundos").innerHTML = seconds;
    document.getElementById("ventana").style.display = "none";
    
}

function changeHour() {
    var hour = document.getElementById("nueva-hora").value;
    var minutes = document.getElementById("nuevos-minutos").value;
    var seconds = document.getElementById("nuevos-segundos").value;

    var newhour = { hour, minutes, seconds };
    setDifference(newhour);

    document.getElementById("horas").innerHTML = hour;
    document.getElementById("minutos").innerHTML = minutes;
    document.getElementById("segundos").innerHTML = seconds;

    document.getElementById("ventana").style.display = "none";
    showTime();
}

function setZero(value) {
    if (value < 10) {
        var newvalue = '0' + value;
        return newvalue;
    }
    return value;
}

function setDifference(newhour) {
    var lasthour = document.getElementById("horas").innerHTML;
    var lastminutes = document.getElementById("minutos").innerHTML;
    var lastseconds = document.getElementById("segundos").innerHTML;

    var hourdiff = Math.abs(parseInt(lasthour) - parseInt(newhour.hour));
    var minutesdiff = Math.abs(parseInt(lastminutes) - parseInt(newhour.minutes));
    var secondsdiff = Math.abs(parseInt(lastseconds) - parseInt(newhour.seconds));

    var tablelast = lasthour + ':' + lastminutes + ':' + lastseconds;
    var tablenew = setZero(newhour.hour) + ':' + setZero(newhour.minutes) + ':' + setZero(newhour.seconds);
    var tablediff = hourdiff + ' horas, ' + minutesdiff + ' minutos, ' + secondsdiff + ' segundos.'

    fillTable(tablelast, tablenew, tablediff);
}

function fillTable(tablelast, tablenew, tablediff) {
    var tr = document.createElement('tr');
    var tdlast = document.createElement("td");
    var tdnew = document.createElement("td");
    var tddiff = document.createElement("td");

    var lastvalue = document.createTextNode(tablelast);
    var newvalue = document.createTextNode(tablenew);
    var diffvalue = document.createTextNode(tablediff);

    tdlast.appendChild(lastvalue);
    tdnew.appendChild(newvalue);
    tddiff.appendChild(diffvalue);
    tr.appendChild(tdlast);
    tr.appendChild(tdnew);
    tr.appendChild(tddiff);
    document.getElementById("table").appendChild(tr);
}