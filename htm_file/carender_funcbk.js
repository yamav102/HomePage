var m_SubOk = 0;//‰º¿‚¯ŠÖ” sub_isshuku “à‚ÅŠø“ú‚Ìê‡1 ‚© 2 ‚ª‘ã“ü‚³‚ê‚éB
var m_Furikae = 0;//j“ú‚Æ“ú—j‚ªd‚È‚ê‚ÎAU‘Öˆ—‚ªŒˆ‚Ü‚é‚Ü‚Å 1 ‚ğ•Û‚·‚é•Ï”
var m_MaebiShukuName = '';//í‚É‘O“ú‚Ìj“ú–¼‚ğ‹L‰¯‚µ‚Ä‚¢‚é•Ï”
/*
xƒf[‚ª‹x“ú‚©‚Ç‚¤‚©‚ğ”»’è@º˜a‚Ì“ú‚Æ—Î‚Ì“ú‚Í”N‚É‚æ‚Á‚Ä•Ï‚í‚é
—Î‚Ì“úF2007”N‚æ‚è5Œ4“úB1989”N‚©‚ç2006”N‚Ü‚Å‚Í4Œ29“ú
º˜a‚Ì“úF•½¬19”Ni2007”Nj‚©‚ç‰Á‚í‚Á‚½B4Œ29“ú
“ú•t‚Ì•Ï“®‚·‚é‹x“ú‚ÍŒã”¼‚ÅŒvZ‚É‚æ‚è‹‚ß‚éB
x@‚ÍA‚PŒ‚P“ú‚ğ 101 ‚Æ‚µ‚½’lBŒ–‚P‚O‚O{“ú
y@‚ÍA¼—ï‚SŒ…”N
you ‚ÍA—j“úi‚O‚ª“ú—jj
maemaxdate ‚Í‘OŒ‚ÌÅ‘å“ú
‘–¯‚Ì‹x“ú‚Í•Ê“r”»’è
*/
function f_isshuku(x, y, you, maxdate, maemaxdate){

	var ok_mae = 0;//‘O‚Ì“ú‚ªj“ú‚È‚ç‚PˆÈã
	var ok_ato = 0;//Ÿ‚Ì“ú‚ªj“ú‚È‚ç‚PˆÈã
	var maebi = 0;//‘O‚Ì“ú‚Ì“ú
	var atobi = 0;//Ÿ‚Ì“ú‚Ì“ú
	var y_mae = 0;//‘O‚Ì“ú‚Ì”N
	var y_ato = 0;//Ÿ‚Ì“ú‚Ì”N
	var you_mae = 0;//‘O‚Ì“ú‚Ì—j“ú
	var you_ato = 0;//Ÿ‚Ì“ú‚Ì—j“ú

	var atobiShukuName = '';//—‚“ú‚Ìj“ú–¼—p•Ï”
	var xDayShukuName = '';//xƒf[‚ªŠø“ú‚È‚çj“ú–¼‚ª‘ã“ü‚³‚ê‚é

	//‘–¯‚Ì‹x“úEU‘Ö‹x“úˆÈŠO‚Ì”»’è
	xDayShukuName = sub_isshuku(x, y, you)
	g_Ok = m_SubOk;

	//U‘Ö‹x“ú-”»’è‚Ì‰ß’ö‚Å //1973”Niº˜a48”Nj4Œ12“ú‚©‚çA
	//“ú—j‚Æj“ú‚ÌğŒ‚ª¬—§‚·‚ê‚Î m_Furikae ƒtƒ‰ƒO’l‚ğ 1 ‚É‚·‚éB
	if((y == 1973) && (x > 411) || (y > 1973)){
		if((m_SubOk > 0) && (you == 0)){
			m_Furikae = 1;
		}
	}
	//1973”Niº˜a48”Nj4Œ12“ú‚©‚çA
	//2006”N‚Ü‚Å‚Í—‚“ú‚ÌŒ—j‚Ì‚İ‚ªU‘Ö‹x“ú‚É‚È‚é
	//2007”N1Œ‚P“ú‚æ‚èj“ú‚ª“ú—j“ú‚Æ‚È‚Á‚½“ú‚ÌŒã‚ÌÅ‰‚Ì•½“ú
	if(y >= 2007){
		if(m_Furikae == 1 && m_SubOk == 0 && you != 0){
			g_Ok = 1;
			//‘O“ú‚Ìj“ú–¼‚ğ‹L‰¯
			m_MaebiShukuName = 'U‘Ö‹x“ú';
			m_Furikae = 0;
			return 'U‘Ö‹x“ú';
		}
	}else{
		if(y == 1973){
			if(x > 411){
				if(you == 1 && (m_SubOk > 0)){
					//j“ú‚ÌŒ—j“ú‚ª‚ ‚ê‚ÎU‘Öƒ‚[ƒh‚ÍƒLƒƒƒ“ƒZƒ‹‚³‚ê‚é
					m_Furikae = 0;
				}
				if(m_Furikae == 1 && you == 1 && (m_SubOk == 0)){
					
					m_Furikae = 0;
					g_Ok = 1;
					m_MaebiShukuName = 'U‘Ö‹x“ú';
					return 'U‘Ö‹x“ú'
				}
			}
		}
		if(y >= 1974){
			if(you == 1 && g_Ok > 0){
				//j“ú‚ÌŒ—j“ú‚ª‚ ‚ê‚ÎU‘Öƒ‚[ƒh‚ÍƒLƒƒƒ“ƒZƒ‹‚³‚ê‚é
				m_Furikae = 0;
			}
			if(m_Furikae == 1 && you == 1 && m_SubOk == 0){
				m_Furikae = 0;
				g_Ok = 1;
				m_MaebiShukuName = 'U‘Ö‹x“ú';
				return 'U‘Ö‹x“ú'
			}
		}
	}

	//‘–¯‚Ì‹x“ú@>=‚P‚X‚W‚U”N‚È‚ç‚ÎAj“ú‚Æj“ú‚É‹²‚Ü‚ê‚½•½“ú
	if((m_SubOk == 0) && (y >= 1986)){

		//‘O‚Ì“ú
		if(m_MaebiShukuName == ''){
			ok_mae = 0;
		}else{
			ok_mae = 1;
		}
		//Ÿ‚Ì“ú
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
				//‚±‚±‚Í‰Šú‰»
				m_MaebiShukuName = '';
				return '‘–¯‚Ì‹x“ú'
			}
		}
	}
	m_MaebiShukuName = xDayShukuName;
	return xDayShukuName;
}

function sub_isshuku(x, y, you){
	
	//m_SubOk ‚ÍAŠø“ú‚Å‚ ‚ê‚Î 1 ‚© 2B
	//ˆÈ‰º‚Ì‚Qs‚Í 2 ‚É•ª—Ş‚µ‚Ä‚¢‚éB
	//tEH•ª“ú‚Í“V•¶Šwã‚Ì“ú•t‚Æ“¯‚¶‚É‚È‚é•ÛØ‚ª‚È‚¢B
	//‘¼‹@ŠÖ‚É‚æ‚Á‚Ä‘Î‰‚ª‚Ü‚¿‚Ü‚¿‚Å‚ ‚é‹x“úB
	m_SubOk = 0;

	//ŒÅ’è‚µ‚½Œ“ú‚Å”»’f‚Å‚«‚éj“ú
	switch(x){
		case 101:
			if(y >= 1949){
				m_SubOk = 1;
				return 'Œ³“ú';
			}
			break;
		case 103:
			if(y <= 1948){
				m_SubOk = 1;
				return 'Œ³nÕ';
			}
			break;
		case 105:
			if(y <= 1948){
				m_SubOk = 1;
				return 'V”N‰ƒ‰ï';
			}
			break;
		case 211:
			if(y <=1948){
				m_SubOk = 1;
				return '‹IŒ³ß';
			}
			if(y >=1967){
				m_SubOk = 1;
				return 'Œš‘‹L”O‚Ì“ú';
			}
			break;
		case 224:
			if(y == 1989){
				m_SubOk = 2;
				return 'º˜a“Vc‚Ì‘å‘r‚Ì—ç';
			}
			break;
		case 403:
			if(y <=1948){
				m_SubOk = 1;
				return '_•“VcÕ';
			}
			break;
		case 410:
			if(y == 1959){
				m_SubOk = 2;
				return 'c‘¾qE–¾me‰¤‚ÌŒ‹¥‚Ì‹V';
			}
			break;
		case 429:
			if(y >=1927 && y <= 1948){
				m_SubOk = 1;
				return '“V’·ß';
			}
			if(y >=1949 && y <= 1988){
				m_SubOk = 1;
				return '“Vc’a¶“ú';
			}
			if(y >= 1989 && y <= 2006){
				m_SubOk = 1;
				return '‚İ‚Ç‚è‚Ì“ú';
			}
			if(y >= 2007){
				m_SubOk = 1;
				return 'º˜a‚Ì“ú';
			}
			break;
		case 503:
			if(y >= 1949){
				m_SubOk = 1;
				return 'Œ›–@‹L”O“ú';
			}
			break;
		case 504:
			if(y >= 2007){
				m_SubOk = 1;
				return '‚İ‚Ç‚è‚Ì“ú';
			}
			break;
		case 505:
			if(y >=1949){
				m_SubOk = 1;
				return '‚±‚Ç‚à‚Ì“ú';
			}
			break;
		case 609:
			if(y == 1993){
				m_SubOk = 2;
				return 'c‘¾qE“¿me‰¤‚ÌŒ‹¥‚Ì‹V';
			}
			break;
		case 730:
			if(y <=1926){
				m_SubOk = 1;
				return 'æ’éÕ(–¾¡“VcÕ)';
			}
			break;
		case 811:
			if(y >=2016){
				m_SubOk = 1;
				return 'R‚Ì“ú';
			}
			break;
		case 831:
			if(y <=1926){
				m_SubOk = 1;
				return '“V’·ß';
			}
			break;
		case 1017:
			if(y <= 1947){
				m_SubOk = 1;
				return '_¦Õ';
			}
			break;
		case 1031:
			if(y >= 1913 && y <= 1926){
				m_SubOk = 1;
				return '“V’·ßj“ú';
			}
			break;
		case 1103:
			m_SubOk = 1;
			if(y >= 1927 && y <=1947){
				return '–¾¡ß';
			}
			if(y >= 1948){
				return '•¶‰»‚Ì“ú';
			}
			break;
		case 1112:
			if(y == 1990){
				m_SubOk = 2;
				return '‘¦ˆÊ‚Ì—ç³“a‚Ì‹V';
			}
			break;
		case 1123:
			m_SubOk = 1;
			if(y <= 1947){
				return 'V¦Õ';
			}
			if(y >= 1948){
				return '‹Î˜JŠ´Ó‚Ì“ú';
			}
			break;
		case 1223:
			if(y >= 1989){
				m_SubOk = 1;
				return '“Vc’a¶“ú';
			}
			break;
		case 1225:
			if(y >= 1927 && y <= 1947){
				m_SubOk = 1;
				return 'æ’éÕ(‘å³“VcÕ)';
			}
	}

	//¬l‚Ì“ú >=2000‚Ì‚PŒ‘æ“ñŒ—j“ú<2000‚È‚ç1/15
	if(y >= 1949 && y <= 1999){
		if(x == 115){
			m_SubOk = 1;
			return '¬l‚Ì“ú';
		}
	}
	if(y >= 2000){
		//8“ú-14“ú‚É‚ ‚éŒ—j“ú‚ª¬l‚Ì“ú
		if(x > 107 && x < 115 && you == 1){
			m_SubOk = 1;
			return '¬l‚Ì“ú';
		}
	}

	//t•ª“úij“ú–@ã‚Ìut•ª‚Ì“úv‚É‚È‚é‚Æ‚ÍŒÀ‚ç‚È‚¢j
	if(parseInt(x / 100) == 3){
		var shunbi = Syunbun(y, 3);

		if(x == 300 + shunbi){
			m_SubOk = 2;
			if(y <= 1948){
				return 't‹Gc—ìÕ';
			}else{
				return 't•ª“ú';
			}
		}
	}

	//H•ª“úij“ú–@ã‚ÌuH•ª‚Ì“úv‚É‚È‚é‚Æ‚ÍŒÀ‚ç‚È‚¢j
	if(parseInt(x / 100) == 9){
		var shuubi = Syunbun(y, 9);

		if(x == 900 + shuubi){
			m_SubOk = 2;
			if(y <= 1947){
				return 'H‹Gc—ìÕ';
			}else{
				return 'H•ª“ú';
			}
		}
	}

	//ŠC‚Ì“ú”»’è
	if(parseInt(x / 100) == 7){
		if(y < 2003 && y > 1995){
			if(x == 720){
				m_SubOk = 1;
				return 'ŠC‚Ì“ú';
			}
		}
		if(y > 2002){
		//15“ú-21“ú‚É‚ ‚éŒ—j“ú‚ªŠC‚Ì“ú
			if(x > 714 && x < 722){
				if(you  == 1){
					m_SubOk = 1;
					return 'ŠC‚Ì“ú';
				}
			}
		}
	}
	

	//Œh˜V‚Ì“ú ‚XŒ‚Ì‘æ‚RŒ—j“úB<2003”N‚Ü‚Å‚Í‚X^‚P‚T
	if(parseInt(x / 100) == 9){

		if(y >= 1966 && y <= 2002){
			if(x == 915){
				m_SubOk = 1;
				return 'Œh˜V‚Ì“ú';
			}
		}
		if(y >= 2003){
		//15“ú-21“ú‚É‚ ‚éŒ—j“ú‚ªŒh˜V‚Ì“ú
			if(x > 914 && x < 922){
				if(you  == 1){
					m_SubOk = 1;
					return 'Œh˜V‚Ì“ú';
				}
			}
		}
	}
	
	//‘Ìˆç‚Ì“ú@2000”Ni•½¬12”Nj‚©‚ç‚Íuƒnƒbƒs[ƒ}ƒ“ƒf[§“xv‚Ì“K—p‚É‚æ‚èA10Œ‚Ì‘æ2Œ—j“ú
	if(parseInt(x / 100) == 10){
		if(y >= 1966 && y <= 1999){
			if(x == 1010){
				m_SubOk = 1;
				return '‘Ìˆç‚Ì“ú';
			}
		}
		if(y >= 2000){
		//8“ú-14“ú‚É‚ ‚éŒ—j“ú‚ª‘Ìˆç‚Ì“ú
			if(x > 1007 && x < 1015){
				if(you  == 1){
					m_SubOk = 1;
					return '‘Ìˆç‚Ì“ú';
				}
			}
		}
	}
	m_SubOk = 0;
	return '';
}

//ƒuƒ‰ƒEƒU”»’è
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
//	document.write('<br>'+'‚n‚o‚d‚q‚`‚Æ”»’f‚³‚ê‚½');
		return true;	    
    }
	else{
		return false;
	}
}
/*
 4‚Ì”{””N‚Å100‚Ì”{””N‚Å‚È‚¢”N‚Í‚¤‚é‚¤”NA
‚½‚¾‚µ400‚Ì”{””N‚Í‚¤‚é‚¤”NB
¼—ï”N‚ğƒeƒXƒg‚µ‚ÄA‚¤‚é‚¤”N‚Å‚ ‚ê‚Î‚s‚q‚t‚d‚ğ•Ô‚·
*/
function f_isuruu(y){

	if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0){
		return true;
	}else{
		return false;
	}
}


//1851-2150‚Ì”ÍˆÍ‚Åt•ªEH•ª‚ğZoo—ˆ‚é®‚ç‚µ‚¢®B
//M.Suzuki‚³‚ñA‚±‚æ‚İ‚Ìƒy[ƒWhttp://koyomi.vis.ne.jp/@‚©‚ç“—p‚µ‚Ä‚¢‚Ü‚·B
//ˆø—pFug—p‚µ‚½®‚ÍuV‚±‚æ‚İ‚Ì•Ö—˜’ viP¯ĞŒú¶ŠtŠ§j‚Æ‚¢‚¤–{‚ÉĞ‰î‚³‚ê‚½‚à‚Ì‚Å‚·Bv
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