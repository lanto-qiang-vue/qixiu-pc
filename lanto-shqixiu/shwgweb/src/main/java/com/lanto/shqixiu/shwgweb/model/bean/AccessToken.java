package com.lanto.shqixiu.shwgweb.model.bean;

public class AccessToken {
	private Integer u;  //userId
	private String ut; //userType
	private String d; //deviceId
	private Long t; //timeMillis
	
	public Integer getU() {
		return u;
	}
	public void setU(Integer u) {
		this.u = u;
	}
	public String getUt() {
		return ut;
	}
	public void setUt(String ut) {
		this.ut = ut;
	}
	public String getD() {
		return d;
	}
	public void setD(String d) {
		this.d = d;
	}
	public Long getT() {
		return t;
	}
	public void setT(Long t) {
		this.t = t;
	}
	@Override
	public String toString() {
		return "AccessToken [u=" + u + ", ut=" + ut + ", d=" + d + ", t=" + t
				+ "]";
	}
	
	
}
