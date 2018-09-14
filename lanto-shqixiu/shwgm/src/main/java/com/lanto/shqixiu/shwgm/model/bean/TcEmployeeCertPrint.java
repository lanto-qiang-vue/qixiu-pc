package com.lanto.shqixiu.shwgm.model.bean;

import java.io.Serializable;

import java.util.Date;
@SuppressWarnings("serial")
public class TcEmployeeCertPrint {
	private Integer employeeId;	//EMPLOYEE_ID
	private String name;	//姓名
	private String idNum;	//身份证号
	private String sex;	//性别
	private Date birthDate;	//出生日期
	private String post;	//工作岗位
	private String corpId;	//所属企业ID
	private String telphone;	//联系电话
	private String address;	//住址
	private String status;	//状态
	private String remark;	//REMARK
	private String photo;	//照片(仅作演示用)
	private String degree;
	private Integer isexaminer;//质检员标志
	private Integer isrepairman;//维修工标志
	private String corpNameSyz;	//省运政企业名称
	private String xb;	//CERT_NAME	
	private String papernumber;
	private String certName;	//CERT_NAME
	private Date sendDate;	//SEND_DATE
	private Date endDate;	//END_DATE
	private String corpName;	
	private String corpName1;	
	private String corpName2;	
	private String corpName3;		
	
	public String getXb() {
		return xb;
	}
	public void setXb(String xb) {
		this.xb = xb;
	}
	public String getPapernumber() {
		return papernumber;
	}
	public void setPapernumber(String papernumber) {
		this.papernumber = papernumber;
	}
	public String getCertName() {
		return certName;
	}
	public void setCertName(String certName) {
		this.certName = certName;
	}
	public Date getSendDate() {
		return sendDate;
	}
	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getCorpName1() {
		return corpName1;
	}
	public void setCorpName1(String corpName1) {
		this.corpName1 = corpName1;
	}
	public String getCorpName2() {
		return corpName2;
	}
	public void setCorpName2(String corpName2) {
		this.corpName2 = corpName2;
	}
	public String getCorpName3() {
		return corpName3;
	}
	public void setCorpName3(String corpName3) {
		this.corpName3 = corpName3;
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
	public Date getBirthDate() {
		return birthDate;
	}
	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
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
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}
	public Integer getIsexaminer() {
		return isexaminer;
	}
	public void setIsexaminer(Integer isexaminer) {
		this.isexaminer = isexaminer;
	}
	public Integer getIsrepairman() {
		return isrepairman;
	}
	public void setIsrepairman(Integer isrepairman) {
		this.isrepairman = isrepairman;
	}
	public String getCorpNameSyz() {
		return corpNameSyz;
	}
	public void setCorpNameSyz(String corpNameSyz) {
		this.corpNameSyz = corpNameSyz;
	}
	
}
