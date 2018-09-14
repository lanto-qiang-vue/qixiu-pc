package com.lanto.shqixiu.shcheck.service.check;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.CheckLoginInfo;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.po.TbCheckPhoto;
import com.lanto.shqixiu.shcheck.service.sys.TjSysOperateLogService;


@Service
public class CheckPhotoService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TjSysOperateLogService logService;
	

	public String save(TbCheckPhoto pojo,CheckLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "IMAGE_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"检测照片",pojo.getImageInfo());
		logService.addOperatorLog(info,"检测照片", logcontent);
		return null;
	}

	public void update(TbCheckPhoto pojo,CheckLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"IMAGE_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"检测照片",pojo.getImageInfo());
		logService.addOperatorLog(info,"检测照片", logcontent);
	}
	
	public List getPhotoList(String checkId) throws SQLException{
		String sql = "SELECT * FROM TB_CHECK_PHOTO WHERE CHECK_ID=?";
		return swdb.findAll(sql, checkId);
	}

	public void delete(String ids,CheckLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbCheckPhoto pojo = new TbCheckPhoto();
			pojo.setImageId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"检测照片",pojo.getImageInfo());
			logService.addOperatorLog(info,"检测照片", logcontent);
			TbCheckPhoto po = new TbCheckPhoto();
			po.setImageId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	
}
