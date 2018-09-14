package com.lanto.shqixiu.shwgm.util.excel;

import java.io.OutputStream;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFComment;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.CellRangeAddress;
import org.softbase.utils.CommonUtils;

import com.lanto.shqixiu.shwgm.common.WebCache;

public class ExcelWriterPoiWriter {

	public static Logger logger = Logger.getLogger(ExcelWriterPoiWriter.class);
	
	
	
	/**
	 * 根据数据生成Excel文件,推荐
	 * @user : liuxin
	 * @date : 2014-10-17
	 * @param title 表头
	 * @param exportData 导出数据
	 * @param fileName 文件名
	 * @param sheetName sheet名称
	 * @param column 列名
	 * @param megerList 合并列(暂不支持)
	 * @throws Exception
	 */
	public static void writeExcel(List<String> title, List<Map<String, Object>> exportData, String fileName, String sheetName,
			List<String> column, List<Integer> megerList,HttpServletResponse response) throws Exception {
		List<String> tcCodeColumn = null;
		writeExcel(title, exportData, fileName, sheetName,column, megerList, tcCodeColumn,response);
	}
	
	/**
	 * 根据数据生成Excel文件,推荐
	 * @user : liuxin
	 * @date : 2014-10-17
	 * @param title 表头
	 * @param exportData 导出数据
	 * @param fileName 文件名
	 * @param sheetName sheet名称
	 * @param column 列名
	 * @param megerList 合并列(暂不支持)
	 * @param tcCodeColumn TC_CODE转换列
	 * @throws Exception
	 */
	public static void writeExcel(List<String> title, List<Map<String, Object>> exportData, String fileName, String sheetName,
			List<String> column, List<Integer> megerList, List<String> tcCodeColumn,HttpServletResponse response) throws Exception {
		List<String>[] titleArray = null;
		if(null != title) {
			titleArray = new List[1];
			titleArray[0] = title;
		}
		writeExcel(titleArray, exportData, fileName, sheetName, column, megerList, null, tcCodeColumn,response);
	}
	
	
	/**
	 * 
	 * 功能说明              :根据数据生成Excel文件,推荐
	 * 创建人                   : liuxin
	 * 最后修改日期    : 2015-04-23
	 * @param resultList
	 * @param sheetName
	 * @param fileName
	 * @throws Exception
	 */
	public static void writeExcel(List<List<String>> resultList, String sheetName, String fileName,HttpServletResponse response) throws Exception {

		HSSFWorkbook hssfworkbook = new HSSFWorkbook();
		OutputStream os = null;
		try {
			os = response.getOutputStream();
			//将一个sheet页的内容写入Excel中
			createOneSheet(resultList, sheetName, hssfworkbook, null);
			fileName = new String(fileName.getBytes("GB2312"), "ISO8859-1"); // 导出的文字编码
			response.addHeader("Content-disposition", "attachment;filename=" + fileName + ".xls");
			response.setContentType("application/msexcel");
			hssfworkbook.write(os);
		} catch (Exception e) {
			throw e;
		} finally {
			if (os != null) {
				os.flush();
				os.close();
			}
		}
	}
	
	/**
	 * 
	 * 功能说明              :将一个sheet页的内容写入Excel中
	 * 创建人                   : liuxin
	 * 最后修改日期    : 2015-04-23
	 * @param resultList
	 * @param sheetName
	 * @param hssfworkbook
	 */
	private static void createOneSheet(List<List<String>> resultList, String sheetName, HSSFWorkbook hssfworkbook,
			List<Integer> megerList) {
		//标题样式
		HSSFCellStyle titleStyle = getTitelStyle(hssfworkbook);
		//内容样式
		HSSFCellStyle contentStyle = getContentStyle(hssfworkbook);
		
		//设置sheetName
		HSSFSheet hssfsheet = hssfworkbook.createSheet(sheetName == null || "".equals(sheetName) ? "" : sheetName);
		HSSFRow excelRow = null;
		HSSFCell excelCell = null;
		Map<Integer, String> beforeMegerMap = new HashMap<Integer, String>();
		Map<Integer, Integer> beforeMegerRow = new HashMap<Integer, Integer>();
		for (int i = 0; i < resultList.size(); i++) {
			excelRow = hssfsheet.createRow(i);
			List<String> rowList = resultList.get(i);
			for (int j = 0; j < rowList.size(); j++) {
			
				String cellStr = rowList.get(j);
				cellStr = cellStr == null ? "" : cellStr;
				excelCell = excelRow.createCell(j);
				//设置成文本格式
				excelCell.setCellType(HSSFCell.CELL_TYPE_STRING);
				if(i==0){
					excelCell.setCellStyle(titleStyle);
					if(resultList.size() == 1) {//导出只有表头的空模板时，所有列的单元格格式设置为文本，防止自动格式化
						HSSFCellStyle cellStyle2 = hssfworkbook.createCellStyle();  
			            HSSFDataFormat format = hssfworkbook.createDataFormat();  
			            cellStyle2.setDataFormat(format.getFormat("@"));  
			            hssfsheet.setDefaultColumnStyle(j, cellStyle2);
					}
				}else{
					excelCell.setCellStyle(contentStyle);
				}
				if (megerList != null && megerList.contains(j)) {
					if (cellStr.equals(beforeMegerMap.get(j))) {
						if (i == (resultList.size() - 1)) {
							hssfsheet.addMergedRegion(new CellRangeAddress(beforeMegerRow.get(j), i, j, j));
						}
					} else {
						beforeMegerMap.put(j, cellStr);
						if ((i > 0 && beforeMegerRow.get(j).intValue() != (i - 1))) {
							hssfsheet.addMergedRegion(new CellRangeAddress(beforeMegerRow.get(j), i - 1, j, j));
						}
						beforeMegerRow.put(j, i);
						setCellValue(cellStr, excelCell);
					}
				} else {
					setCellValue(cellStr, excelCell);
				}
				if(i==(resultList.size()-1)){
					hssfsheet.autoSizeColumn((short)j);
					//System.out.println(hssfsheet.getColumnWidth(j)+":"+hssfsheet.getDefaultColumnWidth());
					if(hssfsheet.getColumnWidth(j)<(2048-100)){
						hssfsheet.setColumnWidth(j,2048);
					}else{
						hssfsheet.setColumnWidth(j, hssfsheet.getColumnWidth(j)+1200);
					}
				}
			}
			
			
		}
	}

	
	/**
	 * 根据数据生成Excel文件(多表头)
	 * @user : liuxin
	 * @date : 2014-10-17
	 * @param title 多表头
	 * @param exportData 导出数据
	 * @param fileName 文件名
	 * @param sheetName sheet名称
	 * @param column 列名
	 * @param megerList 合并列(暂不支持)
	 * @param anchor 表头批注 
	 * @param tcCodeColumn TC_CODE转换列
	 * @throws Exception
	 */
	public static void writeExcel(List<String>[] title, List<Map<String, Object>> exportData, String fileName, String sheetName,
			List<String> column, List<Integer> megerList, Map<Integer, Object>[] anchor, List<String> tcCodeColumn,HttpServletResponse response) throws Exception {
		HSSFWorkbook hssfworkbook = new HSSFWorkbook();
		OutputStream os = null;
		try {
			os = response.getOutputStream();
			int totalSize = exportData.size();
			int sheetNum = Math.round((totalSize / 50000)) + 1;
			if(sheetNum > 1) {
				List<Map<String, Object>> subExportData = null;
				int fromIndex = 0;
				int toIndex = 0;
				for(int i=0; i<sheetNum; i++) {
					fromIndex = i * 50000;
					toIndex = (i+1) * 50000 < totalSize ? (i+1) * 50000 : totalSize;
					subExportData = exportData.subList(fromIndex, toIndex);
					//将一个sheet页的内容写入Excel中
					createOneSheet(title, subExportData, sheetName+(i+1), hssfworkbook, column, null, anchor, tcCodeColumn);
				}
			}else {
				//将一个sheet页的内容写入Excel中
				createOneSheet(title, exportData, sheetName, hssfworkbook, column, null, anchor, tcCodeColumn);
			}
			fileName = new String(fileName.getBytes("GB2312"), "ISO8859-1"); // 导出的文字编码
			String date = CommonUtils.dateToString(new Date(), "yyyyMMdd_HHmmss");
			response.addHeader("Content-disposition", "attachment;filename=" + fileName + "_" + date + ".xls");
			response.setContentType("application/msexcel");
			hssfworkbook.write(os);
		} catch (Exception e) {
			throw e;
		} finally {
			if (os != null) {
				os.flush();
				os.close();
			}
		}
	}
	
	/**将一个sheet页的内容写入Excel中
	 * @user : liuxin
	 * @date : 2014-10-17
	 * @param title 表头
	 * @param exportData 导出数据
	 * @param sheetName sheet名称
	 * @param hssfworkbook 
	 * @param column 列名
	 * @param megerList 合并列
	 * @param anchor 
	 * @param tcCodeColumn 
	 */
	private static void createOneSheet(List<String>[] title, List<Map<String, Object>> exportData, String sheetName,
			HSSFWorkbook hssfworkbook, List<String> column, List<Integer> megerList, Map<Integer, Object>[] anchor, List<String> tcCodeColumn) {
		//标题样式
		HSSFCellStyle titleStyle = getTitelStyle(hssfworkbook);
		//内容样式
		HSSFCellStyle contentStyle = getContentStyle(hssfworkbook);
		
		//设置sheetName
		HSSFSheet hssfsheet = hssfworkbook.createSheet(sheetName == null || "".equals(sheetName) ? "" : sheetName);
		
		HSSFRow excelRow = null;
		HSSFCell excelCell = null;
		Map<Integer, Object> beforeMegerMap = new HashMap<Integer, Object>();
		Map<Integer, Integer> beforeMegerRow = new HashMap<Integer, Integer>();
		
		int firstRow = null != title && title.length > 0 ? title.length : 0;
		//创建表头
		if(null != title) {
			
			List<String> titleRow = null;
			for(int i=0; i<title.length; i++) {
				excelRow = hssfsheet.createRow(i);
				titleRow = title[i];
				hssfsheet.createFreezePane(0, i+1, 0, title.length);//固定表头
				for(int j=0; j<titleRow.size(); j++) {
					String titleStr = titleRow.get(j);
					excelCell = excelRow.createCell(j);
					excelCell.setCellType(HSSFCell.CELL_TYPE_STRING);
					excelCell.setCellStyle(titleStyle);
					setCellValue(titleStr, excelCell);
					
					//设置表头批注
					if(null != anchor && null != anchor[i] && null != anchor[i].get(j)) {
						//创建绘图对象
						HSSFPatriarch patriarch=hssfsheet.createDrawingPatriarch();
						//获取批注对象
						//(int dx1, int dy1, int dx2, int dy2, short col1, int row1, short col2, int row2)
						//前四个参数是坐标点,后四个参数是编辑和显示批注时的大小.
						HSSFComment comment=patriarch.createComment(new HSSFClientAnchor(0,0,0,0,(short)3,3,(short)6,7));
						//输入批注信息
						comment.setString(new HSSFRichTextString((String)anchor[i].get(j)));
						//将批注添加到单元格对象中
						excelCell.setCellComment(comment);
					}
				}
			}
		}
		//创建数据
		for (int i = 0; i < exportData.size(); i++) {
			int rowNum = i + firstRow;
			excelRow = hssfsheet.createRow(rowNum);
			Map<String, Object> rowList = exportData.get(i);
			for (int j = 0; j < column.size(); j++) {
				Object cellStr = rowList.get(column.get(j)) == null ? "" : (Object)rowList.get(column.get(j));
				excelCell = excelRow.createCell(j);
				//设置成文本格式
				excelCell.setCellStyle(contentStyle);
				if (megerList != null && megerList.contains(j)) {
					if (null != beforeMegerMap.get(j) && !"".equals(cellStr.toString()) && cellStr.toString().equals(beforeMegerMap.get(j).toString())) {
						if (i == (exportData.size() - 1)) {
							hssfsheet.addMergedRegion(new CellRangeAddress(beforeMegerRow.get(j), rowNum, j, j));
						}
					} else {
						beforeMegerMap.put(j, cellStr);
						if ((i > 0 && beforeMegerRow.get(j).intValue() != (rowNum - 1))) {
							hssfsheet.addMergedRegion(new CellRangeAddress(beforeMegerRow.get(j), rowNum - 1, j, j));
						}
						beforeMegerRow.put(j, rowNum);
						cellStr = getTcCodeDesc(cellStr, tcCodeColumn, column.get(j));
						setCellValue(cellStr, excelCell);
					}
				} else {
					cellStr = getTcCodeDesc(cellStr, tcCodeColumn, column.get(j));
					setCellValue(cellStr, excelCell);
				}
				if(i==(exportData.size()-1)){
					hssfsheet.autoSizeColumn((short)j);
					if(hssfsheet.getColumnWidth(j)<(2048-100)){
						hssfsheet.setColumnWidth(j,2048);
					}else{
						hssfsheet.setColumnWidth(j, hssfsheet.getColumnWidth(j)+1200);
					}
				}
			}
		}
	}
	
	
	/**
	 * 根据需要替换TC_CODE的值
	 * @user : liuxin
	 * @date : 2014-10-17
	 * @param cellStr
	 * @param tcCodeColumn
	 * @param column 
	 * @return
	 */
	private static Object getTcCodeDesc(Object cellStr, List<String> tcCodeColumn, String curColumn) {
		if(null != tcCodeColumn && null != cellStr && !CommonUtils.checkIsNullStr(cellStr.toString()) && tcCodeColumn.contains(curColumn) && cellStr.toString().length() == 8) {
			Object result = WebCache.getDictDescById(cellStr.toString().substring(0, 4), cellStr.toString());
			if(null != result && !CommonUtils.checkIsNullStr(result.toString())){
				cellStr = result;
			}
		}
		return cellStr;
	}
	
	/**
	 * 
	 * 功能说明              :获得标题样式
	 * @user : liuxin
	 * @date : 2014-10-17
	 * 最后修改日期    : 
	 * @param workbook
	 */
	private static HSSFCellStyle getContentStyle(HSSFWorkbook workbook) {
		HSSFCellStyle contentStyle = workbook.createCellStyle();
		contentStyle.setBorderBottom((short) 1);
		contentStyle.setBorderLeft((short) 1);
		contentStyle.setBorderRight((short) 1);
		contentStyle.setBorderTop((short) 1);
		contentStyle.setFillForegroundColor(HSSFColor.WHITE.index);
		contentStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		//titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); 
		contentStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		return contentStyle;
	}
	
	/**
	 * 
	 * 功能说明              :获得标题样式
	 * @user : liuxin
	 * @date : 2014-10-17
	 * @param workbook
	 */
	private static HSSFCellStyle getTitelStyle(HSSFWorkbook workbook) {
		HSSFCellStyle titleStyle = workbook.createCellStyle();
		titleStyle.setBorderBottom((short) 1);
		titleStyle.setBorderLeft((short) 1);
		titleStyle.setBorderRight((short) 1);
		titleStyle.setBorderTop((short) 1);
		titleStyle.setFillForegroundColor(HSSFColor.LIGHT_ORANGE.index);
		titleStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); 
		titleStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		return titleStyle;
	}
	
	/**
	 * 
	 * 功能说明              :解悉数据格式
	 * @user : liuxin
	 * @date : 2014-10-17
	 * @param cellStr
	 * @param excelCell
	 */
	private static void setCellValue(String cellStr, HSSFCell excelCell) {
		excelCell.setCellValue(cellStr);
	}
	
	/**根据值类型设定单元格值
	 * @user : liuxin
	 * @date : 2014-10-17
	 * @param cellStr 单元格值
	 * @param excelCell 单元格
	 */
	private static void setCellValue(Object cellStr, HSSFCell excelCell) {
		if(null == cellStr){
			excelCell.setCellValue("");
		}else{
			if(cellStr.getClass().equals(Long.class)){
				excelCell.setCellValue((Long)cellStr);
			}else if(cellStr.getClass().equals(Integer.class)){
				excelCell.setCellValue((Integer)cellStr);
			}else if(cellStr.getClass().equals(Double.class)){
				excelCell.setCellValue((Double)cellStr);
			}else if(cellStr.getClass().equals(Float.class)){
				//2014-07-22 jerry
				//因为setCellValue没有Float的方法，会自动转换为double，会有精度损失 ，所以使用String转换
				excelCell.setCellValue(new Double(((Float)cellStr).toString()));
			}else if(cellStr.getClass().equals(String.class)){
				excelCell.setCellValue((String)cellStr);
			}else if(cellStr.getClass().equals(Date.class)){
				excelCell.setCellValue((Date)cellStr);
			}else if(cellStr.getClass().equals(BigDecimal.class)){
				excelCell.setCellValue(((BigDecimal)cellStr).doubleValue());
			}else{
				excelCell.setCellValue(cellStr.toString());
			}
		}
	}
}
