package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;

public class TbExamFileScore implements Serializable {
	private Integer id;	//ID
	private String fileId;	//考核单号
	private Integer itemId;	//项目ID
	private Float selfScore;	//自评分
	private Float zjScore;	//专家评分
	private Float firstScore;	//初评分
	private Float secScore;	//复评分

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	public Integer getItemId() {
		return itemId;
	}
	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}
	public Float getSelfScore() {
		return selfScore;
	}
	public void setSelfScore(Float selfScore) {
		this.selfScore = selfScore;
	}
	public Float getZjScore() {
		return zjScore;
	}
	public void setZjScore(Float zjScore) {
		this.zjScore = zjScore;
	}
	public Float getFirstScore() {
		return firstScore;
	}
	public void setFirstScore(Float firstScore) {
		this.firstScore = firstScore;
	}
	public Float getSecScore() {
		return secScore;
	}
	public void setSecScore(Float secScore) {
		this.secScore = secScore;
	}
}
