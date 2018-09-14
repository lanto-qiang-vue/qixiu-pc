package com.lanto.shqixiu.shwgm.model.po;

public class TbSmsAccount {
	private Integer id;
	private String userName;			//用户名
	private String password;			//密码
	private String sign;				//签名
	private String url;					//发送短信地址
	private Integer surplusNumber;		//剩余短信条数
	private String surplusUrl;			//查询剩余短信地址
	
	
	public String getSurplusUrl() {
		return surplusUrl;
	}
	public void setSurplusUrl(String surplusUrl) {
		this.surplusUrl = surplusUrl;
	}
	public Integer getSurplusNumber() {
		return surplusNumber;
	}
	public void setSurplusNumber(Integer surplusNumber) {
		this.surplusNumber = surplusNumber;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSign() {
		return sign;
	}
	public void setSign(String sign) {
		this.sign = sign;
	}
	
	
}
