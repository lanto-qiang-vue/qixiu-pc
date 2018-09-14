package com.lanto.shqixiu.shcheck.model.po;

import java.util.Date;

public class TbRepairQuato {
	private Integer id;
	private String type;
	private Integer corpId;
	private Integer createQuato;
	private Integer uploadQuato;
	private Integer searchQuato;
	private String createUser;
	private String remark;
	private Date createTime;
	
	
	
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public Integer getCreateQuato() {
		return createQuato;
	}
	public void setCreateQuato(Integer createQuato) {
		this.createQuato = createQuato;
	}
	public Integer getUploadQuato() {
		return uploadQuato;
	}
	public void setUploadQuato(Integer uploadQuato) {
		this.uploadQuato = uploadQuato;
	}
	public Integer getSearchQuato() {
		return searchQuato;
	}
	public void setSearchQuato(Integer searchQuato) {
		this.searchQuato = searchQuato;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	
}
