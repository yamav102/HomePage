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

/*
xƒf[‚ª‹x“ú‚©‚Ç‚¤‚©‚ğ”»’è@º˜a‚Ì“ú‚Æ—Î‚Ì“ú‚Í”N‚É‚æ‚Á‚Ä•Ï‚í‚é
—Î‚Ì“úF2007”N‚æ‚è5Œ4“úB1989”N‚©‚ç2006”N‚Ü‚Å‚Í4Œ29“ú
º˜a‚Ì“úF•½¬19”Ni2007”Nj‚©‚ç‰Á‚í‚Á‚½B4Œ29“ú
“ú•t‚Ì•Ï“®‚·‚é‹x“ú‚ÍŒã”¼‚ÅŒvZ‚É‚æ‚è‹‚ß‚éB
x@‚ÍA‚PŒ‚P“ú‚ğ 101 ‚Æ‚µ‚½’lBŒ–‚P‚O‚O{“ú
‚™@‚ÍA¼—ï‚SŒ…”N
you ‚ÍA—j“úi‚O‚ª“ú—jj
‘–¯‚Ì‹x“ú‚Í•Ê“r”»’è
*/
var furikae = 0;//j“ú‚Æ“ú—j‚ªd‚È‚ê‚Î‚P
function f_isshuku(x, y, you, maxdate, maemaxdate){

	var ok_mae = 0;//‘O‚Ì“ú‚ªj“ú‚È‚ç‚PˆÈã
	var ok_ato = 0;//Ÿ‚Ì“ú‚ªj“ú‚È‚ç‚PˆÈã

	var shkuNameBuf;		
	var maebi;
	var atobi;
	var y_mae;
	var y_ato;
	var you_mae;
	var you_ato;

	sub_isshuku(x, y, you)	
	
	//‘–¯‚Ì‹x“ú@>‚P‚X‚W‚V”N‚È‚ç‚ÎAj“ú‚Æj“ú‚É‹²‚Ü‚ê‚½“ú
	if(ok == 0 && y > 1987){

		//‚Ü‚¦‚Ì“ú
		if((x - 1) % 100 == 0){
			if((parseInt(x / 100) - 1) < 1){
				maebi = 1231;
				y_mae = y - 1;
			} else{
				maebi = (parseInt(x  / 100) - 1) * 100 + maemaxdate;
				y_mae = y;
			}
		}else{
			maebi = x - 1;
			y_mae = y;
		}
		if((you - 1) < 0){
			you_mae = 6;
		}else{
			you_mae = you - 1;
		}
		
		sub_isshuku(maebi, y_mae, you_mae);
		ok_mae = ok;

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

		sub_isshuku(atobi, y_ato, you_ato);
		ok_ato = ok;

		ok = 0;
		shukuName = '';

		if(ok_mae * ok_ato > 0){
			ok = 1;
			shukuName = '‘–¯‚Ì‹x“ú'
		}
	}
	//U‘Ö‹x“ú@
	//1973”Niº˜a48”Nj4Œ12“ú‚©‚çA
	//2005”N‚Ü‚Å‚Í—‚“ú‚ÌŒ—j‚Ì‚İ‚ªU‘Ö‹x“ú‚É‚È‚é
	if(ok > 0 && you == 0){
		furikae = 1;
	}
	//2007”N1Œ‚P“ú‚æ‚èB‘–¯‚Ìj“ú‚ª“ú—j“ú‚Æ‚È‚Á‚½“ú‚ÌŒã‚ÌÅ‰‚Ì•½“ú
	if(y > 2006){

		if(furikae == 1 && ok == 0){
			ok = 1;
			shukuName = 'U‘Ö‹x“ú';
			furikae =	 0;
		}
	}else{
		if(y > 1973 && x > 411){
			if(you == 1 && ok > 0){
				//j“ú‚ÌŒ—j“ú‚ª‚ ‚ê‚ÎU‘Öƒ‚[ƒh‚ÍƒLƒƒƒ“ƒZƒ‹‚³‚ê‚é
				furikae = 0;
			}
			if(furikae == 1 && you == 1 && ok == 0){
				ok = 1;
				shukuName = 'U‘Ö‹x“ú'
				furikae = 0;	
			}
		}
	}
}

function sub_isshuku(x, y, you){
	
	//‰Šú‰»
	shukuName='';
	ok=0;

	//ŒÅ’è‚µ‚½Œ“ú‚Å”»’f‚Å‚«‚éj“ú
	switch(x){
		case 101:
			ok=1;
			shukuName='Œ³’U';
			break;
		case 211:
			ok=1;
			shukuName='Œš‘‹L”O‚Ì“ú';
			break;
		case 429:
			ok=1;
			if(y < 1989){
				shukuName = '“Vc’a¶“ú';
			}
			if(y > 1988 && y < 2007){
				shukuName='‚İ‚Ç‚è‚Ì“ú';
			}
			if(y > 2006){
				shukuName='º˜a‚Ì“ú';
			}
			break;
		case 503:
			ok=1;
			shukuName='Œ›–@‹L”O“ú';
			break;
		case 504:
			if(y > 1987 && y < 2007){
				ok = 1;
				shukuName = '‘–¯‚Ì‹x“ú';
			}
			if(y > 2006){
				ok = 1;
				shukuName = '‚İ‚Ç‚è‚Ì“ú';
	
			}
			break;
		case 505:
			ok=1;
			shukuName='‚±‚Ç‚à‚Ì“ú';
			break;
		case 1103:
			ok=1;
			shukuName='•¶‰»‚Ì“ú';
			break;
		case 1123:
			ok=1;
			shukuName='‹Î˜JŠ´Ó‚Ì“ú';
			break;
		case 1223:
			if(y > 1988){
				ok=1;
				shukuName='“Vc’a¶“ú';
			}
			break;
	}


	//¬l‚Ì“ú >1999‚Ì‚PŒ‘æ“ñŒ—j“ú	<2000‚È‚ç1/15
	if(y < 2000){
		if(x == 115){
			ok = 1;
			shukuName = '¬l‚Ì“ú';
		}
	}else{
		////8“ú-14“ú‚É‚ ‚éŒ—j“ú‚ª¬l‚Ì“ú
		if(parseInt(x / 100) == 1){
			if(x > 107 && x < 115 && you == 1){
				ok = 1;
				shukuName = '¬l‚Ì“ú';
			}
		}
	}

	//t•ª“úij“ú–@ã‚Ìut•ª‚Ì“úv‚É‚È‚é‚Æ‚ÍŒÀ‚ç‚È‚¢j
	if(parseInt(x / 100) == 3){
		var shunbi = Syunbun(y, 3);

		if(x == 300 + shunbi){
			ok = 2;
			shukuName = 't•ª“ú';
		}
	}

	//H•ª“úij“ú–@ã‚ÌuH•ª‚Ì“úv‚É‚È‚é‚Æ‚ÍŒÀ‚ç‚È‚¢j
	if(parseInt(x / 100) == 9){
		var shuubi = Syunbun(y, 9);

		if(x == 900 + shuubi){
			ok = 2;
			shukuName = 'H•ª“ú';
		}
	}

	//ŠC‚Ì“ú”»’è
	if(parseInt(x / 100) == 7){

		if(y < 2003 && y > 1995){
			if(x == 720){
				ok = 1;
				shukuName = 'ŠC‚Ì“ú';
			}
		}
		if(y > 2002){
		//15“ú-21“ú‚É‚ ‚éŒ—j“ú‚ªŠC‚Ì“ú
			if(x > 714 && x < 722){

				if(you  == 1){
					ok = 1;
					shukuName = 'ŠC‚Ì“ú';
				}
			}
		}
	}
	

	//Œh˜V‚Ì“ú ‚XŒ‚Ì‘æ‚RŒ—j“úB<2003”N‚Ü‚Å‚Í‚X^‚P‚T
	if(parseInt(x / 100) == 9){

		if(y < 2003){
			if(x == 915){
				ok = 1;
				shukuName = 'Œh˜V‚Ì“ú';
			}
		}else{
		//15“ú-21“ú‚É‚ ‚éŒ—j“ú‚ªŠC‚Ì“ú
			if(x > 914 && x < 922){

				if(you  == 1){
					ok = 1;
					shukuName = 'Œh˜V‚Ì“ú';
				}
			}
		}
	}
	
	//‘Ìˆç‚Ì“ú@2000”Ni•½¬12”Nj‚©‚ç‚Íuƒnƒbƒs[ƒ}ƒ“ƒf[§“xv‚Ì“K—p‚É‚æ‚èA10Œ‚Ì‘æ2Œ—j“ú
	if(parseInt(x / 100) == 10){

		if(y < 2000){
			if(x == 1010){
				ok = 1;
				shukuName = '‘Ìˆç‚Ì“ú';
			}
		}else{
		//8“ú-14“ú‚É‚ ‚éŒ—j“ú‚ª‘Ìˆç‚Ì“ú
			if(x > 1007 && x < 1015){

				if(you  == 1){
					ok = 1;
					shukuName = '‘Ìˆç‚Ì“ú';
				}
			}
		}
	}
	return ok;
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