package com.lanto.shqixiu.shcheck.model.report;

public class FieldInfo {
	private String FieldID = "1";
	private String DataType = "1";
	private String Length = "200";
	private String FieldName;
	private String DispName;
	
	public FieldInfo(String fieldID, String dataType, String length,
			String fieldName, String dispName) {
		super();
		FieldID = fieldID;
		DataType = dataType;
		Length = length;
		FieldName = fieldName;
		DispName = dispName;
	}
	
	public FieldInfo() {
	}
	
	public FieldInfo(String fieldID, String fieldName, String dispName,String dataType) {
		super();
		FieldID = fieldID;
		FieldName = fieldName;
		DispName = dispName;
		DataType = dataType;
	}


	public String getFieldID() {
		return FieldID;
	}
	public void setFieldID(String fieldID) {
		FieldID = fieldID;
	}
	public String getDataType() {
		return DataType;
	}
	public void setDataType(String dataType) {
		DataType = dataType;
	}
	public String getLength() {
		return Length;
	}
	public void setLength(String length) {
		Length = length;
	}
	public String getFieldName() {
		return FieldName;
	}
	public void setFieldName(String fieldName) {
		FieldName = fieldName;
	}
	public String getDispName() {
		return DispName;
	}
	public void setDispName(String dispName) {
		DispName = dispName;
	}
	
}
