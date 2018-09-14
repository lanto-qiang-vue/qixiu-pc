package com.lanto.shqixiu.shcheck.util;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.softbase.utils.CommonUtils;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * 将二进制流转换成图片文件
 * 
 * @author 晚风工作室 www.soservers.com
 * 
 */
public class ImgErToFileUtil {
	/**
	 * 将接收的字符串转换成图片保存
	 * 
	 * @param imgStr
	 *            二进制流转换的字符串
	 * @param imgPath
	 *            图片的保存路径
	 * @param imgName
	 *            图片的名称
	 * @return 1：保存正常 0：保存失败
	 */
	public static int saveToImgByStr(String imgStr, String imgPath) {
		try {
		//	System.out.println("===imgStr.length()====>" + imgStr.length()+ "=====imgStr=====>" + imgStr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		int stateInt = 1;
		if (imgStr != null && imgStr.length() > 0) {
			try {
				// 将字符串转换成二进制，用于显示图片
				// 将上面生成的图片格式字符串 imgStr，还原成图片显示
				byte[] imgByte = hex2byte(imgStr);
				InputStream in = new ByteArrayInputStream(imgByte);
				File file = new File(imgPath);// 可以是任何图片格式.jpg,.png等
				FileOutputStream fos = new FileOutputStream(file);
				byte[] b = new byte[1024];
				int nRead = 0;
				while ((nRead = in.read(b)) != -1) {
					fos.write(b, 0, nRead);
				}
				fos.flush();
				fos.close();
				in.close();
			} catch (Exception e) {
				stateInt = 0;
				e.printStackTrace();
			} finally {
			}
		}
		return stateInt;
	}

	/**
	 * 将二进制转换成图片保存
	 * 
	 * @param imgStr
	 *            二进制流转换的字符串
	 * @param imgPath
	 *            图片的保存路径
	 * @param imgName
	 *            图片的名称
	 * @return 1：保存正常 0：保存失败
	 */
	public static int saveToImgByBytes(File imgFile, String imgPath,
			String imgName) {
		int stateInt = 1;
		if (imgFile.length() > 0) {
			try {
				File file = new File(imgPath, imgName);// 可以是任何图片格式.jpg,.png等
				FileOutputStream fos = new FileOutputStream(file);
				FileInputStream fis = new FileInputStream(imgFile);
				byte[] b = new byte[1024];
				int nRead = 0;
				while ((nRead = fis.read(b)) != -1) {
					fos.write(b, 0, nRead);
				}
				fos.flush();
				fos.close();
				fis.close();
			} catch (Exception e) {
				stateInt = 0;
				e.printStackTrace();
			} finally {
			}
		}
		return stateInt;
	}

	/**
	 * 二进制转字符串
	 * 
	 * @param b
	 * @return
	 */
	public static String byte2hex(byte[] b) // 二进制转字符串
	{
		StringBuffer sb = new StringBuffer();
		String stmp = "";
		for (int n = 0; n < b.length; n++) {
			stmp = Integer.toHexString(b[n] & 0XFF);
			if (stmp.length() == 1) {
				sb.append("0" + stmp);
			} else {
				sb.append(stmp);
			}
		}
		return sb.toString();
	}

	/**
	 * 字符串转二进制
	 * 
	 * @param str
	 *            要转换的字符串
	 * @return 转换后的二进制数组
	 */
	public static byte[] hex2byte(String str) { // 字符串转二进制
		if (str == null)
			return null;
		str = str.trim();
		int len = str.length();
		if (len == 0 || len % 2 == 1)
			return null;
		byte[] b = new byte[len / 2];
		try {
			for (int i = 0; i < str.length(); i += 2) {
				b[i / 2] = (byte) Integer
						.decode("0X" + str.substring(i, i + 2)).intValue();
			}
			return b;
		} catch (Exception e) {
			return null;
		}
	}
	
	//图片转化成base64字符串  
    public static String getImageStr(String path)  
    {//将图片文件转化为字节数组字符串，并对其进行Base64编码处理  
        InputStream in = null;  
        byte[] data = null;  
        //读取图片字节数组  
        try   
        {  
            in = new FileInputStream(path);          
            data = new byte[in.available()];  
            in.read(data);  
            in.close();  
        }   
        catch (IOException e)   
        {  
            e.printStackTrace();  
        }  
        //对字节数组Base64编码  
        BASE64Encoder encoder = new BASE64Encoder();  
        return encoder.encode(data);//返回Base64编码过的字节数组字符串  
    }  
    
  //base64字符串转化成图片  
    public static boolean generateImage(String imgStr,String savePath)  
    {   //对字节数组字符串进行Base64解码并生成图片  
        if (CommonUtils.checkIsNullStr(imgStr)) //图像数据为空  
            return false;  
        BASE64Decoder decoder = new BASE64Decoder();  
        try   
        {  
            //Base64解码  
            byte[] b = decoder.decodeBuffer(imgStr);  
            for(int i=0;i<b.length;++i)  
            {  
                if(b[i]<0)  
                {//调整异常数据  
                    b[i]+=256;  
                }  
            }  
            //生成jpeg图片  
            OutputStream out = new FileOutputStream(savePath);      
            out.write(b);  
            out.flush();  
            out.close();  
            return true;  
        }   
        catch (Exception e)   
        {  
            return false;  
        }  
    }  
}
