<?xml version="1.0" encoding="shift_jis"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/tr/wd-xsl" xml:lang="ja">
<xsl:template match="/">
<html>
<head><title>エーアイムック管理表</title></head>
<body style="margin-left:50;margin-right:50;">
<xsl:apply-templates select="リスト"/>
</body>
</html>
</xsl:template>
<xsl:template match="リスト">
<table border="1" style="font-size:9pt;
 border-collapse:collapse;">
<thead style="background-color: skyblue;
color:black;">
<tr>
<td>No</td>
<td>タイトル</td>
<td>サブタイトル</td>
<td>価格</td>
<td>表紙</td>
</tr>
</thead>
<xsl:for-each select="ムック">
<tr>
<td><xsl:value-of select="番号" /></td>
<td><xsl:value-of select="タイトル" /></td>
<td><xsl:value-of select="サブ" /></td>
<td><xsl:value-of select="価格" /></td>
<td>
<img width="75" height="100">
<xsl:attribute name="src">
<xsl:value-of select="画像" />
</xsl:attribute>
</img>
</td>
</tr>
</xsl:for-each>
</table>
</xsl:template>
</xsl:stylesheet>