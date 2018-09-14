package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TmSysHelp implements Serializable {
	private Integer id;	//ID
	private String funcId;	//FUNC_ID
	private String content;	//CONTENT

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getFuncId() {
		return funcId;
	}
	public void setFuncId(String funcId) {
		this.funcId = funcId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
}
