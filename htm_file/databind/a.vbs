Option Explicit
Dim FSO, Fl, Ts, str
Set FSO = Wscript.CreateObject("Scripting.FileSystemObject")
Set Fl = FSO.GetFile("msdos.csv")
Set Ts = Fl.OpenAsTextStream(1, -2)
str = Ts.ReadAll


WScript.Echo UCase(str)
	