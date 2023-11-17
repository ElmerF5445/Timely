let keysPressed = {}; 
document.addEventListener('keydown', (event) => {
	keysPressed[event.key] = true;
	
	if (keysPressed['Control'] && event.key == 'q') {
		toggle_Category_All();
		
	}
	//if (PageName == "DL_ShortcutEditor.html"){
	if (keysPressed['Control'] && event.key == ' ') {
		if(PageName == "WA_Main.html"){
			generateImage();
			} else {
			if(document.getElementById("subwindow_AddItem").style.display == "none"){
				open_Subwindow("AddItem");
				} else {
				close_Subwindow("AddItem");
			}
		}
		
	}
	if (keysPressed['Control'] && event.key == 'b') {
		if (pageProperty_enableClockScreen == 1){
			ClockScreen_Open()
		}
	}
	if (keysPressed['Control'] && event.key == 'ArrowRight') {
		if (pageProperty_enableSidebar == 1){
			Sidebar_Toggle();
		}
		
	}
	if (keysPressed['Control'] && event.key == '.') {
		if(PageName == "WA_Main.html"){
			WA_Next_Image();
		} 
	}
	if (keysPressed['Control'] && event.key == ',') {
		if(PageName == "WA_Main.html"){
			WA_Previous_Image();
		}
	}
	
	if (keysPressed['Control'] && event.key == 'CapsLock') {
		if(PageName == "WA_Main.html"){
			WA_Reset();
		}
	}
	
	if (keysPressed['Control'] && event.key == 'Shift') {
		if(document.pageProperty_enableQuickSearch == 1){
			toggle_SearchBar();
		}
	}
	
	if (keysPressed['Control'] && event.key == 'i') {
		trigger_Open_ExperimentSelector();
		
	}
	
	if (keysPressed['Control'] && event.key == 'ArrowUp') {
		scrollToPosition('top');
	}
	
	if (keysPressed['Control'] && event.key == 'ArrowDown') {
		scrollToPosition('bottom');
	}
	
	
	if (keysPressed['Control'] && event.key == 'Alt') {
		if (dev_debug_ElementOutlines == 0){
			var stylesheet = document.querySelector(':root');
			stylesheet.style.setProperty("--Debug-ElementOutline", "solid red");
			dev_debug_ElementOutlines = 1;
			console.log("Outlines on");
			} else if (dev_debug_ElementOutlines == 1){
			var stylesheet = document.querySelector(':root');
			stylesheet.style.setProperty("--Debug-ElementOutline", "none");
			dev_debug_ElementOutlines = 0;
			console.log("Outlines off");
		}
	}
	
	
	if (keysPressed['Escape']){
		if (subwindow_activeSubwindow != "none"){
			close_Subwindow(subwindow_activeSubwindow);
		}
		
	}
	
	if (keysPressed['Alt'] && event.key == 'ArrowDown') {
		if(pageProperty_enableSidebar == 1){
			trigger_ChangeTab_Keyboard("downwards");
		}
	}
	
	if (keysPressed['Alt'] && event.key == 'ArrowUp') {
		if(pageProperty_enableSidebar == 1){
			trigger_ChangeTab_Keyboard("upwards");
		}
	}
	
	/*if (keysPressed['Enter'] && (document.getElementById("pageElement_SearchQuery") === document.activeElement)){
		search_Query("headerMain");
		let keysPressed = {};
		}
		
		if (keysPressed['Enter'] && (document.getElementById("pageElement_SearchQuery2") === document.activeElement)){
		search_Query("headerMenu");
		let keysPressed = {};
		}
		
		if (keysPressed['Enter'] && (document.getElementById("pageElement_SearchQuery_3") === document.activeElement)){
		search_Query("toggleable");
		let keysPressed = {};
	}*/
	
	/*var searchBar1 = document.querySelector('.Header_QuickSearchBar_Input');
		if(searchBar1 === document.activeElement){
		if (keysPressed['Enter']) {
		search_Query("headerMain");	
		}
	}*/
	
	/*var searchBar2 = document.querySelector('.Header_QuickSearchBar_Input2');
		if(searchBar2 === document.activeElement){
		if (keysPressed['Enter']) {
		search_Query("headerMenu");	
		}
	}*/
	
	/*var searchBar3 = document.querySelector('.ToggleableSearchBar_SearchBar_Input');
		if(searchBar3 === document.activeElement){
		if (keysPressed['Enter']) {
		search_Query("toggleable");	
		}
	}*/
	//}
});

document.addEventListener('keyup', (event) => {
	delete keysPressed[event.key];
});