/*
>>>>カレンダー<<<<<

関連ファイル：
carender.css　⇒スタイルシート
carender_func.js　⇒汎用性のある関数群を分けて収録した

プレフィックス f_ で始まる関数は carender_func.js 内に収録
*/

var now = new Date();
var tuk=now.getMonth()+1; // カレンダー表示の月（現在月とは限らない)
var nen;//　カレンダー表示の年（現在年とは限らない）
var nownen;// 現在年
var nowtuk=now.getMonth()+1;//現在月
var nit=now.getDate(); //今日の日付
var you=now.getDay(); //曜日（日曜日が０）
var hizuke; //日付
var ok=0;
var shukuName;//祝日名称
var i,j;//カウンター用変数
var myStyle;


//ブラウザ判定⇒現在年の取得
if(f_brhantei()==true){
	var nen=now.getYear();
}
else{
	var nen=now.getYear()+1900;
}

nownen=nen;

max = new Array(12); //１月から１２月までのその月の日数
max[1]=31;
//max[2]=29;
// 2月の日数はうるう年を判定後
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

//年を加算
function addyear(){
	nen=nen+1;
	hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
//月を加算
function addmonth(){
	tuk=tuk+1;
	hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
//年を減算
function subtyear(){
	nen=nen-1;
	hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
//月を減算
function subtmonth(){
	tuk=tuk-1;
	hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
//年月を生成
function tsukihi(){
	
	var theday = new Date(nen,tuk-1,1)
	you=theday.getDay();

}
//表示年月が現在年月でないなら年月表示を斜体表示
function nengetuStyle(){

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


//今日の日数が１になるまで曜日を減算することで、you　を１日の曜日にする ：
for(i=nit;i>1;i--){
	if(you==0){
		you=6;
	} 
	else{
		you--;
	}
}

//html生成
function strMake(){

	//うるう年の判定
	if(tuk==2){
		if(f_isuruu(nen)){
			max[2]=29;
		}else{
			max[2]=28;
		}
	}

	//年移動ボタン
	strHTML="<div><span onclick='addyear();' class='hand'>▲<\/span><span onclick='subtyear();' class='hand'>▽<\/span>";
	//年月表示	
	strHTML=strHTML+"<span style='"+myStyle+"'>"+nen+"/<\/span>";
	strHTML=strHTML+"<span style='"+myStyle+"'>"+tuk+"<\/span>";
	//月移動ボタン
	strHTML=strHTML+"<span onclick='addmonth();' class='hand'>▲<\/span><span onclick='subtmonth();' class='hand'>▽<\/span><\/div>";
	//表作成
	strHTML=strHTML+"<TABLE border='3'>";
	strHTML=	strHTML+
			"<tr>" + 
				"<td><span class='red'>日<\/span><\/td>"+
				"<td>月<\/td>"+
				"<td>火<\/td>"+
				"<td>水<\/td>"+
				"<td>木<\/td>"+
				"<td>金<\/td>"+
				"<td>土<\/td>"+
			"<\/tr>";

	var strGyo="<tr>";
	var strCol="";
	hizuke=1;//月の初日の日付

	//行作成 日曜日が月の最初の日になれば４行（４週分）で済むが、そうではないので最大６行必要　i = 0 ～ 5
	for(i=0;i<6;i++){

		//列作成 j = 0(日曜） ～ 6(土曜)七曜日分７列をループする
		for(j=0;j<7;j++){
			//今日の日付ならマークする
			if(nen==nownen & tuk==nowtuk & hizuke==nit){ 								
				strCol=strCol+"<td class='yellow'>";				
			}else {
				strCol=strCol+"<td>";
			}

			/*
			当月日？　you-->0 たとえば１日が水曜（３）だった場合、１づつ減算して０になるまでは「・」でセルを埋めていく。
			当月の末日日よりhizukeが大きければやはり「・」でセルを埋める。
			*/
			if(you-->0 || hizuke>max[tuk]){
				strCol=strCol+"・";
			}else{
				//祝日ならok=1　１月１日は１０１として判定する。昭和の日、緑の日は年によって異なる。
				f_shuku(tuk*100+hizuke,nen); 
				
				//日曜と祝日は赤表示
				if(j==0 || ok==1){ 
					strCol=strCol+"<span class='red'>";
					strCol=strCol+hizuke++;
					strCol=strCol+"<\/span>";
	
					//振替休日？日曜で且つ祝日なら、次のループで祝日扱い
					if(j==0 && ok==1){
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




