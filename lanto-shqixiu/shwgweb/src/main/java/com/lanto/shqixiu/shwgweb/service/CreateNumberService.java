package com.lanto.shqixiu.shwgweb.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgweb.model.po.TbBillCode;
import com.lanto.shqixiu.shwgweb.model.po.TbBillData;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class CreateNumberService {
	@Autowired
	private SwdbFactory service;
	/**
	 * 
	 * @param serviceName业务名称
	 * @return
	 * @throws Exception
	 */
	public String createNumber(String serviceName) throws Exception{
		TbBillCode code = new TbBillCode();
		code.setBillId(serviceName);
		code = service.getModelByPo(code);
		if(code == null || CommonUtils.checkIsNullStr(serviceName)){
			throw new Exception("业务编号" + serviceName + "未在数据库中定义！");
		}
		String serviceNum = CommonUtils.checkNull(code.getBillHead());
		List<Object> params = new ArrayList<Object>();
		Date d = new Date();
		String yyyy = CommonUtils.printDate("yyyy", d);
		String mm = CommonUtils.printDate("MM", d);
		String dd = CommonUtils.printDate("dd", d);
		String dformat = CommonUtils.checkNull(code.getDateFormat());
		String sql = "select * from tb_bill_data where BILL_ID=?";
		params.add(serviceName);
		if("YYYYMMDD".equals(dformat)){
			serviceNum = serviceNum + CommonUtils.printDate("yyyyMMdd", d);
			sql = sql + " and YEAR_NUM=? AND MONTH_NUM=? AND DAY_NUM=? for update";
			params.add(yyyy);
			params.add(mm);
			params.add(dd);
		}else if("YYMMDD".equals(dformat)){
			serviceNum = serviceNum + CommonUtils.printDate("yyMMdd", d);
			sql = sql + " and YEAR_NUM=? AND MONTH_NUM=? AND DAY_NUM=?  for update";
			params.add(yyyy);
			params.add(mm);
			params.add(dd);
		}else if("YYYYMM".equals(dformat)){
			serviceNum = serviceNum + CommonUtils.printDate("yyyyMM", d);
			sql = sql + " and YEAR_NUM=? AND MONTH_NUM=?  for update";
			params.add(yyyy);
			params.add(mm);
		}else if("YYMM".equals(dformat)){
			serviceNum = serviceNum + CommonUtils.printDate("yyMM", d);
			sql = sql + " and YEAR_NUM=? AND MONTH_NUM=?  for update";
			params.add(yyyy);
			params.add(mm);
		}else{
			sql = sql + " for update";
		}
		serviceNum = serviceNum + CommonUtils.checkNull(code.getDelimiter());
		List<TbBillData> datas = service.findAll(TbBillData.class,sql,params.toArray());
		int numLength = code.getNumLenght().intValue();
		int flowNum = 0;
		if(datas != null && datas.size() > 0){
			TbBillData data = datas.get(0);
			flowNum = data.getFlowNum().intValue();
			data.setFlowNum(data.getFlowNum() + 1);
			service.updatePojo(data,"ID");
		}else{
			TbBillData data = new TbBillData();
			data.setBillId(serviceName);
			data.setYearNum(yyyy);
			data.setMonthNum(mm);
			data.setDayNum(dd);
			data.setFlowNum(1);
			service.savePojo(data);
		}
		String flowNumStr = "0000000000" + (flowNum + 1);
		if(flowNumStr.length() > numLength){
			flowNumStr = flowNumStr.substring(flowNumStr.length()- numLength);
		}
		serviceNum = serviceNum + flowNumStr;
		
		return serviceNum;
	}
	
}
