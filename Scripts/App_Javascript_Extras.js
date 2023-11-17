function Extras_Startup(){
	if (extraFunction_enableClock == 1){
		document.getElementById("pageElement_Header_Clock").style.display = "block";
		Clock_Start_Time();
		Clock_Start_Date();
	}
	if (extraFunction_enableBatteryPercentage == 1){
		document.getElementById("pageElement_Header_Battery").style.display = "block";
		Battery_Start();
	}
	if (extraFunction_networkChecker == 1){
		document.getElementById("pageElement_Header_RightMenu").style.display = "flex";
	}
}

function Clock_Start_Time() {
	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	//var = displayTime;
	
	var displayHour;
	
	switch(h){
		case 0:
		var displayHour = 12;
		break;
		case 13:
		var displayHour = 1;
		break;
		case 14:
		var displayHour = 2;
		break;
		case 15:
		var displayHour = 3;
		break;
		case 16:
		var displayHour = 4;
		break;
		case 17:
		var displayHour = 5;
		break;
		case 18:
		var displayHour = 6;
		break;
		case 19:
		var displayHour = 7;
		break;
		case 20:
		var displayHour = 8;
		break;
		case 21:
		var displayHour = 9;
		break;
		case 22:
		var displayHour = 10;
		break;
		case 23:
		var displayHour = 11;
		break;
		default:
		var displayHour = h;
	}
	if (pageProperty_enableGreetings == 1){
			if (h >= 0 && h<=6){
				document.getElementById('pageElement_Greeting').innerHTML = "Good Evening";
			}
			if (h >= 6 && h<=11){
				document.getElementById('pageElement_Greeting').innerHTML = "Good Morning";
			}
			if (h >= 12 && h<=18){
				document.getElementById('pageElement_Greeting').innerHTML = "Good Afternoon";
			}
			if (h >= 19 && h<=24){
				document.getElementById('pageElement_Greeting').innerHTML = "Good Evening";
			}
			/*if(Behavior_DisplayGreetings_DisplayName == true){
				if (h >= 0 && h<=6){
					document.getElementById('pageElement_Greeting').innerHTML = "Good Evening, "+Behavior_DisplayGreetings_DisplayName_Text;
				}
				if (h >= 6 && h<=11){
					document.getElementById('pageElement_Greeting').innerHTML = "Good Morning, "+Behavior_DisplayGreetings_DisplayName_Text;
				}
				if (h >= 12 && h<=18){
					document.getElementById('pageElement_Greeting').innerHTML = "Good Afternoon, "+Behavior_DisplayGreetings_DisplayName_Text;
				}
				if (h >= 19 && h<=24){
					document.getElementById('pageElement_Greeting').innerHTML = "Good Evening, "+Behavior_DisplayGreetings_DisplayName_Text;
				}
			}*/
			} else {
			document.getElementById('pageElement_Greeting').style.display = "none";
		}
	
	
	var AMPM;
	if (h <= 12 && h >= 0){
		var AMPM = "AM";
		} else {
		var AMPM = "PM";
	}
	if (pageProperty_enableStatusBar == 1){
		if (document.getElementById('pageElement_Header_Clock').style.display == "block"){
			document.getElementById('Clock_Time').innerHTML =  displayHour + ":" + m + " " + AMPM;
			
		}
		/*if (document.getElementById('pageElement_Header_StatusTray_Textbox').style.display == "block"){*/
			document.getElementById('StatusMenu_Clock_Time').innerHTML =  displayHour + ":" + m + " " + AMPM;
			
		/*}*/
	}
	
	// document.getElementById("Sidebar_Clock_Time").innerHTML = displayHour + ":" + m + ":" + s + " "+AMPM;
	if (pageProperty_enableClockScreen == 1){
		// if (document.getElementById('pageElement_ClockScreen').style.display == "block"){
		document.getElementById('Clock_Time_ClockScreen').innerHTML =  displayHour + ":" + m;
		
		// }
	}
	
	
	
	
}

function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}
var date;
function Clock_Start_Date(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	date = today;
	//document.write(today);
	//document.getElementById('DateClass').innerHTML =  today;
	displayDay();
}
var day;
function displayDay() {
	var d = new Date();
	var n = d.getDay();
	if (n == 0){
		var day = "Sunday";
	}
	if (n == 1){
		var day = "Monday";
	}
	if (n == 2){
		var day = "Tuesday";
	}
	if (n == 3){
		var day = "Wednesday";
	}
	if (n == 4){
		var day = "Thursday";
	}
	if (n == 5){
		var day = "Friday";
	}
	if (n == 6){
		var day = "Saturday";
	}
	if (pageProperty_enableStatusBar == 1){
		document.getElementById("StatusMenu_Clock_Date_2").innerHTML = day + ", "+ date;
	}
	// document.getElementById("Clock_Date_2").innerHTML = day + ", "+ date;
	// document.getElementById("Sidebar_Clock_Date").innerHTML = day + ", "+ date;
	if (pageProperty_enableClockScreen == 1){
		document.getElementById("Clock_Date_ClockScreen").innerHTML = day + ", "+ date;
	}
	setTimeout(displayDay, 5000);
}




function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
	document.getElementById('ClockClass2').innerHTML =  strTime;
}

function Battery_Start(){
	if (pageProperty_enableStatusBar == 1 && extraFunction_enableBatteryPercentage == 1){
		var battery_level;
		navigator.getBattery()
		.then(function(battery) {
			var battery_level = Math.round((battery.level)*100);
			if (document.getElementById('pageElement_Header_Battery').style.display == "block"){
				document.getElementById('Battery_Level').innerHTML =  battery_level+"%";
			}
			if (document.getElementById('pageElement_Header_StatusTray_Textbox').style.display == "block"){
				document.getElementById('StatusMenu_Battery_Level').innerHTML =  battery_level+"%";
				if (isFinite(battery.dischargingTime / 60) == true){
					document.getElementById("StatusMenu_Battery_TimeRemaining").innerHTML = "Estimated " + Math.round(battery.dischargingTime / 60) + " minutes remaining";
					} else {
					if (battery_level == 100){
						document.getElementById("StatusMenu_Battery_TimeRemaining").innerHTML = "Fully charged";
						} else {
						document.getElementById("StatusMenu_Battery_TimeRemaining").innerHTML = "Plugged in, charging";
					}
				}
			}
		});
	}
	if (battery_level <= 15){
		document.getElementById('Battery_Level').style.color = "#ff3c19";
	}
	//check_Connection();
	setTimeout(Battery_Start, 1000);
}