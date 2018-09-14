package com.lanto.shqixiu.shwgm.service.manage.privehicle;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbRepairPhoto;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class RepairPhotoService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	

	public String save(TbRepairPhoto pojo,ManageLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "IMAGE_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"维修照片",pojo.getImageInfo());
		logService.addOperatorLog(info,"维修照片", logcontent);
		return null;
	}

	public void update(TbRepairPhoto pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"IMAGE_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"维修照片",pojo.getImageInfo());
		logService.addOperatorLog(info,"维修照片", logcontent);
	}
	
	public List getPhotoList(String recordId) throws SQLException{
		String sql = "SELECT * FROM TB_REPAIR_PHOTO WHERE RECORD_ID=?";
		return swdb.findAll(sql, recordId);
	}

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbRepairPhoto pojo = new TbRepairPhoto();
			pojo.setImageId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"维修照片",pojo.getImageInfo());
			logService.addOperatorLog(info,"维修照片", logcontent);
			TbRepairPhoto po = new TbRepairPhoto();
			po.setImageId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	
}
