var App_LocalStorage_Name = window.App_LocalStorage_Name;
var App_LocalStorage_UseUniversalProfiles = window.App_LocalStorage_UseUniversalProfiles;
var extraFunction_enableProfileSystem = window.extraFunction_enableProfileSystem;
var Profiles_ProfileList_Name;
document.addEventListener('DOMContentLoaded', function() {
    if (extraFunction_enableProfileSystem == 1){
        Profiles_Check_Session();
        document.getElementById("pageElement_Login_Screen").style.display = "grid";
    }
    
});

function Profiles_Check_Session(){
    if (sessionStorage.getItem("ABE_LoggedIn") === null) {
		console.log("Session log in key does not exist");
        console.log("User not logged in for the session");
		sessionStorage.setItem("ABE_LoggedIn", "yes");
		console.log("Added session log in key");	
    } else {
        console.log("User already logged in for the session");
        document.getElementById("pageElement_ClockScreen").style.display = "none";
    }
    
    Profiles_Check_ProfileList();
}

if (App_LocalStorage_UseUniversalProfiles == true){
    Profiles_ProfileList_Name = "ABE_Profiles";
} else {
    Profiles_ProfileList_Name = App_LocalStorage_Name + "_Profiles";
}
console.log("Profile list name is " + Profiles_ProfileList_Name);


let Profiles_InitialProfileList = ["User1"];
function Profiles_Check_ProfileList(){
    if(localStorage.getItem(Profiles_ProfileList_Name) == null){
        console.log("No profile list found; creating one...");
        window.localStorage.setItem(Profiles_ProfileList_Name,JSON.stringify(Profiles_InitialProfileList));
        console.log("Initial profile list created. Initial user name is " + Profiles_InitialProfileList[0]);
        Profiles_Generate_ProfileList();
    } else {
       Profiles_Generate_ProfileList();
    }   
}

let Profiles_ProfileList = [];

function Profiles_Generate_ProfileList(){
    Profiles_ProfileList = JSON.parse(localStorage.getItem(Profiles_ProfileList_Name));;
    console.log("Length " + Profiles_ProfileList.length);
    for (a = 0; a != Profiles_ProfileList.length; a++){
        var Profiles_Generated_ProfileList_Div = document.createElement("div");
        Profiles_Generated_ProfileList_Div.setAttribute("id", "LoginScreen_ProfileList_Item_" + a);
        Profiles_Generated_ProfileList_Div.setAttribute("onclick", "LoginScreen_SwitchToPage('Authentication'), Profiles_LogIn_SelectUser(this.dataset.id)");
        Profiles_Generated_ProfileList_Div.setAttribute("data-id", Profiles_ProfileList[a]);
        Profiles_Generated_ProfileList_Div.classList.add("LoginScreen_Main_ProfileSelector_List_Item");
        document.getElementById("pageElement_Login_ProfileList").appendChild(Profiles_Generated_ProfileList_Div);

        Profiles_Generated_ProfileList_Icon = document.createElement("img");
        Profiles_Generated_ProfileList_Icon.setAttribute("src", "Assets/Profile_Pictures/default1.png");
        Profiles_Generated_ProfileList_Icon.classList.add("LoginScreen_Main_ProfileSelector_List_Item_Icon");
        document.getElementById("LoginScreen_ProfileList_Item_" + a).appendChild(Profiles_Generated_ProfileList_Icon);

        Profiles_Generated_ProfileList_Name = document.createElement("h3");
        Profiles_Generated_ProfileList_Name.innerHTML = Profiles_ProfileList[a];
        Profiles_Generated_ProfileList_Name.classList.add("LoginScreen_Main_ProfileSelector_List_Item_Name");
        document.getElementById("LoginScreen_ProfileList_Item_" + a).appendChild(Profiles_Generated_ProfileList_Name);
        console.log("Created item " + a);
    }
}

function Profiles_LogIn_SelectUser(Profiles_LogIn_CurrentUser){
    console.log("User selected: " + Profiles_LogIn_CurrentUser);
    document.getElementById("LoginScreen_Main_ProfileLogin_Name").innerHTML = Profiles_LogIn_CurrentUser;
}

function LoginScreen_SwitchToPage(LoginScreen_PageToSwitch){
    switch(LoginScreen_PageToSwitch){
        case "Authentication":
            document.getElementById("pageElement_Login_Page_ProfileSelector").style.display = "none";
            document.getElementById("pageElement_Login_Page_Authentication").style.display = "grid";
            break;
        case "ProfileSelector":
            document.getElementById("pageElement_Login_Page_ProfileSelector").style.display = "grid";
            document.getElementById("pageElement_Login_Page_Authentication").style.display = "none";
            document.getElementById("LoginScreen_Main_ProfileLogin_PasswordField").value = "";
            break;
    }
}