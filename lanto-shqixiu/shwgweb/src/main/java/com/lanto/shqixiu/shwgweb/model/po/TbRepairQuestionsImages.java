package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbRepairQuestionsImages implements Serializable {
	private Integer imageId;
	private Integer quesId;
	private String imagePath;
	private Date createDate;
	
	public Integer getImageId() {
		return imageId;
	}
	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}
	public Integer getQuesId() {
		return quesId;
	}
	public void setQuesId(Integer quesId) {
		this.quesId = quesId;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
}
