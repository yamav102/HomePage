//ƒuƒ‰ƒEƒU”»’è
//IE:TRUE;Except:FALSE;
function f_brhantei(){
	var naviN=window.navigator.appName;
	var naviNv=window.navigator.appVersion;

	if(naviN=="Microsoft Internet Explorer"){
	return true;
	}
    if(naviN.substring(0,5)=="Opera" && eval(naviNv.substring(0,4))>=9.50){
	return true;	    
    }
	else{
	return false;
	}
}
