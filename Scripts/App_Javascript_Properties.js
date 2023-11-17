/*
    App_Javascript_Properties.js
    Includes all page properties and behaviors.
*/

/* App Information */
var App_Title = "Clocker";
var App_Version_Title = "Clocker 1.0";
var App_Version_Number = "1.0";
var App_Version_ContinuityNumber = "1.0"
var App_Version_BuildNumber = 1;
var App_CopyrightTitle = "Content By ElmerF 2023";
var App_Version_ELMSUI = "1.5";
var App_Version_CompilationDate = "December 1, 2022";
var path = window.location.pathname;
var App_CurrentPageName = path.split("/").pop();
// The name used to specify the local storage key name that will be used in the program. For universal access, use ABE_
var App_LocalStorage_Name = "Template";
// Specifies whether the program will use its own profile list or use the universal one
var App_LocalStorage_UseUniversalProfiles = true;

/* Navigation List */
let Startup_NavigationList_Array_Titles = ["Home"]; //Launcher navigation text
let Startup_NavigationList_Array_Links = ["CL_Main.html"]; //Launcher navigation links
let Startup_NavigationList_Array_Icons = ["favicon_old.png"];


/* App Default Page Properties */
var pageProperty_MenuName = "Doodle Launcher"; // Refers to the name displayed on the main menu
var pageProperty_PageTitle = "Home"; // Refers to the page name to be displayed
var pageProperty_enableGreetings = 0; // Refers to whether the greeting text is to be updated or not
var pageProperty_enableSidebar = 1; // Refers to whether the sidebar and sidebar toggle will be used
var pageProperty_enableCategoryLabelIcons = 0; // Refers to whether the icons besides category tabs should appear
var pageProperty_lockSidebar = 0; // Refers to whether the sidebar will have a contracted and expanded state or a closed and open-fixed-size state
var pageProperty_enableStatusBar = 1; // Refers to whether the status bar at the right side of the header will be shown
var pageProperty_enableClockScreen = 0; // Refers to whether the session screen should appear
var pageProperty_useSettingsSystem = 0; // Refers to whether the page will use the personalized settings system. Disabling will set all properties to default and :root values
var pageProperty_sidebarExpandedWidth = 250; // Refers to the width of the sidebar when expanded. Requires pageProperty_enableStatusBar = 1
var pageProperty_sidebarCompactedWidth = 50; // Refers to the width of the sidebar when compacted. Requires pageProperty_enableStatusBar = 1
var pageProperty_backgroundState = 0; // Refers to the state of the background for the page. 0 = Solid color, BGColor-General value will be used; 1 = Wallpaper, BG-WallpaperImg will be used; 2 = Wallpaper is shown with blur effect, BG-WallpaperImg, BGColor-Opacitated, and Element-BackdropBlur will be used
var pageProperty_enableCategoryNavigation = 0; // Refers to whether the page uses the category navigation system to generate the sidebar links
var pageProperty_pageIcon = "placeholder.png"; // Refers to the icon that will be displayed on the header, favicon, and loading screen
var pageProperty_enableLoadingScreen = 1; // Refers whether the loading screen will be displayed
var pageProperty_mainContentWidth = 100; // Refers to the width (in %) of the main content div (.Page_MainContent). The value sets to 100% when the window size is set to small.
var pageProperty_enableHeader = 1; // Refers to whether the header will be displayed in the page
var pageProperty_sidebarMoveContent = 1; // Refers to whether the main content moves when the sidebar is opened
var pageProperty_enableQuickSearch = 0; // Refers to whether to display the quick search bar when Ctrl + Shift is pressed.
var pageProperty_quickSearch_addTopPadding = 1; // Refers to whether the quick search bar will have a top padding to give space to the Header element. If pageProperty_enableHeader is set to 0, this property is set to 0.
var pageProperty_sidebar_UsesTabs = 0; // Refers to whether the page uses the tabs system or only uses it for hyperlinks/lists
var pageProperty_hideFooter = 1; // Refers to whether to hide the footer (it's buggy af)
var pageProperty_enableRibbon = 0; // Refers to whether the page should have a ribbon bar below the header
var pageProperty_enableFullContainerMode = 1; // Refers to whether the content container and main content container will take the entire window space or not. Use this for programs that don't needs the margins
var pageProperty_header_UsesTitles = 1; // Refers to whether to add the title element in the header which can be modified.


/* Extra Functions */
/* Extra functions are stored in App_Javascript_Extras.js
If a setting enables an extra function but is disabled here, it will not run the function regardless.
If disabled, texts and icons related to the function will be hidden from view. */
var extraFunction_enableClock = 0; // Refers to whether to enable the clock functionality
var extraFunction_enableBatteryPercentage = 0; // Refers to whether to enable the battery percentage functionality
var extraFunction_networkChecker = 0; // Refers to whether to enable the network connectivity checking functionality
var extraFunction_enableProfileSystem = 0; // Refers to whether to enable the profile system.

/* User dependent behaviors */
/* Behavior settings. This is still incomplete so the values are static for the meantime */
Behavior_DisplayToasts = true;

document.addEventListener('DOMContentLoaded', function() {
    Startup_Check_Session();
});

function Startup_Check_Session(){
    if (sessionStorage.getItem("DL2_UserOpened") === null) {
		console.log("Session key does not exist");
		sessionStorage.setItem("DL2_UserOpened", "yes");
		console.log("Added session key");
		if (pageProperty_enableClockScreen == 1){
			document.getElementById("pageElement_ClockScreen").style.display = "block";
		} else {
			document.getElementById("pageElement_ClockScreen").style.display = "none";
		}		
    } else {
        document.getElementById("pageElement_ClockScreen").style.display = "none";
    }
	Startup_Load_Properties();
	Extras_Startup();
}

function Startup_Load_Properties(){
    console.log(App_Title + " (" + App_Version_Title + ") ");
    console.log(App_Version_Number + " (" + App_Version_ContinuityNumber + ", Build " + App_Version_BuildNumber + ") ");
    console.log(App_CopyrightTitle);
    switch(App_CurrentPageName){
        case "App_Template_V1.html":
            pageProperty_pageIcon = "ContentByElmerF.png";
            pageProperty_MenuName = "Doodle Launcher";
            pageProperty_PageTitle = "Template";
            pageProperty_enableGreetings = 1;
            pageProperty_enableSidebar = 1;
            pageProperty_enableCategoryLabelIcons = 0;
            pageProperty_lockSidebar = 1;
            pageProperty_enableStatusBar = 1;
            pageProperty_useProfileSystem = 0;
            pageProperty_sidebarExpandedWidth = 300;
            pageProperty_backgroundState = 1;
            pageProperty_enableClockScreen = 0;
            pageProperty_enableCategoryNavigation = 0;
            pageProperty_enableLoadingScreen = 1;
            pageProperty_enableHeader = 1;
            pageProperty_sidebarMoveContent = 0;
            pageProperty_enableQuickSearch = 1;
            pageProperty_quickSearch_addTopPadding = 1;
            pageProperty_sidebar_UsesTabs = 1;
			pageProperty_enableRibbon = 1;
			pageProperty_enableFullContainerMode = 0;
        break;
		case "CL_Main.html":
            pageProperty_pageIcon = "ContentByElmerF.png";
            pageProperty_MenuName = "Clocker";
            pageProperty_PageTitle = "Clocker";
            pageProperty_enableGreetings = 0;
            pageProperty_enableSidebar = 1;
            pageProperty_enableCategoryLabelIcons = 0;
            pageProperty_lockSidebar = 0;
            pageProperty_enableStatusBar = 0;
            pageProperty_useProfileSystem = 0;
            pageProperty_sidebarExpandedWidth = 300;
            pageProperty_backgroundState = 1;
            pageProperty_enableClockScreen = 0;
            pageProperty_enableCategoryNavigation = 0;
            pageProperty_enableLoadingScreen = 1;
            pageProperty_enableHeader = 1;
            pageProperty_sidebarMoveContent = 0;
            pageProperty_enableQuickSearch = 1;
            pageProperty_quickSearch_addTopPadding = 1;
            pageProperty_sidebar_UsesTabs = 1;
			pageProperty_enableRibbon = 0;
			pageProperty_enableFullContainerMode = 0;
        break;
    }
    Startup_Set_Properties();
}

function Startup_Set_Properties(){
    if (pageProperty_hideFooter == 1){
		document.querySelectorAll(".Page_Footer")[0].style.display = "none";
	}
	if (pageProperty_enableLoadingScreen == 1){
		document.getElementById("pageElement_LoadingScreen").style.display = "grid";
	}
	
	if (pageProperty_enableHeader == 0){
		document.getElementById("pageElement_Header").style.display = "none";
		document.getElementById("pageElement_Content").style.marginTop = "0px";
		document.getElementById("pageElement_Content").style.height = "100%";
		pageProperty_enableSidebar = 0;
		pageProperty_quickSearch_addTopPadding = 0;
		console.log("pageProperty_enableHeader is disabled; pageProperty_enableSidebar is disabled; pageProperty_quickSearch_addTopPadding is disabled");
	}
	
	if (pageProperty_quickSearch_addTopPadding == 0){
		document.getElementById("pageElement_Toggleable_SearchBar").style.top = "0px";
	}
	
	var SetPageProperties_Header_SidebarToggleValue = "50px";
	var SetPageProperties_Header_StatusBarValue = "auto";
	var SetPageProperties_Header_Value;
	if (pageProperty_enableSidebar == 0){
		document.getElementById("pageElement_Header_SidebarToggle").style.visibility = "hidden";
		document.getElementById("pageElement_Sidebar").style.display = "none";
		console.log("pageProperty_enableSidebar is disabled");
		document.getElementById("pageElement_Content").style.marginLeft = "0px";
		document.getElementById("pageElement_Content").style.marginLeft = "0px";
		
		
		SetPageProperties_Header_SidebarToggleValue = "0px";
		document.getElementById("pageElement_Content").style.gridTemplateColumns = "0px 1fr";
		console.log("Sidebar is disabled");
	}
	
	if (pageProperty_lockSidebar == 1){
		document.getElementById("pageElement_Sidebar").style.width = "0px";
		document.getElementById("pageElement_Content").style.marginLeft = "0px"
		console.log("Sidebar is locked");
	}
	if (pageProperty_enableStatusBar == 0){
		SetPageProperties_Header_StatusBarValue = "0px";
		document.getElementById("pageElement_Header_StatusTray").style.display = "none";
		console.log("pageProperty_enableStatusBar is disabled");
	}

	if (extraFunction_enableClock == 0 && (extraFunction_enableBatteryPercentage == 0 && extraFunction_networkChecker == 0)){
		SetPageProperties_Header_StatusBarValue = "0px";
		document.getElementById("pageElement_Header_StatusTray").style.display = "none";
	}

	if(extraFunction_enableClock == 1 || (extraFunction_enableBatteryPercentage == 1 || extraFunction_networkChecker == 1)){
		SetPageProperties_Header_StatusBarValue = "0px";
		document.getElementById("pageElement_Header_StatusTray").style.display = "grid";
	}

	SetPageProperties_Header_Value = SetPageProperties_Header_SidebarToggleValue + " auto 1fr "+SetPageProperties_Header_StatusBarValue;
	document.getElementById("pageElement_Header").style.gridTemplateColumns = SetPageProperties_Header_Value;
	
	if (pageProperty_enableHeader == 0){
		document.getElementById("pageElement_Header").style.display = "none";
		document.getElementById("pageElement_Content").style.marginTop = "0px";
		pageProperty_enableSidebar = 0;
	}
	
	if (pageProperty_useProfileSystem == 0){
		document.getElementById("pageElement_Header_MainMenu_ProfileButton").style.display = "none";
		console.log("pageProperty_useProfileSystem is disabled");
	}
	
	if (pageProperty_backgroundState == 0){
		var stylesheet = document.querySelector('.MainPage');
		stylesheet.style.setProperty("background-image", "none");
		var stylesheet2 = document.querySelector(':root');
		stylesheet2.style.setProperty("--BG-WallpaperImg", "none");
	}
	if (pageProperty_backgroundState == 2){
		document.getElementById("pageElement_BlurBG").style.display = "block";
		console.log("pageProperty_backgroundState has been set to background blur");
	}
	
	document.getElementById("pageElement_Header_MainMenu_Textbox_Content_PageName").innerHTML = pageProperty_MenuName;
	
	document.getElementById("Header_PageNavi_Title").innerHTML = pageProperty_PageTitle;
	document.getElementById("Header_MainMenu_PageName_Text").innerHTML = pageProperty_PageTitle;
	
	if (pageProperty_useSettingsSystem == 1){
		Settings_LoadAppearance();
	}
	
	document.getElementById("pageElement_favicon").setAttribute("href", "Assets/Icons/"+pageProperty_pageIcon);
	document.getElementById("Header_PageIcon").src = "Assets/Icons/"+pageProperty_pageIcon;
	document.getElementById("Header_MainMenu_PageName_Icon").src = "Assets/Icons/"+pageProperty_pageIcon;
	document.getElementById("LoadingScreen_Icon").src = "Assets/Icons/"+pageProperty_pageIcon;
	
	document.getElementById("Page_MainContent").style.width = pageProperty_mainContentWidth + "%";
	
	if (pageProperty_enableSidebar == 1){
		if (pageProperty_sidebar_UsesTabs == 1){
			Tab_Items = document.querySelectorAll('.Sidebar_Item');
			Tab_Items_IDArray = [];
			for (a = 0; a != Tab_Items.length; a++){
				Tab_Items_IDArray.push(Tab_Items[a].id);
			}
			Tabs_DisplayFirstPage();
		}
	}
	
	/*if (pageProperty_resizer_ChangeContentMargin == 0){
		document.getElementById("Page_MainContent").style.marginLeft = "0%";
		document.getElementById("Page_MainContent").style.marginRight = "0%";
	}*/
	if (pageProperty_enableFullContainerMode == 1){
		console.log("Full container mode enabled");
		document.getElementById("pageElement_Content").dataId = "UI_Ignore_RD";
		document.getElementById("Page_MainContent").dataId = "UI_Ignore_RD";

		document.getElementById("pageElement_Content").style.width = "100%";
		document.getElementById("pageElement_Content").style.margin = "0";
		document.getElementById("pageElement_Content").style.marginTop = "50px";
		document.getElementById("Page_MainContent").style.width = "100%";
		document.getElementById("Page_MainContent").style.margin = "0";

		if (pageProperty_enableSidebar == 1){
			document.getElementById("pageElement_Content").style.width = "calc(100% - 50px)";
			document.getElementById("pageElement_Content").style.marginLeft = "50px";
			document.getElementById("pageElement_Content").style.marginTop = "50px";
		}
		
	}

	if (pageProperty_enableRibbon == 1){
		document.getElementById("pageElement_Content").style.height = "calc(100% - 80px)";
		document.getElementById("pageElement_Content").style.marginTop = "85px";
		document.getElementById("pageElement_Ribbon").style.display = "flex";
		if (pageProperty_lockSidebar == 1){
			document.getElementById("pageElement_Ribbon").style.marginLeft = "0px";
			document.getElementById("pageElement_Ribbon").style.width = "100%";
		}
	} else {
		document.getElementById("pageElement_Content").style.height = "calc(100% - 50px)";
		document.getElementById("pageElement_Content").style.marginTop = "50px";
	}

	if(pageProperty_header_UsesTitles == 1){
		document.getElementById("pageElement_Header_Title").style.display = "block";
	}

	console.log("Page properties has been set successfully");
	RD_Check_WindowSize();
	// start_Animations();
	Startup_Set_VersionInfo();
	
	/*if (enable_Dev_Counter == true){
		dev_update_RefreshNumber();
	}*/
    Startup_Set_ExtraFunctions();
    Startup_Generate_Header_Buttons();
    Startup_Generate_Menu_NavigationList();
	Startup_PlayAnimations();
}

function Startup_Set_ExtraFunctions(){
	if (extraFunction_enableClock == 1){
		Clock_Start_Time();
		Clock_Start_Date();
	} else {
		document.getElementById("Clock_Time").style.display = "none";
		document.getElementById("Clock_Date").style.display = "none";
		document.getElementById("StatusMenu_Clock").style.display = "none";
		document.getElementById("StatusMenu_Clock_Time").style.display = "none";
		document.getElementById("StatusMenu_Clock_Date_2").style.display = "none";
		document.getElementById("Clock_Time_ClockScreen").style.display = "none";
		document.getElementById("Clock_Date_ClockScreen").style.display = "none";
	}

	if (extraFunction_enableBatteryPercentage == 1){
		Battery_Start();
	} else {
		document.getElementById("pageElement_Header_Battery").style.display = "none";
		document.getElementById("StatusMenu_Battery").style.display = "none";
	}

	if (extraFunction_networkChecker == 1){

	} else {
		document.getElementById("pageElement_Header_RightMenu").style.display = "none";
		document.getElementById("StatusMenu_Internet").style.display = "none";
	}
}

function Startup_Set_VersionInfo(){
	document.getElementById("LoadingScreen_Splash_App_Title").innerHTML = App_Title;
	document.getElementById("LoadingScreen_Splash_App_Version").innerHTML = App_Version_Number;
    document.getElementById("versionTitle").innerHTML = App_Version_Title;
	document.getElementById("copyrightTitle").innerHTML = App_CopyrightTitle;
	document.getElementById("pageElement_ClockScreen_Copyright").innerHTML = App_Version_Title+" | "+App_CopyrightTitle;
	document.getElementById("pageElement_Footer_VersionTitle").innerHTML = App_Version_Title;
	document.getElementById("pageElement_Footer_Copyright").innerHTML = App_CopyrightTitle;
	document.getElementById("pageElement_PageTitle").innerHTML = App_Version_Title + " - " + App_Version_Title;
	
	// Set loading screen elements visible
	if (pageProperty_enableLoadingScreen == 1){
		document.getElementById("LoadingScreen_UpperSection").style.animationName = "open_LoadingScreen_Elements";
		document.getElementById("LoadingScreen_UpperSection").style.animationDuration = "0.5s";
		document.getElementById("LoadingScreen_UpperSection").style.animationFillMode = "forwards";
		document.getElementById("LoadingScreen_Splash").style.animationName = "open_LoadingScreen_Elements";
		document.getElementById("LoadingScreen_Splash").style.animationDuration = "0.5s";
		document.getElementById("LoadingScreen_Splash").style.animationFillMode = "forwards";
		document.getElementById("LoadingScreen_CopyrightSection").style.animationName = "open_LoadingScreen_Elements";
		document.getElementById("LoadingScreen_CopyrightSection").style.animationDuration = "0.5s";
		document.getElementById("LoadingScreen_CopyrightSection").style.animationFillMode = "forwards";
	}
	LoadingScreen_Close();
}

function Startup_Generate_Menu_NavigationList(){
	
	for (var i = 0; i < Startup_NavigationList_Array_Titles.length; i++) {
		var Startup_NavigationList_Array_Titles_Select = Startup_NavigationList_Array_Titles[i]; //Contains the selected pagenavi text
		var Startup_NavigationList_Array_Links_Select = Startup_NavigationList_Array_Links[i]; //Contains the selected pagenavi link
		
		//Attaches to the page
		var listItemLink = document.createElement('a'); //Creates an a element
		listItemLink.href = Startup_NavigationList_Array_Links_Select; //Adds the link
		listItemLink.setAttribute("id", "pageElement_PageNaviList_Item_"+i); //Adds an id to attach the text
		document.getElementById("pageElement_MainMenu_NavigationList").appendChild(listItemLink); //Attaches the a element to the page navi element
		
		var listItemLink_Div = document.createElement('div');
		listItemLink_Div.classList.add("Header_MainMenu_Navigation_Item");
		listItemLink_Div.setAttribute("id", "pageElement_PageNaviList_Item_Div_"+i);
		document.getElementById("pageElement_PageNaviList_Item_"+i).appendChild(listItemLink_Div);
		
		listItemLink_Icon = document.createElement('img');
		listItemLink_Icon.src = "Assets/Icons/"+ Startup_NavigationList_Array_Icons[i];
		listItemLink_Icon.classList.add("Header_MainMenu_Navigation_Item_Icon");
		document.getElementById("pageElement_PageNaviList_Item_Div_"+i).appendChild(listItemLink_Icon);
		
		var listItemLink_Text = document.createElement('p'); //Creates a text p element
		listItemLink_Text.innerHTML = Startup_NavigationList_Array_Titles_Select; //Sets text to selected page navi text
		listItemLink_Text.classList.add("Header_MainMenu_Navigation_Item_Text"); //Adds the styling to the object
		document.getElementById("pageElement_PageNaviList_Item_Div_"+i).appendChild(listItemLink_Text); //Attaches object to the a object
	}
	
	
}

function Startup_Generate_Header_Buttons(pageName){
	let Generator_HeaderButtons_Text = [];
	let Generator_HeaderButtons_Icon = [];
	let Generator_HeaderButtons_ID = [];
	let Generator_HeaderButtons_OnclickAction = [];
	switch (pageName){
		case "CL_Main.html":
			Generator_HeaderButtons_Text = ["Save settings"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/placeholder.png"];
			Generator_HeaderButtons_ID = [""];
			Generator_HeaderButtons_OnclickAction = ["CL_Settings_Save_Settings()"];
			var Generator_DisplayInHeader = false;
		break;
		case "DL_Main.html":
			Generator_HeaderButtons_Text = ["Internet search"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/placeholder.png"];
			Generator_HeaderButtons_ID = [""];
			Generator_HeaderButtons_OnclickAction = ["toggle_SearchBar()"];
			var Generator_DisplayInHeader = false;
		break;
		case "DL_ShortcutEditor.html":
			Generator_HeaderButtons_Text = ["Add Item"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/icon_add.png"];
			Generator_HeaderButtons_ID = ["AddItem"];
			Generator_HeaderButtons_OnclickAction = ["open_Subwindow('AddItem')"];
			var Generator_DisplayInHeader = true;
		break;
		case "DL_Settings.html":
			Generator_HeaderButtons_Text = ["Save changes"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/iconNew_save.png"];
			Generator_HeaderButtons_ID = [""];
			Generator_HeaderButtons_OnclickAction = ["Settings_ApplyChanges()"];
			var Generator_DisplayInHeader = true;
		break;
		case "DL_Settings_Dev.html":
			Generator_HeaderButtons_Text = ["Save changes"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/iconNew_save.png"];
			Generator_HeaderButtons_ID = [""];
			Generator_HeaderButtons_OnclickAction = ["Settings_ApplyChanges()"];
			var Generator_DisplayInHeader = true;
		break;
		case "WA_Main.html":
			Generator_HeaderButtons_Text = ["Take Screenshot",  "Change Image", "Change Watermark", "Reset"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/Watermark_Applier/Camera.png",  "Assets/Icons/Watermark_Applier/Image.png", "Assets/Icons/Watermark_Applier/Overlay.png", "Assets/Icons/placeholder.png"];
			Generator_HeaderButtons_ID = ["", "", "", "", "", ""];
			Generator_HeaderButtons_OnclickAction = ["generateImage()", "open_Subwindow('ChangeImageFile')", "open_Subwindow('ChangeWatermarkFile')", "WA_Reset()"];
			var Generator_DisplayInHeader = true;
		break;
	}
	
	for (a = 0; a != Generator_HeaderButtons_ID.length; a++){
		if (Generator_HeaderButtons_ID[a] == ""){
			Generator_HeaderButtons_ID[a] = "Header_Button_NoSpecifiedID_"+a;
		}
	}
	
	if(Generator_DisplayInHeader == true){
		for (a = 0; a != Generator_HeaderButtons_Text.length; a++){
			//Attaches to the page
			var listItemLink_Div = document.createElement('div');
			listItemLink_Div.classList.add("Header_Content_Button");
			listItemLink_Div.setAttribute("id", Generator_HeaderButtons_ID[a]);
			listItemLink_Div.setAttribute("onclick", Generator_HeaderButtons_OnclickAction[a]);
			document.getElementById("pageElement_Header_Actions").appendChild(listItemLink_Div);
			
			listItemLink_Icon = document.createElement('img');
			listItemLink_Icon.src = Generator_HeaderButtons_Icon[a];
			listItemLink_Icon.classList.add("Header_Content_Button_Icon");
			document.getElementById(Generator_HeaderButtons_ID[a]).appendChild(listItemLink_Icon);
			
			var listItemLink_Text = document.createElement('h3'); //Creates a text p element
			listItemLink_Text.innerHTML = Generator_HeaderButtons_Text[a]; //Sets text to selected page navi text
			listItemLink_Text.classList.add("Header_Content_Button_Text"); //Adds the styling to the object
			document.getElementById(Generator_HeaderButtons_ID[a]).appendChild(listItemLink_Text); //Attaches object to the a object
		}
	}
	
	for (i = 0; i != Generator_HeaderButtons_Text.length; i++){		
		//Attaches to the page
		var listItemLink_Div = document.createElement('div');
		listItemLink_Div.classList.add("Header_MainMenu_Navigation_Item");
		listItemLink_Div.setAttribute("id", "pageElement_PageActionsList_Item_Div_"+i);
		listItemLink_Div.setAttribute("onclick", Generator_HeaderButtons_OnclickAction[i]);
		document.getElementById("pageElement_PageActionsList").appendChild(listItemLink_Div);
		
		listItemLink_Icon = document.createElement('img');
		listItemLink_Icon.src = Generator_HeaderButtons_Icon[i];
		listItemLink_Icon.classList.add("Header_MainMenu_Navigation_Item_Icon");
		document.getElementById("pageElement_PageActionsList_Item_Div_"+i).appendChild(listItemLink_Icon);
		
		var listItemLink_Text = document.createElement('p'); //Creates a text p element
		listItemLink_Text.innerHTML = Generator_HeaderButtons_Text[i]; //Sets text to selected page navi text
		listItemLink_Text.classList.add("Header_MainMenu_Navigation_Item_Text"); //Adds the styling to the object
		document.getElementById("pageElement_PageActionsList_Item_Div_"+i).appendChild(listItemLink_Text); //Attaches object to the a object
	}
	
}

function Startup_PlayAnimations(){
	var Sidebar_Items = document.querySelectorAll(".Sidebar_Item");
	for (a = 0; a < Sidebar_Items.length; a++){
		Sidebar_Items_Select = Sidebar_Items[a];
		Sidebar_Items_Select.style.transform = "translateX(-100%)";
		Sidebar_Items_Select.style.animationName = "opening_SidebarItems";
		Sidebar_Items_Select.style.animationDuration = "0.5s";
		Sidebar_Items_Select.style.animationDelay = 0.1 + (a / 30) + "s";
		Sidebar_Items_Select.style.animationFillMode = "forwards";
	}
	var Shortcut_Items = document.querySelectorAll(".Shortcut_Item");
	for (b = 0; b != Shortcut_Items.length; b++){
		Shortcut_Items_Select = Shortcut_Items[b];
		Shortcut_Items_Select.style.display = "block";
		Shortcut_Items_Select.style.opacity = "0%";
		Shortcut_Items_Select.style.animationName = "opening_ShortcutItems";
		Shortcut_Items_Select.style.animationDuration = "0.5s";
		Shortcut_Items_Select.style.animationFillMode = "forwards";
	}
	var Header_Items = document.querySelectorAll(".Header_Content_Button");
	for (c = 0; c != Header_Items.length; c++){
		Header_Items_Select = Header_Items[c];
		Header_Items_Select.style.transform = "translateY(-100%)";
		Header_Items_Select.style.animationName = "opening_HeaderButtons";
		Header_Items_Select.style.animationDuration = "0.5s";
		Header_Items_Select.style.animationDelay = 0.1 + (c / 30) + "s";
		Header_Items_Select.style.animationFillMode = "forwards";
	}
}

window.onerror = function(){
	document.getElementsByClassName(".LoadingScreen_Splash_Title_Loader_Loader").style.backgroundColor = "red";
};