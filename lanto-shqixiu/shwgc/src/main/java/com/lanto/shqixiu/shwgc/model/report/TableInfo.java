package com.lanto.shqixiu.shwgc.model.report;

import java.util.ArrayList;
import java.util.List;

public class TableInfo {
	private String TableName;
	
	private String SQLText;
	
	private List<FieldInfo> FieldInfoList = new ArrayList<FieldInfo>();

	public String getTableName() {
		return TableName;
	}

	public void setTableName(String tableName) {
		TableName = tableName;
	}

	public String getSQLText() {
		return SQLText;
	}

	public void setSQLText(String sQLText) {
		SQLText = sQLText;
	}

	public List<FieldInfo> getFieldInfoList() {
		return FieldInfoList;
	}

	public void setFieldInfoList(List<FieldInfo> fieldInfoList) {
		FieldInfoList = fieldInfoList;
	}
	
}
