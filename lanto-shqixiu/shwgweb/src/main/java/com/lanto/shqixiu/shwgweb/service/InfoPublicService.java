package com.lanto.shqixiu.shwgweb.service;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgweb.util.HtmlToText;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class InfoPublicService {
	@Resource
	private SwdbFactory swdb;

	public List getIndustryPageList(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("PUBLISH_TIME");
		page.setOrderByType("DESC");
		String table = "(SELECT INFO_ID,INFO_TYPE,TITLE,DATA_FROM,CREATE_TIME,PUBLISH_STATUS,DATE_FORMAT(PUBLISH_TIME,'%Y-%m-%d %H:%i:%s') PUBLISH_TIME,PHOTO FROM tb_info_public WHERE PUBLISH_STATUS=?) T";
		List<Map> list = swdb.getPageList(uSql, page, table ,"INFO_ID");
		for(Map info : list){
			info.put("INFO_TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("INFO_TYPE"))));
			info.put("PUBLISH_STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("PUBLISH_STATUS"))));
		}
		return list;
	}
	
	public List getGoverPageList(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("PUBLISH_TIME");
		page.setOrderByType("DESC");
		String table = "(SELECT INFO_ID,INFO_TYPE,TITLE,CONTENT,DATA_FROM,CREATE_TIME,PUBLISH_STATUS,DATE_FORMAT(PUBLISH_TIME,'%Y-%m-%d %H:%i:%s') PUBLISH_TIME,PHOTO FROM tb_info_public WHERE PUBLISH_STATUS=?) T";
		List<Map> list = swdb.getPageList(uSql, page, table ,"INFO_ID");
		for(Map info : list){
			info.put("INFO_TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("INFO_TYPE"))));
			info.put("PUBLISH_STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("PUBLISH_STATUS"))));
			Object o = info.get("CONTENT");
			if (o !=null){
				String string = (String) o;
				string  = string.replaceAll("<.*?>|<(S*?)[^>]*>.*?|<.*?/>","");
				info.put("CONTENT",string);
			}
		}
		return list;
	}
	
	public List getImageInfoList(String type,Integer num){
		String sql = "SELECT INFO_ID,INFO_TYPE,TITLE,CONTENT,PUBLISH_TIME,PHOTO FROM tb_info_public WHERE PUBLISH_STATUS=? AND PHOTO IS NOT NULL AND PHOTO <> ''";
		List<Object> params = new ArrayList<Object>();
		params.add("10311001");
		if(!CommonUtils.checkIsNullStr(type)){
			sql += " AND INFO_TYPE = ?";
			params.add(type);
		}else{
			sql += " AND INFO_TYPE <> '10281005'";
		}
		sql += " ORDER BY PUBLISH_TIME DESC limit 0,?";
		params.add(num);
		List<Map> list = swdb.findAll(sql, params.toArray());
		for(Map info : list){
			info.put("INFO_TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("INFO_TYPE"))));
			String str = HtmlToText.html2Text(CommonUtils.checkNull(info.get("CONTENT")));
			if(str.length() > 75){
				str = str.substring(0, 70) + "...";
			}
			info.put("CONTENT", str);
		}
		return list;
	}
	
	public List getInfoList(String type,Integer num){
		String sql = "SELECT INFO_ID,INFO_TYPE,TITLE,DATA_FROM,CREATE_TIME,PUBLISH_STATUS,PUBLISH_TIME,PHOTO FROM tb_info_public WHERE PUBLISH_STATUS=? ";
		List<Object> params = new ArrayList<Object>();
		params.add("10311001");
		if(!CommonUtils.checkIsNullStr(type)){
			sql += " AND INFO_TYPE = ?";
			params.add(type);
		}else{
			sql += " AND INFO_TYPE <> '10281005'";
		}
		sql += " ORDER BY PUBLISH_TIME DESC limit 0,?";
		params.add(num);
		List<Map> list = swdb.findAll(sql, params.toArray());
		for(Map info : list){
			info.put("INFO_TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("INFO_TYPE"))));
			info.put("PUBLISH_STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("PUBLISH_STATUS"))));
			String str = HtmlToText.html2Text(CommonUtils.checkNull(info.get("TITLE")));
			if(str.length() > 28){
				str = str.substring(0, 25) + "...";
			}
			info.put("TITLE", str);
			Object photo = info.get("PHOTO");
			info.put("PHOTO", photo == null?"":photo);
		}
		return list;
	}
	
	public List getImportant(String type,Integer num){
		String sql = "SELECT INFO_ID,INFO_TYPE,TITLE,DATA_FROM,CREATE_TIME,PUBLISH_STATUS,PUBLISH_TIME,PHOTO FROM tb_info_public WHERE PUBLISH_STATUS=? AND IMPORTANT_FLAG=? ";
		List<Object> params = new ArrayList<Object>();
		params.add("10311001");
		params.add("10041001");
		if(!CommonUtils.checkIsNullStr(type)){
			sql += " AND INFO_TYPE = ?";
			params.add(type);
		}
		sql += " ORDER BY PUBLISH_TIME DESC limit 0,?";
		params.add(num);
		List<Map> list = swdb.findAll(sql, params.toArray());
		for(Map info : list){
			info.put("INFO_TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("INFO_TYPE"))));
			info.put("PUBLISH_STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("PUBLISH_STATUS"))));
		}
		return list;
	}
	
	public TbInfoPublic getInfoDetail(String infoId){
		TbInfoPublic info = new TbInfoPublic();
		info.setInfoId(Integer.valueOf(infoId));
		info = swdb.getModelByPo(info);
		return info;
	}
	
	public Map getAssoInfo(){
		String sql = "select * from tb_association_summary";
		List<Map> list = swdb.findAll(sql);
		if(list != null && list.size()>0){
			return list.get(0);
		}
		return null;
	}
	
	public List getBanners(Integer num){
		String sql = "select * from tb_banners where status=? order by sort_number desc,banner_id desc limit 0,?";
		return swdb.findAll(sql, "10011001",num);
	}
}
