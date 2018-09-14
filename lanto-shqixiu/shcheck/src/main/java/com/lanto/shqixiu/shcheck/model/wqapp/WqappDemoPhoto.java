package com.lanto.shqixiu.shcheck.model.wqapp;

import java.io.Serializable;

public class WqappDemoPhoto implements Serializable {
	private Integer gdId;	
	private Integer imgId;	
	private String imgPath;
	public Integer getGdId() {
		return gdId;
	}
	public void setGdId(Integer gdId) {
		this.gdId = gdId;
	}
	public Integer getImgId() {
		return imgId;
	}
	public void setImgId(Integer imgId) {
		this.imgId = imgId;
	}
	public String getImgPath() {
		return imgPath;
	}
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}	
	
}
