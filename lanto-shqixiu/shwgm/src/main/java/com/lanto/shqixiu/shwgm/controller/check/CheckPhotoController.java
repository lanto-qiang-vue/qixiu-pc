package com.lanto.shqixiu.shwgm.controller.check;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.controller.ParamInit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lanto.shqixiu.shwgm.model.po.TbCheckPhoto;
import com.lanto.shqixiu.shwgm.service.check.CheckPhotoService;
import com.lanto.shqixiu.shwgm.service.transrepair.TransRepairPhotoService;
import com.lanto.shqixiu.shwgm.util.Constant;


@Controller
@RequestMapping(value="check/checkphoto",produces = "text/html;charset=UTF-8")
public class CheckPhotoController extends BaseCon{

	private Logger logger = Logger.getLogger(CheckPhotoController.class);// 日志

	@Resource
	private CheckPhotoService service;

	
	@RequestMapping("photolist")
	@ResponseBody
	public Object certList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String checkId = CommonUtils.checkNull(request.getParameter("CHECK_ID"));
			List list = service.getPhotoList(checkId);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}


	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

