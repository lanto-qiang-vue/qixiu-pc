package com.lanto.shqixiu.shwgm.service.manage.sys;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;

import javax.annotation.Resource;

import org.snaker.engine.helper.StreamHelper;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TmSysHelp;


@Service
public class SysHelpService {

	@Resource
	private SwdbFactory service;

	public void save(TmSysHelp pojo) throws SQLException{
		InputStream input = null;
		input = StreamHelper.getStreamFromString(pojo.getContent());
		String sql = "INSERT INTO TM_SYS_HELP(CONTENT,FUNC_ID) VALUES(?,?)";
		service.updateFile(sql, input, pojo.getFuncId());
	}
	
	public void update(TmSysHelp pojo) throws SQLException{
		InputStream input = null;
		input = StreamHelper.getStreamFromString(pojo.getContent());
		String sql = "UPDATE TM_SYS_HELP SET CONTENT=? WHERE FUNC_ID=?";
		service.updateFile(sql, input, pojo.getFuncId());
	}
	
	public TmSysHelp getModel(String funcId){
		TmSysHelp help = new TmSysHelp();
		help.setFuncId(funcId);
		help = service.getModelByPo(help);
		return help;
	}
	
	public byte[] getContent(String id) throws IOException{
		InputStream input = null;
		TmSysHelp help = new TmSysHelp();
		help.setFuncId(id);
		help = service.getModelByPo(help);
		if(help == null){
			return null;
		}
		String sql = "SELECT CONTENT FROM TM_SYS_HELP WHERE FUNC_ID = ?";
		input = service.getFile(sql, "CONTENT", id);
		return StreamHelper.readBytes(input);
	}
}
