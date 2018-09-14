package com.lanto.shqixiu.shwgc.service.transrepair;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TbTransRepairPhoto;
import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;


@Service
public class TransRepairPhotoService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TqSysOperateLogService logService;
	

	public String save(TbTransRepairPhoto pojo,ClientLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "IMAGE_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"维修照片",pojo.getImageInfo());
		logService.addOperatorLog(info,"维修照片", logcontent);
		return null;
	}

	public void update(TbTransRepairPhoto pojo,ClientLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"IMAGE_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"维修照片",pojo.getImageInfo());
		logService.addOperatorLog(info,"维修照片", logcontent);
	}
	
	public List getPhotoList(String recordId) throws SQLException{
		String sql = "SELECT * FROM TB_TRANS_REPAIR_PHOTO WHERE RECORD_ID=?";
		return swdb.findAll(sql, recordId);
	}

	public void delete(String ids,ClientLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbTransRepairPhoto pojo = new TbTransRepairPhoto();
			pojo.setImageId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"维修照片",pojo.getImageInfo());
			logService.addOperatorLog(info,"维修照片", logcontent);
			TbTransRepairPhoto po = new TbTransRepairPhoto();
			po.setImageId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	
}
