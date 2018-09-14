package com.lanto.shqixiu.shwgm.model.bean;

import java.util.List;

import org.springframework.beans.BeanUtils;

//用于生成extjs中的tree组件所需要的node
@SuppressWarnings("serial")
public class MapNode{
	protected String text ;
	@SuppressWarnings("unused")
	private boolean leaf;
	private String icon;
	private String code;
	private String lng;
	private String lat;
	private String type;
	private List<MapNode> children;
	
	
	
	public MapNode(String text, String code,
			String lng, String lat, String type,String icon) {
		this.text = text;
		this.code = code;
		this.lng = lng;
		this.lat = lat;
		this.type = type;
		this.icon = icon;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLng() {
		return lng;
	}

	public void setLng(String lng) {
		this.lng = lng;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public List<MapNode> getChildren() {
		return children;
	}

	public void setChildren(List<MapNode> children) {
		this.children = children;
	}
	
}
