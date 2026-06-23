<?xml version="1.0" encoding="shift_jis" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" encoding="Shift_Jis" />
<xsl:template match="/">
	<html>
	<head>
	<title>アドレス帳</title>
	</head>
	<body>
<table border="1">
	<tr><th>名前</th><th>住所</th><th>年齢</th></tr>
<xsl:for-each select="addressBook/member">
<xsl:sort select="addressBook/old" data-type="number" order="ascending" />
<tr>
<td nowrap="nowrap">
<a>
<xsl:attribute name="href">
<xsl:value-of select="address" />
</xsl:attribute>
<xsl:value-of select="name" />
</a>
</td>
<td><xsl:value-of select="address" /></td>
<td><xsl:value-of select="old" />歳</td>
</tr>
</xsl:for-each>
</table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>


