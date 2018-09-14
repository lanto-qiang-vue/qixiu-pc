package com.lanto.shqixiu.shwgm.model.bean;

import java.util.List;

import org.springframework.beans.BeanUtils;

//用于生成extjs中的tree组件所需要的node
@SuppressWarnings("serial")
public class FuncNode extends TcFunc{
	protected String text ;
	@SuppressWarnings("unused")
	private boolean leaf;
	private List<FuncNode> children;
	
	public FuncNode(TcFunc po){
		if(po!=null){
			BeanUtils.copyProperties(po, this);
			this.text = po.getFuncName();
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

	public List<FuncNode> getChildren() {
		return children;
	}

	public void setChildren(List<FuncNode> children) {
		this.children = children;
	}
	
	public void addChildren(FuncNode node){
		this.children.add(node);
	}
}
