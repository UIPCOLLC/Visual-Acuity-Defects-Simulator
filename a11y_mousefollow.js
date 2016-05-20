
/**
 * Create a namespace so that we don't likely collide with other JavaScript Objects.
 * We do this by making an object literal, after checking to make sure we aren't overwriting. 
 */
var a11y_toolset = a11y_toolset||{};

/**
 * function constructFormForVAD
 * description: This function creates the drop-down menu that selects
 * the various attributes to apply to the visual filter.  Invoking this
 * function also clears any existing filters, so that the menu can be used.  
 */
a11y_toolset.constructFormForVAD = function(){
	/** 
	 * First we check to see if the form already exists, and use that, at the same time
	 * shutting off any active filters.  
	 */
	var vadForm = document.getElementById("a11y_toolset_vadForm");
	var vaf = document.getElementById("visual-acuity-filters");
		if(vaf){
			vaf.parentNode.removeChild(vaf)
			document.body.style['-webkit-filter'] = "none";
			document.body.style.filter = "none";
			document.body.style['-ms-filter'] = "none";
			a11y_toolset.stopMousefollow();
		}
	/** 
	 * If the form doesn't already exist in the DOM, we create it by primitive string concatenation
	 * to generate one innerHTML assignment.  This could be modified to be DOM create calls, or any other method.   
	 */
	if(!vadForm){
		vadForm = document.createElement("DIV");
		vadForm.setAttribute("id","a11y_toolset_vadForm");
		var formContent = "<h2>Visual Acuity Defects Simulator</h2>";
		formContent += "<p>Select options from either or both lists, and then press 'Simulate Visual Acuity Defects' to activate.</p>";
		formContent += "<p>Press shift and '`' (tilde:~) to remove all applied conditions and re-open this menu.</p>";
		formContent += '<fieldset><legend>Acuity Defects</legend>' + 
		'<div><input type="radio" group="groupI" name="groupI" id="novisualacuitydefects" value="novisualacuitydefects" /><label for="novisualacuitydefects">no visual acuity defects</label></div>' + 
		'<div><input type="radio" group="groupI" name="groupI" id="totalblindness" value="totalblindness" /><label for="totalblindness">total blindness</label></div>' + 
		'<div><input type="radio" group="groupI" name="groupI" id="cataracts" value="cataracts" /><label for="cataracts">cataracts</label></div>' + 
		'<div><input type="radio" group="groupI" name="groupI" id="retinitispigmentosa" value="retinitispigmentosa" /><label for="retinitispigmentosa">retinitis pigmentosa</label></div>' + 
		'<div><input type="radio" group="groupI" name="groupI" id="glaucoma" value="glaucoma" /><label for="glaucoma">glaucoma</label></div>' + 
		'<div><input type="radio" group="groupI" name="groupI" id="diabeticretinopathy" value="diabeticretinopathy" /><label for="diabeticretinopathy">diabetic retinopathy</label></div>' + 
		'<div><input type="radio" group="groupI" name="groupI" id="maculardegeneration" value="maculardegeneration" /><label for="maculardegeneration">macular degeneration</label></div>' + 
		'</fieldset>';
		formContent += '<fieldset><legend>Colorblindness</legend>' + 
		'<div><input type="radio" group="groupII" name="groupII" id="nocolorblindness" value="nocolorblindness" /><label for="nocolorblindness">no colorblindness</label></div>' + 
		'<div><input type="radio" group="groupII" name="groupII" id="protanopia" value="protanopia" /><label for="protanopia">protanopia</label></div>' + 
		'<div><input type="radio" group="groupII" name="groupII" id="protanomaly" value="protanomaly" /><label for="protanomaly">protanomaly</label></div>' + 
		'<div><input type="radio" group="groupII" name="groupII" id="deuteranopia" value="deuteranopia" /><label for="deuteranopia">deuteranopia</label></div>' + 
		'<div><input type="radio" group="groupII" name="groupII" id="deuteranomaly" value="deuteranomaly" /><label for="deuteranomaly">deuteranomaly</label></div>' + 
		'<div><input type="radio" group="groupII" name="groupII" id="tritanopia" value="tritanopia" /><label for="tritanopia">tritanopia</label></div>' + 
		'<div><input type="radio" group="groupII" name="groupII" id="tritanomaly" value="tritanomaly" /><label for="tritanomaly">tritanomaly</label></div>' + 
		'<div><input type="radio" group="groupII" name="groupII" id="achromatopsia" value="achromatopsia" /><label for="achromatopsia">achromatopsia</label></div>' + 
		'<div><input type="radio" group="groupII" name="groupII" id="achromatomaly" value="achromatomaly" /><label for="achromatomaly">achromatomaly</label></div>' + 
		'</fieldset>';
		formContent += '<div><button id="#a11y_toolset_vadButton" onclick="a11y_toolset.applyFormSelections();return false;">Simulate Visual Acuity Defects</button></div>'
		vadForm.innerHTML = formContent;
		var toolStyles = document.createElement("style");
		var toolStylesContent = "#a11y_toolset_vadForm{position:fixed;left:0;top:0;padding:1em;z-index:10000000;width:30em;background:white;}#a11y_toolset_vadForm fieldset label{margin:0 .5em;position:relative;top:-.2em;}" + 
		"##a11y_toolset_vadButton{height:1em;width:auto;border:1px solid black;background-color:white;color:black;padding:.3em;margin:.3em;}";
		toolStyles.innerHTML = toolStylesContent;
		document.body.appendChild(toolStyles);
		document.body.insertBefore(vadForm, document.body.firstChild);
	}else{
		
		vadForm.style.display = "block";

	}
	


}

/**
 * function applyFormSelections
 * description: This takes the results of the form values and associates them
 * with the defined filters by invoking the applyFilters function with the parameters
 * of the combined radio group selections.
 */
a11y_toolset.applyFormSelections = function(){
	var groupIRadios = document.getElementsByName('groupI');
	var groupIResult = "";
	var groupIIRadios = document.getElementsByName("groupII");
	var groupIIResult = "";

	for (var i = 0, length = groupIRadios.length; i < length; i++) {
	    if (groupIRadios[i].checked) {
	      	groupIResult = (groupIRadios[i].value);
	        break;
	    }
	}

	for (var i = 0, length = groupIIRadios.length; i < length; i++) {
	    if (groupIIRadios[i].checked) {
	      	groupIIResult = (groupIIRadios[i].value);
	        break;
	    }
	}
	a11y_toolset.applyFilters(groupIResult,groupIIResult);
	return false;
}

/* The internal reference for the filter object mouse-following overlay (macular degeneration, retinitis pigmentosa) */
a11y_toolset.a11yOverlay = null;

/**
 * function startMousefollow
 * description: The method invoked to animate the overlay for macular degeneration and retinisis pigmentosa, among others.
 * It uses document.body.onmousemove to track the mouse. 
 */
a11y_toolset.startMousefollow = function () {
	a11y_toolset.a11yOverlay = document.getElementById("a11y_simulation_overlay");
	if(!a11y_toolset.a11yOverlay){
		a11y_toolset.a11yOverlay = document.createElement("DIV");
		a11y_toolset.a11yOverlay.setAttribute("id","a11y_simulation_overlay");
	}
	document.body.appendChild(a11y_toolset.a11yOverlay);
	document.body.onmousemove = a11y_toolset.mouseFollow;
};

/**
 * function stopMousefollow
 * description: stops the mouse following overlay animation, and removes it from the DOM. 
 */
a11y_toolset.stopMousefollow = function () {
	if(a11y_toolset.a11yOverlay){
		document.body.removeChild(a11y_toolset.a11yOverlay);
		a11y_toolset.a11yOverlay = null;
	}
	document.body.onmousemove = null;
};

/**
 * function buildScotoma
 * description: this builds an SVG (Scalable Vector Graphics) scotoma object to act as the central modification of the
 * visual field for simulating macular degeneration with an animated overlay.
 */
a11y_toolset.buildScotoma = function(){
	var scotomaFilterDiv = document.getElementById("scotomaFilterDiv")||document.createElement("DIV");
	scotomaFilterDiv.setAttribute("id","scotomaFilterDiv");
	var scotomaFilter = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" id="svg-scotoma-filters"  zoomAndPan="disable">' + 
		'<defs>' + 
			'<filter id="turb-turbulence" filterUnits="objectBoundingBox" x="0%" y="0%" width="300" height="300">' + 
				'<feTurbulence type="turbulence" baseFrequency="0.045" numOctaves="2" result="turbulence_3" data-filterId="3" />' + 
  				'<feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" in2="turbulence_3" scale="65" />' + 
				'<feGaussianBlur result="blur" stdDeviation="6" />' + 
			'</filter>' + 
			'<radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">' + 
		      '<stop offset="30%" style="stop-color:rgb(0,0,0);stop-opacity:1" />' + 
		      '<stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:.2" />' + 
		    '</radialGradient>' + 
		'</defs>' + 
	'</svg>';
	scotomaFilterDiv.innerHTML = scotomaFilter;
	document.body.appendChild(scotomaFilterDiv);
	

	var scotomaShape = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" id="svg-scotoma" width="600" height="600" viewBox="0 0 600 600">' + 
		'<circle cx="300" cy="300" r="250" style="fill:url(#grad1);" filter="url(#turb-turbulence)" />' + 
	'</svg>' 
	setTimeout(function(){document.getElementById("a11y_simulation_overlay").innerHTML = scotomaShape;},10);
}

/**
 * function buildGlaucoma
 * description: Creates the SVG object that simulates the reduced visual field of some glaucoma conditions
 * for animation as an overlay. 
 */
a11y_toolset.buildGlaucoma = function(){
	var glaucomaFilterDiv = document.getElementById("glaucomaFilterDiv") || document.createElement("DIV");
	glaucomaFilterDiv.setAttribute("id","glaucomaFilterDiv");
	var w = parseInt(document.body.offsetWidth)*2;
	var h = parseInt(document.body.offsetHeight)*2;
	var glaucomaFilter ='<svg xmlns:xlink="http://www.w3.org/1999/xlink" id="svg-glaucoma-filters"  zoomAndPan="disable">' + 
			'<defs>' +  
				'<radialGradient id="grad2" cx="50%" cy="50%" r="100%" fx="50%" fy="50%">' + 
		      		'<stop offset="0%" style="stop-color:rgb(51,51,51);stop-opacity:0" />' + 
		      		'<stop offset="8%" style="stop-color:rgb(0,0,0);stop-opacity:.5" />' + 
		      		'<stop offset="12%" style="stop-color:rgb(0,0,0);stop-opacity:1" />' + 
		    	'</radialGradient>' + 
		    '</defs>' + 
		'</svg>'; 
	glaucomaFilterDiv.innerHTML = glaucomaFilter;
	document.body.appendChild(glaucomaFilterDiv);
	

	var glaucomaShape = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" id="svg-glaucoma" width="' + w + '" height="' +  w + '" viewBox="0 0 ' + w + ' ' + w + '">' + 
		'<rect x="0" y="0" width="' + w + '" height="' + w + '" style="fill:url(#grad2);"></rect>' + 
	'</svg>' 
	setTimeout(function(){document.getElementById("a11y_simulation_overlay").innerHTML = glaucomaShape;},10);
}

/**
 * function buildRetinitisPigmentosa
 * description: Creates the SVG object that simulates the reduced visual field of retinitis pigmentosa
 * for animation as an overlay. 
 */
a11y_toolset.buildRetinitisPigmentosa = function(){
	var rpFilterDiv = document.getElementById("rpFilterDiv") || document.createElement("DIV");
	rpFilterDiv.setAttribute("id","rpFilterDiv");
	var w = parseInt(document.body.offsetWidth)*2;
	var h = parseInt(document.body.offsetHeight)*2;
	var rpFilter ='<svg xmlns:xlink="http://www.w3.org/1999/xlink" id="svg-retinitispigmentosa-filters"  zoomAndPan="disable">' + 
			'<defs>' +  
				'<radialGradient id="grad3" cx="50%" cy="50%" r="100%" fx="50%" fy="50%">' + 
		      		'<stop offset="0%" style="stop-color:rgb(51,51,51);stop-opacity:0" />' + 
		      		'<stop offset="7%" style="stop-color:rgb(51,51,51);stop-opacity:0" />' +
		      		'<stop offset="8%" style="stop-color:rgb(0,0,0);stop-opacity:1" />' + 
		    	'</radialGradient>' + 
		    '</defs>' + 
		'</svg>'; 
	rpFilterDiv.innerHTML = rpFilter;
	document.body.appendChild(rpFilterDiv);
	

	var rpShape = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" id="svg-retinitispigmentosa" width="' + w + '" height="' +  w + '" viewBox="0 0 ' + w + ' ' + w + '">' + 
		'<rect x="0" y="0" width="' + w + '" height="' + w + '" style="fill:url(#grad3);"></rect>' + 
	'</svg>' 
	setTimeout(function(){document.getElementById("a11y_simulation_overlay").innerHTML = rpShape;},10);
}

/**
 * function mouseFollow
 * description: the function called on the mousemove event, which takes the event as a parameter
 * to animate the overlay to follow the mouse pointer.  
 */
a11y_toolset.mouseFollow = function (evt){	
	var evt = evt||event||null;
	var x = evt.clientX;
	var y = evt.clientY;
	a11y_toolset.a11yOverlay.style.left = (x - (parseInt(a11y_toolset.a11yOverlay.offsetWidth)*.5) + pageXOffset) + "px";
	a11y_toolset.a11yOverlay.style.top = (y - (parseInt(a11y_toolset.a11yOverlay.offsetHeight)*.5) + pageYOffset) + "px";
}


/**
 * function setUpOverlayStyle
 * description: this assembles the styles for the overlay object that needs to animate with the mouse cursor to emulate several conditions.  
 */
a11y_toolset.setUpOverlayStyle = function(type){
	console.log('type:' + type);
	var additionalStyles = 'width:100px;height:100px;';
	switch(type){
		case("maculardegeneration"):
		additionalStyles = 'width:600px;height:600px;filter:url(#maculardegenerationfilter);-webkit-filter:url(#maculardegenerationfilter);-ms-filter:url(#maculardegenerationfilter);'
		break;
		case("glaucoma"):
		var w = parseInt(document.body.offsetWidth)*2;
		var h = parseInt(document.body.offsetHeight)*2;
		additionalStyles = 'width:' + w + 'px;height:' + w + 'px;filter:url(#glaucomafilter);-webkit-filter:url(#glaucomafilter);-ms-filter:url(#glaucomafilter);'
		break;
		case("diabeticretinopathy"):
		additionalStyles = 'width:900;height:900px;filter:url(#diabeticretinopathyfilter);-webkit-filter:url(#diabeticretinopathyfilter);-ms-filter:url(#diabeticretinopathyfilter);';
		break;
		case("retinitispigmentosa"):
		var w = parseInt(document.body.offsetWidth)*2;
		var h = parseInt(document.body.offsetHeight)*2;
		additionalStyles = 'width:' + w + 'px;height:' + w + 'px;filter:url(#retinitispigmentosafilter);-webkit-filter:url(#retinitispigmentosafilter);-ms-filter:url(#retinitispigmentosafilter);'
		break;
		default:
		break;
	}
	/* create the style block for the overlay */
	a11y_toolset.a11yOverlayStyles = document.createElement("style");
	a11y_toolset.a11yOverlayStyles.innerHTML = '#a11y_simulation_overlay{position:absolute;left:0;top:0;z-index:10000000;mix-blend-mode: multiply;pointer-events:none;' + additionalStyles + '}body{mix-blend-mode: multiply;}';
	document.body.appendChild(a11y_toolset.a11yOverlayStyles);
}

/**
 * function applyFilters
 * description: this creates the SVG filter objects that are applied to the body of the page. 
 * These filters modify all of the content of the body tag, so they may not work fully on pages that
 * have very little body content.  
 */
a11y_toolset.applyFilters = function(groupIselect, groupIIselect){
	var groupI = "";
	switch(groupIselect){
		case("totalblindness"):
		groupI += '<feFlood flood-color="black" flood-opacity="1"/>';
		break;
		case("cataracts"):
		groupI += '<feGaussianBlur stdDeviation="2" />';
		break;
		case("retinitispigmentosa"):
		/* render mask, start mousemove */
		groupI += '<feGaussianBlur stdDeviation="2" />';
		a11y_toolset.setUpOverlayStyle('retinitispigmentosa');
		a11y_toolset.startMousefollow();
		a11y_toolset.buildRetinitisPigmentosa();
		break;
		case("glaucoma"):
		/* render mask, start mousemove */
		groupI += '<feMorphology operator="erode" radius="1" />';
		groupI += '<feGaussianBlur stdDeviation="1" />';
		a11y_toolset.setUpOverlayStyle('glaucoma');
		a11y_toolset.startMousefollow();
		a11y_toolset.buildGlaucoma();
		break;
		case("diabeticretinopathy"):
		/* render mask, start mousemove */
		var randomSeed = Math.floor(Math.random()*1000);
	    groupI += '<feTurbulence id="fe-turb-turbulence" type="turbulence" baseFrequency="0.0025" numOctaves="4" result="turbulence" seed="' + randomSeed + '"></feTurbulence>';
		groupI += '<feColorMatrix in="turbulence" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />';
		groupI += '<feColorMatrix type="matrix" in="goo" values="-1 0  0  0  0  0 -1  0  0  0  0  0 -1  0  0  1  1  1  0  0" result="droverlay" />';
		groupI += '<feBlend in2="droverlay" in="SourceGraphic" mode="multiply" />';
		groupI += '<feGaussianBlur stdDeviation="3" />';
		a11y_toolset.startMousefollow();
		a11y_toolset.setUpOverlayStyle('diabeticretinopathy');
		break;
		case("maculardegeneration"):
		var randomSeed = Math.floor(Math.random()*1000);
		groupI += '<feTurbulence type="fractalNoise" baseFrequency="0.0025" numOctaves="3" result="turbulence_3" data-filterId="3"  seed="' + randomSeed + '" />';
		groupI += '<feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" in2="turbulence_3" scale="12" />';/**/
		groupI += '<feGaussianBlur stdDeviation="1" />';
		a11y_toolset.startMousefollow();
		a11y_toolset.setUpOverlayStyle('maculardegeneration');
		a11y_toolset.buildScotoma();
		/* */
		break;
		default:
		groupI += '';
	}

	var groupII = "";
	switch(groupIIselect){
		case("protanopia"):
		groupII += '<feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0 0.242,0.758,0,0 0,0,0,1,0" in="SourceGraphic" />';
		break;
		case("protanomaly"):
		groupII += '<feColorMatrix type="matrix" values="0.817,0.183,0,0,0 0.333,0.667,0,0,0 0,0.125,0.875,0,0 0,0,0,1,0" in="SourceGraphic" />';
		break;
		case("deuteranopia"):
		groupII += '<feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" in="SourceGraphic" />'
		break;
		case("deuteranomaly"):
		groupII += '<feColorMatrix type="matrix" values="0.8,0.2,0,0,0 0.258,0.742,0,0,0 0,0.142,0.858,0,0 0,0,0,1,0" in="SourceGraphic" />'
		break;
		case("tritanopia"):
		groupII += '<feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" in="SourceGraphic" />'
		break;
		case("tritanomaly"):
		groupII += '<feColorMatrix type="matrix" values="0.967,0.033,0,0,0 0,0.733,0.267,0,0 0,0.183,0.817,0,0 0,0,0,1,0" in="SourceGraphic" />'
		break;
		case("achromatopsia"):
		groupII += '<feColorMatrix type="matrix" values="0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0" in="SourceGraphic" />'
		break;
		case("achromatomaly"):
		groupII += '<feColorMatrix type="matrix" values="0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0" in="SourceGraphic" />'
		break;
		default: groupII += "";

	}
	if(groupI==="" && groupII === ""){
		document.getElementById("a11y_toolset_vadForm").style.display = "none";
		return true;
	}

	var filtercontent = '<svg width="0" height="0">' +  
					'<defs>' +  
						'<filter id="vaf">' + 
							groupII + ' ' +   
							groupI + ' ' + 
						'</filter> ' + 
					'</defs> ' + 
				'</svg>';
	var newDiv = document.getElementById("visual-acuity-filters")||document.createElement("DIV");
	newDiv.setAttribute("id","visual-acuity-filters");
	newDiv.innerHTML = filtercontent;
	document.body.appendChild(newDiv);
	document.body.style['-webkit-filter'] = "url(#vaf)";
	document.body.style.filter = "url(#vaf)";
	document.body.style['-ms-filter'] = "url(#vaf)";

	document.getElementById("a11y_toolset_vadForm").style.display = "none";
}

/**
 * This function call invokes the form as soon as the file is loaded. It only happens once, when the file is loaded. 
 */

a11y_toolset.constructFormForVAD();

/**
 * This sets up the keylistener (currently: ~ (shift-tilde)) but any character code could be set up to be the key that
 * resets the filter and opens up the menu.    
 */
document.body.addEventListener("keypress", function(evt){if(evt && evt.charCode == "126"){a11y_toolset.constructFormForVAD();}}, true);


/* 
Notes from the original page on how to create these styles
<!--
	Group I
	total blindness: background black, multiply, blur (5)
	cataracts: blur(3) low contrast low brightness blend
	
	<feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="turbulence_3" data-filterId="3" />
  	<feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" in2="turbulence_3" scale="0" />


	+ (mouse following)
	glaucoma
	retinitis pigmentosa
	macular degeneration (randomized)
	diabetic retinopathy (randomized)
	
	Group II
	colorblindness
	protanopia
	protanomaly
	deuteranopia
	deuteranomaly
	tritanopia
	tritanomaly
	achromatopsia
	achromatomaly
 -->
*/
