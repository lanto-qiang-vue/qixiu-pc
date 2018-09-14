package com.lanto.shqixiu.shwgweb.service;

import org.springframework.stereotype.Service;

/**
 * 
 * @user : zhoujt
 * @date : 2018-02-01
 */
@Service
public class UtilService {
	public static String transform(String content)
	{
		String contentNew = "";
		if(content != null && content != "") {
			contentNew = content.replaceAll("&", "&amp;amp;")
					.replaceAll("<", "&amp;lt;")
					.replaceAll(">", "&amp;gt;")
					.replaceAll("'", "&amp;#039;")
					.replaceAll("\"", "&amp;quot;");
		} else {
			contentNew = content;
		}
		return contentNew;
	}
	
}
