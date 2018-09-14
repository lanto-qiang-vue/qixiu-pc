package com.lanto.shqixiu.shwgc.model.report;

import java.util.ArrayList;
import java.util.List;

public class DataPackage {
	
	
	private HeadPackage HeadPackage;
	private DataPackXml DataPackXml;
	
	
	
	public DataPackage(HeadPackage headPackage, DataPackXml dataPackXml) {
		super();
		HeadPackage = headPackage;
		DataPackXml = dataPackXml;
	}
	
	public HeadPackage getHeadPackage() {
		return HeadPackage;
	}
	public void setHeadPackage(HeadPackage headPackage) {
		HeadPackage = headPackage;
	}
	public DataPackXml getDataPackXml() {
		return DataPackXml;
	}
	public void setDataPackXml(DataPackXml dataPackXml) {
		DataPackXml = dataPackXml;
	}
	
	
	
	
}
