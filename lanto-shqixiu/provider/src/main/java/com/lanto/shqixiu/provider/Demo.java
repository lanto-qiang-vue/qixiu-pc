/**
 * 
 */
/**
 * @author root
 *
 */
package com.lanto.shqixiu.provider;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;

/**
 * Controller模板
 */
@Controller
@RequestMapping("/")
public class Demo {
	private static final Logger logger = LoggerFactory.getLogger(Demo.class);

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public Object index(ModelAndView mov) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("hello", "World");
		map.put("你好", "中国");
		map.put("123", "456");
		String json = JSON.toJSONString(map);
		mov.addObject("json", json);
		logger.trace("[trace]: {}", new Object[] { json });
		logger.debug("[debug]: {}", new Object[] { json });
		logger.info("[info]: {}", new Object[] { json });
		logger.warn("[warn]: {}", new Object[] { json });
		logger.error("[error]: {}", new Object[] { json });
		mov.setViewName("/index");
		return mov;
	}
}