package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TbBdExamType implements Serializable {
	private Integer typeId;	//ID
	private String typeName;	//名称
	private Integer typeScore;	//分值
	private String examType;	//考核类别 0 一二类 1 其他
	private Integer versionNo;	//版本
	private Integer orderId;	//顺序

	public Integer getTypeId() {
		return typeId;
	}
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public Integer getTypeScore() {
		return typeScore;
	}
	public void setTypeScore(Integer typeScore) {
		this.typeScore = typeScore;
	}
	public String getExamType() {
		return examType;
	}
	public void setExamType(String examType) {
		this.examType = examType;
	}
	public Integer getVersionNo() {
		return versionNo;
	}
	public void setVersionNo(Integer versionNo) {
		this.versionNo = versionNo;
	}
	public Integer getOrderId() {
		return orderId;
	}
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}
}
