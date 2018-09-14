package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class TrRepairImage implements Serializable {
	private Integer imageId;
	private Long geneId;		
	private String corpNum;	
	private String billCode;	
	private Integer channelCode;
	private Date createDate;
	private String image1;
	
	public String getBillCode() {
		return billCode;
	}
	public void setBillCode(String billCode) {
		this.billCode = billCode;
	}
	public Integer getChannelCode() {
		return channelCode;
	}
	public void setChannelCode(Integer channelCode) {
		this.channelCode = channelCode;
	}
	public Integer getImageId() {
		return imageId;
	}
	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}
	public Long getGeneId() {
		return geneId;
	}
	public void setGeneId(Long geneId) {
		this.geneId = geneId;
	}
	public String getCorpNum() {
		return corpNum;
	}
	public void setCorpNum(String corpNum) {
		this.corpNum = corpNum;
	}

	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getImage1() {
		return image1;
	}
	public void setImage1(String image1) {
		this.image1 = image1;
	}

	
}
