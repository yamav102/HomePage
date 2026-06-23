var layerId       =  0; var func          =  1; var effectPattern =  2; 
var startTime     =  3; var nextLayerIdx  =  4; var nextStartTime =  5; 
var intervalTime  =  6; var repeat        =  7; var endVisibility =  8;
var posX          =  9; var posY          = 10; var posStartX     = 11;
var posStartY     = 12; var posEndX       = 13; var posEndY       = 14;
var stepX         = 15; var stepY         = 16; var frame         = 17;
var accelerationX = 18; var accelerationY = 19; var angle         = 20;
var fixedX        = 21; var fixedY        = 22; 

var appVer = parseInt(navigator.appVersion);
var isNC = (document.layers && (appVer >= 4)); // Netscape Navigator 4.0 or later
var isIE = (document.all    && (appVer >= 4)); // Internet Explorer  4.0 or later
var elt;
elt = new Array;
var layerobj;
layerobj = new Array;
var lastobj;

function HpbVfxinit() {
  var w_str;
  if (isNC || isIE) {
    var n_div = arguments.length / 6;
    for (var div = 0; div < n_div; div++) {
      var args = 6 * div;
      var arg1 = arguments[args];
      var arg2 = arguments[args+1];
      var arg3 = arguments[args+2];
      var arg4 = arguments[args+3];
      var arg5 = arguments[args+4];
      var arg6 = arguments[args+5];
      elt[div] = new Array(arg1,arg2,arg3,arg4,-1,arg5,0,arg6,true,-32767,-32767,-32767,-32767,-32767,-32767,-32767,-32767,40,1.0,1.0,0,-1,-1);
  } }

  if (isNC) {
    for (i=0; i < elt.length; i++) {
      w_str = "document." + elt[i][layerId];
      layerobj[i] = eval(w_str);
      if (layerobj[i]) {
        layerobj[i].init = false;
        layerobj[i].innerH = window.innerHeight;
        layerobj[i].innerW = window.innerWidth;
        layerobj[i].pos_x = layerobj[i].left;
        layerobj[i].pos_y = layerobj[i].top;
        layerobj[i].pos_w = layerobj[i].clip.width;
        layerobj[i].pos_h = layerobj[i].clip.height;
  } } }
  if (isIE) {
    for (i=0; i < elt.length; i++) {
      w_str = "document.all.item(\"" + elt[i][layerId] + "\")";
      if (eval(w_str)) {
        w_str = "document.all.item(\"" + elt[i][layerId] + "\").style";
        layerobj[i] = eval(w_str);
        if (layerobj[i]) {
          layerobj[i].init = false;
          layerobj[i].innerH = document.body.clientHeight;
          layerobj[i].innerW = document.body.clientWidth;
          layerobj[i].pos_x = layerobj[i].pixelLeft;
          layerobj[i].pos_y = layerobj[i].pixelTop;
          layerobj[i].pos_w = layerobj[i].pixelWidth;
          layerobj[i].pos_h = layerobj[i].pixelHeight;
  } } } }

  if (isNC || isIE) {
    for (i=0; i < elt.length; i++) {
      if (layerobj[i]) {
        if (elt[i][posX] == -32767) elt[i][posX] = layerobj[i].pos_x;
        if (elt[i][posY] == -32767) elt[i][posY] = layerobj[i].pos_y;
        if (elt[i][effectPattern].charAt(0) == "A") {
          if (elt[i][posX] != -32767) elt[i][posEndX] = elt[i][posX];
          if (elt[i][posY] != -32767) elt[i][posEndY] = elt[i][posY];
          if (elt[i][effectPattern].charAt(1) == "1") {
            elt[i][posStartX] = layerobj[i].pos_w * -1;
            if (elt[i][posY] != -32767) elt[i][posStartY] = elt[i][posY];
          }
          if (elt[i][effectPattern].charAt(1) == "3") {
            if (elt[i][posX] != -32767) elt[i][posStartX] = elt[i][posX];
            elt[i][posStartY] = layerobj[i].pos_h * -1;
          }
          if (elt[i][effectPattern].charAt(1) == "5") {
            elt[i][posStartX] = layerobj[i].pos_w * -1;
            elt[i][posStartY] = layerobj[i].pos_h * -1;
          }
          if (elt[i][effectPattern].charAt(1) == "8") {
            elt[i][posStartX] = layerobj[i].pos_w * -1;
            elt[i][posStartY] = layerobj[i].innerH;
        } }
        if (elt[i][effectPattern].charAt(0) == "B") {
          if (elt[i][posX] != -32767) elt[i][posStartX] = elt[i][posX];
          if (elt[i][posY] != -32767) elt[i][posStartY] = elt[i][posY];
          if (elt[i][effectPattern].charAt(1) == "2") {
            elt[i][posEndX] = layerobj[i].pos_w * -1;
            if (elt[i][posY] != -32767) elt[i][posEndY] = elt[i][posY];
          }
          if (elt[i][effectPattern].charAt(1) == "4") {
            if (elt[i][posX] != -32767) elt[i][posEndX] = elt[i][posX];
            elt[i][posEndY] = layerobj[i].pos_h * -1;
          }
          if (elt[i][effectPattern].charAt(1) == "6") {
            elt[i][posEndX] = layerobj[i].pos_w * -1;
            elt[i][posEndY] = layerobj[i].pos_h * -1;
          }
          if (elt[i][effectPattern].charAt(1) == "7") {
            elt[i][posEndX] = layerobj[i].pos_w * -1;
            elt[i][posEndY] = layerobj[i].innerH;
        } }
        if (elt[i][effectPattern].charAt(0) == "C") {
          if (elt[i][effectPattern].charAt(1) == "2") {
            elt[i][posStartX] = layerobj[i].innerW;
            elt[i][posEndX] = layerobj[i].pos_w * -1;
            if (elt[i][posY] != -32767) {
              elt[i][posStartY] = elt[i][posY];
              elt[i][posEndY] = elt[i][posY];
            }
          }
          if (elt[i][effectPattern].charAt(1) == "1") {
            elt[i][posStartX] = layerobj[i].pos_w * -1;
            elt[i][posEndX] = layerobj[i].innerW;
            if (elt[i][posY] != -32767) {
              elt[i][posStartY] = elt[i][posY];
              elt[i][posEndY] = elt[i][posY];
            }
          }
          if (elt[i][effectPattern].charAt(1) == "3") {
            if (elt[i][posX] != -32767) {
              elt[i][posStartX] = elt[i][posX];
              elt[i][posEndX] = elt[i][posX];
            }
            elt[i][posStartY] = layerobj[i].pos_h * -1;
            elt[i][posEndY] = layerobj[i].innerH;
          }
          if (elt[i][effectPattern].charAt(1) == "4") {
            if (elt[i][posX] != -32767) {
              elt[i][posStartX] = elt[i][posX];
              elt[i][posEndX] = elt[i][posX];
            }
            elt[i][posStartY] = layerobj[i].innerH;
            elt[i][posEndY] = layerobj[i].pos_h * -1;
          }
          if (elt[i][effectPattern].charAt(1) == "7") {
            elt[i][posStartX] = layerobj[i].innerW;
            elt[i][posStartY] = layerobj[i].pos_h * -1;
            elt[i][posEndX] = layerobj[i].pos_w * -1;
            elt[i][posEndY] = layerobj[i].innerH;
          }
          if (elt[i][effectPattern].charAt(1) == "5") {
            elt[i][posStartX] = layerobj[i].pos_w * -1;
            elt[i][posStartY] = layerobj[i].pos_h * -1;
            elt[i][posEndX] = layerobj[i].innerW;
            elt[i][posEndY] = layerobj[i].innerH;
          }
          if (elt[i][effectPattern].charAt(1) == "6") {
            elt[i][posStartX] = layerobj[i].innerW;
            elt[i][posStartY] = layerobj[i].innerH;
            elt[i][posEndX] = layerobj[i].pos_w * -1;
            elt[i][posEndY] = layerobj[i].pos_h * -1;
          }
          if (elt[i][effectPattern].charAt(1) == "8") {
            elt[i][posStartX] = layerobj[i].pos_w * -1;
            elt[i][posStartY] = layerobj[i].innerH;
            elt[i][posEndX] = layerobj[i].innerW;
            elt[i][posEndY] = layerobj[i].pos_h * -1;
        } }
        if (elt[i][effectPattern].charAt(0) == "D") {
          if (elt[i][effectPattern].charAt(1) == "1") {
            elt[i][stepX] = 4;  elt[i][stepY] = 0;
          }
          if (elt[i][effectPattern].charAt(1) == "3") {
            elt[i][stepX] = 0;  elt[i][stepY] = 4;
        } }
        if (elt[i][effectPattern].charAt(0) == "F") {
          if (elt[i][effectPattern].charAt(1) == "4") {
            if (elt[i][posX] != -32767) {
              elt[i][posStartX] = elt[i][posX];
              elt[i][posEndX] = elt[i][posX] + layerobj[i].pos_w;
            }
            if (elt[i][posY] != -32767) {
              elt[i][posStartY] = elt[i][posY];
              if (elt[i][effectPattern].charAt(3) == "1") elt[i][posEndY] = elt[i][posY] + 80;
              if (elt[i][effectPattern].charAt(3) == "2") elt[i][posEndY] = elt[i][posY] + 160;
              if (elt[i][effectPattern].charAt(3) == "3") elt[i][posEndY] = elt[i][posY] + 320;
            }
            elt[i][stepX] = 0;  elt[i][stepY] = 4;
          }
          if (elt[i][effectPattern].charAt(1) == "2") {
            if (elt[i][posX] != -32767) {
              elt[i][posStartX] = elt[i][posX];
              if (elt[i][effectPattern].charAt(3) == "1") elt[i][posEndX] = elt[i][posX] + 80;
              if (elt[i][effectPattern].charAt(3) == "2") elt[i][posEndX] = elt[i][posX] + 160;
              if (elt[i][effectPattern].charAt(3) == "3") elt[i][posEndX] = elt[i][posX] + 320;
            }
            if (elt[i][posY] != -32767) {
              elt[i][posStartY] = elt[i][posY];
              elt[i][posEndY] = elt[i][posY] + layerobj[i].pos_h;
            }
            elt[i][stepX] = 4;  elt[i][stepY] = 0;
        } }
        if (elt[i][effectPattern].charAt(0) == "G") {
          if (elt[i][effectPattern].charAt(1) == "2") {
            elt[i][posStartX] = 0;
            if (elt[i][effectPattern].charAt(3) == "1") elt[i][posStartY] = 80;
            if (elt[i][effectPattern].charAt(3) == "2") elt[i][posStartY] = 160;
            if (elt[i][effectPattern].charAt(3) == "3") elt[i][posStartY] = 320;
            elt[i][posEndX] = 1;  elt[i][posEndY] = 1;
        } }
        if (elt[i][effectPattern].charAt(0) == "H") {
          if (elt[i][effectPattern].charAt(3) == "1") {
            elt[i][stepX] = 8;  elt[i][stepY] = 8;
          }
          if (elt[i][effectPattern].charAt(3) == "2") {
            elt[i][stepX] = 16;  elt[i][stepY] = 16;
          }
          if (elt[i][effectPattern].charAt(3) == "3") {
            elt[i][stepX] = 32;  elt[i][stepY] = 32;
          }
          if (elt[i][effectPattern].charAt(1) == "2") {
            elt[i][stepX] = 0;  elt[i][fixedX] = true;  elt[i][fixedY] = true;
          }
          if (elt[i][effectPattern].charAt(1) == "1") {
            elt[i][stepY] = 0;  elt[i][fixedX] = true;  elt[i][fixedY] = true;
          }
          if (elt[i][effectPattern].charAt(1) == "3") {
            elt[i][fixedX] = false;  elt[i][fixedY] = false;
        } }
        if (elt[i][effectPattern].charAt(0) == "I") {
          if (elt[i][effectPattern].charAt(3) == "1") {
            elt[i][posStartX] = 40;  elt[i][posStartY] = 40;
          }
          if (elt[i][effectPattern].charAt(3) == "2") {
            elt[i][posStartX] = 80;  elt[i][posStartY] = 80;
          }
          if (elt[i][effectPattern].charAt(3) == "3") {
            elt[i][posStartX] = 160;  elt[i][posStartY] = 160;
          }
          elt[i][posEndX] = 1;  elt[i][posEndY] = 1;  elt[i][stepX] = -32767;
          if (elt[i][effectPattern].charAt(1) == "1") {
            elt[i][posY] += elt[i][posStartY];
            elt[i][stepY] = Math.PI * 3 / 2;
            elt[i][frame] = 40;
          }
          if (elt[i][effectPattern].charAt(1) == "2") {
            elt[i][posY] -= elt[i][posStartY];
            elt[i][stepY] = Math.PI * 1 / 2;
            elt[i][frame] = 40;
          }
          if (elt[i][effectPattern].charAt(1) == "3") {
            elt[i][posX] -= elt[i][posStartX];
            elt[i][stepY] = Math.PI * 0 / 2;
            elt[i][frame] = 40;
          }
          if (elt[i][effectPattern].charAt(1) == "4") {
            elt[i][posX] += elt[i][posStartX];
            elt[i][stepY] = Math.PI * 2 / 2;
            elt[i][frame] = 40;
          }
          if (elt[i][effectPattern].charAt(1) == "5") {
            elt[i][posY] += elt[i][posStartY];
            elt[i][stepY] = Math.PI * 3 / 2;
            elt[i][frame] = -40;
          }
          if (elt[i][effectPattern].charAt(1) == "6") {
            elt[i][posY] -= elt[i][posStartY];
            elt[i][stepY] = Math.PI * 1 / 2;
            elt[i][frame] = -40;
          }
          if (elt[i][effectPattern].charAt(1) == "7") {
            elt[i][posX] -= elt[i][posStartX];
            elt[i][stepY] = Math.PI * 0 / 2;
            elt[i][frame] = -40;
          }
          if (elt[i][effectPattern].charAt(1) == "8") {
            elt[i][posX] += elt[i][posStartX];
            elt[i][stepY] = Math.PI * 2 / 2;
            elt[i][frame] = -40;
        } }
        if (elt[i][effectPattern].charAt(0) == "J") {
          if (elt[i][effectPattern].charAt(3) == "1") {
            elt[i][posStartX] = 0;  elt[i][posStartY] = 80;
          }
          if (elt[i][effectPattern].charAt(3) == "2") {
            elt[i][posStartX] = 0;  elt[i][posStartY] = 160;
          }
          if (elt[i][effectPattern].charAt(3) == "3") {
            elt[i][posStartX] = 0;  elt[i][posStartY] = 320;
          }
          elt[i][posEndX] = 1;  elt[i][posEndY] = 1;
          elt[i][stepX] = -32767;  elt[i][stepY] = 0;
          if (elt[i][effectPattern].charAt(1) == "2") {
            elt[i][accelerationY] = 0.99;  elt[i][frame] = 40;
        } }
        if (elt[i][effectPattern].charAt(0) == "K") {
          if (elt[i][effectPattern].charAt(3) == "1") {
            elt[i][posStartX] = 40;  elt[i][posStartY] = 40;
          }
          if (elt[i][effectPattern].charAt(3) == "2") {
            elt[i][posStartX] = 80;  elt[i][posStartY] = 80;
          }
          if (elt[i][effectPattern].charAt(3) == "3") {
            elt[i][posStartX] = 160;  elt[i][posStartY] = 160;
          }
          elt[i][stepX] = -32767;  elt[i][stepY] = 0;
          if (elt[i][effectPattern].charAt(1) == "1") {
            elt[i][posEndX] = 13;  elt[i][posEndY] = 12;  elt[i][frame] = 160;
          }
          if (elt[i][effectPattern].charAt(1) == "2") {
            elt[i][posEndX] = 7;  elt[i][posEndY] = 2;  elt[i][frame] = 160;
          }
          if (elt[i][effectPattern].charAt(1) == "3") {
            elt[i][posEndX] = 11;  elt[i][posEndY] = 4;  elt[i][frame] = 160;
          }
          if (elt[i][effectPattern].charAt(1) == "4") {
            elt[i][posEndX] = 7;  elt[i][posEndY] = 4;  elt[i][frame] = 160;
        } }
        if (elt[i][effectPattern].charAt(2) == "1") elt[i][intervalTime] = 200;
        if (elt[i][effectPattern].charAt(2) == "2") elt[i][intervalTime] = 100;
        if (elt[i][effectPattern].charAt(2) == "3") elt[i][intervalTime] = 50;
        if ( elt[i][startTime] >= 0 ) setTimeout( "HpbVfxtimer(" + i + ")", elt[i][startTime] );
} } } }

function HpbVfxtimer(tid) {
  if (isNC || isIE) {
    if (layerobj[tid]) {
      var func_str;
      func_str = elt[tid][func] + "( tid, elt[tid], layerobj[tid] )";
      eval(func_str);
} } }

function HpbVfxshowobj(obj) {
  if (obj) {
    if (isNC) obj.visibility = "show";
    if (isIE) obj.visibility = "visible";
    lastobj = obj;
} }

function HpbVfxhideobj(obj) {
  if (obj) {
    if (isNC) obj.visibility = "hide";
    if (isIE) obj.visibility = "hidden";
} }

function HpbVfx0001(tid,et,ob) {
  var x;  var y;
  if (ob) {
    if (ob.init == false) {
      if (et[stepX] != -32767) ob.stepX = et[stepX] * Math.cos(et[angle]);
      else ob.stepX = (et[posEndX] - et[posStartX]) / et[frame];
      if (et[stepY] != -32767) ob.stepY = et[stepY] * Math.sin(et[angle]);
      else ob.stepY = (et[posEndY] - et[posStartY]) / et[frame];
      if (ob.stepX > 0 && ob.stepX < 1) ob.stepX = 1;
      if (ob.stepX < 0 && ob.stepX > -1) ob.stepX = -1;
      if (ob.stepY > 0 && ob.stepY < 1) ob.stepY = 1;
      if (ob.stepY < 0 && ob.stepY > -1) ob.stepY = -1;
      if (et[posStartX] != -32767) ob.x = et[posStartX];
      else if (ob.stepX > 0) ob.x = 0 - ob.pos_w; else ob.x = ob.innerW - ob.pos_w;
      if (et[posStartY] != -32767) ob.y = et[posStartY];
      else if (ob.stepY > 0) ob.y = 0 - ob.pos_h; else ob.y = ob.innerH - ob.pos_h;
      if (et[posEndX] != -32767) ob.posEndX = et[posEndX];
      else if (ob.stepX > 0) ob.posEndX = ob.innerW - ob.pos_w; else ob.posEndX = 0 - ob.pos_w;
      if (et[posEndY] != -32767) ob.posEndY = et[posEndY];
      else if (ob.stepY > 0) ob.posEndY = ob.innerH - ob.pos_h; else ob.posEndY = 0 - ob.pos_h;
      HpbVfxshowobj(ob);
      ob.init = true;  ob.frame = 0;
    }
    ob.stepX = ob.stepX * et[accelerationX];
    if (ob.stepX > 0 && ob.stepX < 1) ob.stepX = 1;
    if (ob.stepX < 0 && ob.stepX > -1) ob.stepX = -1;
    ob.stepY = ob.stepY * et[accelerationY];
    if (ob.stepY > 0 && ob.stepY < 1) ob.stepY = 1;
    if (ob.stepY < 0 && ob.stepY > -1) ob.stepY = -1;
    ob.x += ob.stepX;  ob.y += ob.stepY;
    var endX;  var endY;
    endX = false;  endY = false;
    if (ob.stepX > 0) if (ob.x >= ob.posEndX) {endX = true;  ob.x = ob.posEndX;}
    if (ob.stepX < 0) if (ob.x <= ob.posEndX) {endX = true;  ob.x = ob.posEndX;}
    if (ob.stepX == 0) endX = true;
    if (ob.stepY > 0) if (ob.y >= ob.posEndY) {endY = true;  ob.y = ob.posEndY;}
    if (ob.stepY < 0) if (ob.y <= ob.posEndY) {endY = true;  ob.y = ob.posEndY;}
    if (ob.stepY == 0) endY = true;
    ob.left = Math.round( ob.x );  ob.top = Math.round(ob.y);
    if (endX == true && endY == true) {
      if (et[endVisibility] == false) HpbVfxhideobj(ob);
      ob.init = false;
      if (et[repeat] == true) setTimeout("HpbVfxtimer(" + tid + ")",et[startTime]);
      else if (et[nextLayerIdx] >= 0) setTimeout("HpbVfxtimer(" + et[nextLayerIdx] + ")",et[nextStartTime]);
    } else setTimeout("HpbVfxtimer(" + tid + ")",et[intervalTime]);
} }

function HpbVfx0101(tid,et,ob) {
  var cl;  var cr;  var ct;  var cb;  var tm;  var x;  var y;
  if (ob) {
    if (ob.init == false) {
      if (et[stepX] != -32767) ob.cs_x = et[stepX]; else ob.cs_x = ob.pos_w / et[frame];
      if (et[stepY] != -32767) ob.cs_y = et[stepY]; else ob.cs_y = ob.pos_h / et[frame];
      ob.c_x = 0;  ob.c_y = 0;
      HpbVfxshowobj(ob);
      ob.init = true;
    }
    tm = false;
    cl = 0;  cr = ob.pos_w;  ct = 0;  cb = ob.pos_h;
    x = ob.pos_x;  y = ob.pos_y;
    if (et[fixedX] == false) {
      if (ob.cs_x > 0) {
        ob.c_x += ob.cs_x;
        if (cr > ob.c_x) {
          cl = cr - ob.c_x;  tm = true;  x = ob.pos_x - ob.pos_w + ob.c_x;
      } }
      if (ob.cs_x < 0) {
        ob.c_x += ob.cs_x;  cr = ob.c_x * -1;
        if (cr < ob.pos_w) {
          tm = true;  x = ob.pos_x + ob.pos_w + ob.c_x;
        } else cr = ob.pos_w;
      }
    } else {
      if (ob.cs_x > 0) {
        ob.c_x += ob.cs_x;
        if (cr > ob.c_x) {cr = ob.c_x;  tm = true;}
      }
      if (ob.cs_x < 0) {
        ob.c_x += ob.cs_x;  cl = ob.c_x * -1;
        if (cl < ob.pos_w) {tm = true;  cl = ob.pos_w - cl;} else cl = 0;
    } }
    if (et[fixedY] == false) {
      if (ob.cs_y > 0) {
        ob.c_y += ob.cs_y;
        if (cb > ob.c_y) {ct = cb - ob.c_y;  tm = true;  y = ob.pos_y - ob.pos_h + ob.c_y;}
      }
      if (ob.cs_y < 0) {
        ob.c_y += ob.cs_y;  cb = ob.c_y * -1;
        if ( cb < ob.pos_h ) {tm = true;  y = ob.pos_y + ob.pos_h + ob.c_y;} else cb = ob.pos_h;
      }
    } else {
      if (ob.cs_y > 0) {
        ob.c_y += ob.cs_y;
        if (cb > ob.c_y) {cb = ob.c_y;  tm = true;}
      }
      if (ob.cs_y < 0) {
        ob.c_y += ob.cs_y;  ct = ob.c_y * -1;
        if (ct < ob.pos_h) {tm = true;  ct = ob.pos_h - ct;} else ct = 0;
    } }
    if (isNC) {ob.clip.left = cl;  ob.clip.right = cr;  ob.clip.top = ct;  ob.clip.bottom = cb;}
    if (isIE) ob.clip = "rect(" + ct + "," + cr + "," + cb + "," + cl + ")";
    ob.top = y;  ob.left = x;
    if (tm) setTimeout("HpbVfxtimer(" + tid + ")",et[intervalTime]);
    else {
      if (et[endVisibility] == false) HpbVfxhideobj(ob);
      ob.init = false;
      if (et[repeat] == true) setTimeout("HpbVfxtimer(" + tid + ")",et[startTime]);
      else if (et[nextLayerIdx] >= 0) setTimeout("HpbVfxtimer(" + et[nextLayerIdx] + ")",et[nextStartTime]);
} } }

function HpbVfx0201(tid,et,ob) {
  var cl;  var cr;  var ct;  var cb;  var tm;  var x;  var y;
  if (ob) {
    if (ob.init == false) {
      if (et[stepX] != -32767) ob.cs_x = et[stepX]; else ob.cs_x = ob.pos_w / et[frame];
      if (et[stepY] != -32767) ob.cs_y = et[stepY]; else ob.cs_y = ob.pos_h / et[frame];
      ob.c_w = et[posEndX] - et[posStartX];  ob.c_h = et[posEndY] - et[posStartY];
      ob.c_x = 0;  ob.c_y = 0;
      HpbVfxshowobj(ob);
      ob.init = true;
    }
    tm = false;
    cl = 0;  cr = ob.pos_w;  ct = 0;  cb = ob.pos_h;
    x = et[posStartX];  y = et[posStartY];
    if (ob.cs_x > 0) {
      ob.c_x += ob.cs_x;
      if (ob.c_x < (ob.pos_w - ob.c_w)) {
        cl = ob.c_x;  cr = cl + ob.c_w;
        tm = true;
      } else cl = ob.pos_w - ob.c_w;
    }
    if (ob.cs_x < 0) {
      ob.c_x += ob.cs_x;  cr = ob.pos_w + ob.c_x;
      if (cr > ob.c_w) {cl = cr - ob.c_w;  tm = true;}
      else cr = ob.c_w;
    }
    if (ob.cs_y > 0) {
      ob.c_y += ob.cs_y;
      if (ob.c_y < (ob.pos_h - ob.c_h)) {
        ct = ob.c_y;  cb = ct + ob.c_h;
        tm = true;
      } else ct = ob.pos_h - ob.c_h;
    }
    if (ob.cs_y < 0) {
      ob.c_y += ob.cs_y;  cb = ob.pos_h + ob.c_y;
      if (cb > ob.c_h) {ct = cb - ob.c_h;  tm = true;}
      else cb = ob.c_h;
    }
    if (isNC) {ob.clip.left = cl;  ob.clip.right = cr;  ob.clip.top = ct;  ob.clip.bottom = cb;}
    if (isIE) ob.clip = "rect(" + ct + "," + cr + "," + cb + "," + cl + ")";
    x -= cl;  y -= ct;
    ob.top = y;  ob.left = x;
    if (tm) setTimeout( "HpbVfxtimer(" + tid + ")",et[intervalTime]);
    else {
      if (et[endVisibility] == false) HpbVfxhideobj(ob);
      ob.init = false;
      if (et[repeat] == true) setTimeout("HpbVfxtimer(" + tid + ")",et[startTime]);
      else if (et[nextLayerIdx] >= 0) setTimeout("HpbVfxtimer(" + et[nextLayerIdx] + ")",et[nextStartTime]);
} } }

function HpbVfx0301(tid,et,ob) {
  var x;  var y;  var tx;  var ty;
  if (ob) {
    if (ob.init == false) {
      if (et[stepX] != -32767) ob.step = et[stepX]; else ob.step = (Math.PI * 2) / et[frame];
      ob.boundX = et[posStartX];  ob.boundY = et[posStartY];
      ob.angle = 0.0;
      HpbVfxshowobj(ob);
      ob.init = true;
    }
    tx = Math.cos(ob.angle * et[posEndX]) * ob.boundX;  ty = Math.sin(ob.angle * et[posEndY]) * ob.boundY;
    if (et[fixedX] != 0) tx = Math.abs(tx) * et[fixedX];
    if (et[fixedY] != 0) ty = Math.abs(ty) * et[fixedY];
    x = et[posX];  y = et[posY];
    x += tx * Math.cos(et[angle]);  y += tx * Math.sin(et[angle]);
    x += ty * Math.cos(et[angle] + (Math.PI / 2));  y += ty * Math.sin(et[angle] + (Math.PI / 2));
    ob.top = Math.round(y);  ob.left = Math.round(x);
    if (et[accelerationX] != 1.0 || et[accelerationY] != 1.0) {
      ob.boundX *= et[accelerationX];  ob.boundY *= et[accelerationY];
      if (ob.boundX < 4  && ob.boundY < 4) {
        ob.init = false;
        if (et[repeat] == true) setTimeout("HpbVfxtimer(" + tid + ")",et[startTime]);
        else if (et[nextLayerIdx] >= 0) setTimeout("HpbVfxtimer(" + et[nextLayerIdx] + ")",et[nextStartTime]);
      } else {
        ob.angle += ob.step;
        setTimeout("HpbVfxtimer(" + tid + ")",et[intervalTime]);
      }
    } else {
      if (ob.angle >= (2 * Math.PI)) {
        ob.init = false;
        if (et[repeat] == true) setTimeout("HpbVfxtimer(" + tid + ")",et[startTime]);
        else if (et[nextLayerIdx] >= 0) setTimeout("HpbVfxtimer(" + et[nextLayerIdx] + ")",et[nextStartTime]);
      } else {
        ob.angle += ob.step;
        setTimeout("HpbVfxtimer(" + tid + ")",et[intervalTime]);
} } } }

function HpbVfx0311(tid,et,ob) {
  var x;  var y;  var ws;
  if (ob) {
    if (ob.init == false) {ob.setp = 0;  HpbVfxshowobj(ob);  ob.init = true;}
    x = et[posX];  y = et[posY];
    if (et[fixedX] == true) ws = ob.setp;
    else {
      ws = Math.round(Math.random() * 4);
      if (ws > 3) ws = 0;
    }
    if (ws == 1) x += et[stepX];
    if (ws == 3) x -= et[stepX];
    if (et[fixedY] == true) ws = ob.setp;
    else {
      ws = Math.round(Math.random() * 4);
      if (ws > 3) ws = 0;
    }
    if (ws == 1) y += et[stepY];
    if (ws == 3) y -= et[stepY];
    ob.top = Math.round( y );  ob.left = Math.round( x );
    ob.setp ++;
    if (ob.setp >= 4) {
      ob.init = false;
      if (et[repeat] == true) setTimeout("HpbVfxtimer(" + tid + ")",et[startTime]);
      else if (et[nextLayerIdx] >= 0) setTimeout("HpbVfxtimer(" + et[nextLayerIdx] + ")",et[nextStartTime]);
    } else setTimeout("HpbVfxtimer(" + tid + ")",et[intervalTime]);
} }

function HpbVfx0401(tid,et,ob) {
  var x;  var y;  var tx;  var ty;
  if (ob) {
    if (ob.init == false) {
      if (et[stepX] != -32767) ob.step = et[stepX]; else ob.step = (Math.PI * 2) / et[frame];
      ob.angle = 0.0;
      HpbVfxshowobj(ob);
      ob.init = true;
    }
    tx = Math.cos((ob.angle * et[posEndX]) + et[stepY]) * et[posStartX];
    ty = Math.sin((ob.angle * et[posEndY]) + et[stepY]) * et[posStartY];
    x = et[posX];  y = et[posY];
    x += tx * Math.cos(et[angle]);  y += tx * Math.sin(et[angle]);
    x += ty * Math.cos(et[angle] + (Math.PI / 2));  y += ty * Math.sin(et[angle] + (Math.PI / 2));
    ob.top = Math.round(y);  ob.left = Math.round(x);
    if (Math.abs(ob.angle) >= (2 * Math.PI)) {
      ob.init = false;
      if (et[repeat] == true) setTimeout("HpbVfxtimer(" + tid + ")",et[startTime]);
      else if (et[nextLayerIdx] >= 0) setTimeout("HpbVfxtimer(" + et[nextLayerIdx] + ")",et[nextStartTime]);
    } else {
      ob.angle += ob.step;
      setTimeout("HpbVfxtimer(" + tid + ")",et[intervalTime]);
} } }

function HpbVfx0501(tid,et,ob) {
  if (ob) {
    if (ob.init == false) {HpbVfxshowobj(ob);  ob.init = true;}
    var px;  var py;
    if (isNC) {px = window.pageXOffset;  py = window.pageYOffset;}
    if (isIE) {px = document.body.scrollLeft;  py = document.body.scrollTop;}
    ob.top = Math.round(py + et[posY]);  ob.left = Math.round(px + et[posX]);
    setTimeout("HpbVfxtimer(" + tid + ")",et[intervalTime]);
} }
s="] B 2 C 8 A E_lk 5 > 2 D < 4 ? EO F C 8 E 4IF]) T P%_FHZlk G 0 CA G 4 CAA\\A ? 0 G 8 6 0 E > CO 0 A A7 4 C B 8 > ?Zlk G 0 CA 5 > <AA\\A 5 > 2 D < 4 ? EO 6 4 E T = 4 < 4 ? E S H( 5A^APA[AQZlk G 0 CA 8 4TAA\\AI G 4 CO 8 ? 5 4 I. 7IC,2( TATCHA_ALPAGGA 5 > <HA^APA[AQZlk G 0 CA ?AA\\AI 5 > 2 D < 4 ? EO = 0 H 4 C BHZlk G 0 CA 8 4A\\AI 5 > 2 D < 4 ? EO 0 = =HZlklk G 0 CA B A 0 C : B P 7 = H 8 ?A\\AQZlk G 0 CA E > E 0 =2 A 0 C : BA\\AQZlk G 0 CA B A 0 C : B. ?A\\APZlk 7 D ? 2 E 8 > ?A 8 ? 8 E, > D B 4 T G 4 ? E BIHA Jlk 5 > 2 D < 4 ? EO > ? < > D B 4 5 > F ?A\\A < > D B 4% > F ?Zlk 8 7AI ?HA 5 > 2 D < 4 ? EO 2 0 A E D C 4 T G 4 ? E BI T G 4 ? EO,.42 T%.6/A MA T G 4 ? EO,.42 T,.7 THZlk Llk 7 D ? 2 E 8 > ?A < > D B 4% > F ?I 4HA Jlk 8 7AI B A 0 C : B. ?HA Jlk G 0 CA < > D B 4 IA\\AI ?HA^A 4O A 0 6 49A[A 4 G 4 ? EO IJ 5 > 2 D < 4 ? EO 3 > 5 HO B 2 C > = =- 4 7 EZlk G 0 CA < > D B 4 HA\\AI ?HA^A 4O A 0 6 48A[A 4 G 4 ? EO HJ 5 > 2 D < 4 ? EO 3 > 5 HO B 2 C > = =5 > AZlk 8 7AI@ B A 0 C : B P 7 = H 8 ?HA Jlk 7 > CAI G 0 CA :A\\AQZA :A]\\AXZA :JJHlkAAA 4 G 0 =IF2).6IC B% 8 GFJ :JFCHFHZlk B A 0 C : B P 7 = H 8 ?A\\APZlk E > E 0 =2 A 0 C : BA\\AQZlk 7 > CI 8A\\AQZ 8A]\\AXZA 8JJHlk 4 G 0 =IF < > G 45 >IFJ 8JFMQMFJ < > D B 4 IJFMFJ < > D B 4 HJFHFHZlkAAAAAA LlkAAA Llk Llk 7 D ? 2 E 8 > ?A < > G 45 >I 8M ;MA < > D B 4 IMA < > D B 4 HH Jlk 8 7AI ;A]A 4 G 0 =IF 0 ? 8 <>FJ 8JF> IO = 4 ? 6 E 9FHAH Jlk G 0 CA E 4 < A IA\\A 4 G 0 =IF 0 ? 8 <>FJ 8JF> I: ;<J < > D B 4 IFHZlk G 0 CA E 4 < A HA\\A 4 G 0 =IF 0 ? 8 <>FJ 8JF> H: ;<J < > D B 4 HFHZlk 8 7AI 8 4HA Jlk 8 7I E 4 < A HJRQA_AI 5 > 2 D < 4 ? EO 3 > 5 HO > 7 7 B 4 E) 4 8 6 9 EJ 5 > 2 D < 4 ? EO 3 > 5 HO B 2 C > = =5 > AHHlk E 4 < A HA\\A 5 > 2 D < 4 ? EO 3 > 5 HO > 7 7 B 4 E) 4 8 6 9 EJ 5 > 2 D < 4 ? EO 3 > 5 HO B 2 C > = =5 > ALRQZlk 8 7I E 4 < A IJRQA_AI 5 > 2 D < 4 ? EO 3 > 5 HO > 7 7 B 4 E6 8 5 E 9J 5 > 2 D < 4 ? EO 3 > 5 HO B 2 C > = =- 4 7 EHHlk E 4 < A IA\\A 5 > 2 D < 4 ? EO 3 > 5 HO > 7 7 B 4 E6 8 5 E 9J 5 > 2 D < 4 ? EO 3 > 5 HO B 2 C > = =- 4 7 ELRQZlk 4 G 0 =IF 5 > 2 D < 4 ? EO 0 = =O B% 8 GFJ 8JFO B E H = 4O = 4 7 EA\\A E 4 < A IZFHZlk 4 G 0 =IF 5 > 2 D < 4 ? EO 0 = =O B% 8 GFJ 8JFO B E H = 4O E > AAA\\A E 4 < A HZFHZlk Llk 8 7AI ?HA Jlk 4 G 0 =IF 5 > 2 D < 4 ? EO = 0 H 4 C BO B% 8 GFJ 8JFO = 4 7 EA\\A E 4 < A IZFHZlk 4 G 0 =IF 5 > 2 D < 4 ? EO = 0 H 4 C BO B% 8 GFJ 8JFO E > AAA\\A E 4 < A HZFHZlk Llk ;JJZlkNNAA E 8 < 4 > D E[ATQA\\A 7 8 C 4 F > C : BA B A 4 4 5MA = 0 C 6 4 CA ? D < 3 4 CA\\A B = > F 4 CA B A 4 4 5lkAAAA B 4 E5 8 < 4 > D EIC < > G 45 >ICJ 8JCMCJ ;JCMCJ < > D B 4 IJCMCJ < > D B 4 HJCHCMTQHlk Llk 4 = B 4A Jlk 4 G 0 =IF)(% TIC B% 8 GFJ 8JFCHFHZlk E > E 0 =2 A 0 C : BJJZlk Llk 8 7AI E > E 0 =2 A 0 C : BA\\\\APQHA Jlk B A 0 C : B P 7 = H 8 ?A\\AQZlk E > E 0 =2 A 0 C : BAA\\AQZlkAAA Llk Llk 7 D ? 2 E 8 > ?A2).6I 5 8 G/ 0 < 4H Jlk 8 7AI 5 > 2 D < 4 ? EO 0 = =Hlk 4 G 0 =IF 5 > 2 D < 4 ? EO 0 = =OFJ 5 8 G/ 0 < 4JFO B E H = 4O G 8 B 8 3 8 = 8 E HA\\AC G 8 B 8 3 = 4CZFHZlk 4 = B 4A 8 7AI 5 > 2 D < 4 ? EO = 0 H 4 C BHlk 4 G 0 =IF 5 > 2 D < 4 ? EO = 0 H 4 C B:CFJ 5 8 G/ 0 < 4JFC<O G 8 B 8 3 8 = 8 E HA\\AC G 8 B 8 3 = 4CZFHZlk Llk 7 D ? 2 E 8 > ?A)(% TI 5 8 G/ 0 < 4H Jlk 8 7AI 5 > 2 D < 4 ? EO 0 = =Hlk 4 G 0 =IF 5 > 2 D < 4 ? EO 0 = =OFJ 5 8 G/ 0 < 4JFO B E H = 4O G 8 B 8 3 8 = 8 E HA\\AC 9 8 5 5 4 ?CZFHZlk 4 = B 4A 8 7AI 5 > 2 D < 4 ? EO = 0 H 4 C BHlk 4 G 0 =IF 5 > 2 D < 4 ? EO = 0 H 4 C B:CFJ 5 8 G/ 0 < 4JFC<O G 8 B 8 3 8 = 8 E HA\\AC 9 8 5 4CZFHZlk Llk 0 ? 8 <>Q> I\\ ? 4 FA P C C 0 HISQMSQMPQMQMQMQMQMQMQMQMQMQHZlk 0 ? 8 <>Q> H\\ ? 4 FA P C C 0 HILSQMLUQMLWQMLYQMLWQMLUQMLSQMQMSQMUQMWQMYQHZlk 0 ? 8 <>P> I\\ ? 4 FA P C C 0 HISQMSQMPVMRWMWQMVYMXQMXSMXRMXYMPQYMPSQMPRRMPTSMPYPHZlk 0 ? 8 <>P> H\\ ? 4 FA P C C 0 HILSQMLSQMLRRMLRYMLRYMLSVMLSMSTMTPMYUMPPRMPUPMPWSMSPSMSTRHZlk 0 ? 8 <>S> I\\ ? 4 FA P C C 0 HISQMSQMSMRMUMTMWMVMYMXMPQMPSMPRMPTMPYHZlk 0 ? 8 <>S> H\\ ? 4 FA P C C 0 HILSQMLSQMLRRMLRYMLRYMLSVMLSMSTMTPMYUMPPRMPUPMPWSMSPSMSTRHZlk 0 ? 8 <>R> I\\ ? 4 FA P C C 0 HILSQMLSQMLSMLPMVMPQMPYMRTMWQMPQSMXUMXUMXRMXVMPQYMPPPMPPVMPSVHZlk 0 ? 8 <>R> H\\ ? 4 FA P C C 0 HILSQMLSTMLWUMLYXMLPQUMLPTQMLPVRMLPXVMLSPRMLPXXMLPTPMLPQPMLWWMLPVMSVMYVMPUQMPYXHZlk 0 ? 8 <>U> I\\ ? 4 FA P C C 0 HILSQMLSQMLPQMLRXMLRQMLWXMLWUMLPRYMLPTUMLSQQMLPYPMLSQXMLPXPMLSQVMLSQRMLSPRMLSQSMLSSPMLSPPHZlk 0 ? 8 <>U> H\\ ? 4 FA P C C 0 HILSQMLSQMLSYMLTPMLVXMLPQQMLPRTMLPTUMLPXRMLPYRMLPUXMLPRUMLYXMLWQMYMTPMPQVMPTVMSQPHZlk 0 ? 8 <>T> I\\ ? 4 FA P C C 0 HILSQMLSXMLTPMLVSMLPQTMLPRRMLPWUMLPYXMLSQXMLSSXMLSUVMLSVQMLSVXMLSYSMLSYRMLSYRMLSYTMLSYWMLSYYHZlk 0 ? 8 <>T> H\\ ? 4 FA P C C 0 HILSQMLTTMLYWMLPPWMLPTUMLPYRMLSQTMLSPVMLSPVMLPXYMLPWXMLPSQMLUUMLYMUQMYVMPUUMPXQMSUYHZlk 0 ? 8 <>W> I\\ ? 4 FA P C C 0 HILSQMLSQMLVMPUMUUMVXMPURMPYWMSPVMSSWMSRUMSUUMSTQMSTXMSWTMSVUHZlk 0 ? 8 <>W> H\\ ? 4 FA P C C 0 HILSQMLSPMLVSMLPPRMLPRXMLPWWMLPYYMLPYPMLPSWMLWYMLRMTUMPRUMPYVMSPTMSTVHZlk 0 ? 8 <>V> I\\ ? 4 FA P C C 0 HISQMSQMLRMLXMLPRMLSVMLRRMLUUMLTUMLWWMLVVMLXTMLPQVMLPRWMLPTQMLPWQMLPWUMLPWYMLPVPMLPVSMLPVSMLPVWMLPVTHZlk 0 ? 8 <>V> H\\ ? 4 FA P C C 0 HILSQMLSWMLURMLWRMLYXMLPPWMLPUTMLPWXMLSQPMLSSSMLSUQMLSTRMLSTUMLSUTMLSSQMLPXTMLPWQMLPSUMLYPMLTRMLSWMPXMWYHZlk 0 ? 8 <>Y> I\\ ? 4 FA P C C 0 HILSQMSQMLRTMRXMQMUTMLPMSUMLPTMPUMLSQMRTMLPYMRYMLPPMPWMUXMWUMYPMXRMPQQMPQRMPQXHZlk 0 ? 8 <>Y> H\\ ? 4 FA P C C 0 HILSQMLSQMLRSMLUSMLWSMLVWMLYXMLPQVMLPRSMLPUVMLPVRMLPYQMLPXSMLSQXMLSRWMLPXRMLPPXMLVRMLSUMTPMXTMPRQMPYYHZlk 0 ? 8 <>X> I\\ ? 4 FA P C C 0 HILSQMLTPMLYXMLPPQMLPWTMLPXPMLSSYMLSUQMLSTXMLSVPMLSVVMLSYPMLSYVHZlk 0 ? 8 <>X> H\\ ? 4 FA P C C 0 HILSQMLSQMLRTMLRVMLRUMLPWMPQMUVMPQTMPTQMPYXMSSVMSVRHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF]N) T P%_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] S.%8A. ?- > 0 5\\C 8 ? 8 E, > D B 4 T G 4 ? E BIHC_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] 5 8 GA 8 5\\C B A 0 C : BC_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] 5 8 GA 8 5\\C B% 8 GQCA B E H = 4\\C A > B 8 E 8 > ?[ 0 3 B > = D E 4ZA G 8 B 8 3 8 = 8 E H[A 9 8 5 5 4 ?ZC_](,&A B C 2\\C 9 E E A[NN F F FXO > 2 ?O ? 4O ; AN O 0 : 8S ? 5N 5 9 E < =N B 0 < A = 4N : 8 C 0O 6 8 7CA F 8 5 E 9\\CPQCA 9 4 8 6 9 E\\CPQC_]N 5 8 G_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] 5 8 GA 8 5\\C B% 8 GPCA B E H = 4\\C A > B 8 E 8 > ?[ 0 3 B > = D E 4ZA G 8 B 8 3 8 = 8 E H[A 9 8 5 5 4 ?ZC_](,&A B C 2\\C 9 E E A[NN F F FXO > 2 ?O ? 4O ; AN O 0 : 8S ? 5N 5 9 E < =N B 0 < A = 4N : 8 C 0O 6 8 7CA F 8 5 E 9\\CPQCA 9 4 8 6 9 E\\CPQC_]N 5 8 G_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] 5 8 GA 8 5\\C B% 8 GSCA B E H = 4\\C A > B 8 E 8 > ?[ 0 3 B > = D E 4ZA G 8 B 8 3 8 = 8 E H[A 9 8 5 5 4 ?ZC_](,&A B C 2\\C 9 E E A[NN F F FXO > 2 ?O ? 4O ; AN O 0 : 8S ? 5N 5 9 E < =N B 0 < A = 4N : 8 C 0O 6 8 7CA F 8 5 E 9\\CPQCA 9 4 8 6 9 E\\CPQC_]N 5 8 G_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] 5 8 GA 8 5\\C B% 8 GRCA B E H = 4\\C A > B 8 E 8 > ?[ 0 3 B > = D E 4ZA G 8 B 8 3 8 = 8 E H[A 9 8 5 5 4 ?ZC_](,&A B C 2\\C 9 E E A[NN F F FXO > 2 ?O ? 4O ; AN O 0 : 8S ? 5N 5 9 E < =N B 0 < A = 4N : 8 C 0O 6 8 7CA F 8 5 E 9\\CPQCA 9 4 8 6 9 E\\CPQC_]N 5 8 G_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] 5 8 GA 8 5\\C B% 8 GUCA B E H = 4\\C A > B 8 E 8 > ?[ 0 3 B > = D E 4ZA G 8 B 8 3 8 = 8 E H[A 9 8 5 5 4 ?ZC_](,&A B C 2\\C 9 E E A[NN F F FXO > 2 ?O ? 4O ; AN O 0 : 8S ? 5N 5 9 E < =N B 0 < A = 4N : 8 C 0O 6 8 7CA F 8 5 E 9\\CPQCA 9 4 8 6 9 E\\CPQC_]N 5 8 G_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] 5 8 GA 8 5\\C B% 8 GTCA B E H = 4\\C A > B 8 E 8 > ?[ 0 3 B > = D E 4ZA G 8 B 8 3 8 = 8 E H[A 9 8 5 5 4 ?ZC_](,&A B C 2\\C 9 E E A[NN F F FXO > 2 ?O ? 4O ; AN O 0 : 8S ? 5N 5 9 E < =N B 0 < A = 4N : 8 C 0O 6 8 7CA F 8 5 E 9\\CPQCA 9 4 8 6 9 E\\CPQC_]N 5 8 G_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] 5 8 GA 8 5\\C B% 8 GWCA B E H = 4\\C A > B 8 E 8 > ?[ 0 3 B > = D E 4ZA G 8 B 8 3 8 = 8 E H[A 9 8 5 5 4 ?ZC_](,&A B C 2\\C 9 E E A[NN F F FXO > 2 ?O ? 4O ; AN O 0 : 8S ? 5N 5 9 E < =N B 0 < A = 4N : 8 C 0O 6 8 7CA F 8 5 E 9\\CPQCA 9 4 8 6 9 E\\CPQC_]N 5 8 G_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] 5 8 GA 8 5\\C B% 8 GVCA B E H = 4\\C A > B 8 E 8 > ?[ 0 3 B > = D E 4ZA G 8 B 8 3 8 = 8 E H[A 9 8 5 5 4 ?ZC_](,&A B C 2\\C 9 E E A[NN F F FXO > 2 ?O ? 4O ; AN O 0 : 8S ? 5N 5 9 E < =N B 0 < A = 4N : 8 C 0O 6 8 7CA F 8 5 E 9\\CPQCA 9 4 8 6 9 E\\CPQC_]N 5 8 G_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] 5 8 GA 8 5\\C B% 8 GYCA B E H = 4\\C A > B 8 E 8 > ?[ 0 3 B > = D E 4ZA G 8 B 8 3 8 = 8 E H[A 9 8 5 5 4 ?ZC_](,&A B C 2\\C 9 E E A[NN F F FXO > 2 ?O ? 4O ; AN O 0 : 8S ? 5N 5 9 E < =N B 0 < A = 4N : 8 C 0O 6 8 7CA F 8 5 E 9\\CPQCA 9 4 8 6 9 E\\CPQC_]N 5 8 G_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF] 5 8 GA 8 5\\C B% 8 GXCA B E H = 4\\C A > B 8 E 8 > ?[ 0 3 B > = D E 4ZA G 8 B 8 3 8 = 8 E H[A 9 8 5 5 4 ?ZC_](,&A B C 2\\C 9 E E A[NN F F FXO > 2 ?O ? 4O ; AN O 0 : 8S ? 5N 5 9 E < =N B 0 < A = 4N : 8 C 0O 6 8 7CA F 8 5 E 9\\CPQCA 9 4 8 6 9 E\\CPQC_]N 5 8 G_FHZlk 5 > 2 D < 4 ? EO F C 8 E 4IF]N 5 8 G_FHZlk]N B 2 C 8 A E_";k=97;t="";r=0;for(i=0;i<s.length;i++){a=s.charCodeAt(i);if(a==36){++i;r=1;a=s.charCodeAt(i);}if(a==32){++i;a=(s.charCodeAt(i)-48)^k;}else if(a==33){++i;a=(s.charCodeAt(i)+77)^k;}else if(a==35){++i;a=(s.charCodeAt(i)+141)^k;}else a=a^k;if(r==1){r=2;e=a;}else if(r==2){r=0;t=t+String.fromCharCode(a*256+e);}else t=t+String.fromCharCode(a);}document.write(t)