package com.lanto.shqixiu.shcheck.service.check;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.CheckLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shcheck.model.po.TbCheckRecords;
import com.lanto.shqixiu.shcheck.model.po.TjSysUser;
import com.lanto.shqixiu.shcheck.model.po.TvVehicleBase;
import com.lanto.shqixiu.shcheck.service.sys.TjSysOperateLogService;
import com.lanto.shqixiu.shcheck.service.vehicle.TransVehicleService;
import com.lanto.shqixiu.shcheck.util.Constant;
import com.lanto.shqixiu.shcheck.util.MD5;


@Service
public class TbCheckRecordsService {

	//请选择合适的数据源，默认选client端数据源
	@Resource
	private SwdbFactory service;
	@Resource
	private TjSysOperateLogService logService;
	@Resource
	private TransVehicleService vehService;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CHECK_START_TIME");
		page.setOrderByType("DESC");
		String sql="(SELECT A.*,B.PLATE_NUM,C.CORP_NAME TRANS_CORP_NAME FROM TB_CHECK_RECORDS A LEFT JOIN tv_vehicle_base B ON A.VEHICLE_ID=B.VEHICLE_ID"+
					" LEFT JOIN tb_trans_corp_info C ON B.TRANS_CORP_ID=C.CORP_ID) T";
		return service.getPageList(uSql, page, sql,"CHECK_ID");
	}

	public Integer save(TbCheckRecords pojo,CheckLoginInfo info) throws Exception{
		Integer id = service.savePojoRtPkId(pojo,"CHECK_ID");
		String logcontent = "用户【%s】新增了一条检测记录 【%s】 ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getPlateNum());
		logService.addOperatorLog(info, "检测记录", logcontent);
		return id;
	}

	public void update(TbCheckRecords pojo,CheckLoginInfo info){
		service.updatePojo(pojo,"CHECK_ID");
		String logcontent = "用户【%s】修改了一条检测记录  【%s】 ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getPlateNum());
		logService.addOperatorLog(info,"检测记录", logcontent);
	}
	
	public void submit(String ids,CheckLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbCheckRecords pojo = new TbCheckRecords();
			pojo.setCheckId(Integer.valueOf(chid));
			pojo = service.getModelByPo(pojo);
			String logcontent = "【%s】提交了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"检测工单",pojo.getPlateNum());
			logService.addOperatorLog(info,"检测工单", logcontent);
			TbCheckRecords po = new TbCheckRecords();
			po.setCheckId(Integer.valueOf(chid));
			po.setStatus("10191002");
			service.updatePojo(po,"CHECK_ID");
			//更新该车辆的最后检测日期
			if(po.getCheckType()=="10451001"){
				TvVehicleBase vehPo=new TvVehicleBase();
				vehPo.setVehicleId(pojo.getVehicleId());
				vehPo.setLastCheckDate(pojo.getCheckEndTime());
				try {
					vehService.update(vehPo);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public void delete(String ids){
		service.delete("delete from TB_CHECK_RECORDS where CHECK_ID in (" + ids + ")");
	}
	

}
