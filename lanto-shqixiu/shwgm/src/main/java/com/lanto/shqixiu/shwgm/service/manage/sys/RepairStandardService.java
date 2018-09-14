package com.lanto.shqixiu.shwgm.service.manage.sys;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.lanto.shqixiu.shwgm.model.bean.DbRepairStandardBean;
import com.lanto.shqixiu.shwgm.model.po.DbRepairStandard;
import com.lanto.shqixiu.shwgm.util.excel.ExcelImportPoiUtil;
import com.lanto.shqixiu.shwgm.util.excel.ExcelParseInterface;


@Service
public class RepairStandardService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("ID");
		page.setOrderByType("ASC");
		return service.getPageList(uSql, page, "db_repair_standard","ID");
	}
	
	public List getStandardTree(){
		String sql = "select * from db_repair_standard";
		return service.findAll(DbRepairStandardBean.class, sql);
	}

	public List doExport(){
		String sql = "select a.*,b.NAME PP_NAME,c.NAME CJ_NAME from db_repair_standard a left join db_repair_standard b on a.PAR_ID=b.ID \n" +
				"left join db_repair_standard c on b.PAR_ID=c.ID \n" +
				"where a.type=?";
		return service.findAll(sql, 3);
	}

	/**
	 * 校验导入的数据  
	 * @user : liuxin
	 * @date : 2014-1-16
	 * @param uploadFile
	 * @return
	 * @throws IOException
	 * @throws BizException
	 */
	public Map<String, Object> checkExcelFile(MultipartFile uploadFile) throws IOException, Exception{ 

		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, Object>> errorList = new ArrayList<Map<String, Object>>();// 放置错误列表，供前台显示
		ExcelParseInterface parse = ExcelImportPoiUtil.getExcelImportPoiUtil(uploadFile, 5);//校验Excel文件是否为空，以及是否符合列数。
		Map<Integer, List<String>> data = parse.getAllRowData();//Excel数据
		Map<String, Object> error = null;
		List<String> rowData = null;
		String errorMsg;
		if(data != null && data.size()>0) {
			for(int i=1; i<data.size(); i++) {
				rowData = data.get(i);
				String rowNum = String.valueOf(i+1);//行数
				errorMsg = "";
				String cj = CommonUtils.fixedNullString(rowData.get(0));//厂家
				String pp = CommonUtils.fixedNullString(rowData.get(1));//品牌
				String xh = CommonUtils.fixedNullString(rowData.get(2));//型号
				String zq = CommonUtils.fixedNullString(rowData.get(3));//维护周期
				String lc = CommonUtils.fixedNullString(rowData.get(4));//维护里程

				if(CommonUtils.checkIsNullStr(cj)){
					errorMsg += CommonUtils.checkIsNullStr(errorMsg) ? "" : ", ";
					errorMsg += "厂家不能为空";
				}
				if(CommonUtils.checkIsNullStr(pp)){
					errorMsg += CommonUtils.checkIsNullStr(errorMsg) ? "" : ", ";
					errorMsg += "品牌不能为空";
				}
				if(CommonUtils.checkIsNullStr(xh)){
					errorMsg += CommonUtils.checkIsNullStr(errorMsg) ? "" : ", ";
					errorMsg += "型号不能为空";
				}
				
				if(!CommonUtils.checkIsNullStr(zq)){
					if(!CommonUtils.isNumber(zq)){
						errorMsg += CommonUtils.checkIsNullStr(errorMsg) ? "" : ", ";
						errorMsg += "维护周期请填写整数";
					}
				}
				
				if(!CommonUtils.checkIsNullStr(lc)){
					if(!CommonUtils.isNumber(lc)){
						errorMsg += CommonUtils.checkIsNullStr(errorMsg) ? "" : ", ";
						errorMsg += "维护里程请填写整数";
					}
				}

				if(!CommonUtils.checkIsNullStr(errorMsg)) {
					error = new HashMap<String, Object>();
					error.put("rowNum", rowNum);
					error.put("errorMsg", errorMsg);
					errorList.add(error);
				}
			
			}
		}
		result.put("parse", parse);
		result.put("errorList", errorList);
		return result;
	}
	
	/**
	 * 数据导入数据库
	 * @user : liuxin
	 * @date : 2014-2-11
	 * @param parse
	 * @param logonUser
	 * @throws BizException
	 * @throws DEException 
	 */
	public void excelImportDB(ExcelParseInterface parse) throws Exception {
		Map<Integer, List<String>> data = parse.getAllRowData();
		for(int i=1; i<data.size(); i++) {
			List<String> rowData = (List<String>)data.get(i);
			Integer cid = 0;
			Integer pid = 0;
			Integer xid = 0;
			String c = CommonUtils.fixedNullString(rowData.get(0));//厂家
			String p = CommonUtils.fixedNullString(rowData.get(1));//品牌
			String x = CommonUtils.fixedNullString(rowData.get(2));//型号
			
			String zq = CommonUtils.fixedNullString(rowData.get(3));//维护周期
			String lc = CommonUtils.fixedNullString(rowData.get(4));//维护里程
			//处理厂家
			DbRepairStandard cj = new DbRepairStandard();
			cj.setName(c);
			cj = service.getModelByPo(cj);
			if(cj == null){
				cj = new DbRepairStandard();
				cj.setName(c);
				cj.setParId(0);
				cj.setType("1");
				cj.setCreateDate(new Date());
				cid = service.savePojoRtPkId(cj, "ID");
			}else{
				cid = cj.getId();
			}
			
			//处理品牌
			DbRepairStandard pp = new DbRepairStandard();
			pp.setName(p);
			pp.setParId(cid);
			pp = service.getModelByPo(pp);
			if(pp == null){
				pp = new DbRepairStandard();
				pp.setName(p);
				pp.setParId(cid);
				pp.setType("2");
				pp.setCreateDate(new Date());
				pid = service.savePojoRtPkId(pp, "ID");
			}else{
				pid = pp.getId();
			}
			
			//处理型号
			DbRepairStandard xh = new DbRepairStandard();
			xh.setName(x);
			xh.setParId(pid);
			xh = service.getModelByPo(xh);
			if(xh == null){
				xh = new DbRepairStandard();
				xh.setName(x);
				xh.setParId(pid);
				xh.setType("3");
				xh.setCreateDate(new Date());
				if(!CommonUtils.checkIsNullStr(zq) || !CommonUtils.checkIsNullStr(lc)){
					if(!CommonUtils.checkIsNullStr(zq)){
						xh.setRepairCycle(Integer.valueOf(zq));
					}
					if(!CommonUtils.checkIsNullStr(lc)){
						xh.setRepairMileage(Integer.valueOf(lc));
					}
				}
				xid = service.savePojoRtPkId(xh, "ID");
			}else{
				if(!CommonUtils.checkIsNullStr(zq) || !CommonUtils.checkIsNullStr(lc)){
					if(!CommonUtils.checkIsNullStr(zq)){
						xh.setRepairCycle(Integer.valueOf(zq));
					}
					if(!CommonUtils.checkIsNullStr(lc)){
						xh.setRepairMileage(Integer.valueOf(lc));
					}
					service.updatePojo(xh, "ID");
				}
			}
		}
		
	}

	public void save(DbRepairStandard pojo){
		service.savePojo(pojo,"ID");
	}

	public void update(DbRepairStandard pojo){
		service.updatePojo(pojo,"ID");
	}

	public void delete(String ids){
		String[] chids = ids.split(",");
		for(String chid : chids){
			DbRepairStandard po = new DbRepairStandard();
			po.setId(Integer.valueOf(chid));
			service.deleteByPo(po);
		}
	}
}
