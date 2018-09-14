package com.lanto.shqixiu.shwgm.controller.manage.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ManageLoginInfo;
import org.softbase.model.TransLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.bean.CheckedNode;
import com.lanto.shqixiu.shwgm.model.bean.DbRepairStandardBean;
import com.lanto.shqixiu.shwgm.model.bean.Dict;
import com.lanto.shqixiu.shwgm.model.bean.FuncNode;
import com.lanto.shqixiu.shwgm.model.bean.StandardTreeNode;
import com.lanto.shqixiu.shwgm.model.bean.TaskCheckedNode;
import com.lanto.shqixiu.shwgm.model.bean.TaskRootCheckedNode;
import com.lanto.shqixiu.shwgm.model.bean.TcFunc;
import com.lanto.shqixiu.shwgm.model.po.TbBdArea;
import com.lanto.shqixiu.shwgm.model.po.TmSysUser;
import com.lanto.shqixiu.shwgm.service.common.CommonService;
import com.lanto.shqixiu.shwgm.service.manage.corp.TbCorpInfoService;
import com.lanto.shqixiu.shwgm.service.manage.sys.LoginService;
import com.lanto.shqixiu.shwgm.service.manage.sys.RepairStandardService;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="manage/sys/common",produces = "text/html;charset=UTF-8")
public class CommonController extends BaseCon {
	private Logger logger = Logger.getLogger(CommonController.class);// 日志
	
	@Resource
	private CommonService service;
	
	@Resource
	private LoginService loginService;
	
	@Resource
	private TbCorpInfoService corpService;
	
	@RequestMapping("dict")
	@ResponseBody
	public Object dict(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{	
			List<Map> data = service.getDictList();
			List<Dict> dict = new ArrayList<Dict>();
			for(Map di : data){
				Dict dc = new Dict();
				dc.setCode(di.get("CODE").toString());
				dc.setGroup(di.get("TYPE").toString());
				dc.setName(di.get("NAME").toString());
				dc.setOrder(Integer.valueOf(di.get("NUM").toString()));
				dict.add(dc);
			}
			return super.getOutData(dict);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询数据字典出错");
		}
		
	}
	
	
	@RequestMapping("getCasecadeCode")
	@ResponseBody
	public Object getCasecadeCode(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{	
			List<Map> data = service.getCasecadeCode();
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询系统数据出错");
		}
		
	}
	
	@RequestMapping("getDictType")
	@ResponseBody
	public Object getDictType(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{	
			List<Map> data = service.getDictType();
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询数据字典类型出错");
		}
		
	}
	
	@RequestMapping("getMenus")
	@ResponseBody
	public Object getMenus(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String userCode = super.getManageLoginInfo().getUserCode();
			List<TcFunc> data = service.getMenus(userCode);
			for(TcFunc fun : data){
				if("1".equals(fun.getFuncType())){
					fun.setIcon("images/menus/menu3.png");
				}
			}
			FuncNode root = getTree(data);
			return super.getOutData(root.getChildren());
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询菜单出错");
		}
		
	}
	
	@RequestMapping("getLoginUser")
	@ResponseBody
	public Object getLoginUser(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			String user = super.getManageLoginInfo().getUserCode();
			if(user == null){
				return super.getOutData(null);
			}
			Map userInfo = loginService.getLoginUserInfo(user);
			return super.getOutData(userInfo);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "获取登录名失败");
		}
		
		
	}
	
	@RequestMapping("getAllRole")
	@ResponseBody
	public Object getAllRole(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			List data = service.getAllRole();
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询角色信息出错");
		}
		
	}
	
	@RequestMapping("getFuncPower")
	@ResponseBody
	public Object getFuncPower(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String userCode = super.getManageLoginInfo().getUserCode();
			List data = service.getFuncPower(userCode);
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询权限信息出错");
		}
		
	}
	
	@RequestMapping("getFuncButtons")
	@ResponseBody
	public Object getFuncButtons(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			List data = service.getFuncButtons();
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询按钮信息出错");
		}
		
	}
	
	@RequestMapping("getBelongArea")
	@ResponseBody
	public Object getBelongArea(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			List data = service.getBelongArea();
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询市辖区信息出错");
		}
		
	}
	
	@RequestMapping("getBelongByPage")
	@ResponseBody
	public Object getBelongByPage(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			List data = service.getBelongAreaByPage(sList,pUnit);
			return super.getOutPage(data, pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询市辖区信息出错");
		}
		
	}
	
	@RequestMapping("areaTree")
	@ResponseBody
	public Object areaTree(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String area = CommonUtils.checkNull(request.getParameter("area"));
			TbBdArea po = service.getAreaModel(area);
			List<TmSysUser> data = service.getAreaTree(area);
			TaskRootCheckedNode roottree = new TaskRootCheckedNode("","",false);
			List<TaskCheckedNode> tree = new ArrayList<TaskCheckedNode>();
			TaskCheckedNode root = new TaskCheckedNode(po.getAreaName(),po.getAreaCode(),false);
			root.setIcon("images/menus/100202.png");
			List<CheckedNode> child = new ArrayList<CheckedNode>();
			for(TmSysUser user : data){
				boolean check = false;
				if(super.getManageLoginInfo().getUserCode().equals(user.getUserCode())){
					check = true;
				}
				CheckedNode ch = new CheckedNode(user.getUserName(),user.getUserCode(),check,true);
				ch.setIcon("images/menus/100903.png");
				child.add(ch);
			}
			root.setChildren(child);
			tree.add(root);
			if(!"440101".equals(area)){
				List<TmSysUser> data2 = service.getAreaTree("440101");
				TaskCheckedNode root2 = new TaskCheckedNode("市辖区","440101",false);
				root2.setIcon("images/menus/100202.png");
				List<CheckedNode> child2 = new ArrayList<CheckedNode>();
				for(TmSysUser user : data2){
					boolean check = false;
					if(super.getManageLoginInfo().getUserCode().equals(user.getUserCode())){
						check = true;
					}
					CheckedNode ch = new CheckedNode(user.getUserName(),user.getUserCode(),check,true);
					ch.setIcon("images/menus/100903.png");
					child2.add(ch);
				}
				root2.setChildren(child2);
				tree.add(root2);
			}
			roottree.setChildren(tree);
			return super.getOutData(roottree);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询市辖区人员信息出错");
		}
		
	}
	
	@RequestMapping("getCorpBySel")
	@ResponseBody
	public Object getCorpBySel(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List data = service.getCorpBySel(sList, pUnit);
			return super.getOutPage(data,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修企业信息出错");
		}
		
	}
	
	@RequestMapping("getDetectCorpBySel")
	@ResponseBody
	public Object getDetectCorpBySel(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List data = service.getDetectCorpBySel(sList, pUnit);
			return super.getOutPage(data,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询检测企业信息出错");
		}
		
	}
	
	@RequestMapping("getExpertBySel")
	@ResponseBody
	public Object getExpertBySel(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List data = service.getExpertBySel(sList, pUnit);
			return super.getOutPage(data,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询专家信息出错");
		}
		
	}
	
	@RequestMapping("getCorpBySel_Ys")
	@ResponseBody
	public Object getCorpBySel_Ys(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List data = service.getCorpBySel_Ys(sList, pUnit);
			return super.getOutPage(data,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询运输企业信息出错");
		}
		
	}	

	@RequestMapping("getTransCorpBySel")
	@ResponseBody
	public Object getTransCorpBySel(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			ManageLoginInfo info = super.getManageLoginInfo();
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List data = service.getTransCorpBySel(sList, pUnit,info.getAreaCode());
			return super.getOutPage(data,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询市辖区信息出错");
		}
		
	}
	@RequestMapping("getStationBySel")
	@ResponseBody
	public Object getStationBySel(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createStationWhere(sList,request);
			List data = service.getStationBySel(sList, pUnit);
			return super.getOutPage(data,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询市辖区信息出错");
		}
		
	}
	
	@RequestMapping("getHomeInfo")
	@ResponseBody
	public Object getHomeInfo(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			ManageLoginInfo info=super.getManageLoginInfo();
			Map out = new HashMap();
			String type = CommonUtils.checkNull(request.getParameter("type"));
			if("10171001".equals(type) || "all".equals(type)){
				List repair1 = service.getRepairWarn1(info.getAreaCode());
				out.put("repair1", repair1);
			}
//			if("10171002".equals(type) || "all".equals(type)){
//				List repair2 = service.getRepairWarn2();
//				out.put("repair2", repair2);
//			}
			if("10171003".equals(type) || "all".equals(type)){
				List repair3 = service.getRepairWarn3(info.getAreaCode());
				out.put("repair3", repair3);
			}
			
			if("10201001".equals(type) || "all".equals(type)){
				List check1 = service.getCheckWarn1(info.getAreaCode());
				out.put("check1", check1);
			}
//			if("10201002".equals(type) || "all".equals(type)){
//				List check2 = service.getCheckWarn2();
//				out.put("check2", check2);
//			}
			return super.getOutData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "获取逾期车辆出错");
		}
		
		
	}	
	
	private FuncNode getTree(List<TcFunc> list) throws Exception {
		if(list==null||list.size()<1)	return null;
		return buildTree(getRoot(list),list);
	}
	
	private FuncNode buildTree(FuncNode pnode, List<TcFunc> nodes) throws Exception {
		List<FuncNode> childs = new ArrayList<FuncNode>();
		for( TcFunc tmp : nodes ){
			if( pnode.getFuncId().equals(tmp.getParFuncId()) ){
				childs.add(new FuncNode(tmp));
			}
		}
		
		if( childs.size()>0 ){
			pnode.setChildren(childs);
			for( FuncNode ptmp : childs ){
				buildTree(ptmp, nodes);
			}
		}
		return pnode;
	}
	
	private FuncNode getRoot(List<TcFunc> list) {
		for (TcFunc po : list){
			if(po.getFuncId() == 10L){
				return new FuncNode(po);
			}
		}
		return null;
	}
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String corpCode = CommonUtils.checkNull(request.getParameter("CORP_NUM"));
		String corpName = CommonUtils.checkNull(request.getParameter("CORP_NAME"));
		String corpArea = CommonUtils.checkNull(request.getParameter("CORP_AREA"));
		String jyfw = CommonUtils.checkNull(request.getParameter("CORP_TYPE"));
		String buyStatus = CommonUtils.checkNull(request.getParameter("STATUS"));
		
		if (!CommonUtils.isNullString(jyfw)){
			sList.add(new SqlUnit("jyfw", " and CORP_TYPE = ? ",jyfw.trim()));
		}
		if (!CommonUtils.isNullString(corpArea)){
			sList.add(new SqlUnit("corpArea", " and CORP_AREA = ? ",corpArea.trim()));
		}
		if (!CommonUtils.isNullString(corpCode)){
			sList.add(new SqlUnit("corpCode", " and CORP_NUM like ? ","%" + corpCode.trim() + "%"));
		}
		if (!CommonUtils.isNullString(corpName)){
			sList.add(new SqlUnit("corpName", " and CORP_NAME like ? ","%" + corpName.trim() + "%"));
		}
		if (!CommonUtils.isNullString(buyStatus)){
			sList.add(new SqlUnit("buyStatus", " and STATUS = ? ",buyStatus.trim()));
		}
	}
	
	private StandardTreeNode buildTree(StandardTreeNode pnode, List<DbRepairStandardBean> nodes) throws Exception {
		List<StandardTreeNode> childs = new ArrayList<StandardTreeNode>();
		for( DbRepairStandardBean tmp : nodes ){
			if( pnode.getId().equals(tmp.getParId()) ){
				childs.add(new StandardTreeNode(tmp));
			}
		}
		
		if( childs.size()>0 ){
			pnode.setChildren(childs);
			for( StandardTreeNode ptmp : childs ){
				buildTree(ptmp, nodes);
			}
		}
		return pnode;
	}
	
	private void createStationWhere(List<SqlUnit> sList,HttpServletRequest request){
		String STATION_NAME = CommonUtils.checkNull(request.getParameter("STATION_NAME"));
		String STATION_NAME_JC = CommonUtils.checkNull(request.getParameter("STATION_NAME_JC"));
		String STATION_AREA = CommonUtils.checkNull(request.getParameter("STATION_AREA"));
		String STATION_ADDRESS = CommonUtils.checkNull(request.getParameter("STATION_ADDRESS"));
		
		if (!CommonUtils.isNullString(STATION_NAME)){
			sList.add(new SqlUnit("STATION_NAME", " and STATION_NAME like ? ","%" + STATION_NAME.trim() + "%"));
		}
		if (!CommonUtils.isNullString(STATION_AREA)){
			sList.add(new SqlUnit("STATION_AREA", " and STATION_AREA = ? ",STATION_AREA.trim()));
		}
		if (!CommonUtils.isNullString(STATION_NAME_JC)){
			sList.add(new SqlUnit("STATION_NAME_JC", " and STATION_NAME_JC like ? ","%" + STATION_NAME_JC.trim() + "%"));
		}
		if (!CommonUtils.isNullString(STATION_ADDRESS)){
			sList.add(new SqlUnit("STATION_ADDRESS", " and STATION_ADDRESS like ? ","%" + STATION_ADDRESS.trim() + "%"));
		}
	}
	
	
	
}
