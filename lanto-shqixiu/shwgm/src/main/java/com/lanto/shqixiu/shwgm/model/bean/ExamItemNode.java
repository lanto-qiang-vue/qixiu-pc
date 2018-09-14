package com.lanto.shqixiu.shwgm.model.bean;

import java.util.List;

import org.springframework.beans.BeanUtils;

import com.lanto.shqixiu.shwgm.model.po.TbBdExamType;

//用于生成extjs中的tree组件所需要的node
@SuppressWarnings("serial")
public class ExamItemNode extends TbBdExamType{
	protected String text ;
	@SuppressWarnings("unused")
	private boolean leaf;
	private String icon;
	private List<ExamItemNode> children;
	
	public ExamItemNode(TbBdExamType po,String icon){
		this.icon = icon;
		if(po!=null){
			BeanUtils.copyProperties(po, this);
			this.text = po.getTypeName();
		}
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public boolean getLeaf() {
		return (children==null || children.size()==0);
	}

	public void setLeaf(boolean leaf) {		
	}

	public List<ExamItemNode> getChildren() {
		return children;
	}

	public void setChildren(List<ExamItemNode> children) {
		this.children = children;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
}
