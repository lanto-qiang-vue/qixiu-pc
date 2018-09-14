package com.lanto.shqixiu.shwgc.model.bean;

import java.io.Serializable;
import java.util.Date;

public class TcFileUploadInfoBean implements Serializable {
	
	private Long fileUploadInfoId;	//FILE_UPLOAD_INFO_ID
	private Integer billType;	//BILL_TYPE
	private String fileId;	//FILE_ID
	private Integer isValid;	//IS_VALID
	private String fileName;	//FILE_NAME
	private String type;	//FILE_TYPE
	private String fileSizeType;	//FILE_SIZE_TYPE
	private Date createDate;	//CREATE_DATE
	private Date updateDate;	//UPDATE_DATE
	private String size;	//FILE_SIZE
	private Long billId;	//BILL_ID
	private String name;	//NAME
	private Integer status;
	private Integer percent;
	private Integer filePercent;
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
	public Long getBillId() {
		return billId;
	}
	public void setBillId(Long billId) {
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public Integer getPercent() {
		return percent;
	}
	public void setPercent(Integer percent) {
		this.percent = percent;
	}
	public Integer getFilePercent() {
		return filePercent;
	}
	public void setFilePercent(Integer filePercent) {
		this.filePercent = filePercent;
	}
	
}
