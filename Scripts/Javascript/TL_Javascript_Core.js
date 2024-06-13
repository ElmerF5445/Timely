function TL_Open_Clock(){
    Element_Attribute_Set("TL_Clock", "State", "Active");
    Element_Style_Display("TL_Clock", "grid");
    Element_Style_Animate("TL_Clock", "Subwindow_MainContainer_Open", "0.5s", "forwards")
}

function TL_Close_Clock(){
    Element_Attribute_Set("TL_Clock", "State", "Inactive");
    setTimeout(() => {
        Element_Style_Display("TL_Clock", "none");
    }, 300);
}

function TL_Fullscreen_Open(){
    document.documentElement.requestFullscreen();
}

window.addEventListener('DOMContentLoaded', function(){
    TL_Clock_Update_Time();
    TL_Clock_Settings_Check();
});


function TL_Clock_Update_Time(){
    var Time = new Date();
    var Time_Hours = Time.getHours();
    var Time_Minutes = Time.getMinutes();
    var Time_Seconds = Time.getSeconds();
    Time_Hours = TL_Clock_Format_Time(Time_Hours, "Hours");
    Time_Minutes = TL_Clock_Format_Time(Time_Minutes, "Minutes");
    Time_Seconds = TL_Clock_Format_Time(Time_Seconds, "Seconds");
    document.getElementById("TL_Clock_Main_Time_Hour_1").innerHTML = Time_Hours.toString().charAt(0);
    document.getElementById("TL_Clock_Main_Time_Hour_2").innerHTML = Time_Hours.toString().charAt(1);
    document.getElementById("TL_Clock_Main_Time_Minute_1").innerHTML = Time_Minutes.toString().charAt(0);
    document.getElementById("TL_Clock_Main_Time_Minute_2").innerHTML = Time_Minutes.toString().charAt(1);
    document.getElementById("TL_Clock_Main_Time_Second_1").innerHTML = Time_Seconds.toString().charAt(0);
    document.getElementById("TL_Clock_Main_Time_Second_2").innerHTML = Time_Seconds.toString().charAt(1);
    setTimeout(TL_Clock_Update_Time, 1000);
}

function TL_Clock_Format_Time(Time, Type){
    if (Type == "Minutes" || Type == "Seconds"){
        if (Time < 10){
            Time = "0" + Time;
        }
        return Time;
    }
    if (Type == "Hours"){
        switch (Time){
            case 0:
                return "12";
                break;
            case 13:
                return "01";
                break;
            case 14:
                return "02";
                break;
            case 15:
                return "03";
                break;
            case 16:
                return "04";
                break;
            case 17:
                return "05";
                break;
            case 18:
                return "06";
                break;
            case 19:
                return "07";
                break;
            case 20:
                return "08";
                break;
            case 21:
                return "09";
                break;
            case 22:
                return "10";
                break;
            case 23:
                return "11";
                break;
            default:
                if (Time < 10){
                    Time = "0" + Time;
                }
                return Time;
                break;
        }
    }
}

let TL_Clock_Settings = {
    Color: {
        Hour_1: "#FFFFFF",
        Hour_2: "#FFFFFF",
        Minute_1: "#FFFFFF",
        Minute_2: "#FFFFFF",
        Second_1: "#FFFFFF",
        Second_2: "#FFFFFF",
        Colon_Hour: "#FFFFFF",
        Colon_Minute: "#FFFFFF",
        Background: "#000000"
    }, 
    Font: {
        General: "One",
        Size: "40"
    }
}

var TL_Clock_Settings_Key = "TL_Settings";

function TL_Clock_Settings_Check(){
    if(localStorage.getItem(TL_Clock_Settings_Key) == null){
        localStorage.setItem(TL_Clock_Settings_Key, JSON.stringify(TL_Clock_Settings));
        console.log("No settings file detected, created a default one.");
        TL_Clock_Settings_Check();
    } else {
        TL_Clock_Settings = JSON.parse(localStorage.getItem(TL_Clock_Settings_Key));
        console.log("Settings file found.");
        TL_Clock_Settings_Load();
    }
}

function TL_Clock_Settings_Load(){
    var Root_Stylesheet = document.querySelector(":root");
    // Colors
    Root_Stylesheet.style.setProperty('--TL-Clock-Time-Hour-1-Color', TL_Clock_Settings.Color.Hour_1);
    Root_Stylesheet.style.setProperty('--TL-Clock-Time-Hour-2-Color', TL_Clock_Settings.Color.Hour_2);
    Root_Stylesheet.style.setProperty('--TL-Clock-Time-Minute-1-Color', TL_Clock_Settings.Color.Minute_1);
    Root_Stylesheet.style.setProperty('--TL-Clock-Time-Minute-2-Color', TL_Clock_Settings.Color.Minute_2);
    Root_Stylesheet.style.setProperty('--TL-Clock-Time-Second-1-Color', TL_Clock_Settings.Color.Second_1);
    Root_Stylesheet.style.setProperty('--TL-Clock-Time-Second-2-Color', TL_Clock_Settings.Color.Second_2);
    Root_Stylesheet.style.setProperty('--TL-Clock-Time-Hour-Colon-Color', TL_Clock_Settings.Color.Colon_Hour);
    Root_Stylesheet.style.setProperty('--TL-Clock-Time-Minute-Colon-Color', TL_Clock_Settings.Color.Colon_Minute);
    Root_Stylesheet.style.setProperty('--TL-Clock-Time-Background-Color', TL_Clock_Settings.Color.Background);
    // Font
    Root_Stylesheet.style.setProperty('--TL-Clock-Time-General-Font', TL_Clock_Settings.Font.General);
    Root_Stylesheet.style.setProperty('--TL-Clock-Time-General-Size', TL_Clock_Settings.Font.Size + "vh");
    TL_Clock_Settings_Load_Values();
}

function TL_Clock_Settings_Load_Values(){
    // Settings - Color input
    document.getElementById("Input_TL_Setting_Color_Hour_Digit_1").value = TL_Clock_Settings.Color.Hour_1;
    document.getElementById("Input_TL_Setting_Color_Hour_Digit_2").value = TL_Clock_Settings.Color.Hour_2;
    document.getElementById("Input_TL_Setting_Color_Minute_Digit_1").value = TL_Clock_Settings.Color.Minute_1;
    document.getElementById("Input_TL_Setting_Color_Minute_Digit_2").value = TL_Clock_Settings.Color.Minute_2;
    document.getElementById("Input_TL_Setting_Color_Second_Digit_1").value = TL_Clock_Settings.Color.Second_1;
    document.getElementById("Input_TL_Setting_Color_Second_Digit_2").value = TL_Clock_Settings.Color.Second_2;
    document.getElementById("Input_TL_Setting_Color_Colon_Hour").value = TL_Clock_Settings.Color.Colon_Hour;
    document.getElementById("Input_TL_Setting_Color_Colon_Minute").value = TL_Clock_Settings.Color.Colon_Minute;
    document.getElementById("Input_TL_Setting_Color_Background").value = TL_Clock_Settings.Color.Background;
    // Settings - Hex input
    document.getElementById("Input_TL_Setting_Color_Hour_Digit_1_Hex").value = TL_Clock_Settings.Color.Hour_1;
    document.getElementById("Input_TL_Setting_Color_Hour_Digit_2_Hex").value = TL_Clock_Settings.Color.Hour_2;
    document.getElementById("Input_TL_Setting_Color_Minute_Digit_1_Hex").value = TL_Clock_Settings.Color.Minute_1;
    document.getElementById("Input_TL_Setting_Color_Minute_Digit_2_Hex").value = TL_Clock_Settings.Color.Minute_2;
    document.getElementById("Input_TL_Setting_Color_Second_Digit_1_Hex").value = TL_Clock_Settings.Color.Second_1;
    document.getElementById("Input_TL_Setting_Color_Second_Digit_2_Hex").value = TL_Clock_Settings.Color.Second_2;
    document.getElementById("Input_TL_Setting_Color_Colon_Hour_Hex").value = TL_Clock_Settings.Color.Colon_Hour;
    document.getElementById("Input_TL_Setting_Color_Colon_Minute_Hex").value = TL_Clock_Settings.Color.Colon_Minute;
    document.getElementById("Input_TL_Setting_Color_Background_Hex").value = TL_Clock_Settings.Color.Background;
    // Settings - Font size slider
    document.getElementById("Input_TL_Setting_Sizing").value = TL_Clock_Settings.Font.Size;
    // Settings - Font size input
    document.getElementById("Input_TL_Setting_Sizing_Text").value = TL_Clock_Settings.Font.Size;
}

function TL_Clock_Settings_Save(){
    // Colors
    TL_Clock_Settings.Color.Hour_1 = document.getElementById("Input_TL_Setting_Color_Hour_Digit_1").value;
    TL_Clock_Settings.Color.Hour_2 = document.getElementById("Input_TL_Setting_Color_Hour_Digit_2").value;
    TL_Clock_Settings.Color.Minute_1 = document.getElementById("Input_TL_Setting_Color_Minute_Digit_1").value;
    TL_Clock_Settings.Color.Minute_2 = document.getElementById("Input_TL_Setting_Color_Minute_Digit_2").value;
    TL_Clock_Settings.Color.Second_1 = document.getElementById("Input_TL_Setting_Color_Second_Digit_1").value;
    TL_Clock_Settings.Color.Second_2 = document.getElementById("Input_TL_Setting_Color_Second_Digit_2").value;
    TL_Clock_Settings.Color.Colon_Hour = document.getElementById("Input_TL_Setting_Color_Colon_Hour").value;
    TL_Clock_Settings.Color.Colon_Minute = document.getElementById("Input_TL_Setting_Color_Colon_Minute").value;
    TL_Clock_Settings.Color.Background = document.getElementById("Input_TL_Setting_Color_Background").value;
    // Font size
    TL_Clock_Settings.Font.Size = document.getElementById("Input_TL_Setting_Sizing_Text").value;
    // Save to local storage
    localStorage.setItem(TL_Clock_Settings_Key, JSON.stringify(TL_Clock_Settings));
    TL_Clock_Settings_Load();
}

function TL_Clock_Settings_Set_Font(Font){
    TL_Clock_Settings.Font.General = Font;
    TL_Clock_Settings_Save();
}

function TL_Clock_Settings_Open_Sizer(){
    TL_Open_Clock();
    setTimeout(function(){
        Element_Attribute_Set("TL_Clock", "Mode", "Settings_Sizer");
        Element_Attribute_Set("TL_Clock_Settings", "State", "Active");
    }, 500);
}

function TL_Clock_Settings_Close_Sizer(){
    Element_Attribute_Remove("TL_Clock", "Mode");
    setTimeout(function(){
        TL_Close_Clock();
        Element_Attribute_Set("TL_Clock_Settings", "State", "Inactive");
    }, 300);
}