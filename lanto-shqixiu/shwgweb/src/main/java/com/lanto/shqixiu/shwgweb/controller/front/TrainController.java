package com.lanto.shqixiu.shwgweb.controller.front;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value = "", produces = "text/html;charset=UTF-8")
public class TrainController extends BaseCon {
    private Logger logger = Logger.getLogger(TrainController.class);// 日志

    @RequestMapping(value = "train", method = RequestMethod.GET)
    public String index(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "reserve/train";
    }

    @RequestMapping(value = "recommend", method = RequestMethod.GET)
    public String index_recommend(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "reserve/companys";
    }

    @RequestMapping(value = "cooperate", method = RequestMethod.GET)
    public String index_cooperate(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "reserve/cooperate";
    }

    @RequestMapping(value = "company", method = RequestMethod.GET)
    public String company(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "reserve/recommend";
    }
}
