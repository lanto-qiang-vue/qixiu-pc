package com.lanto.shqixiu.shwgc.service.report;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;


@Service
public class RepairReportService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TqSysOperateLogService logService;
	
	public List getRepairNumList(String corpId) throws SQLException{
		String sql="select * from V_REPAIR_NUM_MONTH where corp_id=?";
		return swdb.findAll(sql, corpId);
	}
	
	public List getTransRepairNum(String corpId) throws SQLException{
		String sql="select B.CORP_NAME,count(RECORD_ID) REPAIR_NUM from tb_trans_repair_records A "+
					"LEFT JOIN tb_trans_corp_info B ON A.TRANS_CORP_ID=B.CORP_ID WHERE A.REPAIR_CORP_ID=? GROUP BY TRANS_CORP_ID";
		return swdb.findAll(sql, corpId);
	}

}
