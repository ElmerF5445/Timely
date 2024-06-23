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
    },
    General: {
        "InactiveSleeping": "Active",
        "InactiveSleeping_Timeout": 1,
        "ClockShifting": "Active",
        "ClockShifting_Distance": 5,
        "ColonBlinking": "Active",
        "ColonBlinking_Fading": "Active",
        "ColonBlinking_Duration": 1
    },
    Elements:{
        "Hours": {
            "Visible": "Active",
            "Hours_1_Transform": "translate(-450px, -20px)",
            "Hours_2_Transform": "translate(-300px, -20px)"
        },
        "Minutes": {
            "Visible": "Active",
            "Minutes_1_Transform": "translate(-100px, -20px)",
            "Minutes_2_Transform": "translate(50px, -20px)"
        },
        "Seconds": {
            "Visible": "Active",
            "Seconds_1_Transform": "translate(250px, -20px)",
            "Seconds_2_Transform": "translate(410px, -20px)"
        },
        "Colons": {
            "Visible": "Active",
            "Colons_Hour_Transform": "translate(0px, 0px)",
            "Colons_Minute_Transform": "translate(0px, 0px)"
        }
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
    // General
    // Inactive Sleeping
    if (TL_Clock_Settings.General.InactiveSleeping == "Active"){
        clearTimeout(TL_Clock_InactiveSleeping_TimeoutID);
        TL_Clock_InactiveSleeping_TimeoutID = setTimeout(TL_Clock_InactiveSleeping_Update_Timer, (TL_Clock_Settings.General.InactiveSleeping_Timeout * 1000));
    } else {
        clearTimeout(TL_Clock_InactiveSleeping_TimeoutID);
        Element_Attribute_Set("TL_Clock_Main", "Mode", "Active");
        Element_Attribute_Set("TL_Clock", "Mode", "Active");
    }
    // Clock Shifting
    if (TL_Clock_Settings.General.InactiveSleeping == "Active"){
        clearTimeout(TL_Clock_ClockShifting_TimeoutID);
        TL_Clock_ClockShifting_TimeoutID = setTimeout(TL_Clock_ClockShifting_Update_Timer, 300000);
    } else {
        clearTimeout(TL_Clock_ClockShifting_TimeoutID);
    }
    // Colon Blinking
    if (TL_Clock_Settings.General.ColonBlinking == "Active"){
        Root_Stylesheet.style.setProperty('--TL-Clock-Time-General-ColonBlinking', "Colon_Blink");
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Hour_Colon", "Colon_Blink", "1s", "forwards", "infinite", 0);
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Minute_Colon", "Colon_Blink", "1s", "forwards", "infinite", 0);
        Root_Stylesheet.style.setProperty('--TL-Clock-Time-General-ColonBlinking-Duration', TL_Clock_Settings.General.ColonBlinking_Duration + "s");
        if (TL_Clock_Settings.General.ColonBlinking_Fading == "Active"){
            Root_Stylesheet.style.setProperty('--TL-Clock-Time-General-ColonBlinking-TimingFunction', "ease-in-out");
        } else {
            Root_Stylesheet.style.setProperty('--TL-Clock-Time-General-ColonBlinking-TimingFunction', "steps(1)");
        }
    } else {
        Root_Stylesheet.style.setProperty('--TL-Clock-Time-General-ColonBlinking', "Colon_Stare");
    }
    // Clock element visibility
    
    if (TL_Clock_Settings.Elements.Hours.Visible == "Active"){
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Hour_1", "Clock_Show", "1s", "forwards", 1, 0);
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Hour_2", "Clock_Show", "1s", "forwards", 1, 0);
        if (TL_Clock_Settings.Elements.Colons.Visible == "Active"){
            Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Hour_Colon", null, "1s", "forwards", 1, 0);
        }
    } else {
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Hour_1", "Clock_Hide", "1s", "forwards", 1, 0);
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Hour_2", "Clock_Hide", "1s", "forwards", 1, 0);
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Hour_Colon", "Clock_Hide", "1s", "forwards", 1, 0);
    }
    if (TL_Clock_Settings.Elements.Minutes.Visible == "Active"){
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Minute_1", "Clock_Show", "1s", "forwards", 1, 0);
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Minute_2", "Clock_Show", "1s", "forwards", 1, 0);
    } else {
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Minute_1", "Clock_Hide", "1s", "forwards", 1, 0);
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Minute_2", "Clock_Hide", "1s", "forwards", 1, 0);
    }
    if (TL_Clock_Settings.Elements.Seconds.Visible == "Active"){
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Second_1", "Clock_Show", "1s", "forwards", 1, 0);
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Second_2", "Clock_Show", "1s", "forwards", 1, 0);
        if (TL_Clock_Settings.Elements.Colons.Visible == "Active"){
            Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Minute_Colon", null, "1s", "forwards", 1, 0);
        }
    } else {
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Second_1", "Clock_Hide", "1s", "forwards", 1, 0);
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Second_2", "Clock_Hide", "1s", "forwards", 1, 0);
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Minute_Colon", "Clock_Hide", "1s", "forwards", 1, 0);
    }
    if (TL_Clock_Settings.Elements.Colons.Visible != "Active"){
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Hour_Colon", "Clock_Hide", "1s", "forwards", 1, 0);
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Minute_Colon", "Clock_Hide", "1s", "forwards", 1, 0);
    } else {
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Hour_Colon", null, "1s", "forwards", 1, 0);
        Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Minute_Colon", null, "1s", "forwards", 1, 0);
        if (TL_Clock_Settings.General.ColonBlinking == "Active"){
            Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Hour_Colon", "var(--TL-Clock-Time-General-ColonBlinking)", "var(--TL-Clock-Time-General-ColonBlinking-Duration)", null, "infinite", 0);
            Element_Style_Animate_Batch_QuerySelector(".TL_Clock_Main_Time_Minute_Colon", "var(--TL-Clock-Time-General-ColonBlinking)", "var(--TL-Clock-Time-General-ColonBlinking-Duration)", null, "infinite", 0);
        }
        document.getElementById("TL_Clock_Main_Time_Hour_Colon").style.display = "none";
        document.getElementById("TL_Clock_Main_Time_Minute_Colon").style.display = "none";
        if (TL_Clock_Settings.Elements.Hours.Visible != "Active" || TL_Clock_Settings.Elements.Minutes.Visible != "Active"){
            document.getElementById("TL_Clock_Main_Time_Hour_Colon").style.display = "none";
        }
        if (TL_Clock_Settings.Elements.Minutes.Visible != "Active" || TL_Clock_Settings.Elements.Seconds.Visible != "Active"){
            document.getElementById("TL_Clock_Main_Time_Minute_Colon").style.display = "none";
        }
    }
    // Clock element positioning
    document.getElementById("TL_Clock_Main_Time_Hour_1").style.transform = TL_Clock_Settings.Elements.Hours.Hours_1_Transform;
    document.getElementById("TL_Clock_Main_Time_Hour_2").style.transform = TL_Clock_Settings.Elements.Hours.Hours_2_Transform;
    document.getElementById("TL_Clock_Main_Time_Minute_1").style.transform = TL_Clock_Settings.Elements.Minutes.Minutes_1_Transform;
    document.getElementById("TL_Clock_Main_Time_Minute_2").style.transform = TL_Clock_Settings.Elements.Minutes.Minutes_2_Transform;
    document.getElementById("TL_Clock_Main_Time_Second_1").style.transform = TL_Clock_Settings.Elements.Seconds.Seconds_1_Transform;
    document.getElementById("TL_Clock_Main_Time_Second_2").style.transform = TL_Clock_Settings.Elements.Seconds.Seconds_2_Transform;
    document.getElementById("TL_Clock_Main_Time_Hour_Colon").style.transform = TL_Clock_Settings.Elements.Hours.Colons_Hour_Transform;
    document.getElementById("TL_Clock_Main_Time_Minute_Colon").style.transform = TL_Clock_Settings.Elements.Hours.Colons_Minute_Transform;
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
    // General
    Element_Attribute_Set("Toggle_TL_Setting_InactiveSleeping", "State", TL_Clock_Settings.General.InactiveSleeping);
    document.getElementById("Input_TL_Setting_ScreenTimeout").value = TL_Clock_Settings.General.InactiveSleeping_Timeout;
    Element_Attribute_Set("Toggle_TL_Setting_ClockShifting", "State", TL_Clock_Settings.General.ClockShifting);
    document.getElementById("Input_TL_Setting_ClockShifting_Distance").value = TL_Clock_Settings.General.ClockShifting_Distance;
    Element_Attribute_Set("Toggle_TL_Setting_ColonBlinking", "State", TL_Clock_Settings.General.ColonBlinking);
    Element_Attribute_Set("Toggle_TL_Setting_ColonBlinking_Animate", "State", TL_Clock_Settings.General.ColonBlinking_Fading);
    document.getElementById("Input_TL_Setting_ColonBlinking_Duration").value = TL_Clock_Settings.General.ColonBlinking_Duration;
    // Clock element visibility
    Element_Attribute_Set("Toggle_TL_Setting_ClockElements_Hours", "State", TL_Clock_Settings.Elements.Hours.Visible);
    Element_Attribute_Set("Toggle_TL_Setting_ClockElements_Minutes", "State", TL_Clock_Settings.Elements.Minutes.Visible);
    Element_Attribute_Set("Toggle_TL_Setting_ClockElements_Seconds", "State", TL_Clock_Settings.Elements.Seconds.Visible);
    Element_Attribute_Set("Toggle_TL_Setting_ClockElements_Colon", "State", TL_Clock_Settings.Elements.Colons.Visible);
}

function TL_Clock_Settings_Save(){
    Toasts_CreateToast("Assets/Icons/iconNew_save.png", "Saved changes", "Your changes has been saved and applied");
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
    // General
    // Inactive sleeping
    TL_Clock_Settings.General.InactiveSleeping = Element_Attribute_Get("Toggle_TL_Setting_InactiveSleeping", "State");
    TL_Clock_Settings.General.InactiveSleeping_Timeout = document.getElementById("Input_TL_Setting_ScreenTimeout").value;
    // Clock shifting
    TL_Clock_Settings.General.ClockShifting = Element_Attribute_Get("Toggle_TL_Setting_ClockShifting", "State");
    TL_Clock_Settings.General.ClockShifting_Distance = document.getElementById("Input_TL_Setting_ClockShifting_Distance").value; 
    // Colon blinking   
    TL_Clock_Settings.General.ColonBlinking = Element_Attribute_Get("Toggle_TL_Setting_ColonBlinking", "State");
    TL_Clock_Settings.General.ColonBlinking_Fading = Element_Attribute_Get("Toggle_TL_Setting_ColonBlinking_Animate", "State");
    TL_Clock_Settings.General.ColonBlinking_Duration = document.getElementById("Input_TL_Setting_ColonBlinking_Duration").value;
    // Clock element visibility
    TL_Clock_Settings.Elements.Hours.Visible = Element_Attribute_Get("Toggle_TL_Setting_ClockElements_Hours", "State");
    TL_Clock_Settings.Elements.Minutes.Visible = Element_Attribute_Get("Toggle_TL_Setting_ClockElements_Minutes", "State");
    TL_Clock_Settings.Elements.Seconds.Visible = Element_Attribute_Get("Toggle_TL_Setting_ClockElements_Seconds", "State");
    TL_Clock_Settings.Elements.Colons.Visible = Element_Attribute_Get("Toggle_TL_Setting_ClockElements_Colon", "State");
    // Clock element sizing
    TL_Clock_Settings.Elements.Hours.Hours_1_Transform = document.getElementById("TL_Clock_Main_Time_Hour_1").style.transform;
    TL_Clock_Settings.Elements.Hours.Hours_2_Transform = document.getElementById("TL_Clock_Main_Time_Hour_2").style.transform;
    TL_Clock_Settings.Elements.Minutes.Minutes_1_Transform = document.getElementById("TL_Clock_Main_Time_Minute_1").style.transform;
    TL_Clock_Settings.Elements.Minutes.Minutes_2_Transform = document.getElementById("TL_Clock_Main_Time_Minute_2").style.transform;
    TL_Clock_Settings.Elements.Seconds.Seconds_1_Transform = document.getElementById("TL_Clock_Main_Time_Second_1").style.transform;
    TL_Clock_Settings.Elements.Seconds.Seconds_2_Transform = document.getElementById("TL_Clock_Main_Time_Second_2").style.transform;
    TL_Clock_Settings.Elements.Colons.Colons_Hour_Transform = document.getElementById("TL_Clock_Main_Time_Hour_Colon").style.transform;
    TL_Clock_Settings.Elements.Colons.Colons_Minute_Transform = document.getElementById("TL_Clock_Main_Time_Minute_Colon").style.transform;
    // Save to local storage
    localStorage.setItem(TL_Clock_Settings_Key, JSON.stringify(TL_Clock_Settings));
    TL_Clock_Settings_Load();
}

function TL_Clock_Settings_Reset(){
    localStorage.removeItem(TL_Clock_Settings_Key);
    location.reload();
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
        Element_Attribute_Set("TL_Clock_Settings_Sizer", "State", "Active");
        Element_Attribute_Set("TL_Clock_Settings_Positioner", "State", "Inactive");
    }, 500);
}

function TL_Clock_Settings_Close_Sizer(){
    Element_Attribute_Remove("TL_Clock", "Mode");
    Element_Attribute_Set("TL_Clock_Settings_Sizer", "State", "Inactive");
    Element_Attribute_Set("TL_Clock_Settings_Positioner", "State", "Inactive");
    setTimeout(function(){
        TL_Close_Clock();
        Element_Attribute_Set("TL_Clock_Settings", "State", "Inactive");
    }, 300);
}

let TL_Clock_InactiveSleeping_TimeoutID;
function TL_Clock_InactiveSleeping_Update_Timer(){
    if (TL_Clock_Settings.General.InactiveSleeping == "Active"){
        if (Element_Attribute_Get("TL_Clock_Main", "Activeness") == "Active" || Element_Attribute_Get("TL_Clock_Main_Time", "Activeness") == null){
            Element_Attribute_Set("TL_Clock_Main", "Activeness", "Inactive");
            Element_Attribute_Set("TL_Clock", "Activeness", "Inactive");
        }
        setTimeout(TL_Clock_InactiveSleeping_Update_Timer, (TL_Clock_Settings.General.InactiveSleeping_Timeout * 1000));
    }
}

let TL_Clock_ClockShifting_TimeoutID;
function TL_Clock_ClockShifting_Update_Timer(){
    if (TL_Clock_Settings.General.ClockShifting == "Active"){
        document.getElementById("TL_Clock_Main").style.transform = null;
        var TL_Clock_ClockShifting_Offset_X = (Math.random() * TL_Clock_Settings.General.ClockShifting_Distance) * 2 - 1;
        var TL_Clock_ClockShifting_Offset_Y = (Math.random() * TL_Clock_Settings.General.ClockShifting_Distance) * 2 - 1;
        if (Math.random() >= 0.5){
            TL_Clock_ClockShifting_Offset_X = "-" + TL_Clock_ClockShifting_Offset_X;
        }
        if (Math.random() >= 0.5){
            TL_Clock_ClockShifting_Offset_Y = "-" + TL_Clock_ClockShifting_Offset_Y;
        }
        document.getElementById("TL_Clock_Main").style.transform = `translate(${TL_Clock_ClockShifting_Offset_X}px, ${TL_Clock_ClockShifting_Offset_Y}px`;
    }
    setTimeout(TL_Clock_ClockShifting_Update_Timer, 300000);
}

function TL_Clock_Settings_Open_Positioner(){
    TL_Open_Clock();
    setTimeout(function(){
        Element_Attribute_Set("TL_Clock", "Mode", "Settings_Positioner");
        Element_Attribute_Set("TL_Clock_Settings", "State", "Active");
        Element_Attribute_Set("TL_Clock_Settings_Sizer", "State", "Inactive");
        Element_Attribute_Set("TL_Clock_Settings_Positioner", "State", "Active");
    }, 500);
}

function TL_Clock_Settings_Close_Positioner(){
    Element_Attribute_Remove("TL_Clock", "Mode");
    Element_Attribute_Set("TL_Clock_Settings_Sizer", "State", "Inactive");
    Element_Attribute_Set("TL_Clock_Settings_Positioner", "State", "Inactive");
    setTimeout(function(){
        TL_Close_Clock();
        Element_Attribute_Set("TL_Clock_Settings", "State", "Inactive");
    }, 300);
    Element_Attribute_Set("TL_Clock_Main_Time_Hour_1", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Hour_2", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Hour_Colon", "ZPosition", "Back");Element_Attribute_Set("TL_Clock_Main_Time_Minute_1", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Minute_2", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Minute_Colon", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Second_1", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Second_1", "ZPosition", "Back");
    TL_Clock_Settings_Load();
}

// Positioner
let draggableElements = document.querySelectorAll('.TL_Clock_Main_Time_Element');
let TL_Clock_Settings_Positioner_GridSize = 10;

draggableElements.forEach((element) => {
    let initialX;
    let initialY;
    let isDragging = false;

    // Mouse events
    element.addEventListener('mousedown', (event) => {
        if (Element_Attribute_Get('TL_Clock_Settings_Positioner', 'State') == 'Active'){
            isDragging = true;
            const initialTransform = element.style.transform;
            const initialMatrix = new DOMMatrix(initialTransform);
            initialX = event.clientX - initialMatrix.m41;
            initialY = event.clientY - initialMatrix.m42;
            console.log(initialMatrix.m41 + " : " + initialMatrix.m42);
            element.style.outline = "solid red";
        }
    });

    document.addEventListener('mousemove', (event) => {
        if (Element_Attribute_Get('TL_Clock_Settings_Positioner', 'State') == 'Active'){
            if (isDragging){
                const deltaX = event.clientX - initialX;
                const deltaY = event.clientY - initialY;

                const snappedDeltaX = Math.round(deltaX / TL_Clock_Settings_Positioner_GridSize) * TL_Clock_Settings_Positioner_GridSize;
                const snappedDeltaY = Math.round(deltaY / TL_Clock_Settings_Positioner_GridSize) * TL_Clock_Settings_Positioner_GridSize;
                console.log(deltaX + " : " + deltaY);
                element.style.transform = `translate(${snappedDeltaX}px, ${snappedDeltaY}px)`;
                element.style.outline = "solid red";
            }
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        element.style.outline = null;
    });

    // Touch events
    element.addEventListener('touchstart', (event) => {
        if (Element_Attribute_Get('TL_Clock_Settings_Positioner', 'State') == 'Active'){
            isDragging = true;
            const initialTransform = element.style.transform;
            const initialMatrix = new DOMMatrix(initialTransform);
            initialX = event.touches[0].clientX - initialMatrix.m41;
            initialY = event.touches[0].clientY - initialMatrix.m42;
            console.log(initialMatrix.m41 + " : " + initialMatrix.m42);
            element.style.outline = "solid red";
        }
    });

    document.addEventListener('touchmove', (event) => {
        if (Element_Attribute_Get('TL_Clock_Settings_Positioner', 'State') == 'Active'){
            if (isDragging){
                const deltaX = event.touches[0].clientX - initialX;
                const deltaY = event.touches[0].clientY - initialY;

                const snappedDeltaX = Math.round(deltaX / TL_Clock_Settings_Positioner_GridSize) * TL_Clock_Settings_Positioner_GridSize;
                const snappedDeltaY = Math.round(deltaY / TL_Clock_Settings_Positioner_GridSize) * TL_Clock_Settings_Positioner_GridSize;
                console.log(deltaX + " : " + deltaY);
                element.style.transform = `translate(${snappedDeltaX}px, ${snappedDeltaY}px)`;
                element.style.outline = "solid red";
            }
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
        element.style.outline = null;
    });
});


function TL_Clock_Settings_Positioner_ResetPositions(){
    let draggableElements = document.querySelectorAll('.TL_Clock_Main_Time_Element');
    draggableElements.forEach((element) => {
        element.style.transform = null;
    });
}

function TL_Clock_Settings_Positioner_SetToTop(Element){
    Element_Attribute_Set("TL_Clock_Main_Time_Hour_1", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Hour_2", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Hour_Colon", "ZPosition", "Back");Element_Attribute_Set("TL_Clock_Main_Time_Minute_1", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Minute_2", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Minute_Colon", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Second_1", "ZPosition", "Back");
    Element_Attribute_Set("TL_Clock_Main_Time_Second_1", "ZPosition", "Back");
    switch (Element){
        case "H1":
            Element_Attribute_Set("TL_Clock_Main_Time_Hour_1", "ZPosition", "Top");
            break;
        case "H2":
            Element_Attribute_Set("TL_Clock_Main_Time_Hour_2", "ZPosition", "Top");
            break;
        case "CHM":
            Element_Attribute_Set("TL_Clock_Main_Time_Hour_Colon", "ZPosition", "Top");
            break;
        case "M1":
            Element_Attribute_Set("TL_Clock_Main_Time_Minute_1", "ZPosition", "Top");
            break;
        case "M2":
            Element_Attribute_Set("TL_Clock_Main_Time_Minute_2", "ZPosition", "Top");
            break;
        case "CMS":
            Element_Attribute_Set("TL_Clock_Main_Time_Minute_Colon", "ZPosition", "Top");
            break;
        case "S1":
            Element_Attribute_Set("TL_Clock_Main_Time_Second_1", "ZPosition", "Top");
            break;
        case "S2":
            Element_Attribute_Set("TL_Clock_Main_Time_Second_2", "ZPosition", "Top");
            break;
    }
}