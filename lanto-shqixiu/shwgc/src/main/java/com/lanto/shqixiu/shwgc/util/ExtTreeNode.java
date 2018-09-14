package com.lanto.shqixiu.shwgc.util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Ext通用属性结构
 * User: zhaotianwu
 * DateTime: 14-3-17 下午4:37
 */
public class ExtTreeNode implements Serializable {
    public Long id;      //主键
    public transient Long parentId; //父字段
    public List<ExtTreeNode> children = new ArrayList<ExtTreeNode>();
    private String text = "";
    private boolean expanded=false; //是否展开
    private boolean checked = false;// 定义是否选中
    private boolean leaf=false;  //是否是叶子节点

    public ExtTreeNode(Long id, Long parentId, String text) {
        this.id = id;
        this.parentId = parentId;
        this.text = text;
    }
    public ExtTreeNode() {
    }
    
    
    
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public boolean getLeaf() {
		return (children==null || children.size()==0);
	}
    
    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isExpanded() {
        return expanded;
    }

    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }

    public List<ExtTreeNode> getChildren() {
        return children;
    }
    

    public void setChildren(List<ExtTreeNode> children) {
		this.children = children;
	}

    public boolean getChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
