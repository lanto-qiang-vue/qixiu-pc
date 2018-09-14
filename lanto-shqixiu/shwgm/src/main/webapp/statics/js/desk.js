Ext.onReady(function() {
    var notiwin = Ext.create('widget.uxNotification', {
        title: '信息提示',
        corner: 'br',
        stickOnClick: false,
        manager: 'desktop',
        iconCls: 'ux-notification-icon-information',
        html: '教学资源库管理平台  <br>初始化完成!'
    });
    notiwin.show();
    if (tlogin == 'qq') {
        Ext.create('Ext.window.Window', {
            border: true,
            id: 'qqwin',
            title: '你正用QQ帐号登录',
            frame: true,
            modal: false,
            width: 190,
            height: 130,
            maximizable: false,
            resizable: false,
            bodyStyle: 'background-color:#84C1FF;',
            icon: 'images/qq16.png',
            hideMode: 'offsets',
            layout: 'fit',
            loader: {
                url: 'qqloginuser.aspx',
                autoLoad: true,
                scripts: true
            }
        }).showAt([Ext.getBody().getWidth() - 400, 10])
    }
});

function LoadJs(url) {
    var ss = document.getElementsByTagName("script");
    var head = document.getElementsByTagName('head').item(0);
    for (i = 0; i < ss.length; i++) {
        if (ss[i].src && ss[i].src.indexOf(url) != -1) {
            head.removeChild(ss[i])
        }
    }
    var script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    head.appendChild(script)
}
var mydsk = new zykdsk.App();
var dsk = 1,
    godsk = true,
    movex = 0,
    movey = 0,
    ismove = true,
    infeed = true;

function showClock() {
    d = new Date();
    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    time = hours + ":" + minutes + ":" + seconds;
    document.getElementById("myclock").innerHTML = time;
    setTimeout("showClock()", 1000)
}
showClock();
if (!himg == '') {
    document.getElementById("headlogo").src = "images/bbs/h" + himg + ".jpg"
}
Ext.util.DelayedTask = function(fn, scope, args) {
    var me = this,
        id, call = function() {
            clearInterval(id);
            id = null;
            fn.apply(scope, args || [])
        };
    me.delay = function(delay, newFn, newScope, newArgs) {
        me.cancel();
        fn = newFn || fn;
        scope = newScope || scope;
        args = newArgs || args;
        id = setInterval(call, delay)
    };
    me.cancel = function() {
        if (id) {
            clearInterval(id);
            id = null
        }
    }
};

function fn() {
    if (Ext.isIE) {
        Ext.create('widget.uxNotification', {
            title: '温馨提示',
            corner: 'br',
            stickOnClick: false,
            manager: 'desktop',
            iconCls: 'ux-notification-icon-information',
            html: '您使用的是IE浏览器，<br><a href="http://dl.pconline.com.cn/download/51614.html" target="_0">推荐您使用谷歌浏览器访问本系统!</a>'
        }).show()
    }
};
var task = new Ext.util.DelayedTask(fn);
task.delay(2000);
setInterval("Ext.Ajax.request({url: 'checklogin.aspx'})", 15 * 60000);

function startmarquee(lh, speed, delay) {
    var p = false;
    var t;
    var sh;
    var o = document.getElementById("scrollMsg");
    o.innerHTML += o.innerHTML;
    o.style.marginTop = 0;
    o.onmouseover = function() {
        p = true
    };
    o.onmouseout = function() {
        p = false
    };

    function start() {
        sh = o.offsetHeight;
        o.style.height = sh;
        t = setInterval(scrolling, speed);
        if (!p) o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px"
    }

    function scrolling() {
        if (parseInt(o.style.marginTop) % lh != 0) {
            o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
            if (Math.abs(parseInt(o.style.marginTop)) >= sh / 2) o.style.marginTop = 0
        } else {
            clearInterval(t);
            setTimeout(start, delay)
        }
    }
    setTimeout(start, delay)
}
startmarquee(18, 20, 5000);
setTimeout('document.getElementById("goworkflow-btnIconEl").style.background = "url(images/workflow.png)";', 30000);