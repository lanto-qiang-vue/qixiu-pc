package com.lanto.shqixiu.shwgc.util.excel;

import java.util.List;
import java.util.Map;

public interface ExcelParseInterface {

	public List<String> getRowDataList(int rowNum);
	
	public Map<Integer, List<String>> getAllRowData();
	
	public Map<Integer, List<String>> getAllRowData(int sheetNum) throws Exception;
	
	public void destory();
	
}
