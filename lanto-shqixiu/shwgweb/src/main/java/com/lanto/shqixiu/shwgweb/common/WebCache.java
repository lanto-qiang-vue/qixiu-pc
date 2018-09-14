package com.lanto.shqixiu.shwgweb.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgweb.model.bean.CodeBean;
import com.lanto.shqixiu.shwgweb.model.po.TbBdArea;
import com.lanto.shqixiu.shwgweb.service.CommonService;
/**
 * 
 * 
 * 项目名称：
 * 类名称：WebCache
 * 类描述：将数据字典写入缓存
 * 创建人：刘新
 * 创建时间：2015-04-03
 * 修改人：刘新
 * 修改时间：
 * 修改备注：
 * @version 1.0
 *
 */
@SuppressWarnings("unchecked")
@Service
public class WebCache{
	
	
	@Resource
	private CommonService service;
	
	private static WebCache instance = null;
	private static Logger logger = Logger.getLogger(WebCache.class);
	
	public static Map<String, List<CodeBean>> dictMap = null;
	public static Map<String,String> areaMap = null;
	
	
	private WebCache() {
	}

	public static WebCache getInstance() {
		if (instance == null) {
			synchronized (WebCache.class) {
				if (instance == null) {
					instance = new WebCache();
				}
			}
		}
		return instance;
	}
	
	@PostConstruct
	public void init() {
		initArea();
		initDict();
		logger.info("*******************************");
		logger.info("数据字典初始化");
		logger.info("数据字典写入内存中,大小:" + dictMap.size() + "KB");
		logger.info("*******************************");
	}
	
	/**
	 * 初始化数据字典
	 */
	private void initDict()
	{
		List<Map> dict = service.getAllDicts();
		List<CodeBean> list = new LinkedList<CodeBean>();
		for(Map m : dict){
			CodeBean bean = new CodeBean();
			bean.setCodeId(m.get("CODE").toString());
			bean.setType(m.get("TYPE").toString());
			bean.setCodeDesc(m.get("NAME").toString());
			bean.setNum(m.get("NUM").toString());
			list.add(bean);
		}
		setDictMap(list);
	}
	
	/**
	 * 初始化辖区
	 */
	private void initArea(){
		List<TbBdArea> areas = service.getAreaList();
		areaMap = new HashMap();
		for(TbBdArea area : areas){
			areaMap.put(area.getAreaCode(), area.getAreaName());
		}
	}
	
	/**
	 * 将数据字典写入缓存
	 * @param codeList
	 */
	private void setDictMap(List<CodeBean> codeList ){
		//定义临时Tc_code MAP
		Map<String, List<CodeBean>> dictMapTemp = new TreeMap<String, List<CodeBean>>();
		
		putTcCodeTOMap(codeList,dictMapTemp);
		
		dictMap = dictMapTemp;
	}
	
	/**
	 *  语句查询出来对应的数据放入指定的内存中
	 * @user : liuxin
	 * @param 
	 * @param dictMapTemp
	 */
	private static void putTcCodeTOMap(List<CodeBean> codeList,Map<String, List<CodeBean>> dictMapTemp) {
		String codeType = null;
		List<CodeBean> codeValueList = null;
		for (CodeBean code : codeList) {
			codeType = code.getType();
			if (dictMapTemp.containsKey(codeType)) {
				codeValueList = dictMapTemp.get(codeType);
				codeValueList.add(code);
			} else {
				codeValueList = new LinkedList<CodeBean>();
				codeValueList.add(code);
				dictMapTemp.put(codeType, codeValueList);
			}
		}
	}
	
	/**
	 * 根据数据字典类型和数据描述，返回数据字典的list
	 * @param type
	 * @return
	 */
	public static List getDictDescByType(String type) {
		if(CommonUtils.checkIsNullStr(type)){
			return null;
		}
		List<CodeBean> codeList = dictMap.get(type);
		
		return codeList;
	}
	
	/**
	 * 根据数据字典类型和数据描述，返回数据字典的list
	 * @param type
	 * @return
	 */
	public static List getDictDescByType2(String type) {
		if(CommonUtils.checkIsNullStr(type)){
			return null;
		}
		List result = new ArrayList();
		List<CodeBean> codeList = dictMap.get(type);
		for(CodeBean code : codeList){
			Map data = new HashMap();
			data.put("CODE", code.getCodeId());
			data.put("NAME", code.getCodeDesc());
			result.add(data);
		}
		return result;
	}
	
	
	/**
	 * 根据数据字典类型和数据描述，返回数据字典的codeID
	 * @param type
	 * @param codeDesc
	 * @return
	 */
	public static String getDictDescById(String type, String id) {
		List<CodeBean> codeList = dictMap.get(type);
		String codeDesc = id;
		if(codeList != null) {
			for (CodeBean code : codeList) {
				if (code.getCodeId().equals(id)) {
					codeDesc = code.getCodeDesc();
					return codeDesc;
				}
			}
		}
		return codeDesc;
	}
	
	/**
	 * 根据数据字典类型和数据描述，返回数据字典的codeID
	 * @param type
	 * @param codeDesc
	 * @return
	 */
	public static String getDictDescById(String id) {
		if(id == null || id.length() < 5){
			return id;
		}
		String type = id.substring(0, 4);
		List<CodeBean> codeList = dictMap.get(type);
		String codeDesc = id;
		if(codeList != null) {
			for (CodeBean code : codeList) {
				if (code.getCodeId().equals(id)) {
					codeDesc = code.getCodeDesc();
					return codeDesc;
				}
			}
		}
		return codeDesc;
	}
	
	/**
	 *根据辖区编号在缓存中查找辖区名称
	 * @param code
	 * @return
	 */
	public static String getAreaNameByCode(String code){
		if(CommonUtils.checkIsNullStr(code)){
			return code;
		}
		if(areaMap == null){
			return code;
		}
		String name = areaMap.get(code);
		if(CommonUtils.checkIsNullStr(name)){
			return code;
		}
		return name;
	}
	
}
