package com.lanto.shqixiu.shwgweb.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.model.WebLoginInfo;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.bean.CallResult;
import com.lanto.shqixiu.shwgweb.model.po.TbAppLoginToken;
import com.lanto.shqixiu.shwgweb.model.po.TbComment;
import com.lanto.shqixiu.shwgweb.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgweb.model.po.TbPrivateVehicle;
import com.lanto.shqixiu.shwgweb.model.po.TbRepairRecords;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class ArchivesService {
	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private CreateNumberService createNumberService;
	
	public List getMyVehicles(String userId){
		String sql = "select * from tb_private_vehicle where USER_ID=? order by bind_date desc";
		return swdb.findAll(sql, userId);
	}
	
	public CallResult saveVeh(TbPrivateVehicle veh){
		CallResult result = new CallResult();
		TbPrivateVehicle search = new TbPrivateVehicle();
		search.setPlateNum(veh.getPlateNum());
		search = swdb.getModelByPo(search);
		if(search != null){
			result.setTip("该车牌号码已经存在！");
			return result;
		}
		
		TbPrivateVehicle vin = new TbPrivateVehicle();
		vin.setVin(veh.getVin());
		vin = swdb.getModelByPo(vin);
		if(vin != null){
			result.setTip("该VIN（车架号）已经存在！");
			return result;
		}
		
		//判断该用户是否有选中的车辆
		TbPrivateVehicle issel = new TbPrivateVehicle();
		issel.setUserId(veh.getUserId());
		issel.setIsSelect("10041001");
		issel = swdb.getModelByPo(issel);
		if(issel == null){
			veh.setIsSelect("10041001");
		}
		Integer id = swdb.savePojoRtPkId(veh, "VEHICLE_ID");
		veh.setVehicleId(id);
		return result;
	}
	
	/**
	 * 绑定车辆 网站端
	 * @param veh
	 * @param login
	 * @return
	 */
	public CallResult updateBind(TbPrivateVehicle veh,WebLoginInfo login){
		CallResult result = new CallResult();
		TbPrivateVehicle search = new TbPrivateVehicle();
		search.setPlateNum(veh.getPlateNum());
		search.setVin(veh.getVin());
		search = swdb.getModelByPo(search);
		if(search != null){
			if(search.getUserId() != null && search.getUserId() > 0){
				if(search.getUserId() == login.getUserId()){
					result.setTip("您已经绑定过该车辆！");
					return result;
				}else{
					result.setTip("该车辆已被其它用户绑定！");
					result.put("error_code", "208");
					return result;
				}
			}
			//判断该用户是否有选中的车辆
			TbPrivateVehicle issel = new TbPrivateVehicle();
			issel.setUserId(login.getUserId());
			issel.setIsSelect("10041001");
			issel = swdb.getModelByPo(issel);			
			
			TbPrivateVehicle con = new TbPrivateVehicle();
			con.setVehicleId(search.getVehicleId());
			con.setUserId(login.getUserId());
			con.setBindDate(new Date());
			//如果没有选中的车辆则将新绑定的车辆选中
			if(issel == null){
				con.setIsSelect("10041001");
				search.setIsSelect("10041001");
			}
			swdb.updatePojo(con, "VEHICLE_ID");	
			BeanUtils.copyProperties(search, veh);
			veh.setUserId(login.getUserId());
		}else{
			result.setTip("车辆信息不存在！");
			result.put("error_code", "207");
			return result;
		}
		return result;
	}
	
	/**
	 * 绑定车辆 APP 端
	 * @param veh
	 * @param token
	 * @return
	 */
	public String updateBind(TbPrivateVehicle veh,TbAppLoginToken token){
		TbPrivateVehicle search = new TbPrivateVehicle();
		search.setPlateNum(veh.getPlateNum());
		search.setVin(veh.getVin());
		search = swdb.getModelByPo(search);
		if(search != null){
			if(search.getUserId() == token.getUserId()){
				return "您已经绑定过该车辆！";
			}
			//判断该用户是否有选中的车辆
			TbPrivateVehicle issel = new TbPrivateVehicle();
			issel.setUserId(token.getUserId());
			issel.setIsSelect("10041001");
			issel = swdb.getModelByPo(issel);			
			
			TbPrivateVehicle con = new TbPrivateVehicle();
			con.setVehicleId(search.getVehicleId());
			con.setUserId(token.getUserId());
			con.setBindDate(new Date());
			//如果没有选中的车辆则将新绑定的车辆选中
			if(issel == null){
				con.setIsSelect("10041001");
				search.setIsSelect("10041001");
			}
			swdb.updatePojo(con, "VEHICLE_ID");	
			BeanUtils.copyProperties(search, veh);
			veh.setUserId(token.getUserId());
		}else{
			return "车辆信息不存在！";
		}
		return null;
	}
	
	/**
	 * 更新选择车辆网站端
	 * @param vehId
	 * @param login
	 */
	public void updateSelect(String vehId,WebLoginInfo login){
		TbPrivateVehicle unsel = new TbPrivateVehicle();
		unsel.setUserId(login.getUserId());
		unsel.setIsSelect("10041002");
		swdb.updatePojo(unsel, "USER_ID");
		
		TbPrivateVehicle veh = new TbPrivateVehicle();
		veh.setVehicleId(Integer.valueOf(vehId));
		veh.setIsSelect("10041001");
		swdb.updatePojo(veh, "VEHICLE_ID");
	}
	/**
	 * 更新选择车辆APP端
	 * @param vehId
	 * @param login
	 */
	public TbPrivateVehicle updateSelect(String vehId,TbAppLoginToken token){
		TbPrivateVehicle unsel = new TbPrivateVehicle();
		unsel.setUserId(token.getUserId());
		unsel.setIsSelect("10041002");
		swdb.updatePojo(unsel, "USER_ID");
		
		TbPrivateVehicle veh = new TbPrivateVehicle();
		veh.setVehicleId(Integer.valueOf(vehId));
		veh.setIsSelect("10041001");
		swdb.updatePojo(veh, "VEHICLE_ID");
		
		TbPrivateVehicle search = new TbPrivateVehicle();
		search.setVehicleId(Integer.valueOf(vehId));
		return swdb.getModelByPo(search);
	}
	
	public TbPrivateVehicle getSelctVeh(WebLoginInfo login){
		TbPrivateVehicle con = new TbPrivateVehicle();
		con.setUserId(login.getUserId());
		con.setIsSelect("10041001");
		return swdb.getModelByPo(con);
	}
	
	public void delete(String vehId){
		TbPrivateVehicle veh = new TbPrivateVehicle();
		veh.setVehicleId(Integer.valueOf(vehId));
		veh.setUserId(0);
		veh.setIsSelect("10041002");
		swdb.updatePojo(veh, "VEHICLE_ID");
	}
	
	public CallResult searchVehUser(String platenum,String vin){
		CallResult result = new CallResult();
		TbPrivateVehicle veh = new TbPrivateVehicle();
		veh.setPlateNum(platenum);
		veh.setVin(vin);
		veh = swdb.getModelByPo(veh);
		if(veh == null){
			result.setTip("车辆信息不存在！");
			return result;
		}
//		if(veh.getUserId() == null || veh.getUserId() <= 0){
//			result.setTip("车辆绑定的用户不存在！");
//			return result;
//		}
//		TgSysUser user = new TgSysUser();
//		user.setUserId(veh.getUserId());
//		user = swdb.getModelByPo(user);
//		if(user == null){
//			result.setTip("车辆绑定的用户不存在！");
//			return result;
//		}
		result.put("veh", veh);
//		result.put("user", user);
		return result;
	}
	
	public CallResult getVehDetail(String vehId){
		CallResult result = new CallResult();
		TbPrivateVehicle veh = new TbPrivateVehicle();
		veh.setVehicleId(Integer.valueOf(vehId));
		veh = swdb.getModelByPo(veh);
		if(veh == null){
			result.setTip("车辆信息不存在！");
			return result;
		}
		String sql = "select a.*,DATE_FORMAT(a.REPAIR_DATE,'%Y-%m-%d') REPAIR_DATE2,b.CORP_NAME from tb_repair_records a left join tb_corp_info b on a.corp_id=b.corp_id where a.vehicle_id=? order by record_id desc";
		List list = swdb.findAll(sql, vehId);
		result.put("veh", veh);
		result.put("list", list);
		
		return result;
	}
	
	public CallResult submitComment(String recordId,String score,String content ,WebLoginInfo login){
		CallResult result = new CallResult();
		TbRepairRecords record = new TbRepairRecords();
		record.setRecordId(Integer.valueOf(recordId));
		record = swdb.getModelByPo(record);
		if(record == null){
			result.setTip("维修记录不存在，或已被删除！");
			return result;
		}
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(record.getCorpId());
		corp = swdb.getModelByPo(corp);
		if(corp == null){
			result.setTip("维修企业信息不存在或已被删除！");
			return result;
		}
		TbPrivateVehicle veh = new TbPrivateVehicle();
		veh.setVehicleId(record.getVehicleId());
		veh = swdb.getModelByPo(veh);
		if(veh == null){
			result.setTip("维修车辆信息不存在！");
			return result;
		}
		Double sc = Double.valueOf(score)*2;
		
		TbComment comment = new TbComment();
		comment.setContent(content);
		comment.setCorpId(corp.getCorpId());
		comment.setCorpName(corp.getCorpName());
		comment.setInsertDate(new Date());
		comment.setPlateNum(veh.getPlateNum());
		comment.setRepairId(record.getRecordId());
		comment.setStar(sc.intValue());
		comment.setUserId(login.getUserId());
		comment.setUserName(login.getUserName());
		swdb.savePojo(comment, "COMMENT_ID");
		
		TbRepairRecords con = new TbRepairRecords();
		con.setRecordId(record.getRecordId());
		con.setIsComment("10041001");
		swdb.updatePojo(con, "RECORD_ID");
		return result;
	}
	
	public CallResult getRecordInfo(String recordId){
		CallResult result = new CallResult();
		TbRepairRecords record = new TbRepairRecords();
		record.setRecordId(Integer.valueOf(recordId));
		record = swdb.getModelByPo(record);
		if(record == null){
			result.setTip("维修记录不存在，或已被删除！");
			return result;
		}
		List itemList = swdb.findAll("select * from tb_repair_items_list where record_id=?", recordId);
		List<Map> partList = swdb.findAll("select * from tb_repair_parts_list where record_id=?", recordId);
		List imageList = swdb.findAll("select * from tb_repair_photo where record_id=?", recordId);
		
		for(Map part : partList){
			part.put("PART_TYPE", WebCache.getDictDescById(CommonUtils.checkNull(part.get("PART_TYPE"))));
			part.put("IS_OWNER_PROVIDE", WebCache.getDictDescById(CommonUtils.checkNull(part.get("IS_OWNER_PROVIDE"))));
		}
		result.put("record", record);
		result.put("itemList", itemList);
		result.put("partList", partList);
		result.put("imageList", imageList);
		return result;
	}
	
	
}
