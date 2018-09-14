package com.lanto.shqixiu.shwgweb.model.bean;

import java.util.ArrayList;
import java.util.List;

//用于生成extjs中的tree组件所需要的node,包含checkbox
@SuppressWarnings("serial")
public class TreeNode{
	protected String text ;
	@SuppressWarnings("unused")
	private boolean leaf;
	private List<TreeNode> children = new ArrayList<TreeNode>();
	private String code;
	private String icon;
	
	public TreeNode(String text ,String code,String icon){
		this.text = text;
		this.code = code;
		this.icon = icon;
	}
	
	public TreeNode(String text ,String code){
		this.text = text;
		this.code = code;
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

	public List<TreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<TreeNode> children) {
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
	
	public void addChildren(TreeNode node){
		this.children.add(node);
	}
}

