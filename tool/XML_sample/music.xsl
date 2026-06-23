<?xml version="1.0" encoding="Shift_JIS" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" encoding="Shift_JIS" />
	<xsl:template match="/">
		<html>
		 <head>
		  <title>作曲家リスト</title>
		 </head>
		 <body>
		  <h1>作曲家リスト</h1>
		   <dl>
		    <xsl:apply-templates select="music" />		    
		  </dl>
		 </body>
		</html>
	</xsl:template>
	<xsl:template match="music">	
		<xsl:for-each select="musician">				    

			<xsl:sort select="@birth" data-type="text"
			order="ascending" />
			<dt style="font-size:11pt;">
			  <xsl:value-of select="@name" />
			</dt>
			  <dd style="font-size:10pt;">
			    <ol>
			      <li>時代区分：<xsl:value-of select="@category" /></li>
			      <li>誕生日：<xsl:value-of select="@birth" /></li>
			      <li>生まれ：<xsl:value-of select="@country" /></li>
			      <li>代表作：<xsl:value-of select="@imp_work" /></li>
			    </ol>
			  </dd>
			  <hr />
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>