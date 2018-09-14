package com.lanto.shqixiu.shwgc.model.bean;

import java.util.List;

//用于生成extjs中的tree组件所需要的node,包含checkbox
@SuppressWarnings("serial")
public class CheckedNode{
	protected String text ;
	@SuppressWarnings("unused")
	private boolean leaf;
	private boolean checked;
	private List<CheckedNode> children;
	private String code;
	private String icon;
	private boolean name;
	
	public CheckedNode(String text ,String code,boolean flag,boolean name){
		this.text = text;
		this.code = code;
		this.name = name;
		if(flag){
			this.checked = true;
		}
	}


	public String getText() {
		return text;
	}

	public void setText(String text) {
	}

	public boolean getLeaf() {
		return (children==null || children.size()==0);
	}

	public void setLeaf(boolean leaf) {		
	}

	public List<CheckedNode> getChildren() {
		return children;
	}

	public void setChildren(List<CheckedNode> children) {
		this.children = children;
	}

	public boolean getChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}


	public boolean getName() {
		return name;
	}


	public void setName(boolean name) {
		this.name = name;
	}


	
	
}

