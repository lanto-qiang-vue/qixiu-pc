package com.lanto.shqixiu.shwgc.model.po;

import java.util.Date;

public class TbRepairPhoto {
	private Integer imageId;
	private Integer recordId;
	private String imagePath;
	private Date takeTime;
	private String imageInfo;
	private Date createTime;
	
	
	public Integer getImageId() {
		return imageId;
	}
	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}
	public Integer getRecordId() {
		return recordId;
	}
	public void setRecordId(Integer recordId) {
		this.recordId = recordId;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public Date getTakeTime() {
		return takeTime;
	}
	public void setTakeTime(Date takeTime) {
		this.takeTime = takeTime;
	}
	public String getImageInfo() {
		return imageInfo;
	}
	public void setImageInfo(String imageInfo) {
		this.imageInfo = imageInfo;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	
}
