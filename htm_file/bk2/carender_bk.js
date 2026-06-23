/*
>>>>1851-2150 カレンダー 2005年の祝日法までに対応<<<<<

関連ファイル：
carender.css　⇒スタイルシート
carender_func.js　⇒汎用性のある関数群を分けて収録した

プレフィックス f_ で始まる関数は carender_func.js 内に収録
*/

var now = new Date();
var tuk = now.getMonth()+1; // カレンダー表示の月（現在月とは限らない)
var nen;//　カレンダー表示の年（現在年とは限らない）
var nownen;// 現在年
var nowtuk = now.getMonth()+1;//現在月
var nit = now.getDate(); //今日の日付
var you = now.getDay(); //曜日（日曜日が０）
var hizuke; //日付
var ok = 0; //祝日なら 1以上
var shukuName;//祝日名称     
var i,j;//カウンター用変数
var myStyle;


//ブラウザ判定⇒現在年の取得
if(f_brhantei()==true){
	//alert('IE');
	var nen=now.getYear();
}
else{
	//alert('IE以外');
	var nen=now.getYear()+1900;
}

nownen=nen;

max = new Array(12); //１月から１２月までのその月の日数
max[1]=31;
//max[2]=29;

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

/*
年を加算 春分日・秋分日の算出式の対応範囲が１９８０～２１００という事。
理屈が判らないので、この式の対応範囲のカレンダーとする。
*/
function addyear(){
	nen=nen+1;
	if(nen>2150){
		nen=1851;
	}
	hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
//月を加算
function addmonth(){
	tuk=tuk+1;
	if(tuk>12){
		tuk=tuk-12;
		nen=nen+1;
	}
	hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
//年を減算
function subtyear(){
	nen=nen-1;
	if(nen<1851){nen=2150;}
	hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
//月を減算
function subtmonth(){
	tuk=tuk-1;
	if(tuk<1){
		tuk=12+tuk;
		nen=nen-1;
	}
	if(nen<1){
		nen=1;
	}
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


//今日の日数が１になるまで曜日を減算することで、you　を１日(ついたち）の曜日にする ：
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

	if(f_isuruu(nen)){
		max[2]=29;
	}else{
		max[2]=28;
	}

	//年移動ボタン
	strHTML="<div><span onclick='addyear();' class='hand'>▲<\/span><span onclick='subtyear();' class='hand'>▽<\/span>";
	//年月表示	
	strHTML=strHTML+"<span style='"+myStyle+"'>"+nen+"/<\/span>";
	strHTML=strHTML+"<span style='"+myStyle+"'>"+tuk+"<\/span>";
	//月移動ボタン
	strHTML=
		strHTML+"<span onclick='addmonth();' class='hand'>▲<\/span><span onclick='subtmonth();' class='hand'>"
		+ "▽<\/span><span class='komoji'>2005年祝日法改正まで対応<\/span><\/div>";
	//表作成
	strHTML=strHTML+"<table border='3'>";
	strHTML=	strHTML+
			"<tr style='font-weight:bold;'>" + 
				"<td><span class='red'>日<\/span><\/td>"+
				"<td>月<\/td>"+
				"<td>火<\/td>"+
				"<td>水<\/td>"+
				"<td>木<\/td>"+
				"<td>金<\/td>"+
				"<td><span class='blue'>土<\/span><\/td>"+
			"<\/tr>";

	var strGyo="<tr>";
	var strCol="";
	hizuke=1;//月の初日の日付

	//行作成 日曜日が月の最初の日になれば４行（４週分）で済むが、そうではないので最大６行必要　i = 0 ～ 5
	for(i=0;i<6;i++){

		//列作成 j = 0(日曜） ～ 6(土曜)七曜日分７列をループする
		for(j=0;j<7;j++){
			//今日の日付ならマークする you>=0の内は hizuke=1のままで、今日が１日だと「&nbsp;」のセルがマークされてしまう事を回避している。
			if(nen==nownen && tuk==nowtuk && hizuke==nit && you<1){ 								
				strCol=strCol+"<td class='yellow'";				
			}else{
				strCol=strCol+"<td";
			}

			/*
			当月日？　you-->0 たとえば１日が水曜（３）だった場合、１づつ減算して０になるまでは「&nbsp;」でセルを埋めていく。
			当月の末日日よりhizukeが大きくても「&nbsp;」でセルを埋める。
			*/
			if(you-->0 || hizuke>max[tuk]){
				//strCol=strCol+">&nbsp;";
				//曜日の画像表示
				switch(j){
					case 0:
						strCol=strCol+" class='sun'>&nbsp;";
						break;
					case 1:
						strCol=strCol+" class='mon'>&nbsp;";
						break;
					case 2:
						strCol=strCol+" class='tue'>&nbsp;";
						break;
					case 3:
						strCol=strCol+" class='wed'>&nbsp;";
						break;
					case 4:
						strCol=strCol+" class='thu'>&nbsp;";
						break;
					case 5:
						strCol=strCol+" class='fri'>&nbsp;";
						break;
					case 6:
						strCol=strCol+" class='sat'>&nbsp;";
						break;
				}
			}else{
				//祝日ならok=1　１月１日は１０１として判定する。昭和の日、緑の日は年によって異なる。
				//引数、上記表示形式の月日、西暦年、曜日、月の最大日数、前の月の最大日
				f_isshuku(tuk*100+hizuke, nen, j, max[tuk], max[tuk - 1]); 
					
				//土日でない平日
				if(j != 0 && j != 6 && ok== 0){
					strCol=strCol+">"+hizuke++;
				}else{
					//春分・秋分日（法令上の休日とは限らない)はオレンジ表示
					//if(j != 0 && ok==2){
					if(ok==2){
						strCol=strCol+"><span class='orange'>";
						strCol=strCol+hizuke++;

						if(shukuName != ''){							
							strCol=strCol+"<\/span><br><span class='shukuname'>"+shukuName+"<\/span>";
						}else{
							strCol=strCol+"<\/span>";
						}
					}

					//祝日でない土曜は青表示
					if(j==6 && ok==0){
						strCol=strCol+"><span class='blue'>";
						strCol=strCol+hizuke++;
						strCol=strCol+"<\/span>";
					}

					//日曜と祝日は赤表示
					if((j==0 || ok==1) && ok !=2){ 
					
						strCol=strCol+"><span class='red'>";
						strCol=strCol+hizuke++;

						if(shukuName != ''){							
							strCol=strCol+"<\/span><br><span class='shukuname'>"+shukuName+"<\/span>";
						}else{
							strCol=strCol+"<\/span>";
						}

					}
				}
				//うるう日表示：hizukeが加算されちゃってるので２９＋１＝３０で判断する
				if(tuk==2 && hizuke==30){
					strCol=strCol+"<br><span class='shukuname'>うるう日<\/span>";
				}

			}
			
			strCol=strCol+"<\/td>";
			//alert("<\/td>の挿入!  " + strCol);
		}//列作成ループの〆

		strCol=strCol+"<\/tr>";

	}//行作成ループの〆


	strHTML=strHTML+strGyo+strCol+"<\/table>";//表作成の〆

	//春分・秋分の脚注
	if(tuk==3){
		strHTML=strHTML+'<div style="padding:0.2em;"><span class="komoji">'
		 + '※春分日が法令上の春分の日となる保証はありません。(2010現在までの実績としては一致)<\/div>'
	}
	if(tuk==9){
		strHTML=strHTML+'<div style="padding:0.2em;"><span class="komoji">'
		 + '※秋分日が法令上の秋分の日となる保証はありません。(2010現在までの実績としては一致)<\/p>'	
	}
	//alert(strHTML);
	nengetuStyle()
	return strHTML;
	
}
window.onload=function(){nengetuStyle();hyouji();}
