package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbEmployeeBaseInfo implements Serializable {
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
	
}
