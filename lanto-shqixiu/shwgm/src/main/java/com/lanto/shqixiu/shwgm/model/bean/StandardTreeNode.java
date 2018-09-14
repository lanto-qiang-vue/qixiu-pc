
package com.lanto.shqixiu.shwgm.model.bean;

import java.util.List;

import org.springframework.beans.BeanUtils;



@SuppressWarnings("serial")
public class StandardTreeNode extends DbRepairStandardBean{
	protected String text ;
	@SuppressWarnings("unused")
	private boolean leaf;
	private List<StandardTreeNode> children;
	private String iconCls;
	
	public StandardTreeNode(DbRepairStandardBean po){
		if(po!=null){
			BeanUtils.copyProperties(po, this);
			this.text = po.getName();
		}
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
	}

	public boolean getLeaf() {
		return "3".equals(this.getType());
	}

	public void setLeaf(boolean leaf) {		
	}

	public List<StandardTreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<StandardTreeNode> children) {
		this.children = children;
	}
	
	public void addChildren(StandardTreeNode node){
		this.children.add(node);
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	
}