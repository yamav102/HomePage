
var now = new Date();
var tuk=now.getMonth()+1; //今月の月
var nowtuk=now.getMonth()+1;
var nit=now.getDate(); //今日の日付
var you=now.getDay(); //曜日（日曜日が０）
var hizuke=1; //日付
var ok=0;
var i,j;
var myStyle;

max = new Array(12); //１月から１２月までのその月の日数
max[1]=31;
max[2]=29;
max[3]=31;
max[4]=30;
max[5]=31;
max[6]=30;
max[7]=31;
max[8]=31;
max[9]=30;
max[10]=31;
max[11]=30;
max[12]=31;

if(f_brhantei()==true){
	var nen=now.getYear();
}
else{
	var nen=now.getYear()+1900;
}

var nownen=nen;

//ブラウザ判定
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

function shuku(x){
	//xデーが休日かどうかを判定
	if(x==101 || x==115){ok=1;}
	if(x==211){ok=1;}
	if(x==321){ok=1;}
	if(x==429){ok=1;}
	if(x==503 || x==505){ok=1;}
	if(x==720){ok=1;}
	if(x==915|| x==923){ok=1;}
	if(x==1010){ok=1;}
	if(x==1103 || x==1123){ok=1;}
	if(x==1223){ok=1;}
}

function addyear(){
//年を加算
	nen=nen+1;
	hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
function addmonth(){
//月を加算
	tuk=tuk+1;
	hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}

function subtyear(){
//年を減算
	nen=nen-1;
	hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
function subtmonth(){
//月を減算
	tuk=tuk-1;
	hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}

function tsukihi(){
//年月を生成
	
	var theday = new Date(nen,tuk-1,1)
	you=theday.getDay();

}

function nengetuStyle(){
//今月でないなら年月表示を斜体表示

	if(nen==nownen&tuk==nowtuk){
		myStyle='font-weight:bold';			
	}
	else{
		myStyle='font-style:oblique';
	}
}


//カレンダー書き換え
function hyouji(){

	document.getElementById("divCarender").innerHTML=strMake();
}


//１日の曜日を判定

for(i=nit;i>1;i--){
	if(you==0){you=6;
	} 
	else{you--;
	}
}

//html生成
function strMake(){
	//年移動ボタン
	strHTML="<div><span onclick='addyear();' class='hand'>▲<\/span><span onclick='subtyear();' class='hand'>▽<\/span>";
	//年月表示	
	strHTML=strHTML+"<span style='"+myStyle+"'>"+nen+"/<\/span>";
	strHTML=strHTML+"<span style='"+myStyle+"'>"+tuk+"<\/span>";
	//月移動ボタン
	strHTML=strHTML+"<span onclick='addmonth();' class='hand'>▲<\/span><span onclick='subtmonth();' class='hand'>▽<\/span><\/div>";
	//表作成
	strHTML=strHTML+"<TABLE border='3'>";
	strHTML=strHTML+"<TR><td class='mannaka'><span class='red'>日<\/span><\/TD><td class='mannaka'>月<\/TD><td class='mannaka'>火<\/TD><td class='mannaka'>水<\/TD><td class='mannaka'>木<\/TD><td class='mannaka'>金<\/TD><td class='mannaka'>土<\/TD><\/TR>";

	//行作成
	var strGyo,strCol;
	for(i=1;i<7;i++){

			strGyo="<tr>";

	
		//列作成
		for(j=1;j<8;j++){
			//今日の日付にマーク
			if(nen==nownen & tuk==nowtuk & hizuke==nit & you<1){ 
				if(strCol==undefined){
					strCol="<td class='yellow'>";
				}
				else{
					strCol=strCol+"<td class='yellow'>";
				}
			}
			else {
				if(strCol==undefined){
					strCol="<td class='mannaka'>";
				}
				else{
					strCol=strCol+"<td class='mannaka'>";
				}
			}

			//当月日？
			if(you-->0 || hizuke>max[tuk]){
				if(strCol==undefined){
					strCol="・";
				}
				else{
					strCol=strCol+"・";
				}
			}
			else{
				//祝日ならok=1
				shuku(tuk*100+hizuke); 
				
				//赤い日？
				if(j==1 || ok==1){ 
					strCol=strCol+"<span class='red'>";
					strCol=strCol+hizuke++;
					strCol=strCol+"<\/span>";
	
					//振替休日？
					if(j==1 && ok==1){
						ok=1;
					} 
					else{ok=0;}

				}
				
				else {strCol=strCol+hizuke++;
				}
			}
				strCol=strCol+"<\/td>";
			
		}//列作成ループの〆
	
		strCol=strCol+"<\/tr>";
	}//行作成ループの〆

	strHTML=strHTML+strGyo+strCol+"<\/table>";//表作成の〆
	nengetuStyle()
	return strHTML;
	
}
window.onload=function(){nengetuStyle();hyouji();}




