package com.lanto.shqixiu.shwgm.controller.trans.common;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.Date;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.TmSysOperateLog;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;
import com.lanto.shqixiu.shwgm.service.trans.common.TransLoginService;
import com.lanto.shqixiu.shwgm.util.Constant;

@Controller
@RequestMapping(value="trans",produces = "text/html;charset=UTF-8")
public class TransLoginController extends BaseCon {
	private Logger logger = Logger.getLogger(TransLoginController.class);// 日志
	
	@Resource
	private TransLoginService transLoginService;
	@Resource
	private TmSysOperateLogService logService;


	@RequestMapping("login.do")
	@ResponseBody
	public Object doLogin(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			String userCode = request.getParameter("muserID");
			String userPW = request.getParameter("muserPW");
			String randCode = CommonUtils.checkNull(request.getParameter("mrandCode"));
			String sess_rand = (String)request.getSession().getAttribute("mrandcode");

			if (super.IsEmptyOrNull(userCode)){
				return super.getOutData("请输入用户名!");
			}
			if (super.IsEmptyOrNull(userPW)){
				return super.getOutData("请输入用户密码!");
			}
			
			if(!randCode.equals(sess_rand) && !"norandcode".equals(randCode)){
				return super.getOutData("您输入的验证码错误！");
			}
			
			boolean b = transLoginService.login(userCode,userPW);
			if (b){
				Map userInfo = transLoginService.getLoginUserInfo(userCode);
				if(userInfo == null){
					return super.getOutData("该用户不属于任何企业!");
				}
				if(!"10011001".equals(CommonUtils.checkNull(userInfo.get("IS_VALID")))){
					return super.getOutData("该用户状态为无效，请联系企业管理员修改用户状态!");
				}
				setCookie(Constant.TRANS_LOGIN_USER_COOKIE_VALUE,userInfo.get("USER_ID").toString());
				setCookie(Constant.TRANS_LOGIN_USERCODE_COOKIE_VALUE,userCode);
				setCookie(Constant.TRANS_LOGIN_USERNAME_COOKIE_VALUE,userInfo.get("USER_NAME").toString());
				setCookie(Constant.TRANS_LOGIN_CORPID_COOKIE_VALUE,userInfo.get("CORP_ID").toString());
				setCookie(Constant.TRANS_LOGIN_AREA_COOKIE_VALUE,userInfo.get("CORP_AREA").toString());
				
				TmSysOperateLog log = new TmSysOperateLog();
				String remoteAddr = request.getRemoteAddr();
//				UdpGetClientMacAddr mac = new UdpGetClientMacAddr(remoteAddr);
				log.setMachineId(remoteAddr);
				log.setModuleName("运输企业用户登录");
				log.setOperateTime(new Date());
				log.setOperatorId(userCode);
				log.setOperateContent(userInfo.get("USER_NAME").toString() + " 登录系统！");
				logService.save(log);
				
				return super.getOutData(true);
			}else{
				return super.getOutData("用户名或用户密码错误!");
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "登录失败");
		}
	}
	
	@RequestMapping("randcode")
	@ResponseBody
	public Object randcode(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			// 首先设置页面不缓存
			response.setHeader("Pragma", "No-cache");
			response.setHeader("Cache-Control", "no-cache");
			response.setDateHeader("Expires", 0);

			// 定义图片的宽度和高度
			int width = 90, height = 40;
			// 创建一个图像对象
			BufferedImage image = new BufferedImage(width, height,
					BufferedImage.TYPE_INT_RGB);
			// 得到图像的环境对象
			Graphics g = image.createGraphics();

			Random random = new Random();
			// 用随机颜色填充图像背景
			g.setColor(getRandColor(180, 250));
			g.fillRect(0, 0, width, height);
			for (int i = 0; i < 5; i++) {
				g.setColor(getRandColor(50, 100));
				int x = random.nextInt(width);
				int y = random.nextInt(height);
				g.drawOval(x, y, 4, 4);
			}
			// 设置字体，下面准备画随机数
			g.setFont(new Font("", Font.PLAIN, 40));
			// 随机数字符串
			String sRand = "";
			for (int i = 0; i < 4; i++) {
				// 生成四个数字字符
				String rand = String.valueOf(random.nextInt(10));
				sRand += rand;
				// 生成随机颜色
				g.setColor(new Color(20 + random.nextInt(80), 20 + random
						.nextInt(100), 20 + random.nextInt(90)));
				// 将随机数字画在图像上
				g.drawString(rand, (17 + random.nextInt(3)) * i + 8, 34);

				// 生成干扰线
				for (int k = 0; k < 12; k++) {
					int x = random.nextInt(width);
					int y = random.nextInt(height);
					int xl = random.nextInt(9);
					int yl = random.nextInt(9);
					g.drawLine(x, y, x + xl, y + yl);
				}
			}

			// 将生成的随机数字字符串写入Session
			request.getSession(false).setAttribute("mrandcode", sRand);
			// 使图像生效
			g.dispose();
			// 输出图像到页面
			ImageIO.write(image, "JPEG", response.getOutputStream());
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "登录失败");
		}
	}



	/**
	 * 产生一个随机的颜色
	 * 
	 * @param fc
	 *            颜色分量最小值
	 * @param bc
	 *            颜色分量最大值
	 * @return
	 */
	public Color getRandColor(int fc, int bc) {
		Random random = new Random();
		if (fc > 255) {
			fc = 255;
		}
		if (bc > 255) {
			bc = 255;
		}
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}


	@RequestMapping("login/logout.do")
	@ResponseBody
	public Object logout(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			super.removeCookie(Constant.TRANS_LOGIN_USER_COOKIE_VALUE,response);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "退出失败");
		}
	}
}
