package com.lanto.shqixiu.shwgweb.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.po.TbBdBrands;
import com.lanto.shqixiu.shwgweb.model.po.TbEmployeeExpert;
import com.lanto.shqixiu.shwgweb.model.po.TbOnSiteService;
import com.lanto.shqixiu.shwgweb.model.po.TbOrderService;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class MaintainService {
	@Resource
	private SwdbFactory swdb;

	public List getCorpPageList(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("APART");
		page.setOrderByType("ASC");
		String table = "(SELECT a.CORP_ID,a.CORP_NUM,a.CORP_NAME,a.BUSINESS_NUM,a.CORP_AREA,a.CORP_TYPE,a.CORP_ADD,a.LINK_ZIP,a.BUSINESS_TYPE,a.LINK_MAN,"
				+ "a.LINK_TEL,a.LEGAL_NAME,a.LEGAL_TEL,a.EMAILS,a.MAGOR_BRANDS,getJuli(?,?,a.LATITUDE,a.LONGITUDE) APART,a.LONGITUDE,a.LATITUDE,a.IS_JOIN,"
				+ "a.IS4S,a.IS_SEC_MAINTAIN,a.IS_WYCL,a.IS_XNY,a.IS_QCJY,c.AVG_STAR STAR_LEVEL,b.PROFILE,b.FRONT_PHOTO FROM "
				+ "tb_corp_info a left join tb_corp_join b on a.join_id=b.join_id "
				+ "left join v_comment c on a.corp_id=c.corp_id )";
		List<Map> list = swdb.getPageList(uSql, page, table ,"CORP_ID");
		for(Map info : list){
			info.put("BUSINESS_TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("BUSINESS_TYPE"))));
			info.put("CORP_TYPE", WebCache.getDictDescById(CommonUtils.checkNull(info.get("CORP_TYPE"))));
			info.put("CORP_AREA", WebCache.getAreaNameByCode(CommonUtils.checkNull(info.get("CORP_AREA"))));
			info.put("IS4S", WebCache.getDictDescById(CommonUtils.checkNull(info.get("IS4S"))));
		}
		return list;
	}
	
	
	public List getRangeCorps(String latitude,String longitude,String brand,String star,String xy,String area,String type,String corpName,String apart){
		if("".equals(latitude)){
			latitude = null;
		}
		if("".equals(longitude)){
			longitude = null;
		}
		String sql = "select * from v_comment where 1=1 ";
		List params = new ArrayList();
		params.add(latitude);
		params.add(longitude);
		
		sql += " AND IS_JOIN=?";
		params.add("10041001");
		
		if(!CommonUtils.checkIsNullStr(brand)){
			String [] brands = brand.split(",");
			if(brands.length > 1){
				sql += " and (";
				int i = 0;
				for(String bra:brands){
					if(i == 0){
						sql += " magor_brands like ? ";
					}else{
						sql += " or magor_brands like ? ";
					}
					params.add("%" + bra + "%");
					i ++;
				}
				sql += ") ";
			}else{
				sql += " and magor_brands like ? ";
				params.add("%" + brand + "%");
			}
			
		}
		
		if(!CommonUtils.checkIsNullStr(xy)){
			String [] xys = xy.split(",");
			if(xys.length > 1){
				sql += " and (";
				int i = 0;
				for(String x:xys){
					if(i == 0){
						sql += " CREDIT_LEVEL = ? ";
					}else{
						sql += " or CREDIT_LEVEL = ? ";
					}
					params.add( x);
					i ++;
				}
				sql += ") ";
			}else{
				sql += " and CREDIT_LEVEL = ? ";
				params.add( xy);
			}
		}
		
		if(!CommonUtils.checkIsNullStr(corpName)){
			sql += " and CORP_NAME like ? ";
			params.add("%" + corpName + "%");
		}
		if(!CommonUtils.checkIsNullStr(star)){
			String [] stars = star.split(",");
			if(stars.length > 1){
				sql += " and (";
				int i = 0;
				for(String st:stars){
					if(i == 0){
						sql += " (STAR_LEVEL >= ? and STAR_LEVEL < ? )";
					}else{
						sql += " or  (STAR_LEVEL >= ? and STAR_LEVEL < ? ) ";
					}
					params.add(Integer.valueOf(st)*2 - 0.5 );
					params.add(Integer.valueOf(st)*2 + 1);
					i ++;
				}
				sql += ") ";
			}else{
				sql += " and (STAR_LEVEL >= ? and STAR_LEVEL < ? )";
				params.add(Integer.valueOf(star)*2 - 0.5);
				params.add(Integer.valueOf(star)*2 + 1);
			}
		}
		if(!CommonUtils.checkIsNullStr(area)){
			sql += " and CORP_AREA = ? ";
			params.add(area);
		}
		if(!CommonUtils.checkIsNullStr(type)){
			String [] types = type.split(",");
			if(types.length > 1){
				sql += "and (";
				int i = 0;
				for(String t : types){
					if(i == 0){
						sql += t + "=? ";
					}else{
						sql += " or " + t + "=? ";
					}
					if("IS4S".equals(t)){
						params.add("10041001");
					}else{
						params.add("true");
					}
					i ++ ;
				}
				sql += ") ";
			}else{
				sql += "and " + type +" = ? ";
				if("IS4S".equals(type)){
					params.add("10041001");
				}else{
					params.add("true");
				}
			}
		}
		if(!CommonUtils.checkIsNullStr(apart)){
			sql += " and APART <= ? ";
			params.add(apart);
		}
		
		sql += " order by APART asc ";
		List<Map> list = swdb.findAll(sql, params.toArray());
		for(Map info : list){
			info.put("BUSINESS_TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("BUSINESS_TYPE"))));
			info.put("CORP_TYPE", WebCache.getDictDescById(CommonUtils.checkNull(info.get("CORP_TYPE"))));
			info.put("CORP_AREA", WebCache.getAreaNameByCode(CommonUtils.checkNull(info.get("CORP_AREA"))));
			info.put("IS4S", WebCache.getDictDescById(CommonUtils.checkNull(info.get("IS4S"))));
		}
		return list;
	}
	
	
	public List getRangeDetects(String latitude,String longitude,String stationName,String area,String apart){
		if("".equals(latitude)){
			latitude = null;
		}
		if("".equals(longitude)){
			longitude = null;
		}
		String sql = "select * from (SELECT a.*,getJuli(?,?,a.LATITUDE,a.LONGITUDE) APART FROM "
				+ "TB_CORP_DETECT_INFO a) t where 1=1 ";
		List params = new ArrayList();
		params.add(latitude);
		params.add(longitude);
		if(!CommonUtils.checkIsNullStr(stationName)){
			sql += " and STATION_NAME like ? ";
			params.add("%" + stationName + "%");
		}
		if(!CommonUtils.checkIsNullStr(area)){
			sql += " and STATION_AREA = ? ";
			params.add(area);
		}
		if(!CommonUtils.checkIsNullStr(apart)){
			sql += " and APART <= ? ";
			params.add(apart);
		}
		
		sql += " order by APART asc ";
		List<Map> list = swdb.findAll(sql, params.toArray());
		for(Map info : list){
			info.put("CORP_AREA_", WebCache.getAreaNameByCode(CommonUtils.checkNull(info.get("STATION_AREA"))));
		}
		return list;
	}
	
	
	public Map getCorpDetail(String corpId){
//		String sql = "SELECT a.CORP_ID,a.CORP_NUM,a.CORP_NAME,a.BUSINESS_NUM,a.CORP_TYPE,a.CORP_AREA,a.CORP_ADD,a.LINK_ZIP,a.BUSINESS_TYPE,a.LINK_MAN,"
//				+ "a.LINK_TEL,a.LEGAL_NAME,a.LEGAL_TEL,a.EMAILS,a.MAGOR_BRANDS,a.LONGITUDE,a.LATITUDE,"
//				+ "c.AVG_STAR STAR_LEVEL,b.PROFILE,b.FRONT_PHOTO,B.JOIN_ID FROM "
//				+ "tb_corp_info a left join tb_corp_join b on a.join_id=b.join_id "
//				+ "left join v_comment c on a.corp_id=c.corp_id  where a.corp_id=?";
//		String sql=null;
//		List<Map> list = swdb.findAll(sql, corpId);
//		if(list != null && list.size() > 0){
//			Map out = list.get(0);
//			String imageSql = "select PHOTO_PATH FROM tb_corp_join_photo WHERE JOIN_ID=?";
//			List imageList = swdb.findAll(imageSql, out.get("JOIN_ID"));
//			out.put("IMAGES", imageList);
//			out.put("BUSINESS_TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(out.get("BUSINESS_TYPE"))));
//			out.put("CORP_TYPE", WebCache.getDictDescById(CommonUtils.checkNull(out.get("CORP_TYPE"))));
//			out.put("CORP_AREA", WebCache.getAreaNameByCode(CommonUtils.checkNull(out.get("CORP_AREA"))));
//			out.put("IS4S", WebCache.getDictDescById(CommonUtils.checkNull(out.get("IS4S"))));
//			return out;
//		}
		return null;
	}
	
	public List getAreaList(){
		String sql = "select AREA_CODE CODE,AREA_NAME NAME from tb_bd_area";
		return swdb.findAll(sql);
	}
	
	public List getBrandList(){
		String sql = "select DISTINCT BFIRST_LATTER from tb_bd_brands order by BFIRST_LATTER asc";
		List<TbBdBrands> latList = swdb.findAll(TbBdBrands.class, sql);
		sql = "select * from tb_bd_brands order by BFIRST_LATTER asc,id asc";
		List<TbBdBrands> brandList = swdb.findAll(TbBdBrands.class,sql);
		List<Map> list = new ArrayList<Map>();
		for(TbBdBrands lat:latList){
			Map lmap = new HashMap();
			lmap.put("lat", lat.getBfirstLatter());
			List lbrands = new ArrayList();
			for(TbBdBrands brand : brandList){
				if(lat.getBfirstLatter().equals(brand.getBfirstLatter())){
					lbrands.add(brand);
				}
			}	
			lmap.put("brands", lbrands);
			list.add(lmap);
		}
		return list;
	}
	
	
	public void saveSmfw(TbOnSiteService po){
		swdb.savePojo(po, "SERVICE_ID");
	}
	
	public void saveYyfw(TbOrderService po){
		swdb.savePojo(po, "SERVICE_ID");
	}

	public List getSpecialList(){
		String sql = "select * from tb_employee_expert";
		List<TbEmployeeExpert> list = swdb.findAll(TbEmployeeExpert.class, sql);
		return list;
	}
	
}
