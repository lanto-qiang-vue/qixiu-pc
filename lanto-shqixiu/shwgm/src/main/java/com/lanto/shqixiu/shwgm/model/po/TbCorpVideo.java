package com.lanto.shqixiu.shwgm.model.po;

public class TbCorpVideo {
	private Integer id;
	private Integer corpId;
	private Integer videoNum;
	private String videoName;
	private String hlsUrlHd;
	private String hlsUrlFast;
	private String deviceSn;
	private String deviceVerifyCode;
	private String status;
	private Integer recordId;
	
	
	public Integer getRecordId() {
		return recordId;
	}
	public void setRecordId(Integer recordId) {
		this.recordId = recordId;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public Integer getVideoNum() {
		return videoNum;
	}
	public void setVideoNum(Integer videoNum) {
		this.videoNum = videoNum;
	}
	public String getVideoName() {
		return videoName;
	}
	public void setVideoName(String videoName) {
		this.videoName = videoName;
	}
	public String getHlsUrlHd() {
		return hlsUrlHd;
	}
	public void setHlsUrlHd(String hlsUrlHd) {
		this.hlsUrlHd = hlsUrlHd;
	}
	public String getHlsUrlFast() {
		return hlsUrlFast;
	}
	public void setHlsUrlFast(String hlsUrlFast) {
		this.hlsUrlFast = hlsUrlFast;
	}
	public String getDeviceSn() {
		return deviceSn;
	}
	public void setDeviceSn(String deviceSn) {
		this.deviceSn = deviceSn;
	}
	public String getDeviceVerifyCode() {
		return deviceVerifyCode;
	}
	public void setDeviceVerifyCode(String deviceVerifyCode) {
		this.deviceVerifyCode = deviceVerifyCode;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
