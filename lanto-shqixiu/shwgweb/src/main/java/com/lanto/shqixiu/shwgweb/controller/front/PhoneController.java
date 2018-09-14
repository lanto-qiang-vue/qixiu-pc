package com.lanto.shqixiu.shwgweb.controller.front;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;

@Controller
@RequestMapping(value="/phone",produces = "text/html;charset=UTF-8")
public class PhoneController {
    /**
     * 车辆保险
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/insure", method = RequestMethod.GET )
    public String insure(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/insure";
    }

    /**
     * 年检服务
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/check", method = RequestMethod.GET )
    public String check(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/check";
    }


    /**
     * 道路救援
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/help", method = RequestMethod.GET )
    public String help(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/help";
    }

    /**
     * 二手车市场
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/sell", method = RequestMethod.GET )
    public String sell(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/sell";
    }

    /**
     * 二手车市场1
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/sell1", method = RequestMethod.GET )
    public String sell1(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/sell1";
    }

    /**
     * 二手车市场2
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/sell2", method = RequestMethod.GET )
    public String sell2(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/sell2";
    }


    /**
     * 二手车市场3
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/sell3", method = RequestMethod.GET )
    public String sell3(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/sell3";
    }


    /**
     * 美容清洁
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/wash", method = RequestMethod.GET )
    public String wash(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/wash";
    }

    /**
     * 配件需求
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/parts", method = RequestMethod.GET )
    public String parts(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/parts";
    }

    /**
     * 相关培训
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/train", method = RequestMethod.GET )
    public String business_train(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/train";
    }

    @RequestMapping(value = "/business/train1", method = RequestMethod.GET )
    public String business_train1(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/train1";
    }

    @RequestMapping(value = "/business/train2", method = RequestMethod.GET )
    public String business_train2(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/train2";
    }

    @RequestMapping(value = "/business/train3", method = RequestMethod.GET )
    public String business_train3(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/train3";
    }


    /**
     * 推荐服务
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/study", method = RequestMethod.GET )
    public String study(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/study";
    }

    /**
     * 推荐服务1
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/study1", method = RequestMethod.GET )
    public String study1(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/study1";
    }

    /**
     * 推荐服务2
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/study2", method = RequestMethod.GET )
    public String study2(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/study2";
    }

    /**
     * 推荐服务3
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/study3", method = RequestMethod.GET )
    public String study3(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/study3";
    }

    @RequestMapping(value = "/business/study4", method = RequestMethod.GET )
        public String study4(HttpServletRequest request, HttpServletResponse response) {
            return "phone/business/study4";
        }


    /**
     * 汽车读物
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/books", method = RequestMethod.GET )
    public String books(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/books";
    }

    /**
     * 汽车用品
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/consum", method = RequestMethod.GET )
    public String consum(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/consum";
    }

    /**
     * 汽保设备
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/business/equip", method = RequestMethod.GET )
    public String equip(HttpServletRequest request, HttpServletResponse response) {
        return "phone/business/equip";
    }


    /**
     * 培训需求
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/train", method = RequestMethod.GET )
    public String train(HttpServletRequest request, HttpServletResponse response) {
        return "phone/train";
    }


    /**
     * 优质企业推荐
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/recommend", method = RequestMethod.GET )
    public String recommend(HttpServletRequest request, HttpServletResponse response) {
        return "phone/recommend";
    }

    /**
     * 优质企业推荐1
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/recommend1", method = RequestMethod.GET )
    public String recommend1(HttpServletRequest request, HttpServletResponse response) {
        return "phone/recommend1";
    }

    /**
     * 优质企业推荐2
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/recommend2", method = RequestMethod.GET )
    public String recommend2(HttpServletRequest request, HttpServletResponse response) {
        return "phone/recommend2";
    }

    /**
     * 优质企业推荐
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/recommend3", method = RequestMethod.GET )
    public String recommend3(HttpServletRequest request, HttpServletResponse response) {
        return "phone/recommend3";
    }


    /**
     * 联系方式
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/partner", method = RequestMethod.GET )
    public String partner(HttpServletRequest request, HttpServletResponse response) {
        return "phone/partner";
    }

    /**
     * 专家名录
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/specialist", method = RequestMethod.GET )
    public String specialist(HttpServletRequest request, HttpServletResponse response) {
        return "phone/specialist";
    }

    @RequestMapping(value = "/agreement", method = RequestMethod.GET )
        public String agreement(HttpServletRequest request, HttpServletResponse response) {
            return "phone/agreement";
        }


    //活动说明
    @RequestMapping(value = "/explain", method = RequestMethod.GET )
    public String explain(HttpServletRequest request, HttpServletResponse response) {
        return "phone/explain";
    }

    //315
    @RequestMapping(value = "/banner", method = RequestMethod.GET )
    public String banner(HttpServletRequest request, HttpServletResponse response) {
        return "phone/banner";
    }

    @RequestMapping(value = "/315/index", method = RequestMethod.GET )
    public String index315(HttpServletRequest request, HttpServletResponse response) {
        return "phone/315/index";
    }

    @RequestMapping(value = "/315/wash", method = RequestMethod.GET )
        public String wash315(HttpServletRequest request, HttpServletResponse response) {
            return "phone/315/wash";
        }

    @RequestMapping(value = "/315/comlist", method = RequestMethod.GET )
    public String comlist315(HttpServletRequest request, HttpServletResponse response) {
        return "phone/315/comlist";
    }

    @RequestMapping(value = "/315/comdetail", method = RequestMethod.GET )
    public String comdetail315(HttpServletRequest request, HttpServletResponse response) {
        return "phone/315/comdetail";
    }

    @RequestMapping(value = "/315/huodongdi", method = RequestMethod.GET )
    public String huodongdi315(HttpServletRequest request, HttpServletResponse response) {
        return "phone/315/huodongdi";
    }

    @RequestMapping(value = "/315/weiquan", method = RequestMethod.GET )
        public String weiquan315(HttpServletRequest request, HttpServletResponse response) {
            return "phone/315/weiquan";
        }

    @RequestMapping(value = "/315/qianyin", method = RequestMethod.GET )
        public String qianyin315(HttpServletRequest request, HttpServletResponse response) {
            return "phone/315/qianyin";
        }

    @RequestMapping(value = "/315/youhui", method = RequestMethod.GET )
            public String youhui315(HttpServletRequest request, HttpServletResponse response) {
                return "phone/315/youhui";
            }

    //砸金蛋
    @RequestMapping(value = "/hiteggs", method = RequestMethod.GET )
    public String hiteggs(HttpServletRequest request, HttpServletResponse response) {
        return "phone/hiteggs";
    }

    @RequestMapping(value = "/wash", method = RequestMethod.GET )
    public String phonewash(HttpServletRequest request, HttpServletResponse response) {
        return "phone/wash";
    }
}
