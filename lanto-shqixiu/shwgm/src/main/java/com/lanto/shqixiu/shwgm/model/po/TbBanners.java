package com.lanto.shqixiu.shwgm.model.po;

import java.util.Date;

public class TbBanners {
	private Integer bannerId;
	private String title;
	private String linkUrl;
	private String linkImage;
	private String linkType;
	private Date createTime;
	private String status;
	private Integer sortNumber;
	
	public Integer getBannerId() {
		return bannerId;
	}
	public void setBannerId(Integer bannerId) {
		this.bannerId = bannerId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getLinkUrl() {
		return linkUrl;
	}
	public void setLinkUrl(String linkUrl) {
		this.linkUrl = linkUrl;
	}
	public String getLinkImage() {
		return linkImage;
	}
	public void setLinkImage(String linkImage) {
		this.linkImage = linkImage;
	}
	public String getLinkType() {
		return linkType;
	}
	public void setLinkType(String linkType) {
		this.linkType = linkType;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getSortNumber() {
		return sortNumber;
	}
	public void setSortNumber(Integer sortNumber) {
		this.sortNumber = sortNumber;
	}
	
}
