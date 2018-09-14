package com.lanto.shqixiu.shcheck.util.excel;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

/**
 * 
* 功能说明：Excel导入功能，可将指定Excel文件导入
* 典型用法：
* 示例程序如下：
* 特殊用法：
* 创建者：liuxin
* 创建时间：2015-4-23
* 修改人：
* 修改时间：
* 修改原因：
* 修改内容：
* 版本：0.1
 */
public class ExcelImportPoiUtil implements ExcelParseInterface {

	public Logger logger = Logger.getLogger(ExcelImportPoiUtil.class);
	private Workbook _WorkBook = null;
	private Sheet _Sheet = null;
	private int currSheet = 0;
	private ByteArrayInputStream in = null;
	private List<Integer> megerCellList = null;
	private Map<Integer, Sheet> sheetMap = new HashMap<Integer, Sheet>();
	private Map<Integer,Map<String,Integer>> rowCellMap = new HashMap<Integer,Map<String,Integer>>();
	private Map<Integer,String> BeforeCell = new HashMap<Integer,String>();
	private int maxBlankRow = -1;

	/**
	 * 
	* 功能说明：构造函数 读取所有sheet面的中数据
	* @param in
	* @param fileName
	* @throws IOException
	* 创建者：liuxin
	* 创建时间：2015-4-23
	 */
	public ExcelImportPoiUtil(byte[] bytes, String fileName) throws IOException {
		super();
		in = new ByteArrayInputStream(bytes);
		parseExcel(in, fileName);
	}
	
	/**
	 * 
	* 功能说明：构造函数 读取所有sheet面的中数据
	* @param in
	* @param fileName
	* @throws IOException
	* 创建者：liuxin
	* 创建时间：2015-4-23
	 */
	public ExcelImportPoiUtil(byte[] bytes, String fileName,List<Integer> megerCellList) throws IOException {
		super();
		in = new ByteArrayInputStream(bytes);
		this.megerCellList = megerCellList;
		parseExcel(in, fileName);
	}
	
	/**
	 * 
	* 功能说明：构造函数 读取所有sheet面的中数据
	* @param in
	* @param fileName
	* @throws IOException
	* 创建者：liuxin
	* 创建时间：2015-4-23
	 */
	private ExcelImportPoiUtil(InputStream in, String fileName) throws IOException {
		super();
		parseExcel(in, fileName);
	}
	
	/**
	 * 
	* 功能说明：构造函数 读取所有sheet面的中数据
	* @param in
	* @param fileName
	* @throws IOException
	* 最后修改时间：2011-3-24
	 */
	private ExcelImportPoiUtil(InputStream in, String fileName,List<Integer> megerCellList) throws IOException {
		super();
		this.megerCellList = megerCellList;
		parseExcel(in, fileName);
	}

	/**
	 * 
	 * 功能说明              :执行清理
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 */
	public void destory() {
		try{
			if(in!=null){
				in.close();
			}
		}catch(Exception e){
			logger.error(e);
		}
	}

	private void parseExcel(InputStream in, String fileName) throws IOException {
		if (in != null) {
			int isExcel2003 = 0;
			isExcel2003 = isExcel2003(fileName);
			if (isExcel2003 == 2) {
				_WorkBook = new HSSFWorkbook(in);//创建工作薄
				for (int i = 0; i < _WorkBook.getNumberOfSheets(); i++) {
					sheetMap.put(i, _WorkBook.getSheetAt(i));
				}
			} else if (isExcel2003 == 1) {
				_WorkBook = new XSSFWorkbook(in);//创建工作薄
				for (int i = 0; i < _WorkBook.getNumberOfSheets(); i++) {
					sheetMap.put(i, _WorkBook.getSheetAt(i));
				}
			}
		}
	}

	/**
	 * 功能说明              : 获取sheet中某行数据
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 * @param rowNum 行号，从0起始
	 * @return
	 */
	public List<String> getRowDataList(int rowNum) {
		_Sheet = sheetMap.get(currSheet);
		if (rowNum > getMaxRowNum())
			return null;//当获取的行号大于最大数据行数
		return getOneRowDataList(rowNum);
	}
	
	/**
	 * 功能说明              : 获取sheet中某行数据
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 * @param rowNum 行号，从0起始
	 * @return
	 * @throws BizException 
	 */
	public List<String> getRowDataList(int sheetNum,int rowNum) throws Exception {
		_Sheet = sheetMap.get(sheetNum);
		currSheet = sheetNum;
		//当获取的行号大于最大数据行数
		if(_Sheet==null){
			throw new Exception("Sheet页[" + sheetNum + "]不存在");
		}
		if (rowNum > getMaxRowNum()){
			throw new Exception("当前行[" +rowNum + "]不存在");
		}
		return (List<String>)getOneRowDataList(rowNum);
	}


	/**
	 * 功能说明              : 获得所有数据,可以为第一个sheet页或是指定的sheet页
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 * @return
	 */
	public Map<Integer, List<String>> getAllRowData() {
		_Sheet = sheetMap.get(currSheet);
		return getAllRowDataMap();
	}
	
	/**
	 * 功能说明              : 获得指定sheet页的数据
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 * @return
	 * @throws Exception 
	 * @throws BizException 
	 */
	public Map<Integer, List<String>> getAllRowData(int sheetNum) throws Exception {
		_Sheet = sheetMap.get(sheetNum);
		currSheet = sheetNum;
		if(_Sheet==null){
			throw new Exception("Sheet页[" + sheetNum + "]不存在");
		}
		return getAllRowDataMap();
	}
	/**
	 * 
	 * 功能说明              :循环所有数据
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 * @return
	 */
	private Map<Integer, List<String>> getAllRowDataMap(){
		Map<Integer, List<String>> retMap = new HashMap<Integer, List<String>>();
		for (int count = 0; count < getMaxRowNum(); count++) {
			List<String> returnList = getOneRowDataList(count);
			if(returnList!=null){
				retMap.put(count, returnList);
			}
		}
		if(this.maxBlankRow!=-1){
			for(int k=maxBlankRow;k< getMaxRowNum();k++){
				retMap.remove(k);
			}
		}
		return retMap;
	}
	
	/**
	 * 
	 * 功能说明              :返回一行数据
	* 创建者：liuxin
	* 创建时间：2015-4-23
	 * @param rowNum
	 * @return
	 */
	private List<String> getOneRowDataList(int rowNum){
		Row _row = _Sheet.getRow(rowNum);
		List<String> returnList = new ArrayList<String>();
		Cell cell = null;
		boolean isBlankRow = true;
		for (int i = 0; i < getMaxCellNum(); i++) {
			if(_row!=null){
				cell = _row.getCell(i);
				if (cell == null) {
					returnList.add("");
					continue;
				}
				if(megerCellList!=null&&megerCellList.contains(i)){
					String cellValue = doWithMegerCell(cell,i);
					if(isBlankRow&&!cellValue.equals("")){
						isBlankRow = false;
					}
					returnList.add(cellValue);
				}else{
					String cellValue = doWithCell(cell);
					if(isBlankRow&&!cellValue.equals("")){
						isBlankRow = false;
					}
					returnList.add(cellValue);
				}
			}else{
				returnList.add("");
				continue;
			}
		}
		if(isBlankRow){
			if(this.maxBlankRow==-1){
				this.maxBlankRow = rowNum;
			}
		}else{
			if(this.maxBlankRow!=-1){
				this.maxBlankRow = -1;
			}
		}
		return returnList;
	}
	/**
	 * 
	 * 功能说明              :处理合并单元格
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 * @param cell
	 * @return
	 */
	private String doWithMegerCell(Cell cell,int cellNum){
		String beforeValue = BeforeCell.get(cellNum);
		
		try{
			boolean isDate = HSSFDateUtil.isCellDateFormatted(cell);
			if(isDate){
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				return sdf.format(cell.getDateCellValue());
			}
		}catch(Exception e){
		}
		
		if (Cell.CELL_TYPE_NUMERIC == cell.getCellType()) {
			double d =cell.getNumericCellValue();
			String cellValue = null;
			try{
				cellValue= String.valueOf((long)d).trim();
			}catch(Exception e){
				cellValue= String.valueOf(d).trim();
			}
			if("".equals(cellValue)){
				return beforeValue;
			}else{
				BeforeCell.put(cellNum, cellValue);
				return cellValue;
			}
		}
		String cellValue = cell.getStringCellValue().toString().trim();
		if("".equals(cellValue)){
			return beforeValue;
		}else{
			BeforeCell.put(cellNum, cellValue);
			return cellValue;
		}
			//return cell.getStringCellValue().toString();
	}
	/**
	 * 
	 * 功能说明              :处理一行数据
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 * @param cell
	 * @return
	 */
	private String doWithCell(Cell cell){
		
		try{
			boolean isDate = HSSFDateUtil.isCellDateFormatted(cell);
			if(isDate){
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				return sdf.format(cell.getDateCellValue());
			}
		}catch(Exception e){
		}
		
		if (Cell.CELL_TYPE_NUMERIC == cell.getCellType()||Cell.CELL_TYPE_FORMULA == cell.getCellType()) {
			double d =cell.getNumericCellValue();
			if(isValidInteger(d)){
				return String.valueOf((long)d).trim();
			}else{
				return String.valueOf(d).trim();
			}
		} 
		return cell.getStringCellValue().toString().trim();
	}
	/**
	 * 功能说明              : 获得某一个sheet中最大的数据行数
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 * @return
	 */
	private int getMaxRowNum() {
		
		if(rowCellMap.get(currSheet)!=null){
			if(rowCellMap.get(currSheet).get("rows")==null){
				int totalNum = _Sheet.getLastRowNum();
				rowCellMap.get(currSheet).put("rows", (totalNum + 1));
			}
		}else{
			int totalNum = _Sheet.getLastRowNum();
			rowCellMap.put(currSheet, new HashMap<String,Integer>());
			rowCellMap.get(currSheet).put("rows", (totalNum + 1));
		}
		return rowCellMap.get(currSheet).get("rows");
	}
	/**
	 * 
	 * 功能说明              :获得最大的列数
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 * @return
	 */
	private int getMaxCellNum() {
		if(rowCellMap.get(currSheet)!=null){
			if(rowCellMap.get(currSheet).get("cells")==null){
				Row _row = _Sheet.getRow(0);
				int maxCellNum =0;
				if(_row!=null){
				  maxCellNum = _row.getLastCellNum();
				}
				rowCellMap.get(currSheet).put("cells", maxCellNum);
			}
		}else{
			Row _row = _Sheet.getRow(0);
			int maxCellNum =0;
			if(_row!=null){
			  maxCellNum = _row.getLastCellNum();
			}
			rowCellMap.put(currSheet, new HashMap<String,Integer>());
			rowCellMap.get(currSheet).put("cells", maxCellNum);
		}
		return rowCellMap.get(currSheet).get("cells");
	}
	/**
	 * 
	 * 功能说明              :判断 是2003还是2007
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 * @param fileName
	 * @return
	 */
	private int isExcel2003(String fileName) {
		if (fileName == null && "".equals(fileName))
			return 0;
		String exeName = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
		if ("XLSX".equals(exeName.toUpperCase())) {
			return 1;
		} else {
			return 2;
		}
	}
	private boolean isValidInteger(double d)
	{
		long longVal = (long)d;
		if(longVal!=d){
			return false;
		}else{
			return true;
		}
		
	}
	public static void main(String[] args){
		try{
			FileInputStream fis = new FileInputStream(new File("E:\\整改单(2)2.xls"));
			List<Integer> megerCellList = new ArrayList<Integer>();
			megerCellList.add(0);
			megerCellList.add(2);
			ExcelImportPoiUtil importUitl = new ExcelImportPoiUtil(fis,"整改单(2)2.xls");
			Map<Integer, List<String>> allData = importUitl.getAllRowData();
			StringBuilder sb = null;
			for(int i=1;i<allData.size();i++){
				sb = new StringBuilder();
				List<String> oneData = allData.get(i);
				for(String str:oneData){
					sb.append(str).append(",");
				}
				System.out.println(sb.substring(0,sb.length()-1));
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	/**
	 * 校验Excel文件是否为空，以及是否符合列数。
	 * 创建者：liuxin
	 * 创建时间：2015-4-23
	 * @param uploadFile 上传的文件
	 * @param colNum 列数
	 * @return
	 * @throws BizException
	 * @throws IOException
	 */
	public static ExcelParseInterface getExcelImportPoiUtil(MultipartFile uploadFile, int colNum) throws Exception, IOException {
		ExcelParseInterface parse = null;
		if(0 == uploadFile.getSize()) {
			throw new Exception("请选择要导入的Excel文件");
		}else {
			String fileName = uploadFile.getOriginalFilename();
//			fileName = fileName.substring(
//					fileName.lastIndexOf("\\") + 1, fileName.length());
			byte[] is = uploadFile.getBytes();
			parse = new ExcelImportPoiUtil(is, fileName);
			// 取出所有数据
			Map excelAllData = parse.getAllRowData();
			if (excelAllData != null && excelAllData.size() > 1) {
				List listFirst = (List) excelAllData.get(0);// 取出excel一行数据
				if (listFirst.size() != colNum) {
					throw new Exception("该Excel不符合导入模板格式,请检查");
				}
			} else {
				throw new Exception("导入的Excel文件不能为空");
			}
		}
		return parse;
	}
	
}
