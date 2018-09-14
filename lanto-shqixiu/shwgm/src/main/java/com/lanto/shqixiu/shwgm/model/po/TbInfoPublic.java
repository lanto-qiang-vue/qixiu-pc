package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbInfoPublic implements Serializable {
	private Integer infoId;	//ID
	private String infoType;
	private String title;	//标题
	private String content;	//内容
	private String creator;	//作者
	private String dataFrom;	//来源
	private Date createTime;	//添加时间
	private Date updateTime;	//修改时间
	private String createUser;//添加用户
	private String publishStatus;	//发布状态
	private Date publishTime;		//发布时间
	private String importantFlag;	//重要标志
	private String photo;			//照片

	
	
	public String getImportantFlag() {
		return importantFlag;
	}
	public void setImportantFlag(String importantFlag) {
		this.importantFlag = importantFlag;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public Integer getInfoId() {
		return infoId;
	}
	public void setInfoId(Integer infoId) {
		this.infoId = infoId;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getDataFrom() {
		return dataFrom;
	}
	public void setDataFrom(String dataFrom) {
		this.dataFrom = dataFrom;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public String getInfoType() {
		return infoType;
	}
	public void setInfoType(String infoType) {
		this.infoType = infoType;
	}
	public String getPublishStatus() {
		return publishStatus;
	}
	public void setPublishStatus(String publishStatus) {
		this.publishStatus = publishStatus;
	}
	public Date getPublishTime() {
		return publishTime;
	}
	public void setPublishTime(Date publishTime) {
		this.publishTime = publishTime;
	}
	
}
