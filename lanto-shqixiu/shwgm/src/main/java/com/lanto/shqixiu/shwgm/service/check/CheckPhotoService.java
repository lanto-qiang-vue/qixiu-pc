package com.lanto.shqixiu.shwgm.service.check;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class CheckPhotoService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	

	
	public List getPhotoList(String checkId) throws SQLException{
		String sql = "SELECT * FROM TB_CHECK_PHOTO WHERE CHECK_ID=?";
		return swdb.findAll(sql, checkId);
	}

	
	
	
}
