package com.lanto.shqixiu.shwgc.service;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;

import javax.annotation.Resource;

import org.snaker.engine.helper.StreamHelper;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TqSysHelp;


@Service
public class SysHelpService {

	@Resource
	private SwdbFactory service;

	public void save(TqSysHelp pojo) throws SQLException{
		InputStream input = null;
		input = StreamHelper.getStreamFromString(pojo.getContent());
		String sql = "INSERT INTO TQ_SYS_HELP(CONTENT,FUNC_ID) VALUES(?,?)";
		service.updateFile(sql, input, pojo.getFuncId());
	}
	
	public void update(TqSysHelp pojo) throws SQLException{
		InputStream input = null;
		input = StreamHelper.getStreamFromString(pojo.getContent());
		String sql = "UPDATE TQ_SYS_HELP SET CONTENT=? WHERE FUNC_ID=?";
		service.updateFile(sql, input, pojo.getFuncId());
	}
	
	public TqSysHelp getModel(String funcId){
		TqSysHelp help = new TqSysHelp();
		help.setFuncId(funcId);
		help = service.getModelByPo(help);
		return help;
	}
	
	public byte[] getContent(String id) throws IOException{
		InputStream input = null;
		TqSysHelp help = new TqSysHelp();
		help.setFuncId(id);
		help = service.getModelByPo(help);
		if(help == null){
			return null;
		}
		String sql = "SELECT CONTENT FROM TQ_SYS_HELP WHERE FUNC_ID = ?";
		input = service.getFile(sql, "CONTENT", id);
		return StreamHelper.readBytes(input);
	}
}
