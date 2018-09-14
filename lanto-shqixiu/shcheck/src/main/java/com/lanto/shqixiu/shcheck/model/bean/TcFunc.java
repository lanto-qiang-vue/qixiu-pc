/*
* Copyright (c) 2005 Infoservice, Inc. All  Rights Reserved.
* This software is published under the terms of the Infoservice Software
* License version 1.0, a copy of which has been included with this
* distribution in the LICENSE.txt file.
*
* CreateDate : 2013-12-17 20:28:41
* CreateBy   : jerry
* Comment    : generate by com.sgm.po.POGen
*/

package com.lanto.shqixiu.shcheck.model.bean;

import org.softbase.utils.CommonUtils;

@SuppressWarnings("serial")
public class TcFunc{

	private String funcType;
	private Long parFuncId;
	private String funcName;
	private Long funcId;
	private String funcCode;
	private Long sortOrder;
	private String icon;
	private String iconFont;
	private String iconCls;
	private Integer topLevel;
	
	public String getFuncType() {
		return funcType;
	}
	public void setFuncType(String funcType) {
		this.funcType = funcType;
	}
	public Long getParFuncId() {
		return parFuncId;
	}
	public void setParFuncId(Long parFuncId) {
		this.parFuncId = parFuncId;
	}
	public String getFuncName() {
		return funcName;
	}
	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}
	public Long getFuncId() {
		return funcId;
	}
	public void setFuncId(Long funcId) {
		this.funcId = funcId;
	}
	public String getFuncCode() {
		return funcCode;
	}
	public void setFuncCode(String funcCode) {
		this.funcCode = funcCode;
	}
	public Long getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(Long sortOrder) {
		this.sortOrder = sortOrder;
	}
	public String getIcon() {
		if(CommonUtils.checkIsNullStr(icon)){
			icon = "images/menus/comm.gif";
		}
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getIconFont() {
		return iconFont;
	}
	public void setIconFont(String iconFont) {
		this.iconFont = iconFont;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public Integer getTopLevel() {
		return topLevel;
	}
	public void setTopLevel(Integer topLevel) {
		this.topLevel = topLevel;
	}
	


}