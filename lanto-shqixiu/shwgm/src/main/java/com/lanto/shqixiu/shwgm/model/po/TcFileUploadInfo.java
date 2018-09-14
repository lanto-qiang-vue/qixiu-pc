package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;

public class TcFileUploadInfo implements Serializable {
	private Long fileUploadInfoId;	//ID
	private Integer billType;	//业务类型
	private String fileId;	//UUID文件名称
	private Integer isValid;	//是否有效
	private String fileName;	//文件名称
	private String type;	//文件类型
	private String fileSizeType;	//FILE_SIZE_TYPE
	private Date createDate;	//上传日期
	private Date updateDate;	//修改日期
	private String fileSize;	//文件大小
	private String billId;	//业务ID
	private String name;	//名称
	private Integer status;	//状态
	private Integer filePercent;	//上传百分比
	private String attrUser;	//上传人	
	
	public String getAttrUser() {
		return attrUser;
	}
	public void setAttrUser(String attrUser) {
		this.attrUser = attrUser;
	}
	public Long getFileUploadInfoId() {
		return fileUploadInfoId;
	}
	public void setFileUploadInfoId(Long fileUploadInfoId) {
		this.fileUploadInfoId = fileUploadInfoId;
	}
	public Integer getBillType() {
		return billType;
	}
	public void setBillType(Integer billType) {
		this.billType = billType;
	}
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	public Integer getIsValid() {
		return isValid;
	}
	public void setIsValid(Integer isValid) {
		this.isValid = isValid;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getFileSizeType() {
		return fileSizeType;
	}
	public void setFileSizeType(String fileSizeType) {
		this.fileSizeType = fileSizeType;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public String getFileSize() {
		return fileSize;
	}
	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}
	public String getBillId() {
		return billId;
	}
	public void setBillId(String billId) {
		this.billId = billId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getFilePercent() {
		return filePercent;
	}
	public void setFilePercent(Integer filePercent) {
		this.filePercent = filePercent;
	}
}
