package com.lanto.shqixiu.shwgm.controller.manage.corp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ClientLoginInfo;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.TbCorpVideo;
import com.lanto.shqixiu.shwgm.service.manage.corp.TbCorpVideoService;


@Controller
@RequestMapping(value="manage/corp/corpvideo",produces = "text/html;charset=UTF-8")
public class TbCorpVideoController extends BaseCon{

	private Logger logger = Logger.getLogger(TbCorpVideoController.class);// 日志

	@Resource
	private TbCorpVideoService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			String seaStatus = CommonUtils.checkNull(request.getParameter("STATUS"));
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List<Map> list = service.getList(sList, pUnit);
			for(int i=0;i<list.size();i++){
				Map map=list.get(i);
				int status=service.getDeviceStatus((String)map.get("DEVICE_SN"));
				if(status==1){
					if((String)map.get("RECORD_ID")==null || "".equals((String)map.get("RECORD_ID"))){
						map.put("STATUS", "10441002");
					}else{
						map.put("STATUS", "10441003");
					}
				}else if(status==0){
					map.put("STATUS", "10441001");
				}else if(status==-1){
					map.put("STATUS", "10441004");
				}
			}
			//过滤视频通道状态
			List<Map> outList=new ArrayList();
			if("".equals(seaStatus) || seaStatus==null){
				return super.getOutPage(list,pUnit);
			}else{
				for(int i=0;i<list.size();i++){
					Map map=(Map)list.get(i);
					if("10441001".equals(seaStatus) && "10441001".equals((String)map.get("STATUS"))){
						outList.add(map);
					}else if("10441002".equals(seaStatus) && "10441002".equals((String)map.get("STATUS"))){
						outList.add(map);
					}else if("10441003".equals(seaStatus) && "10441003".equals((String)map.get("STATUS"))){
						outList.add(map);
					}else if("10441004".equals(seaStatus) && "10441004".equals((String)map.get("STATUS"))){
						outList.add(map);
					}
				}
				return super.getOutPage(outList,pUnit);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			ManageLoginInfo info = super.getManageLoginInfo();
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids,info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbCorpVideo po = json.getPojo(data, TbCorpVideo.class);
			ManageLoginInfo info = super.getManageLoginInfo();
			if(CommonUtils.checkIsNotNullAndZero(po.getId())){
				service.update(po,info);
			}else{
				String result=service.save(po,info);
				if(result != null){
					return super.getOutException(null,result);
				}
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

