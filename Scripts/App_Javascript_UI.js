/*
    App_Javascript_UI.js
    Includes all functions that is used for the ELMSUI system
*/

/* Get variables from other files */
var App_CurrentPageName = window.App_CurrentPageName;
var pageProperty_enableSidebar = window.pageProperty_enableSidebar;
var pageProperty_lockSidebar = window.pageProperty_lockSidebar;
var pageProperty_sidebarExpandedWidth = window.pageProperty_sidebarExpandedWidth;
var pageProperty_sidebarMoveContent = window.pageProperty_sidebarMoveContent;
var pageProperty_enableRibbon = window.pageProperty_enableRibbon;
var pageProperty_enableFullContainerMode = window.pageProperty_enableFullContainerMode;
var pageProperty_header_UsesTitles = window.pageProperty_header_UsesTitles;
var Behavior_DisplayToasts = window.Behavior_DisplayToasts;

/* Backwards Compatibility */
trigger_toggle_Textbox =  function(ID){
    Textboxes_Toggle(ID);
}

toggle_Sidebar = function(){
    Sidebar_Toggle();
}

trigger_toggleDropdown = function(ID){
	Dropdown_Toggle(ID);
}

trigger_dropdownItemSelected = function(ID, text){
	Dropdown_ItemSelected(ID,text);
}

open_Subwindow = function(ID){
	Subwindows_Open(ID);
}

close_Subwindow = function(ID){
	Subwindows_Close(ID);
}

toggle_Button = function(ID){
	Buttons_Toggle(ID);
}

trigger_ChangeTab_test = function(ID){
	Tabs_ChangeTab(ID);
}

trigger_ChangeTab_Keyboard = function(Direction){
	Tabs_ChangeTab_Keyboard(Direction);
}

toggle_Category = function(catID){
	Categories_Toggle(catID);
}

trigger_createToast = function(type){
	Toast_CreateToast_Legacy(type);
}

trigger_closeToast = function(id){
	Toast_Close(id)
}

// Sample implementation: Toast_CreateToast("Assets/Icons/icon_linkAdded.png", "I am success", "Successful toast");
function Toast_CreateToast(Toast_IconLink, Toast_Title, Toast_Subtitle){
	if (Behavior_DisplayToasts == true){
		var toast_Div = document.createElement('div');
		toast_Div.classList.add("ToastNotif_Toast");
		toast_Div.setAttribute("id", "toast_Div_"+toast_Count);
		toast_Div.setAttribute("onclick", "trigger_closeToast(this.id)");
		toast_Div.style.transform = "translateX(-100%)";
		toast_Div.style.animationName = "opening_ToastNotif";
		toast_Div.style.animationDuration = "0.3s";
		toast_Div.style.animationFillMode = "forwards";
		setTimeout(function(){
			toast_Div.style.animationName = "closing_ToastNotif";
			toast_Div.style.animationDuration = "0.3s";
			toast_Div.style.animationFillMode = "forwards";
			setTimeout(function(){
				toast_Div.style.display = "none";
			}, 300);
		}, 3000);
		var toast_Icon = document.createElement('img');
		toast_Icon.classList.add("ToastNotif_Toast_Icon");
		toast_Icon.setAttribute("id", "toast_Icon_"+toast_Count);
		document.getElementById("pageElement_ToastDrawer").appendChild(toast_Div);
		
		var toast_Title = document.createElement('h1');
		toast_Title.classList.add("ToastNotif_Toast_Title");
		
		var toast_Subtitle = document.createElement('p');
		toast_Subtitle.classList.add("ToastNotif_Toast_URL");

		toast_Icon.setAttribute("src", Toast_IconLink);
		toast_Title.innerHTML = Toast_Title;
		toast_Subtitle.innerHTML = Toast_Subtitle;

		document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Icon);
		document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Title);
		document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Subtitle);
		toast_Count++;
	}
}

var toast_Count = 1;
function Toast_CreateToast_Legacy(type){
	/* if (document.getElementById("button_PageNavi_textbox").style.display == "block"){
		document.getElementById("pageElement_ToastDrawer").style.paddingTop = "400px";
		} else {
		document.getElementById("pageElement_ToastDrawer").style.paddingTop = "75px";
	} */
	if (Behavior_DisplayToasts == true){
		var toast_Div = document.createElement('div');
		toast_Div.classList.add("ToastNotif_Toast");
		toast_Div.setAttribute("id", "toast_Div_"+toast_Count);
		toast_Div.setAttribute("onclick", "trigger_closeToast(this.id)");
		toast_Div.style.transform = "translateX(-100%)";
		toast_Div.style.animationName = "opening_ToastNotif";
		toast_Div.style.animationDuration = "0.3s";
		toast_Div.style.animationFillMode = "forwards";
		setTimeout(function(){
			toast_Div.style.animationName = "closing_ToastNotif";
			toast_Div.style.animationDuration = "0.3s";
			toast_Div.style.animationFillMode = "forwards";
			setTimeout(function(){
				toast_Div.style.display = "none";
			}, 300);
		}, 3000);
		var toast_Icon = document.createElement('img');
		toast_Icon.classList.add("ToastNotif_Toast_Icon");
		toast_Icon.setAttribute("id", "toast_Icon_"+toast_Count);
		document.getElementById("pageElement_ToastDrawer").appendChild(toast_Div);
		
		var toast_Title = document.createElement('h1');
		toast_Title.classList.add("ToastNotif_Toast_Title");
		
		var toast_Subtitle = document.createElement('p');
		toast_Subtitle.classList.add("ToastNotif_Toast_URL");
		switch(type){
			case "success":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_linkAdded.png");
			toast_Title.innerHTML = "I am success";
			toast_Subtitle.innerHTML = "LMAO its SuccessToastYT he's roasty toasty who would've thought it would make the news papers LMAO LOL FR FR TBH";
			break;
			case "failed":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_linkError.png");
			toast_Title.innerHTML = "Fail :(";
			toast_Subtitle.innerHTML = "uncooked toast";
			break;
			case "SE_FormNotFilled": //When not all of the required fields are filled
			toast_Icon.setAttribute("src", "Assets/Icons/icon_linkError.png");
			toast_Title.innerHTML = "Item not added";
			toast_Subtitle.innerHTML = "Make sure that you've filled all of the required fields";
			break;
			case "SE_CategoryCreated": //When a category in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_linkAdded.png");
			toast_Title.innerHTML = "Category added";
			toast_Subtitle.innerHTML = "Category named '"+SE_CreateItem_categoryTitle+"' has been created.";
			break;
			case "SE_ShortcutCreated": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_linkAdded.png");
			toast_Title.innerHTML = "Shortcut added";
			toast_Subtitle.innerHTML = "Shortcut named '"+SE_CreateItem_ShortcutText+"' with a URL of '"+SE_CreateItem_ShortcutURL+"' has been created.";
			break;
			case "Settings_FileNotFound": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_error.png");
			toast_Title.innerHTML = "Error";
			toast_Subtitle.innerHTML = "We couldn't find the file you're referring to. Double check the file name, type, and make sure it is in the Assets/Background folder.";
			break;
			case "Settings_SaveSuccess": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_check.png");
			toast_Title.innerHTML = "Settings saved";
			toast_Subtitle.innerHTML = "Settings have been successfully saved and applied.";
			break;
			case "ShortcutEditor_ListUpdated": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_check.png");
			toast_Title.innerHTML = "List updated";
			toast_Subtitle.innerHTML = "Changes had been saved.";
			break;
			case "ShortcutEditor_CopiedToClipboard": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_changelog.png");
			toast_Title.innerHTML = "Copied!";
			toast_Subtitle.innerHTML = "Text has been copied to the clipboard.";
			break;
			case "SearchBar_NoQuery": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_Search.png");
			toast_Title.innerHTML = "Search not made";
			toast_Subtitle.innerHTML = "Type something in the search bar to do the search.";
			break;
			case "Presets_Set": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_check.png");
			toast_Title.innerHTML = "Preset applied";
			toast_Subtitle.innerHTML = "The selected preset has been successfully applied to the values table. Click 'Save Settings' to save changes.";
			break;
			case "Settings_FormEmpty": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_error.png");
			toast_Title.innerHTML = "Error";
			toast_Subtitle.innerHTML = "The input box required is empty.";
			break;
			case "LaunchCategory_Before":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_others.png");
			toast_Title.innerHTML = "Launching...";
			toast_Subtitle.innerHTML = "Your shortcuts should be opening on their new tabs now.";
			break;
			case "LaunchCategory_After":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_others.png");
			toast_Title.innerHTML = "Shortcuts launched";
			toast_Subtitle.innerHTML = "All shortcuts from the category has been opened.";
			break;
			case "ShortcutEditor_InvalidCharacter": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_error.png");
			toast_Title.innerHTML = "Error";
			toast_Subtitle.innerHTML = "The character ';' is not accepted.";
			break;
			case "NotImplemented": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/favicon.png");
			toast_Title.innerHTML = "Not available";
			toast_Subtitle.innerHTML = "This feature is not implemented properly yet.";
			break;
			case "WA_ProcessingImage": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_schedules.png");
			toast_Title.innerHTML = "Processing Image...";
			toast_Subtitle.innerHTML = "Your image is being processed. Please wait...";
			break;
			case "WA_ProcessingFinished": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_check.png");
			toast_Title.innerHTML = "Processing Finished";
			toast_Subtitle.innerHTML = "The image has been processed. You can now save it.";
			break;
			case "dev_EnableCounter":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_check.png");
			toast_Title.innerHTML = "Dev Counter Enabled";
			toast_Subtitle.innerHTML = "Enabled";
			break;
			case "dev_EnableCounter":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_close.png");
			toast_Title.innerHTML = "Dev Counter Disabled";
			toast_Subtitle.innerHTML = "Disabled";
			break;
		}
		document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Icon);
		document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Title);
		document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Subtitle);
		toast_Count++;
	}
}

function Toast_Close(id){
	toast_Div = document.getElementById(id);
	toast_Div.style.animationName = "closing_ToastNotif";
	toast_Div.style.animationDuration = "0.3s";
	toast_Div.style.animationFillMode = "forwards";
	setTimeout(function(){
		toast_Div.style.display = "none";
	}, 300);
	
}



function LoadingScreen_Open(){
    var LoadingScreen_Element = document.getElementById("LoadingScreen");
    LoadingScreen_Element.style.display = "grid";
    LoadingScreen_Element.style.opacity = "100%";
	LoadingScreen_Element.style.animationName = "fadeIn";
	LoadingScreen_Element.style.animationDuration = "0.3s";
	LoadingScreen_Element.style.animationFillMode = "forwards";

}

function LoadingScreen_Close(){
    var LoadingScreen_Element = document.getElementById("pageElement_LoadingScreen");
	setTimeout(function(){
		LoadingScreen_Element.style.animationName = "fadeOut";
		LoadingScreen_Element.style.animationDuration = "0.5s";
		LoadingScreen_Element.style.animationFillMode = "forwards";
		setTimeout(function(){LoadingScreen_Element.style.display = "none";}, 500);
	}, 5000);
	
    LoadingScreen_Element.addEventListener("transitionend", function(event) {
        // Check if the event's propertyName is "opacity"
        if (event.propertyName === "opacity") {
            LoadingScreen_Element.style.display = "none";
        }
    });
}

var sessionScreenState;
function sessionCheck(){
	if (sessionStorage.getItem("DL2_UserOpened") === null) {
		console.log("Session key does not exist");
		sessionStorage.setItem("DL2_UserOpened", "yes");
		console.log("Added session key");
		sessionScreenState = "visible";
		console.log(sessionScreenState);
		
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;
		date = today;
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
		document.getElementById('pageElement_SessionScreen').style.display == "block"
		} else {
		var SessionScreen = document.getElementById("pageElement_SessionScreen");
		SessionScreen.style.display = "none";
		sessionScreenState = "invisible";
		//start_Animations();
	}
	startTime();
}

function ClockScreen_Open(){
    sessionScreenState = "visible";
	var ClockScreen_Element = document.getElementById("pageElement_ClockScreen");
	ClockScreen_Element.style.animationName = "open_SessionScreen";
	ClockScreen_Element.style.animationDuration = "0.5s";
	ClockScreen_Element.style.animationFillMode = "forwards";
	ClockScreen_Element.style.display = "block"
	setTimeout(function(){ClockScreen_Element.style.display = "block"; start_Animations();}, 500);
	
	setTimeout(function(){
		var shortcutObjects = document.querySelectorAll(".Shortcut_Item");
		for (var a = 0; a < shortcutObjects.length; a++) {
			shortcutObjects[a].style.display = "none";
		}
	}, 500);
}

function ClockScreen_Close(){
	sessionScreenState = "invisible";
	console.log(sessionScreenState);
	var ClockScreen_Element = document.getElementById("pageElement_ClockScreen");
	ClockScreen_Element.style.animationName = "close_SessionScreen";
	ClockScreen_Element.style.animationDuration = "0.3s";
	ClockScreen_Element.style.animationFillMode = "forwards";
	setTimeout(function(){ClockScreen_Element.style.display = "none"; start_Animations();}, 200);
	// start_Animations();
	
}

function Tabs_DisplayFirstPage(){
    if (document.querySelectorAll(".Tab_Container") != null){
		var Tab_Container = document.querySelectorAll(".Tab_Container");
		for (a = 1; a != Tab_Container.length; a++){
			Tab_Container[a].style.display = "none";
			
		}
		selectedTab = document.getElementById("tab_"+Tab_Items_IDArray[0]);
		closingTab = selectedTab
		var Tab_Icon = document.querySelectorAll(".Sidebar_Item_Icon");
		Tab_Icon[0].style.backgroundColor = "var(--Accent-Color)";
	}
	if (pageProperty_enableRibbon == 1){
		if (document.querySelectorAll(".Ribbon_TabContainer") != null){
			var Tab_Ribbon_Container = document.querySelectorAll(".Ribbon_TabContainer");
			for (a = 1; a != Tab_Ribbon_Container.length; a++){
				Tab_Ribbon_Container[a].style.display = "none";
				
			}
		}
	}
	if(pageProperty_header_UsesTitles == 1){
		if (document.querySelectorAll(".Sidebar_Item_Text_forHeader") != null){
			document.getElementById("pageElement_Header_Title").innerHTML = document.querySelectorAll(".Sidebar_Item_Text_forHeader")[0].innerText;
		}
	}
}

var Tab_Items = document.querySelectorAll('.Sidebar_Item');
var Tab_Items_IDArray = [];
var Tab_Items_ClickedItemIndex;
var Tab_Items_CurrentTab = 0;
var Tab_Items_Keyboard_NewTab;
function Tabs_ChangeTab_Keyboard(Direction){
	if (pageProperty_sidebar_UsesTabs == 1){
		if (Direction == "downwards"){
			Tab_Items_Keyboard_NewTab = Tab_Items_CurrentTab + 1;
			if (Tab_Items_Keyboard_NewTab > Tab_Items_IDArray.length - 1){
				Tab_Items_Keyboard_NewTab = 0;
			}
			trigger_ChangeTab_test(Tab_Items_IDArray[Tab_Items_Keyboard_NewTab]);
			} else if (Direction == "upwards"){
			Tab_Items_Keyboard_NewTab = Tab_Items_CurrentTab - 1;
			if (Tab_Items_Keyboard_NewTab < 0){
				Tab_Items_Keyboard_NewTab = Tab_Items.length - 1;
			}
			Tabs_ChangeTab(Tab_Items_IDArray[Tab_Items_Keyboard_NewTab]);
		}
	}
}

var Tabs_FirstRun_TabOpened = 0;
var closingTab;
var selectedTab;
function Tabs_ChangeTab(ID){
	Tabs_FirstRun_TabOpened = 1;
	Tab_Items = document.querySelectorAll('.Sidebar_Item');
	Tab_Items_ClickedItemIndex = Tab_Items_IDArray.indexOf(ID);
	
	
	var Tab_Container = document.querySelectorAll(".Tab_Container");
	var Sidebar_Icon = document.querySelectorAll(".Sidebar_Item_Icon");
	var Sidebar_Letters = document.querySelectorAll(".Sidebar_Item_Letter");
	/* for (a = 0; a != Tab_Container.length; a++){
		Tab_Container[a].style.display = "none";
		
	} */
	for (b = 0; b != Sidebar_Icon.length; b++){
		Sidebar_Icon[b].style.backgroundColor = null;
	}
	for (c = 0; c != Sidebar_Letters.length; c++){
		Sidebar_Letters[c].style.backgroundColor = null;
	}
	
	closingTab = document.getElementById("tab_"+Tab_Items_IDArray[Tab_Items_CurrentTab]);
	selectedTab = document.getElementById("tab_"+ID);
	selectedTab.style.display = "block";
	if (Tab_Items_CurrentTab > Tab_Items_ClickedItemIndex){ //The clicked sidebar tab is above the currently opened tab (Up animation)
		selectedTab.style.animationName = "opening_pageTab_Upwards";
		closingTab.style.animationName = "closing_pageTab_Downwards";
		Tab_Items_CurrentTab = Tab_Items_ClickedItemIndex;
		} else if (Tab_Items_CurrentTab < Tab_Items_ClickedItemIndex){ //The clicked sidebar tab is below the currently opened tab (Down animation)
		selectedTab.style.animationName = "opening_pageTab_Downwards";
		closingTab.style.animationName = "closing_pageTab_Upwards";
		Tab_Items_CurrentTab = Tab_Items_ClickedItemIndex;
	}
	// selectedTab.style.animationName = "opening_pageTab";
	closingTab.style.animationDuration = "0.3s";
	closingTab.style.animationFillMode = "forwards";
	selectedTab.style.animationDuration = "0.3s";
	selectedTab.style.animationFillMode = "forwards";
	var selectedIcon = document.getElementById("tabIcon_"+ID);
	selectedIcon.style.backgroundColor = "var(--Accent-Color)";
	closingTab.addEventListener("animationend", function(){closingTab.style.display = "none";});
	console.log("Current tab: " + ID);

	if(pageProperty_enableRibbon == 1){
		if (document.querySelectorAll(".Ribbon_TabContainer") != null){
			var Tab_Ribbon_Container = document.querySelectorAll(".Ribbon_TabContainer");
			for (a = 0; a != Tab_Ribbon_Container.length; a++){
				Tab_Ribbon_Container[a].style.display = "none";
				
			}
		}
		document.getElementById("Ribbon_" + ID).style.display = "flex";
	}

	if(pageProperty_header_UsesTitles == 1){
		if (document.getElementById("tabTitle_" + ID) != null){
			document.getElementById("pageElement_Header_Title").innerHTML = document.getElementById("tabTitle_" + ID).innerText;
		}
	}
}


function Tabs_Horizontal_ChangeTab(ID){
	var Tab_Horizontal_Selectors = document.querySelectorAll('.Tab_Horizontal_Container_Selector_Item');
	for (a = 0; a < Tab_Horizontal_Selectors.length; a++){
		Tab_Horizontal_Selectors[a].removeAttribute("data-id");
	}
	document.getElementById(ID).setAttribute("data-id", "Tab_State_Selected");

	var Tab_Horizontal_Containers = document.querySelectorAll(".Tab_Horizontal_Container_Content_Item")
	for (a = 0; a < Tab_Horizontal_Containers.length; a++){
		Tab_Horizontal_Containers[a].removeAttribute("data-id");
	}
	document.getElementById("HorizontalTab_" + ID).setAttribute("data-id", "Tab_State_Selected");
}

var windowSizePreset = "normal";
var windowDeviceType = "Desktop";
window.addEventListener('resize', RD_Check_WindowSize);
let details = navigator.userAgent;
let regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details);
function RD_Check_WindowSize(){
	var Content = document.getElementById("pageElement_Content");
	var MainContent = document.getElementById("Page_MainContent");
	var Header = document.getElementById("pageElement_Header");
	var Header_PageTitle = document.getElementById("Header_PageNavi_Title");
	var Header_Buttons = document.querySelectorAll(".Header_Content_Button");
	var Header_Buttons_Text = document.querySelectorAll(".Header_Content_Button_Text");
	var Header_StatusTray_Clock = document.getElementById("pageElement_Header_Clock");
	var Header_StatusTray_Battery = document.getElementById("pageElement_Header_Battery");
	var Sidebar = document.getElementById("pageElement_Sidebar");
	var MainMenu = document.getElementById("pageElement_Header_MainMenu_Textbox");
	var MainMenu_PageName = document.getElementById("Header_MainMenu_PageName");
	var StatusMenu = document.getElementById("pageElement_Header_StatusTray_Textbox");
	var Subwindows = document.querySelectorAll(".Subwindow");
	var Modals = document.querySelectorAll(".Modal");
	var Footer_VersionTitle = document.getElementById("pageElement_Footer_VersionTitle");
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	if (windowWidth < 750){ //Small size
		windowSizePreset = "small";
		} else { //Normal size
		windowSizePreset = "normal";
	}
	
	MainMenu.style.maxHeight = windowHeight-90 + "px";
	StatusMenu.style.maxHeight = windowHeight-90 + "px";
	
	
	// Desktop
	if(windowSizePreset == "small"){
		if (windowWidth < 400){
			for (a = 0; a < Header_Buttons.length; a++){
				Header_Buttons[a].style.display = "none";
			}
			} else {
			for (a = 0; a < Header_Buttons.length; a++){
				Header_Buttons[a].style.display = "grid";
			}
		}
		MainContent.style.width = "100%";
		/*if (pageProperty_resizer_ChangeContentMargin == 1){
			MainContent.style.marginLeft = "3%";
		}*/
		Header_PageTitle.style.display = "none";
		Header_StatusTray_Clock.style.display = "none";
		Header_StatusTray_Battery.style.display = "none";
		for (a = 0; a < Header_Buttons_Text.length; a++){
			Header_Buttons_Text[a].style.display = "none";
		}
		MainMenu.style.width = "85%";
		StatusMenu.style.width = "85%";
		StatusMenu.style.float = "left";
		StatusMenu.style.left = "20px";
		
		if (pageProperty_enableFullContainerMode == 0){
			if (pageProperty_enableSidebar == 1){
				Content.style.width = "calc(100% - 50px)";
				if (pageProperty_lockSidebar == 1){
					Content.style.width = "100%";
				}
				} else {
				Content.style.width = "100%";
				
			}
		}
		for (a = 0; a < Subwindows.length; a++){
			Subwindows[a].style.margin = "0";
			Subwindows[a].style.minWidth = "calc(100% - 40px)";
			Subwindows[a].style.minHeight = "calc(100% - 40px)";
			Subwindows[a].style.padding = "20px";
		}
		for (a = 0; a < Modals.length; a++){
			Modals[a].style.margin = "0";
			Modals[a].style.minWidth = "calc(100% - 40px)";
			Modals[a].style.minHeight = "calc(100% - 40px)";
			Modals[a].style.padding = "20px";
		}
		Footer_VersionTitle.style.display = "none";
		MainMenu_PageName.style.display = "flex";
		} else if (windowSizePreset == "normal"){
		
		MainContent.style.width = pageProperty_mainContentWidth + "%";
		/*if (pageProperty_resizer_ChangeContentMargin == 1){
			MainContent.style.marginLeft = "10%";
		}*/
		Header_PageTitle.style.display = "block";
		Header_StatusTray_Clock.style.display = "block";
		Header_StatusTray_Battery.style.display = "block";
		for (a = 0; a < Header_Buttons_Text.length; a++){
			Header_Buttons_Text[a].style.display = "block";
		}
		MainMenu.style.width = "350px";
		StatusMenu.style.width = "350px";
		StatusMenu.style.float = "right";
		StatusMenu.style.left = "";
		if (pageProperty_enableFullContainerMode == 0){
			if (pageProperty_enableSidebar == 1){
				Content.style.width = "calc(100% - 50px)";
				if (pageProperty_lockSidebar == 1){
					Content.style.width = "100%";
				}
				} else {
				Content.style.width = "100%";
			}
		}
		// Content.style.width = "100%";
		for (a = 0; a < Subwindows.length; a++){
			Subwindows[a].style.margin = "auto";
			Subwindows[a].style.minWidth = "0%";
			Subwindows[a].style.minHeight = "0%";
		}
		for (a = 0; a < Modals.length; a++){
			Modals[a].style.margin = "auto";
			Modals[a].style.minWidth = "0%";
			Modals[a].style.minHeight = "0%";
		}
		Footer_VersionTitle.style.display = "flex";
		MainMenu_PageName.style.display = "none";
	}
	
	if (App_CurrentPageName == "DL_ShortcutEditor.html"){
		var SE_TableView_Item = document.querySelectorAll(".ShortcutEditor_TableView_Item");
		var SE_TableView_Item_URL = document.querySelectorAll(".ShortcutEditor_TableView_Item_ShortcutURL");
		if (windowSizePreset == "small"){
			for (a = 0; a < SE_TableView_Item.length; a++){
				SE_TableView_Item[a].style.gridTemplateColumns = "1fr";
			}
			for (a = 0; a < SE_TableView_Item_URL.length; a++){
				SE_TableView_Item_URL[a].style.display = "none";
			}
			} else if (windowSizePreset == "normal"){
			for (a = 0; a < SE_TableView_Item.length; a++){
				SE_TableView_Item[a].style.gridTemplateColumns = "0.75fr 1fr";
			}
			for (a = 0; a < SE_TableView_Item_URL.length; a++){
				SE_TableView_Item_URL[a].style.display = "block";
			}
		}
	}	
}

function Buttons_Toggle(ID){
    var Button_Element = document.getElementById(ID);
	var Button_Indicator = Button_Element.querySelector('.Toggle_Indicator');
	if (Button_Indicator.getAttribute('data-id') == "Toggle_Activated"){
		Button_Indicator.setAttribute('data-id', "Toggle_Deactivated");
	} else if (Button_Indicator.getAttribute('data-id') == "Toggle_Deactivated"){
		Button_Indicator.setAttribute('data-id', "Toggle_Activated");
	}
}



function Textboxes_Toggle(ID){
	var textboxID = document.getElementById(ID + "_Textbox");
	var textboxContentsID = document.getElementById(ID + "_Textbox_Content");
	if (textboxID.style.display == "none"){
		textboxID.style.display = "block";
		textboxID.style.animationFillMode = "forwards";
		textboxID.style.animationName = "open_Textbox";
		textboxID.style.animationDuration = "var(--Element-Transition-Delay)";
		
		textboxContentsID.style.display = "block";
		textboxContentsID.style.animationFillMode = "forwards";
		textboxContentsID.style.animationName = "open_Textbox_Contents";
		textboxContentsID.style.animationDuration = "var(--Element-Transition-Delay)";
		textboxContentsID.style.animationDelay= "0.21s";
		} else {
		// textboxID.style.display = "none";
		textboxID.style.animationFillMode = "forwards";
		textboxID.style.animationName = "close_Textbox";
		textboxID.style.animationDuration = "var(--Element-Transition-Delay)";
		setTimeout(function(){textboxID.style.display = "none";}, 500);
		
		// textboxContentsID.style.display = "none";
		textboxContentsID.style.animationFillMode = "forwards";
		textboxContentsID.style.animationName = "close_Textbox_Contents";
		textboxContentsID.style.animationDuration = "0.3s";
		textboxContentsID.style.opacity = "0%";
		setTimeout(function(){textboxContentsID.style.display = "none";}, 200);
	}
	
	
}

function Dropdown_Toggle(ID){	
	var dropdownMenu = document.getElementById("dropdownMenu_"+ID);
	var dropdownButton = document.getElementById(ID);
	var dropdownItems = document.querySelectorAll("[id='dropdownItem_"+ID+"']");	
	if (dropdownMenu.style.display == "none"){
		dropdownMenu.parentElement.style.height = "250px";
		dropdownMenu.style.display = "block";
		dropdownMenu.style.animationName = "opening_Dropdown";
		dropdownMenu.style.animationDuration = "0.3s";
		dropdownMenu.style.animationFillMode = "forwards";
		for (var a = 0; a < dropdownItems.length; a++){
			var dropdownItems_Select = dropdownItems[a];
			dropdownItems_Select.style.animationName = "opening_Dropdown_Items";
			dropdownItems_Select.style.animationDuration = "0.3s";
			dropdownItems_Select.style.animationFillMode = "forwards";
		}
		dropdownButton.style.backgroundColor = "var(--BG-Color-Button-Dropdown-Active)";
		dropdownButton.style.borderTopStyle = "solid";
		dropdownButton.style.borderBottomStyle = "none";
		} else {
		dropdownMenu.parentElement.style.height = "auto";
		dropdownMenu.style.animationName = "closing_Dropdown";
		dropdownMenu.style.animationDuration = "0.3s";
		dropdownMenu.style.animationFillMode = "forwards";
		for (var a = 0; a < dropdownItems.length; a++){
			var dropdownItems_Select = dropdownItems[a];
			dropdownItems_Select.style.animationName = "closing_Dropdown_Items";
			dropdownItems_Select.style.animationDuration = "0.3s";
			dropdownItems_Select.style.animationFillMode = "forwards";
		}
		setTimeout(function(){dropdownMenu.style.display = "none";}, 300);
		dropdownButton.style.backgroundColor = null;
		dropdownButton.style.borderTopStyle = "none";
		dropdownButton.style.borderBottomStyle = "solid";
	}
}

function Dropdown_ItemSelected(ID, text){
	var trimmedID = ID.slice(13);
	console.log(trimmedID);
	document.getElementById(trimmedID).innerHTML = text;
	trigger_toggleDropdown(trimmedID);
}

var Sidebar_State = "Contracted";

function Sidebar_Toggle(){
	var Sidebar = document.getElementById("pageElement_Content");
	var toggle_Sidebar_GridTemplateColumns = "50px 1fr";
	if (pageProperty_enableSidebar == 1){
		if (pageProperty_lockSidebar == 0){
			if (Sidebar_State == "Contracted"){
				document.getElementById("pageElement_Sidebar").style.width = pageProperty_sidebarExpandedWidth + "px";
				if (pageProperty_sidebarMoveContent == 1){
					document.getElementById("pageElement_Content").style.marginLeft = pageProperty_sidebarExpandedWidth + "px";
				}
				Sidebar_State = "Expanded";
				} else if (Sidebar_State == "Expanded"){
				document.getElementById("pageElement_Sidebar").style.width = pageProperty_sidebarCompactedWidth +"px";
				document.getElementById("pageElement_Content").style.marginLeft = "50px";
				// var toggle_Sidebar_GridTemplateColumns = "50px 1fr";
				Sidebar_State = "Contracted";
			}
		} else if (pageProperty_lockSidebar == 1){
			if (Sidebar_State == "Contracted"){
				document.getElementById("pageElement_Sidebar").style.width = pageProperty_sidebarExpandedWidth + "px";
				document.getElementById("pageElement_Sidebar").style.borderLeftWidth = "3px";
				document.getElementById("pageElement_Sidebar").style.transform = "translateX(0px)";
				if (pageProperty_sidebarMoveContent == 1){
					document.getElementById("pageElement_Content").style.marginLeft = pageProperty_sidebarExpandedWidth + "px";
				}
				Sidebar_State = "Expanded";
				} else if (Sidebar_State == "Expanded"){
				document.getElementById("pageElement_Sidebar").style.width = "0px";
				document.getElementById("pageElement_Sidebar").style.borderLeftWidth = "0px";
				document.getElementById("pageElement_Content").style.marginLeft = "0px";
				document.getElementById("pageElement_Sidebar").style.transform = "translateX(-40px)";
				Sidebar_State = "Contracted";
			}
		}
		// document.getElementById("pageElement_Content").style.gridTemplateColumns = toggle_Sidebar_GridTemplateColumns;
	}
}

function Categories_Toggle(catID){
    var categoryID = catID; //Set value of categoryID to the value of catID
	var container = document.getElementById("content_"+categoryID); //The id of the div container of the category
	var containerArrow = document.getElementById("arrow_"+categoryID); //The id of the arrow icon of the category
	
	var selectedCSSObject = categoryID.replace('category_','');
	
	container.style.animationName = "tabOpening"; //Opening animation
	container.style.animationDuration = "var(--Element-Transition-Delay)"; //Animation duration
	if (container.style.display != "none"){ //If the container is not closed
		container.style.animationName = "tabClosing"; //Closing animation
		container.style.animationFillMode = "forwards";
		container.style.animationDuration = "0.3s";
		setTimeout( function() { container.style.display = "none";}, 300);
		containerArrow.src = "Assets/Icons/icon_downArrow.png"	//Change arrow icon
		} else { //If the container is closed
		container.style.display = "block"; //then open it
		container.style.animationName = "tabOpening"; //Opening animation
		container.style.animationDuration = "0.3s"; //Animation duration
		containerArrow.src = "Assets/Icons/icon_upArrow.png" //Change arrow icon
	}
}

var categoryToggleAll = 1;

function Categories_Toggle_All(){
    //var categoryID = document.querySelectorAll('[id^="category_"]');
	//console.log(categoryID);
	//var categoryCount = document.querySelectorAll('[id^="category_"]').length;
	//console.log(categoryCount);
	var Category = document.querySelectorAll(".Category_Content_Container");
	var categorySelect_Toggle = document.querySelectorAll(".Category_Label_Toggle");
	if (categoryToggleAll == 1){ //Hide all
		for (var a = 0; a < Category.length; a++) {			
			var categorySelect = Category[a];
			
			categorySelect.style.display = "none";
			
			var categorySelect_Toggle = Category[a];
			categorySelect_Toggle.src = "Assets/Icons/icon_downArrow.png"
			
			if(a == (Category.length - 1)){
				categoryToggleAll = 0;
			}
			
		}
		
		} else { //Show all
		for (var a = 0; a < Category.length; a++) {			
			var categorySelect = Category[a];
			categorySelect.style.display = "block";
			categorySelect.style.animationName = "tabOpening"; //Opening animation
			categorySelect.style.animationDuration = "var(--Element-Transition-Delay)";
			
			var categorySelect_Toggle = Category[a];
			categorySelect_Toggle.src = "Assets/Icons/icon_downArrow.png"
			
			if(a == (Category.length - 1)){
				categoryToggleAll = 1;
			}
		}
	}
}



function Subwindows_Open(ID){
    document.getElementById("pageElement_Subwindows").style.opacity = "0%";
	document.getElementById("pageElement_Subwindows").style.display = "flex";
	document.getElementById("pageElement_Subwindows").style.opacity = "100%";
	var subwindowElement = document.getElementById("subwindow_"+ID);
	subwindowElement.style.display = "block";
	subwindowElement.style.animationFillMode = "forwards";
	subwindowElement.style.animationName = "opening_Subwindow";
	subwindowElement.style.animationDuration = "0.3s";
	subwindow_activeSubwindow = ID;
}

function Subwindows_Close(ID){
    document.getElementById("pageElement_Subwindows").style.opacity = "0%";
	var subwindowElement = document.getElementById("subwindow_"+ID);
	subwindowElement.style.animationName = "closing_Subwindow";
	subwindowElement.style.animationDuration = "0.3s";
	subwindowElement.style.animationFillMode = "forwards";
	subwindow_activeSubwindow = "none";
	setTimeout(function(){subwindowElement.style.display = "none"; document.getElementById("pageElement_Subwindows").style.display = "none";}, 300);
}


/*document.addEventListener('DOMContentLoaded', function() {
	var draggableElement = document.getElementById("testers");
	var container = document.getElementById("container");
	var offset = {x: 0, y:0};
	var isDragging = false;
	var lastPositionX;
	var lastPositionY;

	draggableElement.addEventListener("mousedown", function(event){
		isDragging = true;
		offsetX = event.clientX;
		offsetY = event.clientY;
		
	});

	document.addEventListener("mousemove", function(event){
		if (isDragging){
			var x = event.clientX - offsetX;
			var y = event.clientY - offsetY;

			var minX = 0;
			var minY = 0;
			var maxX = container.clientWidth - draggableElement.offsetWidth;
			var maxY = container.clientHeight - draggableElement.offsetHeight;

			x = Math.max(minX, Math.min(x, maxX));
			y = Math.max(minY, Math.min(y, maxY));

			draggableElement.style.left = x + "px";
			draggableElement.style.top = y + "px";
		}
	});

	document.addEventListener("mouseup", function(){
		isDragging = false;
	});
});*/