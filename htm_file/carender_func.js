var m_SubOk = 0;//下請け関数 sub_isshuku 内で旗日の場合1 か 2 が代入される。
var m_Furikae = 0;//祝日と日曜が重なれば、振替処理が決まるまで 1 を保持する変数
var m_MaebiShukuName = '';//常に前日の祝日名を記憶している変数
/*
xデーが休日かどうかを判定　昭和の日と緑の日は年によって変わる
緑の日：2007年より5月4日。1989年から2006年までは4月29日
昭和の日：平成19年（2007年）から加わった。4月29日
日付の変動する休日は後半で計算により求める。
x　は、１月１日を 101 とした値。月＊１００＋日
y　は、西暦４桁年
you は、曜日（０が日曜）
maemaxdate は前月の最大日
国民の休日は別途判定
*/
function f_isshuku(x, y, you, maxdate, maemaxdate){

	var ok_mae = 0;//前の日が祝日なら１以上
	var ok_ato = 0;//次の日が祝日なら１以上
	var maebi = 0;//前の日の日
	var atobi = 0;//次の日の日
	var y_mae = 0;//前の日の年
	var y_ato = 0;//次の日の年
	var you_mae = 0;//前の日の曜日
	var you_ato = 0;//次の日の曜日

	var atobiShukuName = '';//翌日の祝日名用変数
	var xDayShukuName = '';//xデーが旗日なら祝日名が代入される

	//国民の休日・振替休日以外の判定
	xDayShukuName = sub_isshuku(x, y, you)
	g_Ok = m_SubOk;

	//振替休日-判定の過程で //1973年（昭和48年）4月12日から、
	//日曜と祝日の条件が成立すれば m_Furikae フラグ値を 1 にする。
	if((y == 1973) && (x > 411) || (y > 1973)){
		if((m_SubOk > 0) && (you == 0)){
			m_Furikae = 1;
		}
	}
	//1973年（昭和48年）4月12日から、
	//2006年までは翌日の月曜のみが振替休日になる
	//2007年1月１日より祝日が日曜日となった日の後の最初の平日
	if(y >= 2007){
		if(m_Furikae == 1 && m_SubOk == 0 && you != 0){
			g_Ok = 1;
			//前日の祝日名を記憶
			m_MaebiShukuName = '振替休日';
			m_Furikae = 0;
			return '振替休日';
		}
	}else{
		if(y == 1973){
			if(x > 411){
				if(you == 1 && (m_SubOk > 0)){
					//祝日の月曜日があれば振替モードはキャンセルされる
					m_Furikae = 0;
				}
				if(m_Furikae == 1 && you == 1 && (m_SubOk == 0)){
					
					m_Furikae = 0;
					g_Ok = 1;
					m_MaebiShukuName = '振替休日';
					return '振替休日'
				}
			}
		}
		if(y >= 1974){
			if(you == 1 && g_Ok > 0){
				//祝日の月曜日があれば振替モードはキャンセルされる
				m_Furikae = 0;
			}
			if(m_Furikae == 1 && you == 1 && m_SubOk == 0){
				m_Furikae = 0;
				g_Ok = 1;
				m_MaebiShukuName = '振替休日';
				return '振替休日'
			}
		}
	}

	//国民の休日　>=１９８６年ならば、祝日と祝日に挟まれた平日
	if((m_SubOk == 0) && (y >= 1986)){

		//前の日
		if(m_MaebiShukuName == ''){
			ok_mae = 0;
		}else{
			ok_mae = 1;
		}
		//次の日
		if(parseInt(x + 1) % 100 == maxdate + 1){
			if((parseInt(x / 100) + 1) > 12){
				atobi = 101;
				y_ato = y + 1;
			}else{
				atobi = (parseInt(x / 100) + 1) * 100 + 1;
				y_ato = y;
			}
		}else{
			atobi = x + 1;
			y_ato = y;
		}
		if((you + 1) > 6){
			you_ato = 0;
		}else{
			you_ato = you + 1;
		}

		atobiShukuName = sub_isshuku(atobi, y_ato, you_ato);
		ok_ato = m_SubOk;

		if(ok_mae * ok_ato > 0){
			if(you != 0){
				g_Ok = 1;
				//ここは初期化
				m_MaebiShukuName = '';
				return '国民の休日'
			}
		}
	}
	m_MaebiShukuName = xDayShukuName;
	return xDayShukuName;
}

function sub_isshuku(x, y, you){
	
	//m_SubOk は、旗日であれば 1 か 2。
	//以下の２行は 2 に分類している。
	//春・秋分日は天文学上の日付と同じになる保証がない。
	//他機関によって対応がまちまちである休日。
	m_SubOk = 0;

	//固定した月日で判断できる祝日
	switch(x){
		case 101:
			if(y >= 1949){
				m_SubOk = 1;
				return '元日';
			}
			break;
		case 103:
			if(y <= 1948){
				m_SubOk = 1;
				return '元始祭';
			}
			break;
		case 105:
			if(y <= 1948){
				m_SubOk = 1;
				return '新年宴会';
			}
			break;
		case 223:
			if(y >= 2020){
				m_SubOk = 1;
				return '天皇誕生日';
			}
			break;			
		case 211:
			if(y <=1948){
				m_SubOk = 1;
				return '紀元節';
			}
			if(y >=1967){
				m_SubOk = 1;
				return '建国記念の日';
			}
			break;
		case 224:
			if(y == 1989){
				m_SubOk = 2;
				return '昭和天皇の大喪の礼';
			}
			break;
		case 403:
			if(y <=1948){
				m_SubOk = 1;
				return '神武天皇祭';
			}
			break;
		case 410:
			if(y == 1959){
				m_SubOk = 2;
				return '皇太子・明仁親王の結婚の儀';
			}
			break;
		case 429:
			if(y >=1927 && y <= 1948){
				m_SubOk = 1;
				return '天長節';
			}
			if(y >=1949 && y <= 1988){
				m_SubOk = 1;
				return '天皇誕生日';
			}
			if(y >= 1989 && y <= 2006){
				m_SubOk = 1;
				return 'みどりの日';
			}
			if(y >= 2007){
				m_SubOk = 1;
				return '昭和の日';
			}
			break;
		case 501:
			if(y == 2019){
				m_SubOk = 1;
				return '天皇の即位の日';
			}
			break;			
		case 503:
			if(y >= 1949){
				m_SubOk = 1;
				return '憲法記念日';
			}
			break;
		case 504:
			if(y >= 2007){
				m_SubOk = 1;
				return 'みどりの日';
			}
			break;
		case 505:
			if(y >=1949){
				m_SubOk = 1;
				return 'こどもの日';
			}
			break;
		case 609:
			if(y == 1993){
				m_SubOk = 2;
				return '皇太子・徳仁親王の結婚の儀';
			}
			break;
		case 722:// 2021年「海の日」は特例で0722
			if(y == 2021){
				m_SubOk = 1;
				return '海の日';
			}
			break;				
		case 723:
			// 2020年「海の日」は特例で0723
			if(y == 2020){
				m_SubOk = 1;
				return '海の日';
			}
			// 2021年「スポーツの日」は特例で0723
			if(y == 2021){
				m_SubOk = 1;
				return 'スポーツの日';
			}			
			break;	
		case 724:// 2020年「スポーツの日」は特例で0724
			if(y == 2020){
				m_SubOk = 1;
				return 'スポーツの日';
			}
			break;						
		case 730:
			if(y <=1926){
				m_SubOk = 1;
				return '先帝祭(明治天皇祭)';
			}
			break;
		case 808: // 2021「山の日」は特例で0808
			if(y ==2021){
				m_SubOk = 1;
				return '山の日';
			}
			break;				
		case 810: // 2020「山の日」は特例で0810
			if(y ==2020){
				m_SubOk = 1;
				return '山の日';
			}
			break;	
			
		case 811:
			if(y >=2016 && y != 2020 && y != 2021){
				m_SubOk = 1;
				return '山の日';
			}
			break;
			
		case 831:
			if(y <=1926){
				m_SubOk = 1;
				return '天長節';
			}
			break;
		case 1017:
			if(y <= 1947){
				m_SubOk = 1;
				return '神嘗祭';
			}
			break;
		case 1022:
			if(y == 2019){
				m_SubOk = 1;
				return '即位礼正殿の儀';
			}
			break;			
		case 1031:
			if(y >= 1913 && y <= 1926){
				m_SubOk = 1;
				return '天長節祝日';
			}
			break;
		case 1103:
			m_SubOk = 1;
			if(y >= 1927 && y <=1947){
				return '明治節';
			}
			if(y >= 1948){
				return '文化の日';
			}
			break;
		case 1112:
			if(y == 1990){
				m_SubOk = 2;
				return '即位の礼正殿の儀';
			}
			break;
		case 1123:
			m_SubOk = 1;
			if(y <= 1947){
				return '新嘗祭';
			}
			if(y >= 1948){
				return '勤労感謝の日';
			}
			break;
		case 1223:
			if(y >= 1989 && y <= 2018){
				m_SubOk = 1;
				return '天皇誕生日';
			}
			break;
		case 1225:
			if(y >= 1927 && y <= 1947){
				m_SubOk = 1;
				return '先帝祭(大正天皇祭)';
			}
	}

	//成人の日 >=2000の１月第二月曜日<2000なら1/15
	if(y >= 1949 && y <= 1999){
		if(x == 115){
			m_SubOk = 1;
			return '成人の日';
		}
	}
	if(y >= 2000){
		//8日-14日にある月曜日が成人の日
		if(x > 107 && x < 115 && you == 1){
			m_SubOk = 1;
			return '成人の日';
		}
	}

	//春分日（祝日法上の「春分の日」になるとは限らない）
	if(parseInt(x / 100) == 3){
		var shunbi = Syunbun(y, 3);

		if(x == 300 + shunbi){
			m_SubOk = 2;
			if(y <= 1948){
				return '春季皇霊祭';
			}else{
				return '春分日';
			}
		}
	}

	//秋分日（祝日法上の「秋分の日」になるとは限らない）
	if(parseInt(x / 100) == 9){
		var shuubi = Syunbun(y, 9);

		if(x == 900 + shuubi){
			m_SubOk = 2;
			if(y <= 1947){
				return '秋季皇霊祭';
			}else{
				return '秋分日';
			}
		}
	}

	//海の日判定
	if(parseInt(x / 100) == 7){
		if(y < 2003 && y > 1995){
			if(x == 720){
				m_SubOk = 1;
				return '海の日';
			}
		}
		if(y > 2002 && y != 2020 && y != 2021){
		//15日-21日にある月曜日が海の日
			if(x > 714 && x < 722){
				if(you  == 1){
					m_SubOk = 1;
					// 2020年「海の日」は特例で0723
					// 2021年「海の日」は特例で0722
					return '海の日';
				}
			}
		}
	}
	

	//敬老の日 ９月の第３月曜日。<2003年までは９／１５
	if(parseInt(x / 100) == 9){

		if(y >= 1966 && y <= 2002){
			if(x == 915){
				m_SubOk = 1;
				return '敬老の日';
			}
		}
		if(y >= 2003){
		//15日-21日にある月曜日が敬老の日
			if(x > 914 && x < 922){
				if(you  == 1){
					m_SubOk = 1;
					return '敬老の日';
				}
			}
		}
	}
	
	//体育の日　2000年（平成12年）からは「ハッピーマンデー制度」の適用により、10月の第2月曜日
	if(parseInt(x / 100) == 10){
		if(y >= 1966 && y <= 1999){
			if(x == 1010){
				m_SubOk = 1;
				return '体育の日';
			}
		}
		
		if(y >= 2000){
			//8日-14日にある月曜日が体育の日
			if(x > 1007 && x < 1015){
				if(you  == 1){
					// 2020年「スポーツの日」は特例で0724
					// 2021年「スポーツの日」は特例で0723
					if(y >= 2022){
						m_SubOk = 1;
						return 'スポーツの日'; 
					}else{
						//alert(y);
						if(y != 2020 && y != 2021){
							m_SubOk = 1;
							return '体育の日';
						}
					}
				}
			}
		}
		
	}
	m_SubOk = 0;
	return '';
}

//ブラウザ判定
//IE:TRUE;Except:FALSE;
function f_brhantei(){

	var naviN=window.navigator.appName;
	var naviNv=window.navigator.appVersion;
/*
	document.write(naviN);
	document.write('<br>');
	document.write(naviNv);
*/
	if(naviN=="Microsoft Internet Explorer"){
		return true;
	}
/*
	document.write('<br>');
	document.write(naviN.substring(0,5)=="Opera");
	document.write('<br>');
	document.write(naviNv.substring(0,4));
*/
    if(naviN.substring(0,5)=="Opera" && eval(naviNv.substring(0,4))>=9.50 && eval(naviNv.substring(0,4))<9.80){
//	document.write('<br>'+'ＯＰＥＲＡと判断された');
		return true;	    
    }
	else{
		return false;
	}
}
/*
 4の倍数年で100の倍数年でない年はうるう年、
ただし400の倍数年はうるう年。
西暦年をテストして、うるう年であればＴＲＵＥを返す
*/
function f_isuruu(y){

	if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0){
		return true;
	}else{
		return false;
	}
}


//1851-2150の範囲で春分・秋分を算出出来る式らしい式。
//M.Suzukiさん、こよみのページhttp://koyomi.vis.ne.jp/　から盗用しています。
//引用：「使用した式は「新こよみの便利帳」（恒星社厚生閣刊）という本に紹介されたものです。」
var Syunbunpar1 = new Array(19.8277,20.8357,20.8431,21.8510);
var Syunbunpar2 = new Array(22.2588,23.2588,23.2488,24.2488);
function Syunbun(year,month)	
{
var ans,p1;
if ((year >= 1851) && (year <= 1899)) p1 = 0;
else if ((year >= 1900) && (year <= 1979)) p1 = 1;
else if ((year >= 1980) && (year <= 2099)) p1 = 2;
else if ((year >= 2100) && (year <= 2150)) p1 = 3;
else return 0;	
if (month == 3) {
ans = Math.floor(Syunbunpar1[p1] + 0.242194 * (year - 1980) - Math.floor((year - 1980 + 0.01)/4));
} else if (month == 9) {
ans = Math.floor(Syunbunpar2[p1] + 0.242194 * (year - 1980) - Math.floor((year - 1980 + 0.01)/4));
} else ans = 0;	
return ans;
}