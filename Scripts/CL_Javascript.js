let wakeLock = null;

async function requestWakeLock() {
      try {
            // Request a wake lock
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake lock is active!');
      } catch (error) {
            console.error('Error requesting wake lock:', error);
      }
}

function releaseWakeLock() {
      if (wakeLock !== null) {
            // Release the wake lock
            wakeLock.release();
            wakeLock = null;
            console.log('Wake lock released.');
      }
}

function CL_Clock_Start_Time() {
      console.log("Clock updated");
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
	displayHour = checkTime(displayHour);
	var AMPM;
	if (h <= 12 && h >= 0){
		var AMPM = "AM";
		} else {
		var AMPM = "PM";
	}

	
      document.getElementById("CL_Clock_Main_Text_Hours_Digit_1").innerHTML = displayHour.toString().charAt(0);
      document.getElementById("CL_Clock_Main_Text_Hours_Digit_2").innerHTML = displayHour.toString().charAt(1);
      document.getElementById("CL_Clock_Main_Text_Minutes_Digit_1").innerHTML = m.toString().charAt(0);
      document.getElementById("CL_Clock_Main_Text_Minutes_Digit_2").innerHTML = m.toString().charAt(1);

      // Shifts number position randomly betwen -5 and 5
      var randomX = (Math.random() - 0.5) * 10; 
      var randomY = (Math.random() - 0.5) * 10; 

      document.getElementById("Clock_Main_Content").style.transform = "translate(" + randomX + "px, " + randomY + "px)";

	setTimeout(CL_Clock_Start_Time, 60000);
}

function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}

var CL_Switcher_State = "Switched"; // Default value is opposite the supposed value ("normal") since it will be switched when pages load
var CL_Switcher_BackgroundColor;
var CL_Switcher_TextColor_Hour;
var CL_Switcher_TextColor_Minutes;
var CL_Switcher_BackgroundGradient_Old;
var CL_Switcher_BackgroundGradient_New;
// var CL_Switcher_BackgroundGradient_Temporary;
function CL_Clock_Start_Switcher(){
      var Root_Stylesheet = document.querySelector(":root");
       // Sets old color (one to transition from) to text color
       CL_Switcher_BackgroundGradient_Old = "linear-gradient(45deg, " + CL_Switcher_TextColor_Hour + " 0%, " + CL_Switcher_TextColor_Minutes + " 100%)";
       // Sets new color (one to transition to) to background color
       CL_Switcher_BackgroundGradient_New = "linear-gradient(45deg, " + CL_Switcher_BackgroundColor + " 0%, " + CL_Switcher_BackgroundColor + " 100%)";

       // Sets necessary css variable values
       Root_Stylesheet.style.setProperty('--CL-Clock-Background-Gradient-Old', CL_Switcher_BackgroundGradient_Old);
       Root_Stylesheet.style.setProperty('--CL-Clock-Background-Gradient-New', CL_Switcher_BackgroundGradient_New);
      if (CL_Switcher_State == "Switched"){
            console.log("Switching to normal");
            // Triggers the animation to start by setting the data id 
            document.getElementById("tab_Clock").setAttribute("data-id", "Gradient_Transition_Start_OldToNew");

            // Removes the data-id attribute after 30s (animation duration)
            setTimeout(() => {
                  document.getElementById("tab_Clock").removeAttribute("data-id");
            }, 30000);

            // Sets text colors to transition it to set color
            document.getElementById("CL_Clock_Main_Text_Hours").style.color = CL_Switcher_TextColor_Hour;
            document.getElementById("CL_Clock_Main_Text_Minutes").style.color = CL_Switcher_TextColor_Minutes;

            CL_Switcher_State = "Normal";
      } else if (CL_Switcher_State == "Normal"){
            console.log("Switching to switched");

            // Triggers the animation to start by setting the data id 
            document.getElementById("tab_Clock").setAttribute("data-id", "Gradient_Transition_Start_NewToOld");
            
            // Removes the data-id attribute after 30s (animation duration)
            setTimeout(() => {
                  document.getElementById("tab_Clock").removeAttribute("data-id");
            }, 30000);


            // document.getElementById("tab_Clock").style.background = "linear-gradient(45deg, " + CL_Switcher_TextColor_Hour + " 0%, " + CL_Switcher_TextColor_Minutes + " 100%)";
            document.getElementById("CL_Clock_Main_Text_Hours").style.color = CL_Switcher_BackgroundColor;
            document.getElementById("CL_Clock_Main_Text_Minutes").style.color = CL_Switcher_BackgroundColor;

            CL_Switcher_State = "Switched";
      }
      // setTimeout(CL_Clock_Start_Switcher, 300000);
      setTimeout(CL_Clock_Start_Switcher, 31000);
}

var CL_Settings_Value_ClockText_Font = "Product_Sans";

function CL_Settings_Change_Font(Font){
      var Root_Stylesheet = document.querySelector(":root");
      Root_Stylesheet.style.setProperty('--CL-Clock-Text-Font', Font);
      CL_Settings_Value_ClockText_Font = Font;
      // Toast_CreateToast("Assets/Icons/Placeholder.png", "Font changed", "Clock text font has been changed.")
}

var CL_Settings_Key = "CL_Settings";

function CL_Settings_Save_Settings(){
      // Groups are settings inside categories
      /*
            Contents:
                  Font - Family
                  Color - Hours - Digit 1
                  Color - Minutes - Digit 1
                  Toggle - Blinker - Visibility
                  Range - Font - Size
                  Color - Hours - Digit 2
                  Color - Minutes - Digit 2
                  Color - Blinker
                  Toggle - Blinker - Animation
                  Range - Blinker - Animation Duration
                  Toggle - Blinker - Animation Function
      */
      let Settings_Group_ClockText = [CL_Settings_Value_ClockText_Font, document.getElementById("CL-Setting-Text-Color-Hours").value, document.getElementById("CL-Setting-Text-Color-Minutes").value, document.getElementById("toggle_Settings_ShowColon").querySelector(".Toggle_Indicator").getAttribute("data-id"), document.getElementById("CL-Setting-Text-Size").value, document.getElementById("CL-Setting-Text-Color-Hours-D2").value, document.getElementById("CL-Setting-Text-Color-Minutes-D2").value, document.getElementById("CL-Setting-Text-Color-Blinker").value, document.getElementById("toggle_Settings_BlinkColon").querySelector(".Toggle_Indicator").getAttribute("data-id"), document.getElementById("CL-Setting-Text-Blinker-AnimationSpeed").value, document.getElementById("toggle_Settings_BlinkColon_FadeAnimation").querySelector(".Toggle_Indicator").getAttribute("data-id")];

      let Settings_Group_ClockBackground = [document.getElementById("CL-Setting-Background-Color").value];
      console.log(Settings_Group_ClockText);
      console.log(Settings_Group_ClockBackground);

      // The main array that is saved on local storage
      let Settings_MainArray = [Settings_Group_ClockText, Settings_Group_ClockBackground];

      if(localStorage.getItem(CL_Settings_Key) == null){
            console.log("Settings file doesn't exist, default progress saved");
      } else {
            console.log("Settings saved");
      }

      localStorage.setItem(CL_Settings_Key, JSON.stringify(Settings_MainArray));  
      CL_Settings_Load_Settings();  
}

function CL_Settings_Load_Settings(){
      var Root_Stylesheet = document.querySelector(":root");

      if(document.getElementById('toggle_Settings_PreventSleep').querySelector(".Toggle_Indicator").getAttribute('data-id') == "Toggle_Activated"){
            requestWakeLock();
      } else {
            releaseWakeLock();
      }


      if(localStorage.getItem(CL_Settings_Key) == null){
            CL_Settings_Save_Settings();
      } else {
            console.log("Loading saved settings...");
      }
      let Settings_MainArray = JSON.parse(localStorage.getItem(CL_Settings_Key));

      // Group 1 - Clock text
      CL_Settings_Change_Font(Settings_MainArray[0][0]);
      // document.getElementById("CL_Clock_Main_Text_Hours").style.color = Settings_MainArray[0][1];
      Root_Stylesheet.style.setProperty('--CL-Clock-Text-Color-Hour-D1', Settings_MainArray[0][1]);

      // CL_Switcher_TextColor_Hour = Settings_MainArray[0][1];
      // document.getElementById("CL_Clock_Main_Text_Minutes").style.color = Settings_MainArray[0][2];
      Root_Stylesheet.style.setProperty('--CL-Clock-Text-Color-Minutes-D1', Settings_MainArray[0][2]);
      // CL_Switcher_TextColor_Minutes = Settings_MainArray[0][2];
      if (Settings_MainArray[0][3] == "Toggle_Activated"){
            // document.getElementById("CL_Clock_Main_Text_Blinker").style.display = "none";
            Root_Stylesheet.style.setProperty('--CL-Clock-Text-Visibility-Blinker', "block");
      } else {
            Root_Stylesheet.style.setProperty('--CL-Clock-Text-Visibility-Blinker', "none");
      }
      Root_Stylesheet.style.setProperty('--CL-Clock-Text-Size', Settings_MainArray[0][4] + "vh");
      Root_Stylesheet.style.setProperty('--CL-Clock-Text-Color-Hour-D2', Settings_MainArray[0][5]);
      Root_Stylesheet.style.setProperty('--CL-Clock-Text-Color-Minutes-D2', Settings_MainArray[0][6]);
      Root_Stylesheet.style.setProperty('--CL-Clock-Text-Color-Blinker', Settings_MainArray[0][7]);
      if (Settings_MainArray[0][8] == "Toggle_Activated"){
            Root_Stylesheet.style.setProperty('--CL-Clock-Animation-Blinker', "Clock_Blinker_Blink");
      } else {
            Root_Stylesheet.style.setProperty('--CL-Clock-Animation-Blinker', "none");
      }      
      Root_Stylesheet.style.setProperty('--CL-Clock-Animation-Duration-Blinker', Settings_MainArray[0][9] + "s");
      if (Settings_MainArray[0][10] == "Toggle_Activated"){
            Root_Stylesheet.style.setProperty('--CL-Clock-Animation-TimingFunction-Blinker', "ease-in-out");
      } else {
            Root_Stylesheet.style.setProperty('--CL-Clock-Animation-TimingFunction-Blinker', "steps(1, end)");
      }    
      
      

      // Group 2 - Clock background
      // document.getElementById("tab_Clock").style.backgroundColor = Settings_MainArray[1][0];
      Root_Stylesheet.style.setProperty("--CL-Clock-Background-Color", Settings_MainArray[1][0]);
      // CL_Switcher_BackgroundColor = Settings_MainArray[1][0];

      CL_Settings_Load_Values();
}

function CL_Settings_Load_Values(){
      if(localStorage.getItem(CL_Settings_Key) == null){
            CL_Settings_Save_Settings();
      } else {
            console.log("Loading saved settings...");
      }
      let Settings_MainArray = JSON.parse(localStorage.getItem(CL_Settings_Key));

      // Group 1 - Clock text
      document.getElementById("CL-Setting-Text-Color-Hours").value = Settings_MainArray[0][1];
      document.getElementById("CL-Setting-Text-Color-Minutes").value = Settings_MainArray[0][2];
      document.getElementById("toggle_Settings_ShowColon").querySelector(".Toggle_Indicator").setAttribute("data-id", Settings_MainArray[0][3]);
      document.getElementById("CL-Setting-Text-Size").value = Settings_MainArray[0][4];
      document.getElementById("CL-Setting-Text-Color-Hours-D2").value = Settings_MainArray[0][5];
      document.getElementById("CL-Setting-Text-Color-Minutes-D2").value = Settings_MainArray[0][6];
      document.getElementById("CL-Setting-Text-Color-Blinker").value = Settings_MainArray[0][7];
      document.getElementById("toggle_Settings_BlinkColon").querySelector(".Toggle_Indicator").setAttribute("data-id", Settings_MainArray[0][8]);
      document.getElementById("CL-Setting-Text-Blinker-AnimationSpeed").value = Settings_MainArray[0][9];
            document.getElementById("CL-Setting-Text-Blinker-AnimationSpeed-Value").innerHTML = "Blinking speed (" + Settings_MainArray[0][9] + "s): "; 
      document.getElementById("toggle_Settings_BlinkColon_FadeAnimation").querySelector(".Toggle_Indicator").setAttribute("data-id", Settings_MainArray[0][10]);

      // Group 2 - Clock background
      document.getElementById("CL-Setting-Background-Color").value = Settings_MainArray[1][0];

      console.log("Settings fully loaded");
}

function CL_FullScreen(){
      if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
      }
}

function CL_Settings_Toggle_Overlay(State){
      if (State == "Open"){
            document.getElementById("Clock_Settings_Overlay").style.display = "block";
      } else if (State == "Closed"){
            document.getElementById("Clock_Settings_Overlay").style.display = "none";
      }
}

function CL_Settings_Change_ClockColors(Configuration){
      switch (Configuration){
            case "Match_Hours":
                  document.getElementById("CL-Setting-Text-Color-Hours-D2").value = document.getElementById("CL-Setting-Text-Color-Hours").value
                  break;
            case "Match_Minutes":
                  document.getElementById("CL-Setting-Text-Color-Minutes-D2").value = document.getElementById("CL-Setting-Text-Color-Minutes").value
                  break;
            case "Alternate_H1M1":
                  document.getElementById("CL-Setting-Text-Color-Minutes").value = document.getElementById("CL-Setting-Text-Color-Hours").value
                  break;
            case "Alternate_H2M2":
                  document.getElementById("CL-Setting-Text-Color-Minutes-D2").value = document.getElementById("CL-Setting-Text-Color-Hours-D2").value
                  break;
            case "Match_All":
                  document.getElementById("CL-Setting-Text-Color-Hours-D2").value = document.getElementById("CL-Setting-Text-Color-Hours").value
                  document.getElementById("CL-Setting-Text-Color-Blinker").value = document.getElementById("CL-Setting-Text-Color-Hours").value
                  document.getElementById("CL-Setting-Text-Color-Minutes").value = document.getElementById("CL-Setting-Text-Color-Hours").value
                  document.getElementById("CL-Setting-Text-Color-Minutes-D2").value = document.getElementById("CL-Setting-Text-Color-Hours").value
                  break;
      }
      CL_Settings_Save_Settings();
}

function CL_Settings_ResetData(){
      localStorage.removeItem(CL_Settings_Key)
      location.reload();
}