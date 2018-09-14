package com.lanto.shqixiu.shwgm.model.bean;

import java.util.List;

//用于生成extjs中的tree组件所需要的node,包含checkbox
@SuppressWarnings("serial")
public class TaskRootCheckedNode{
	protected String text ;
	@SuppressWarnings("unused")
	private boolean leaf;
	private List<TaskCheckedNode> children;
	private String code;
	private String icon;
	private boolean name;
	
	public TaskRootCheckedNode(String text ,String code,boolean name){
		this.text = text;
		this.code = code;
		this.name = name;
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

	public List<TaskCheckedNode> getChildren() {
		return children;
	}

	public void setChildren(List<TaskCheckedNode> children) {
		this.children = children;
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

