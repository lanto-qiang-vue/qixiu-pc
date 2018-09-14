package com.lanto.shqixiu.shwgm.model.app;

import java.io.Serializable;
import java.util.Date;

/***
 * 
 * @author Administrator
 * 
 */
public class TbDailyCheckProductImage implements Serializable {
	private Integer imageId; // IMAGE_ID
	private Integer checkId; // CHECK_ID
	private String imageName; // IMAGE_NAME

	public Integer getImageId() {
		return imageId;
	}

	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}

	public Integer getCheckId() {
		return checkId;
	}

	public void setCheckId(Integer checkId) {
		this.checkId = checkId;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

}
