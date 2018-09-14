package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbEmployeeExpert implements Serializable {
	private Integer expertId;
	private String name;	//姓名
	private String idNum;	//身份证号
	private String sex;	//性别
	private Date birthDate;	//出生日期
	private String corpId;
	private String empUnit;
	private String telphone;	//联系电话
	private String address;	//住址
	private String degree;
	private String status;	//状态
	private String photo;	//照片(仅作演示用)
	private String nativePlace;	//REMARK
	private String professor;
	private String honor;
	private String goodAt;
	
	private Date createDate;
	
	
	public Integer getExpertId() {
		return expertId;
	}
	public void setExpertId(Integer expertId) {
		this.expertId = expertId;
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
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getEmpUnit() {
		return empUnit;
	}
	public void setEmpUnit(String empUnit) {
		this.empUnit = empUnit;
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
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getNativePlace() {
		return nativePlace;
	}
	public void setNativePlace(String nativePlace) {
		this.nativePlace = nativePlace;
	}
	public String getProfessor() {
		return professor;
	}
	public void setProfessor(String professor) {
		this.professor = professor;
	}
	public String getHonor() {
		return honor;
	}
	public void setHonor(String honor) {
		this.honor = honor;
	}
	public String getGoodAt() {
		return goodAt;
	}
	public void setGoodAt(String goodAt) {
		this.goodAt = goodAt;
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
	
}
