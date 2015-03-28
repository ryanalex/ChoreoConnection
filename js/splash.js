var showingPlaceholder = true;

var pic_land_width=4544;
var pic_land_height=2592;

var pic_port_width=2648;
var pic_port_height=3072;

var pic_big_land_width=4544;
var pic_big_land_height=3072;

var vid_land_width=1920;
var vid_land_height=1080;


$(document).ready(function() {
	resizeTheElements();
	loadTheVid();
});

$( window ).resize(function() {
	resizeTheElements();
});


function resizeTheElements(){
	//get current window info
	screenWidth=$(window).width();
	screenHeight=$(window).height();

	//LANDSCAPE							
	if (screenWidth >= screenHeight){

		//PICTURE BKGRND
		if (showingPlaceholder){

				if (screenHeight > pic_land_height){
					imageResize(pic_big_land_width, pic_big_land_height,"#thePlaceholder");
					$("#thePlaceholder").css("background-image" ,"url(../assets/Pictures/BigLandscape.jpg)");

				}else{
					imageResize(pic_land_width, pic_land_height,"#thePlaceholder");
					$("#thePlaceholder").css("background-image" ,"url(../assets/Pictures/Landscape.jpg)");
				}

		//VID BKGRND
		}else{
				wrapperResize("#vidWrapper");
				videoResize(vid_land_width,vid_land_height,"#bgvid");

			}	
			
	//PORTRAIT
	}else{
		//PICTURE BKGRND
		if (showingPlaceholder){

			imageResize(pic_port_width, pic_port_height,"#thePlaceholder");
			$("#thePlaceholder").css("background-image" ,"url(../assets/Pictures/Portrait.jpg)");

		//VID BKGRND
		}else{
			wrapperResize("#vidWrapper");
			videoResize(vid_land_width,vid_land_height,"#bgvid");
		} 
	}
}



function videoResize(pW,pH,idTag){

	sW=$(window).width();
	sH=$(window).height();

	if (sW<pW){
		$(idTag).css({"width":sW+"px", "height":"auto"});
		var actual_pH= sW*(vid_land_height/vid_land_width);
		var newTopMarg = (sH-actual_pH)/2;
		$(idTag).css({"margin-top":newTopMarg+"px"});

	}else{
		$(idTag).css({"width":pW+"px", "height":pH+"px"});
		var newTopMarg = (sH-pH)/2;
		$(idTag).css({"margin-top":newTopMarg+"px"});

	}
}

function wrapperResize(idTag){
	sW=$(window).width();
	sH=$(window).height();
	$(idTag).css({"height" : sH, "width" : sW, "margin-top": -(sH/2), "margin-left": -(sW/2)});
}



function imageResize(pW,pH,idTag){

	sW=$(window).width();
	sH=$(window).height();


	$(idTag).css({"height" : sH, "width" : sW, "margin-top": -(sH/2), "margin-left": -(sW/2)});


	if (sW<pW){

		if (sH<pH){

			if (sW>=sH){
				$(idTag).css("background-size", sW+"px auto");

			}else{
				$(idTag).css("background-size", "auto "+sH+"px");
			}

		}else{
			$(idTag).css("background-size", sW+"px auto");
		}


	}else{

		if (sH<pH){
			$(idTag).css("background-size", "auto "+sH+"px");
		}else{
			$(idTag).css("background-size", pW+"px "+pH+"px");
		}
	
	}
}


function iCanHasVideo(){

	var fileTypes = [  'video/ogg; codecs="theora"', 'video/webm; codecs=”vp8"', 'video/mp4; codecs="h.264"']
	var elem = document.createElement('video');

	for (var it=0;it<fileTypes.length;it++){

		var resp = elem.canPlayType(fileTypes[it]).toLowerCase();
		if ((resp == 'probably') || (resp == 'maybe')){
			return it;
		}
	}

	return -1;
}

function loadTheVid(){

	var fileIndex = iCanHasVideo();
	var fileNames= [ "../assets/Videos/ogg_theora_compressed.ogg", "../assets/Videos/webM_vp8_compressed.webm", "../assets/Videos/H264_mp4_compressed.mp4"];

	console.log('at the start');
	var start = new Date().getTime();

	var xhr = new XMLHttpRequest();
	xhr.open('GET', fileNames[fileIndex], true);
	xhr.responseType = 'blob';
	xhr.timeout = 12000;
    xhr.ontimeout = function () { alert("Timed out!!!"); }
	xhr.onload = function(e) {
	  if (this.status == 200) {
	    console.log("got it");
	    var myBlob = this.response;
	    var vid = (window.webkitURL ? webkitURL : URL).createObjectURL(myBlob);
	    // myBlob is now the blob that the object URL pointed to.
		while(true){	    	
			if ((new Date().getTime() - start) >= 1500){
	    		break;
	    	}
	    }
	    var video = document.getElementById("bgvid");
	    console.log("Loading video into element");
	    // sleep(1500);
	    //FADE OUT PICTURE
	    $("#thePlaceholder").fadeOut(900);
	    // sleep(3000);

	    showingPlaceholder=false;
	    resizeTheElements();



	    video.src = vid;
	    $("#bgvid").fadeIn(900);
	    video.play()



	   }
	  }

	xhr.send();

}



function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

