package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;

public class TbReportTemp implements Serializable {
	private Integer id;	//ID
	private String provno;	//PROVNO
	private String ywlx;	//YWLX
	private byte[] bbsl;	//BBSL
	private String version;	//VERSION

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getProvno() {
		return provno;
	}
	public void setProvno(String provno) {
		this.provno = provno;
	}
	public String getYwlx() {
		return ywlx;
	}
	public void setYwlx(String ywlx) {
		this.ywlx = ywlx;
	}
	public byte[] getBbsl() {
		return bbsl;
	}
	public void setBbsl(byte[] bbsl) {
		this.bbsl = bbsl;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
}
