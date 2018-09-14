package com.lanto.shqixiu.shcheck.model.bean;

import java.util.List;

import org.springframework.beans.BeanUtils;

//用于生成extjs中的tree组件所需要的node,包含checkbox
@SuppressWarnings("serial")
public class FuncCheckedNode extends TcCheckFunc{
	protected String text ;
	@SuppressWarnings("unused")
	private boolean leaf;
	private boolean checked;
	private List<FuncCheckedNode> children;
	
	public FuncCheckedNode(TcCheckFunc po,boolean flag){
		if(po!=null){
			BeanUtils.copyProperties(po, this);
			this.text = po.getFuncName();
			if(flag){
				this.checked = true;
			}
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

	public List<FuncCheckedNode> getChildren() {
		return children;
	}

	public void setChildren(List<FuncCheckedNode> children) {
		this.children = children;
	}

	public boolean getChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	
	
}

