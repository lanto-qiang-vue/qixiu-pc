package com.lanto.shqixiu.shwgm.model.app;

import java.io.Serializable;
import java.util.Date;

/***
 * 
 * @author Administrator
 * 
 */
public class TbDailyCheckBusinessSign implements Serializable {
	private Integer signId; // IMAGE_ID
	private Integer checkId; // CHECK_ID
	private String fileName; // IMAGE_NAME
	public Integer getSignId() {
		return signId;
	}
	public void setSignId(Integer signId) {
		this.signId = signId;
	}
	public Integer getCheckId() {
		return checkId;
	}
	public void setCheckId(Integer checkId) {
		this.checkId = checkId;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


}
