package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbEmployeeExaminer implements Serializable {
	private Integer employeeId;	//EMPLOYEE_ID
	private String name;	//姓名
	private String idNum;	//身份证号
	private String sex;	//性别
	private Date createDate;	//出生日期
	private Date auditDate;	 	
	private String post;	//工作岗位
	private String corpId;	//所属企业ID
	private String corpName;
	private String telphone;	//联系电话
	private String address;	//住址
	private String status;	//状态
	private String remark;	//REMARK
	private String degree;
	private Integer workyear;
	private String cbyy;
	
	public String getCbyy() {
		return cbyy;
	}
	public void setCbyy(String cbyy) {
		this.cbyy = cbyy;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public Integer getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIdNum() {
		return idNum;
	}
	public void setIdNum(String idNum) {
		this.idNum = idNum;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getPost() {
		return post;
	}
	public void setPost(String post) {
		this.post = post;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getTelphone() {
		return telphone;
	}
	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getAuditDate() {
		return auditDate;
	}
	public void setAuditDate(Date auditDate) {
		this.auditDate = auditDate;
	}
	public Integer getWorkyear() {
		return workyear;
	}
	public void setWorkyear(Integer workyear) {
		this.workyear = workyear;
	}
	
	
}
