<?xml version="1.0" encoding="shift_JIS"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!--xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">-->
    <!--<xsl:output method="html" encoding="Shift-JIS" indent="yes"/>-->
    <xsl:output method="html" encoding="Shift-JIS"/>
    <!--<xsl:template match="@* | node()">-->
    <xsl:template match="/">
        <html>
            <head>
                <title>
                    <xsl:value-of select="books/@title" />
                </title>
                <link rel="stylesheet" type="text/css" href="books.css" />

                <script type="text/JavaScript">
<![CDATA[
	<!--
		var objDoc=document.XMLDocument;
		var objStl=document.XSLDocument;
		var nodRow=objStl.selectSingleNode("//xsl:sort");

                        function disp(){                            

                            key=document.forms[0].srt.value;
                            switch(key){
                                case "1":
                                    tmp1="@isbn";
                                    tmp2="text";
                                    break;
                                case "2":
                                    tmp1="name";
                                    tmp2="text";
                                    break;
                                case "3":
                                    tmp1="author";
                                    tmp2="text";
                                    break;
                                case "4":
                                    tmp1="publish";
                                    tmp2="text";
                                    break;
                                case "5":
                                    tmp1="price";
                                    tmp2="number";
                                    break;
                                case "6":
                                    tmp1="pDate";
                                    tmp2="text";
                                    break;		    
                            }

                            key=document.forms[1].srt_odr.value

                            switch(key){
		       case "1":
			tmp3="ascending";
			break;
		       case "2":
			tmp3="descending";
			break;
	               }

                            nodRow.setAttribute("select",tmp1);
                            nodRow.setAttribute("data-type",tmp2);
                            nodRow.setAttribute("order",tmp3);
                            dSrt.innerHTML=objDoc.documentElement.transformNode(objStl);
//		alert(dSrt.innerHTML);
                        }

	//-->
]]>
                </script>

            </head>
            <body onload="disp()">
                <h1>
                    <xsl:value-of select="books/@title" />
                </h1>
                <div id="dSrt">
                    <xsl:apply-templates select="books" />
                </div>
                <p>
                    <form>
                        ソートキー：
                        <select name="srt" onchange="disp()">
                            <option value="1">ISBNコード</option>
                            <option value="2">書籍名</option>
                            <option value="3">著者</option>
                            <option value="4">出版社</option>
                            <option value="5">価格</option>
                            <option value="6">発刊日</option>
                        </select>
                    </form>
                    <form>
                        昇順/降順：
                        <select name="srt_odr" onchange="disp()">
                            <option value="1">昇順</option>
                            <option value="2">降順</option>
                        </select>
                    </form>
                </p>
                <div>
                    <xsl:value-of select="books/owner" />
                </div>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="books">
        <table border="1">
            <tr>
                <th>ISBNコード</th>
                <th>書籍</th>
                <th>著者</th>
                <th>出版社</th>
                <th>価格</th>
                <th>発刊日</th>
            </tr>
            <xsl:for-each select="book">
                <xsl:sort select="@isbn" data-type="text" order="ascending"/>
                <tr>
                    <td nowrap="nowrap">
                        <xsl:value-of select="@isbn"/>
                    </td>
                    <td nowrap="nowrap">
                        <xsl:element name="a">
                            <xsl:attribute name="href">
                                <xsl:value-of select="url"/>
                            </xsl:attribute>
                            <xsl:value-of select="name"/>
                        </xsl:element>
                    </td>
                    <td nowrap="nowrap">
                        <xsl:value-of select="author"/>
                    </td>
                    <td nowrap="nowrap">
                        <xsl:value-of select="publish"/>
                    </td>
                    <td nowrap="nowrap">
                        <xsl:choose>
                            <xsl:when test="price[number(.) &lt;= 3000]">
                                <span style="font-weight:bold;">
                                    <xsl:value-of select="price"/>円
                                </span>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="price"/>円
                            </xsl:otherwise>
                        </xsl:choose>
                    </td>
                    <td nowrap="nowrap">
                        <xsl:value-of select="pDate"/>
                    </td>
                </tr>
            </xsl:for-each>
        </table>
    </xsl:template>
</xsl:stylesheet>
