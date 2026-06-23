//ブラウザ判定
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

/*
xデーが休日かどうかを判定　昭和の日と緑の日は年によって変わる
緑の日：2007年より5月4日。1989年から2006年までは4月29日
昭和の日：平成19年（2007年）から加わった。4月29日
x　は、１月１日を 101 とした値。月＊１００＋日
ｙ　は、西暦４桁年
*/
function f_shuku(x,y){

	shukuName = "";//初期化
	//固定した月日で判断できる祝日
	switch(x){
		case 101:
			ok=1;
			shukuName='元旦';
			break;
		case 115:
			//１９９９年までは１／１５
			if(y<2000){
				ok=1;
				shukuName='成人の日';
			}
			break;
		case 211:
			ok=1;
			shukuName='建国記念の日';
			break;
		case 429:
			ok=1;
			if(y<2007){
				shukuName='緑の日';
			}else{
				shukuName='昭和の日';
			}
			break;
		case 503:
			ok=1;
			shukuName='憲法記念日';
			break;
		case 504:
			if(y>2006){
				ok=1;
				shukuName='緑の日';
			}
			break;
		case 505:
			ok=1;
			shukuName='こどもの日';
			break;
		case 113:
			ok=1;
			shukuName='文化の日';
			break;
		case 1123:
			ok=1;
			shukuName='勤労感謝の日';
			break;
		case 1223:
			ok=1;
			shukuName='天皇誕生日';
			break;
			
		
	}

	/*固定した月日で判定できない祝日
		春分の日　「天文計算上2025年までは閏年とその翌年が3月20日になり、その他の年は3月21日となる。
			また、現行の祝日法ができる以前ではあるが1923年の春分は3月22日であり、
			また、2092年の春分は3月19日となる。」（ｂｙ　Wiki)
		海の日	７月の第３月曜日.<2003年までは７／２０
		秋分の日　２０１１年までは９／２３　２０４４年まではうるう年に限り９／２２、２１０３年は９／２４（ｂｙ　Wiki)
		敬老の日	９月の第３月曜日。<2003年までは９／１５
		体育の日	１０月の第２月曜日
		国民の休日　>１９８７年ならば、祝日と祝日に挟まれた日
		振替休日　＞２００６年。国民の祝日が日曜日となった日の後の最初の平日
	*/
/*

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
*/
}