package com.lanto.shqixiu.shcheck.model.report;

import java.util.ArrayList;
import java.util.List;

public class TableDataPkg {
	private String Name;
	private String IC;
	private TableInfo TableInfo;
	
	
	
	public TableDataPkg(String name, String iC) {
		super();
		Name = name;
		IC = iC;
	}
	private List<Object> DataRecordList = new ArrayList<Object>();
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getIC() {
		return IC;
	}
	public void setIC(String iC) {
		IC = iC;
	}
	public TableInfo getTbinfo() {
		return TableInfo;
	}
	public void setTbinfo(TableInfo tbinfo) {
		this.TableInfo = tbinfo;
	}
	public List<Object> getList() {
		return DataRecordList;
	}
	public void setList(List<Object> list) {
		this.DataRecordList = list;
	}
	
	
}
