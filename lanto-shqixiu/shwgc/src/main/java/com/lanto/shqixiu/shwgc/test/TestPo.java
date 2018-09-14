package com.lanto.shqixiu.shwgc.test;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class TestPo {
	
	private String userName;
	private BigDecimal userAge;
	private Timestamp createTime;
	private Boolean isStudent;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public BigDecimal getUserAge() {
		return userAge;
	}
	public void setUserAge(BigDecimal userAge) {
		this.userAge = userAge;
	}
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	public Boolean getIsStudent() {
		return isStudent;
	}
	public void setIsStudent(Boolean isStudent) {
		this.isStudent = isStudent;
	}
	
}
