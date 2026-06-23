/*
>>>>1912.9-2150 カレンダー 祝日法2018年6月改正までに対応<<<<<

関連ファイル：
carender.css　⇒スタイルシート
carender_func.js　⇒汎用性のある関数群を分けて収録した

プレフィックス f_ で始まる関数は carender_func.js 内に収録
*/

/* ---------------　carender_func.js との共用変数 --------------- */
var g_Ok = 0; //祝日なら 1以上

/* ---------------　モジュールレベル変数 　---------------　*/
var m_Now = new Date();
var m_Tuk = m_Now.getMonth() + 1; // カレンダー表示の月（現在月とは限らない)
var m_Nen;//カレンダー表示の年（現在年とは限らない）
var m_Nownen;//現在年
var m_Nowtuk = m_Now.getMonth() + 1;//現在月
var m_Nit = m_Now.getDate(); //今日の日付
var m_You = m_Now.getDay(); //今日の曜日（日曜日が０）
var m_Hizuke; //日付
var m_MyStyle;//CSS の文字列用


//ブラウザ判定⇒現在年の取得
if(f_brhantei()==true){
	//alert('IE');
	var m_Nen = m_Now.getYear();
}
else{
	//alert('IE以外');
	var m_Nen = m_Now.getYear() + 1900;
}

m_Nownen = m_Nen;
m_Max = new Array(12); //１月から１２月までのその月の日数
m_Max[1]=31;
//m_Max[2]=29;

m_Max[3]=31;
m_Max[4]=30;
m_Max[5]=31;
m_Max[6]=30;
m_Max[7]=31;
m_Max[8]=31;
m_Max[9]=30;
m_Max[10]=31;
m_Max[11]=30;
m_Max[12]=31;

/*
年を加算 Wikipedia で遡る事ができる祝日が1912.9月4日まで、
春分日秋分日の計算式で算出範囲が2150年までなので
1912.9.4～2150.12の範囲でのカレンダー
*/
//const m_YMax = 2150; //IEが未サポート
//const m_YMin = 1912; //IEが未サポート
var m_YMax = 2150;
var m_YMin = 1912;
function addyear(){
	m_Nen = m_Nen + 1;
	if(m_Nen > m_YMax){
		m_Nen = m_YMin;
	}
	if(m_Nen == m_YMin && m_Tuk < 9){
		m_Tuk = 9;
	}
	m_Hizuke = 1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
//月を加算
function addmonth(){
	m_Tuk = m_Tuk + 1;
	if(m_Tuk > 12){
		m_Tuk = m_Tuk - 12;
		m_Nen = m_Nen + 1;
	}
	if(m_Nen > m_YMax){
		m_Nen = m_YMin;
	}
	if(m_Nen == m_YMin && m_Tuk < 9){
		m_Tuk = 9;
	}
	m_Hizuke = 1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
//年を減算
function subtyear(){
	m_Nen = m_Nen - 1;
	if(m_Nen < m_YMin){m_Nen = m_YMax;}
	if(m_Nen == m_YMin && m_Tuk < 9){m_Tuk = 9;}
	m_Hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}
//月を減算
function subtmonth(){
	if(m_Nen <= m_YMin){
		m_Tuk = m_Tuk -1;
		if(m_Tuk < 9){
			m_Tuk = 12;
			m_Nen = m_YMax;
		}
	}else{
		m_Tuk = m_Tuk - 1;
		if(m_Tuk < 1){
			m_Tuk = 12 + m_Tuk;
			m_Nen = m_Nen - 1;
		}
		if(m_Nen < 0){
			m_Nen = m_YMax;
		}
	}
	m_Hizuke=1;
	tsukihi();
	nengetuStyle();
	hyouji();
}

//年月を生成
function tsukihi(){
	var theday = new Date(m_Nen, m_Tuk - 1, 1)
	m_You = theday.getDay();
}

//表示年月が現在年月でないなら年月表示を斜体表示
function nengetuStyle(){
	//alert('nengetuStyle');
	if(m_Nen == m_Nownen && m_Tuk == m_Nowtuk){
		m_MyStyle = 'font-weight:bold';
	}else{
		m_MyStyle = 'font-style:oblique';
	}
	//alert('nengetuStyle');
}
//今日の日数が１になるまで曜日を減算することで、m_You　を１日(ついたち）の曜日にする ：
function makeStartDay(){
	for(i = m_Nit; i > 1; i--){
		if(m_You == 0){
			m_You = 6;
		} 
		else{
			m_You--;
		}
	}
}

//カレンダー書き換え
function hyouji(){
	document.getElementById("divCarender").innerHTML=strMake();
}

//html生成
function strMake(){

	var i=0, j=0;//カウンター用変数
	var shukuName='';//祝日名称
	
	//うるう年の判定
	//alert('strMake');
	if(f_isuruu(m_Nen)){
		m_Max[2] = 29;
	}else{
		m_Max[2] = 28;
	}
	
	//年移動ボタン
	strHTML = "<div><span onclick = 'addyear();' class = 'hand'>▲<\/span><span onclick='subtyear();' class='hand'>▽<\/span>";
	//年月表示	
	strHTML = strHTML + "<span style='" + m_MyStyle+"'>" + m_Nen + "/<\/span>";
	strHTML = strHTML + "<span style='" + m_MyStyle+"'>" + m_Tuk + "<\/span>";
	//月移動ボタン
	strHTML=
		strHTML + "<span onclick='addmonth();' class='hand'>▲<\/span><span onclick='subtmonth();' class='hand'>"
		+ "▽<\/span><span class='komoji'>祝日法：2014年（平成26年）5月30日 - 改正まで対応<\/span><\/div>";
	//表作成
	strHTML = strHTML + "<table border='3'>";
	strHTML = strHTML+
			"<tr style='font-weight:bold;'>" + 
				"<td><span class='red'>日<\/span><\/td>"+
				"<td>月<\/td>"+
				"<td>火<\/td>"+
				"<td>水<\/td>"+
				"<td>木<\/td>"+
				"<td>金<\/td>"+
				"<td><span class='blue'>土<\/span><\/td>"+
			"<\/tr>";

	var strGyo = "<tr>";
	var strCol = "";
	m_Hizuke = 1;//月の初日の日付

	//行作成 日曜日が月の最初の日になれば４行（４週分）で済むが、そうではないので最大６行必要　i = 0 ～ 5
	for(i = 0; i < 6; i++){
		//列作成 j = 0(日曜） ～ 6(土曜)七曜日分７列をループする
		for(j=0; j < 7; j++){
			//今日の日付ならマークする m_You>=0の内は m_Hizuke = 1のままで、今日が１日だと「&nbsp;」のセルがマークされてしまう事を回避している。
			if(m_Nen == m_Nownen && m_Tuk == m_Nowtuk && m_Hizuke == m_Nit && m_You<1){ 								
				strCol = strCol + "<td class = 'yellow'";				
			}else{
				strCol = strCol + "<td";
			}

			/*
			当月日？　m_You-->0 たとえば１日が水曜（３）だった場合、１づつ減算して０になるまでは「&nbsp;」でセルを埋めていく。
			当月の末日日よりm_Hizukeが大きくても「&nbsp;」でセルを埋める。
			*/
			if(m_You-- > 0 || m_Hizuke > m_Max[m_Tuk]){
				//strCol=strCol+">&nbsp;";
				//曜日の画像表示
				switch(j){
					case 0:
						strCol = strCol+" class='sun'>&nbsp;";
						break;
					case 1:
						strCol = strCol+" class='mon'>&nbsp;";
						break;
					case 2:
						strCol = strCol+" class='tue'>&nbsp;";
						break;
					case 3:
						strCol = strCol+" class='wed'>&nbsp;";
						break;
					case 4:
						strCol = strCol+" class='thu'>&nbsp;";
						break;
					case 5:
						strCol = strCol+" class='fri'>&nbsp;";
						break;
					case 6:
						strCol = strCol+" class='sat'>&nbsp;";
						break;
				}
			}else{
				//祝日ならg_Ok=1 １月１日は１０１として判定する。昭和の日、緑の日は年によって異なる。
				//引数、上記表示形式の月日、西暦年、曜日、月の最大日数、前の月の最大日
				shukuName = f_isshuku(m_Tuk * 100 + m_Hizuke, m_Nen, j, m_Max[m_Tuk], m_Max[m_Tuk - 1]); 
					
				//土日でない平日
				if(j != 0 && j != 6 && g_Ok== 0){
					strCol = strCol + ">" + m_Hizuke++;
				}else{
					//春分・秋分日（法令上の休日とは限らない)はオレンジ表示
					//if(j != 0 && g_Ok == 2){
					if(g_Ok == 2){
						strCol = strCol + "><span class='orange'>";
						strCol = strCol + m_Hizuke++;

						if(shukuName != ''){							
							strCol = strCol + "<\/span><br><span class='shukuname'>" + shukuName+"<\/span>";
						}else{
							strCol = strCol + "<\/span>";
						}
					}

					//祝日でない土曜は青表示
					if(j == 6 && g_Ok == 0){
						strCol = strCol + "><span class='blue'>";
						strCol = strCol + m_Hizuke++;
						strCol = strCol + "<\/span>";
					}

					//日曜と祝日は赤表示
					if((j == 0 || g_Ok == 1) && g_Ok != 2){ 
					
						strCol = strCol + "><span class='red'>";
						strCol = strCol + m_Hizuke++;

						if(shukuName != ''){							
							strCol = strCol + "<\/span><br><span class='shukuname'>" + shukuName+"<\/span>";
						}else{
							strCol = strCol + "<\/span>";
						}
					}
				}
				//うるう日表示：m_Hizukeが加算されちゃってるので２９＋１＝３０で判断する
				if(m_Tuk == 2 && m_Hizuke == 30){
					strCol = strCol + "<br><span class = 'shukuname'>うるう日<\/span>";
				}
			}
			strCol = strCol + "<\/td>";
			//alert("<\/td>の挿入!  " + strCol);
		}//列作成ループの〆
		strCol = strCol + "<\/tr>";
	}//行作成ループの〆

	strHTML = strHTML + strGyo + strCol + "<\/table>";//表作成の〆

	//春分・秋分の脚注
	if(m_Tuk == 3){
		strHTML = strHTML + '<div style="padding:0.2em;"><span class="komoji">'
		 + '※春分日が法令上の春分の日となる保証はありません。(2016現在までの実績としては一致)<\/div>'
	}
	if(m_Tuk == 9){
		strHTML = strHTML + '<div style="padding:0.2em;"><span class="komoji">'
		 + '※秋分日が法令上の秋分の日となる保証はありません。(2016現在までの実績としては一致)<\/p>'	
	}
	//alert(strHTML);
	nengetuStyle()
	return strHTML;
}
window.onload=function(){makeStartDay();nengetuStyle();hyouji();}
