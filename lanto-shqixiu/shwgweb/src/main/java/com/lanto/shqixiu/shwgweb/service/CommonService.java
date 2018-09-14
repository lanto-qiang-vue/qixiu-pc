package com.lanto.shqixiu.shwgweb.service;

import java.util.List;

import javax.annotation.Resource;

import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgweb.model.po.TbBdArea;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class CommonService {
	@Resource
	private SwdbFactory swdb;
	
	
	public List getAllDicts(){
		return swdb.findAll("SELECT CODE_ID CODE,TYPE,TYPE_NAME,CODE_DESC NAME,NUM NUM FROM TB_BD_CODE  order by type,num");
	}
	
	
	public List getAreaList(){
		return swdb.findAll(TbBdArea.class,"select * from TB_BD_AREA");
	}
	
}
