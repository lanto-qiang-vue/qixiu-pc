package com.lanto.shqixiu.shwgweb.controller.front;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(value="/315",produces = "text/html;charset=UTF-8")
public class Qixiu315Controller {

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(HttpServletRequest request, HttpServletResponse response) {
        return "315/index";
    }

    @RequestMapping(value = "/shop/detail/{id}", method = RequestMethod.GET)
    public String shopdetail(@PathVariable int id) {
        return "315/shopdetail";
    }

    @RequestMapping(value = "/tips", method = RequestMethod.GET)
    public String tips() {
        return "315/tips";
    }

    @RequestMapping(value = "/comlist", method = RequestMethod.GET)
    public String comlist() { return "315/comlist"; }

    //comDetail
    @RequestMapping(value = "/comdetail", method = RequestMethod.GET)
    public String comdetail() { return "315/comdetail"; }

    @RequestMapping(value = "/wash", method = RequestMethod.GET)
    public String wash() { return "315/wash"; }

    @RequestMapping(value = "/weiquan", method = RequestMethod.GET)
    public String weiquan() { return "315/weiquan"; }

    @RequestMapping(value = "/huodongdi", method = RequestMethod.GET)
    public String huodongdi() { return "315/huodongdi"; }

    @RequestMapping(value = "/youhui", method = RequestMethod.GET)
    public String youhui() { return "315/youhui"; }

}
