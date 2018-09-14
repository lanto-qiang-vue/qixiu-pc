package com.lanto.shqixiu.shwgweb.model.po;

import java.util.Date;

public class QxwSatisfactionSurvey {
	private Integer id;			//ID
	private String title;			//标题
	private String description;
	private String content;			//调查描述
	private Integer sort;
	private Boolean isaudit;
	private Date createTime;		//创建时间
	private Date modifytime;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public Boolean getIsaudit() {
		return isaudit;
	}

	public void setIsaudit(Boolean isaudit) {
		this.isaudit = isaudit;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getModifytime() {
		return modifytime;
	}

	public void setModifytime(Date modifytime) {
		this.modifytime = modifytime;
	}
}
