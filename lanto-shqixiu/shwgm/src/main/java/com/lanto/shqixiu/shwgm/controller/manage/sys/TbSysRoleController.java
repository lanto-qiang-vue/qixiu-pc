package com.lanto.shqixiu.shwgm.controller.manage.sys;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.reflect.TypeToken;
import com.lanto.shqixiu.shwgm.model.bean.FuncCheckedNode;
import com.lanto.shqixiu.shwgm.model.bean.TcCheckFunc;
import com.lanto.shqixiu.shwgm.model.po.TmSysRole;
import com.lanto.shqixiu.shwgm.service.manage.sys.TbSysRoleService;


@Controller
@RequestMapping(value="manage/sys/tbsysrole",produces = "text/html;charset=UTF-8")
public class TbSysRoleController extends BaseCon{

	private Logger logger = Logger.getLogger(TbSysRoleController.class);// 日志

	@Resource
	private TbSysRoleService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			String array = CommonUtils.checkNull(request.getParameter("array"));
			ManageLoginInfo info = super.getManageLoginInfo();
			List<TcCheckFunc> list = new ArrayList<TcCheckFunc>();
			list = gson.fromJson(array, new TypeToken<List<TcCheckFunc>>(){}.getType());
			TmSysRole po = json.getPojo(data, TmSysRole.class);
			if(po.getRoleId() != null ){
				service.update(po,list,info);
			}else{
				service.save(po,list,info);
			}
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}

	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	@RequestMapping("getCheckedMenus")
	@ResponseBody
	public Object getCheckedMenus(HttpServletRequest request,HttpServletResponse response) {
		try{
			String ROLE_ID = CommonUtils.checkNull(request.getParameter("ROLE_ID"));
			List<TcCheckFunc> list = service.getMenuList(ROLE_ID);
			for(TcCheckFunc fun : list){
				if(fun.getFuncType() == 1){
					fun.setFuncName("<i class=\"" + fun.getIcon() +  " bigger-130 blue\"></i> " +fun.getFuncName());
					fun.setIcon("images/menus/menu3.png");
				}
			}
			FuncCheckedNode root = getTree(list,ROLE_ID);
			return super.getOutData(root);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询菜单出错");
		}
	}
	
	private FuncCheckedNode getTree(List<TcCheckFunc> list,String roleId) throws Exception {
		if(list==null||list.size()<1)	return null;
		boolean flag = false;
		for(TcCheckFunc fu : list){
			if("check".equals(fu.getIsCheck())){
				flag = true;
			}
		}
		FuncCheckedNode pnode = null;
		if(flag){
			pnode = getRoot(list,true);
		}else{
			pnode = getRoot(list,false);
			
		}
		return buildTree(pnode,list);
	}
	
	private FuncCheckedNode buildTree(FuncCheckedNode pnode, List<TcCheckFunc> nodes) throws Exception {
		if(pnode == null)	return null;
		List<FuncCheckedNode> childs = new ArrayList<FuncCheckedNode>();
		for( TcCheckFunc tmp : nodes ){
			if( pnode.getFuncId().toString().equals(tmp.getParFuncId().toString()) ){
				if("check".equals(tmp.getIsCheck().toString())){
					childs.add(new FuncCheckedNode(tmp,true));
				}else{
					childs.add(new FuncCheckedNode(tmp,false));
				}
			}
		}
		if( childs.size()>0 ){
			pnode.setChildren(childs);
			for( FuncCheckedNode ptmp : childs ){
				buildTree(ptmp, nodes);
			}
		}
		return pnode;
	}
	
	private FuncCheckedNode getRoot(List<TcCheckFunc> list,boolean flag) {
		for(TcCheckFunc node : list){
			if("10".equals(node.getFuncId())){
				return new FuncCheckedNode(node,flag);
			}
		}
		return new FuncCheckedNode(list.get(0),flag);
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String roleCode = CommonUtils.checkNull(request.getParameter("ROLE_CODE"));
		String roleName = CommonUtils.checkNull(request.getParameter("ROLE_NAME"));
		String roleType = CommonUtils.checkNull(request.getParameter("ROLE_TYPE"));
		String roleStatus = CommonUtils.checkNull(request.getParameter("ROLE_STATUS"));

		if (!CommonUtils.isNullString(roleName)){
			sList.add(new SqlUnit("roleName", " and ROLE_NAME like ? ","%" + roleName.trim() + "%"));
		}
		if (!CommonUtils.isNullString(roleCode)){
			sList.add(new SqlUnit("roleDesc", " and ROLE_CODE like ? ","%" + roleCode.trim() + "%"));
		}
		if (!CommonUtils.isNullString(roleType)){
			sList.add(new SqlUnit("roleType", " and ROLE_TYPE = ? ",roleType.trim()));
		}
		if (!CommonUtils.isNullString(roleStatus)){
			sList.add(new SqlUnit("roleStatus", " and ROLE_STATUS = ? ", roleStatus.trim() ));
		}
	}
}

