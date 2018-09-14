package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TbExamFileFgs implements Serializable {
	private Integer id;	//ID
	private String fileId;	//质量考核档案号
	private String corpName;	//企业名称
	private String corpAdd;	//企业地址

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getCorpAdd() {
		return corpAdd;
	}
	public void setCorpAdd(String corpAdd) {
		this.corpAdd = corpAdd;
	}
}
