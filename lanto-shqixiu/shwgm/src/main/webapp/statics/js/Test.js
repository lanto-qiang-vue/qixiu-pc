Ext.require(["*"]);
var mainmenua = new Ext.Panel({
    title: "资源检索",
    autoScroll: true,
    border: false,
    iconCls: "fljs",
    lbar: {
        baseCls: "",
        defaults: {
            height: 72,
            width: 60,
            margin: "3 15 3 15",
            iconAlign: "top"
        },
        items: [{
            text: '<img src="images/search.png" width=48 height=70>',
            margin: "10 15 3 15",
            handler: gosearch
        }, {
            text: '<img src="images/subject.png" width=48 height=70>',
            handler: gosubject
        }, {
            text: '<img src="images/media.png" width=48 height=70>',
            handler: gomedia
        }, {
            text: '<img src="images/iv.png" width=48 height=70>',
            handler: goiv
        }]
    }
});
var mainmenub = new Ext.Panel({
    title: "资源上载",
    autoScroll: true,
    border: false,
    iconCls: "upload",
    lbar: {
        baseCls: "",
        defaults: {
            height: 72,
            width: 60,
            margin: "3 15 3 15",
            iconAlign: "top"
        },
        items: [{
            text: '<img src="images/upload.png" width=48 height=70>',
            margin: "10 15 3 15",
            handler: gouploadsi
        }, {
            text: '<img src="images/upm.png" width=48 height=70>',
            handler: gouploadmu
        }]
    }
});
var mainmenuc = new Ext.Panel({
    title: "系统管理",
    autoScroll: true,
    border: false,
    iconCls: "icon-user",
    lbar: {
        baseCls: "",
        defaults: {
            height: 72,
            width: 60,
            margin: "3 15 3 15",
            iconAlign: "top"
        },
        items: [{
            text: '<img src="images/login.png" width=48 height=70>',
            margin: "10 15 3 15",
            handler: function() {
                Ext.Ajax.request({
                    url: "../checklogin.aspx",
                    success: function(A) {
                        var B = Ext.JSON.decode(A.responseText);
                        if (B.success == true) {
                            Ext.MessageBox.confirm("操作确认", "确定要注销用户登录吗?", function(C) {
                                if (C == "yes") {
                                    Ext.Ajax.request({
                                        url: "../Logout.aspx",
                                        async: false,
                                        success: function(D) {
                                            var E = Ext.JSON.decode(D.responseText);
                                            if (E.success == true) {
                                                top.location.reload()
                                            } else {
                                                Ext.MessageBox.alert("提示", "用户并未登录!")
                                            }
                                        },
                                        failure: function(D) {
                                            Ext.MessageBox.alert("错误", "请与后台服务人员联系")
                                        }
                                    })
                                }
                            }, this)
                        } else {
                            new zykdsk.Login({
                                desktop: this.desktop
                            }).show()
                        }
                    },
                    failure: function(A) {
                        Ext.MessageBox.alert("错误", "请与后台服务人员联系")
                    }
                })
            }
        }, {
            text: '<img src="images/Change.png" width=48 height=70>',
            handler: function() {
                top.location = "../default.htm"
            }
        }, {
            text: '<img src="images/power.png" width=48 height=70>',
            handler: function() {
                window.opener = null;
                window.open("", "_self");
                window.close()
            }
        }]
    }
});
var mainmenu = new Ext.Panel({
    region: "west",
    title: "导航栏",
    collapsible: true,
    width: 100,
    iconCls: "tabs",
    layout: "accordion",
    layoutConfig: {
        animate: true
    },
    items: [mainmenua, mainmenub, mainmenuc]
});
getChartData = function(A) {
    var B = [];
    A = (!A && A !== "0") ? "1" : A;
    Ext.Ajax.request({
        url: "../zyChartData.aspx?id=" + A,
        async: false,
        success: function(C) {
            B = Ext.JSON.decode(C.responseText)
        },
        failure: function(C) {
            Ext.MessageBox.alert("错误", "请与后台服务人员联系")
        }
    });
    return B
};
var store1 = Ext.create("store.json", {
    fields: ["name", "tj"],
    data: getChartData()
});
var pjchartcolumn = Ext.create("Ext.chart.Chart", {
    id: "chartcolumn",
    region: "center",
    title: "直方图",
    width: 200,
    height: 120,
    xtype: "chart",
    style: "background:#fff",
    animate: true,
    shadow: true,
    store: store1,
    axes: [{
        type: "Numeric",
        position: "left",
        fields: ["tj"],
        label: {
            renderer: Ext.util.Format.numberRenderer("0,0")
        },
        grid: true,
        minimum: 0
    }, {
        type: "Category",
        position: "bottom",
        id: "xname",
        fields: ["name"]
    }],
    series: [{
        type: "column",
        axis: "left",
        highlight: true,
        tips: {
            trackMouse: true,
            width: 60,
            height: 28,
            renderer: function(A, B) {
                this.setTitle(A.get("name") + ": " + A.get("tj"))
            }
        },
        label: {
            display: "insideEnd",
            "text-anchor": "middle",
            field: "tj",
            renderer: Ext.util.Format.numberRenderer("0"),
            orientation: "vertical",
            color: "#333"
        },
        xField: "name",
        yField: "tj"
    }]
});
var rtopform = new Ext.Panel({
    region: "north",
    height: "300",
    width: 200,
    name: "form",
    labelSeparator: "：",
    xtype: "fieldset",
    defaultType: "textfield",
    items: [{
        xtype: "box",
        title: "资源预览",
        width: 180,
        height: 120,
        margin: "10,10,10,10",
        id: "bmyphoto",
        autoEl: {
            tag: "img",
            src: "../GetThumbnail.aspx"
        }
    }, {
        fieldLabel: "标题",
        width: 190,
        labelWidth: 30,
        disabled: true,
        id: "bTitle"
    }, {
        xtype: "hidden",
        id: "bID",
        value: ""
    }, {
        xtype: "hidden",
        id: "bprice",
        value: 0
    }, {
        xtype: "button",
        width: 90,
        margin: "2,2,2,2",
        text: "下载",
        iconCls: "ems",
        handler: function() {
            if (Ext.getCmp("bID").getValue() == "") {
                Ext.MessageBox.alert("下载提示", "你还未选择资源!");
                return
            };
            if (Ext.getCmp("bprice").getValue() > 0) {
                Ext.MessageBox.confirm("温馨提示", "下载该资源需要" + Ext.getCmp("bprice").getValue().toString() + "个积分，你是否需要下载？", function(A) {
                    if (A == "yes") {
                        downfiledlg(Ext.getCmp("bID").getValue(), "1")
                    }
                })
            } else {
                downfiledlg(Ext.getCmp("bID").getValue(), "1")
            }
        }
    }, {
        xtype: "button",
        width: 90,
        margin: "2,2,2,2",
        text: "直接打开",
        iconCls: "read",
        handler: function() {
            if (Ext.getCmp("bID").getValue() == "") {
                Ext.MessageBox.alert("打开载提示", "你还未选择资源!");
                return
            };
            if (Ext.getCmp("bprice").getValue() > 0) {
                Ext.MessageBox.confirm("温馨提示", "打开该资源需要" + Ext.getCmp("bprice").getValue().toString() + "个积分，你是否需要继续？", function(A) {
                    if (A == "yes") {
                        downfiledlg(Ext.getCmp("bID").getValue(), "2")
                    }
                })
            } else {
                downfiledlg(Ext.getCmp("bID").getValue(), "2")
            }
        }
    }, {
        xtype: "button",
        width: 90,
        margin: "2,2,2,4",
        text: "获取网址",
        iconCls: "icon-ie",
        handler: function() {
            if (Ext.getCmp("bID").getValue() == "") {
                Ext.MessageBox.alert("获取网址提示", "你还未选择资源!");
                return
            };
            if (Ext.getCmp("bprice").getValue() > 0) {
                Ext.MessageBox.alert("系统提示", "需要积分下载的资源不提供网址!");
                return
            };
            Ext.Ajax.request({
                url: "../GetUrl.aspx?id=" + Ext.getCmp("bID").getValue(),
                success: function(A) {
                    Ext.Msg.show({
                        title: "资源网址url",
                        msg: A.responseText,
                        icon: Ext.MessageBox.INFO,
                        buttons: Ext.MessageBox.OK
                    })
                },
                failure: function(A) {
                    Ext.MessageBox.alert("错误", "请与后台服务人员联系")
                }
            })
        }
    }, {
        xtype: "button",
        width: 90,
        margin: "2,2,2,4",
        text: "在线播放",
        iconCls: "sycx",
        handler: function() {
            if (Ext.getCmp("bID").getValue() == "") {
                Ext.MessageBox.alert("在线播放提示", "你还未选择资源!");
                return
            };
            var A = parseInt(Ext.getCmp("bprice").getValue() / 2);
            if (A > 0) {
                Ext.MessageBox.confirm("温馨提示", "在线播放该资源需要" + A.toString() + "个积分，你是否需要播放？", function(B) {
                    if (B == "yes") {
                        viewfiledlg(Ext.getCmp("bID").getValue())
                    }
                })
            } else {
                viewfiledlg(Ext.getCmp("bID").getValue())
            }
        }
    }]
});

function downfiledlg(A, B) {
    var C = Ext.create("widget.uxNotification", {
        title: "信息窗口",
        corner: "br",
        stickOnClick: false,
        manager: "desktop",
        iconCls: "ux-notification-icon-information",
        html: "正在进入下载文件...  <br> <iframe  width=100% height=6  frameborder=0 SCROLLING=no src=../downfile.aspx?ff=" + B + "&id=" + A + "></iframe>  "
    });
    C.show()
};

function viewfiledlg(A) {
    var B;
    if (!B) {
        B = Ext.create("widget.window", {
            title: "领尚多媒体在线智能播放器",
            closable: true,
            closeAction: "destroy",
            modal: true,
            maximized: false,
            resizable: true,
            maximizable: true,
            manager: "desktop",
            width: 800,
            height: 500,
            layout: "border",
            bodyStyle: "padding: 0px;",
            listeners: {
                resize: function(C, D, E) {
                    if (!Ext.isEmpty(document.getElementById("callframe"))) {
                        document.getElementById("callframe").height = E - 30
                    }
                }
            },
            loader: {
                url: "Simplegoonline.aspx?id=" + A,
                autoLoad: true,
                scripts: true
            }
        })
    };
    B.setVisible(true)
};
var plpanel = new Ext.Panel({
    region: "south",
    height: "100",
    width: 190,
    border: false,
    tbar: [{
        xtype: "tbspacer",
        width: 10
    }, {
        xtype: "button",
        text: "更多",
        iconCls: "fljs",
        handler: function() {
            morepldlg(Ext.getCmp("bID").getValue())
        }
    }, {
        xtype: "button",
        text: "评论",
        iconCls: "qm",
        handler: function() {
            if (Ext.getCmp("bID").getValue() == "") {
                return
            };
            newpldlg(Ext.getCmp("bID").getValue())
        }
    }, {
        xtype: "splitbutton",
        text: "评价",
        iconCls: "chart16x16",
        menu: {
            items: [{
                text: "好",
                icon: "../images/face/14.gif",
                handler: function() {
                    appraise(Ext.getCmp("bID").getValue(), 1)
                }
            }, {
                text: "一般",
                icon: "../images/face/21.gif",
                handler: function() {
                    appraise(Ext.getCmp("bID").getValue(), 2)
                }
            }, {
                text: "差",
                icon: "../images/face/15.gif",
                handler: function() {
                    appraise(Ext.getCmp("bID").getValue(), 3)
                }
            }]
        }
    }],
    html: '<iframe id="plframe" name="plframe" width="196" height="150" frameborder=no  scrolling=no src="../gettwopl.aspx"></iframe>'
});

function appraise(A, B) {
    if (A == "") {
        return
    };
    Ext.Ajax.request({
        url: "../Appraise.aspx?id=" + A + "&pj=" + B,
        success: function(C) {
            var D = Ext.JSON.decode(C.responseText);
            if (D.success == true) {
                Ext.MessageBox.alert("评论成功!", D.msg);
                store1.loadData(getChartData(A))
            } else {
                Ext.MessageBox.alert("评论失败!", D.msg)
            }
        },
        failure: function(C) {
            Ext.MessageBox.alert("错误", "请与后台服务人员联系")
        }
    })
};

function morepldlg(A) {
    var B = Ext.getCmp("plpopwin");
    if (!B) {
        B = Ext.create("widget.window", {
            title: "查看资源评论",
            id: "plpopwin",
            closable: true,
            closeAction: "hide",
            minimizable: true,
            maximizable: true,
            minimize: function() {
                this.hide()
            },
            width: 650,
            height: 550,
            iconCls: "bbs",
            html: '<iframe id="moreplframe" name="moreplframe" width=100% height=100% src="../viewzypl.aspx?id=' + A + '"></iframe>'
        });
        B.show()
    } else {
        window.parent.frames["moreplframe"].location = ("../viewzypl.aspx?id=" + A);
        if (B.hidden) {
            B.show()
        } else {
            B.hide()
        }
    }
};

function newpldlg(A) {
    var B = Ext.widget("form", {
        border: false,
        bodyPadding: 10,
        layout: "column",
        fieldDefaults: {
            labelAlign: "left",
            labelWidth: 40,
            labelStyle: "font-weight:bold"
        },
        items: [{
            xtype: "hiddenfield",
            value: A,
            name: "kcID",
            id: "kcID"
        }, {
            xtype: "hiddenfield",
            value: "0",
            name: "anony",
            id: "anony"
        }, {
            xtype: "htmleditor",
            anchor: "98%",
            fieldLabel: "<br>文明<br>发言<br><br>评论<br>资源<br><br>内容",
            name: "cont",
            id: "cont",
            allowBlank: false,
            blankText: "内容不能为空",
            fontFamilies: ["宋体", "隶书", "黑体", "楷体", "Arial", "Courier New", "Tahoma", "Times New Roman", "Verdana"],
            width: 630,
            height: 220
        }],
        buttons: [{
            xtype: "checkbox",
            checked: false,
            boxLabel: "匿名发表",
            id: "isanony"
        }, "-", {
            text: "发表",
            iconCls: "add",
            handler: function() {
                if (B.form.isValid()) {
                    if (Ext.getCmp("cont").getValue().length > 999) {
                        Ext.Msg.alert("提示", "内容超出长度规定！");
                        return
                    };
                    Ext.getCmp("cont").setValue(Ext.util.Format.htmlEncode(Ext.getCmp("cont").getValue()));
                    if (Ext.getCmp("isanony").checked) {
                        Ext.getCmp("anony").setValue("1")
                    };
                    B.form.submit({
                        url: "../newzypl.aspx",
                        method: "post",
                        waitMsg: "正在写入,请稍候...",
                        success: function(D, C) {
                            if (C.result.msg == "成功") {
                                Ext.Msg.alert("发表成功", C.result.name);
                                Ext.getCmp("newplwin").close()
                            } else {
                                Ext.Msg.alert("提示", C.result.name)
                            }
                        },
                        failure: function(C) {
                            Ext.MessageBox.alert("错误", "请与后台服务人员联系")
                        }
                    })
                } else {
                    Ext.Msg.alert("提示", "请输入内容！")
                }
            }
        }, {
            text: "取消",
            iconCls: "remove",
            handler: function() {
                var C = this.up("window");
                C.close()
            }
        }]
    });
    Ext.create("Ext.window.Window", {
        border: true,
        id: "newplwin",
        title: "发表资源评论",
        frame: true,
        modal: true,
        width: 670,
        height: 300,
        maximizable: false,
        resizable: false,
        iconCls: "qm",
        hideMode: "offsets",
        layout: "fit",
        items: B
    }).show()
};
gettjData = function(A) {
    var B = [];
    A = (!A && A !== 0) ? 1 : A;
    Ext.Ajax.request({
        url: "../Tipie.aspx?id=" + A,
        async: false,
        success: function(C) {
            B = Ext.JSON.decode(C.responseText)
        },
        failure: function(C) {
            Ext.MessageBox.alert("错误", "请与后台服务人员联系")
        }
    });
    return B
};
var store2 = Ext.create("store.json", {
    fields: ["name", "tj"],
    data: gettjData()
});
store2.loadData(gettjData(2));
var chartline = Ext.create("Ext.chart.Chart", {
    xtype: "chart",
    id: "syg",
    width: 450,
    height: 150,
    colspan: 2,
    animate: true,
    store: store2,
    axes: [{
        type: "Numeric",
        minimum: 0,
        position: "left",
        fields: ["tj"],
        title: false,
        grid: true,
        label: {
            renderer: Ext.util.Format.numberRenderer("0,0"),
            font: "10px Arial"
        }
    }, {
        type: "Category",
        position: "bottom",
        fields: ["name"],
        title: false
    }],
    series: [{
        type: "line",
        axis: "left",
        xField: "name",
        yField: "tj",
        tips: {
            trackMouse: true,
            width: 80,
            height: 40,
            renderer: function(A, B) {
                this.setTitle(A.get("name"));
                this.update(A.get("tj"))
            }
        },
        style: {
            fill: "#38B8BF",
            stroke: "#38B8BF",
            "stroke-width": 3
        },
        markerConfig: {
            type: "circle",
            size: 4,
            radius: 4,
            "stroke-width": 0,
            fill: "#38B8BF",
            stroke: "#38B8BF"
        }
    }]
});
var store3 = Ext.create("store.json", {
    fields: ["name", "tj"],
    data: gettjData()
});
store3.loadData(gettjData(1));
var chartcolumn3 = Ext.create("Ext.chart.Chart", {
    xtype: "chart",
    id: "syh",
    width: 450,
    height: 150,
    colspan: 2,
    animate: true,
    store: store3,
    style: "background:#fff",
    animate: true,
    shadow: true,
    axes: [{
        type: "Numeric",
        position: "left",
        fields: ["tj"],
        label: {
            renderer: Ext.util.Format.numberRenderer("0,0")
        },
        grid: true,
        minimum: 0
    }, {
        type: "Category",
        position: "bottom",
        id: "xname",
        fields: ["name"]
    }],
    series: [{
        type: "column",
        axis: "left",
        highlight: true,
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(A, B) {
                this.setTitle(A.get("name") + ": " + A.get("tj"))
            }
        },
        label: {
            display: "insideEnd",
            "text-anchor": "middle",
            field: "tj",
            renderer: Ext.util.Format.numberRenderer("0"),
            orientation: "vertical",
            color: "#333"
        },
        xField: "name",
        yField: "tj"
    }]
});

function viewzy(B, A, C) {
    if (B == "") {
        return
    };
    Ext.getCmp("bTitle").setValue(A);
    Ext.getCmp("bID").setValue(B);
    Ext.getCmp("bprice").setValue(C);
    Ext.getCmp("bmyphoto").getEl().dom.src = ("../GetThumbnail.aspx?id=" + B);
    store1.loadData(getChartData(B));
    window.parent.frames["plframe"].location = ("../gettwopl.aspx?id=" + B)
};
var responseArray = [];
Ext.Ajax.request({
    url: "getmainpagezy.aspx",
    async: false,
    success: function(A) {
        responseArray = Ext.JSON.decode(A.responseText)
    },
    failure: function(A) {
        Ext.MessageBox.alert("错误", "请与后台服务人员联系")
    }
});
var mainpanel = new Ext.Panel({
    id: "mainpage",
    title: "首页",
    baseCls: "x-plain",
    iconCls: "xtxx",
    layout: {
        type: "table",
        columns: 4
    },
    defaults: {
        frame: true,
        width: 220,
        height: 180,
        margin: "5 5 5 5"
    },
    items: [{
            title: "统计信息",
            id: "sya",
            collapsible: true,
            iconCls: "ux-notification-icon-information",
            html: responseArray.tjxx
        }, {
            title: "上载排行",
            id: "syb",
            collapsible: true,
            iconCls: "user",
            html: responseArray.upcount
        }, {
            title: "积分排行",
            id: "syc",
            collapsible: true,
            iconCls: "user-girl",
            html: responseArray.integration
        }, {
            title: "最近登陆",
            id: "syd",
            collapsible: true,
            iconCls: "icon-user",
            html: responseArray.lastlogin
        }, {
            title: "最新资源",
            id: "sye",
            collapsible: true,
            iconCls: "qm",
            width: 450,
            height: 220,
            colspan: 2,
            html: responseArray.fileupdate
        }, {
            title: "最热资源",
            id: "syf",
            collapsible: true,
            iconCls: "read",
            width: 450,
            height: 220,
            colspan: 2,
            html: responseArray.browcount
        },
        chartline, chartcolumn3
    ]
});
Ext.define("MyData", {
    extend: "Ext.data.Model",
    fields: ["rank", "ID", "Title", "extname", "filesize", "browcount", "downcount", "XM", "fileupdate", "price"]
});
var gridstore = Ext.create("Ext.data.Store", {
    pageSize: 22,
    model: "MyData",
    remoteSort: false,
    proxy: {
        type: "ajax",
        url: "../SourceSubjectGrid.aspx",
        reader: {
            root: "items",
            totalProperty: "total"
        },
        simpleSortMode: true
    }
});
var mystore = Ext.create("Ext.data.TreeStore", {
    proxy: {
        type: "ajax",
        url: "../SourceSubjectTree.aspx"
    },
    root: {
        text: "学科",
        id: "9475200d-11d5-4682-bcdd-a7f7d79e0539",
        expanded: true
    },
    folderSort: false
});
var SStree = Ext.create("Ext.tree.Panel", {
    store: mystore,
    height: 510,
    width: 200,
    collapsible: true,
    title: "学科分类树",
    useArrows: false,
    tools: [{
        type: "expand",
        handler: function() {
            SStree.expandAll()
        }
    }, {
        type: "collapse",
        handler: function() {
            SStree.collapseAll()
        }
    }, {
        type: "refresh",
        handler: function(C, A) {
            SStree.setLoading(true, SStree.body);
            var B = SStree.getRootNode();
            B.collapseChildren(true, false);
            Ext.Function.defer(function() {
                SStree.setLoading(false);
                B.expand(true, true)
            }, 1000)
        }
    }],
    listeners: {
        afterrender: function(A) {
            A.getSelectionModel().select(0)
        },
        itemclick: function(B, A) {
            gridstore.currentPage = 1;
            gridstore.load({
                start: 0,
                limit: 22,
                params: {
                    subId: A.raw.id
                }
            })
        }
    }
});
var SSgrid = Ext.create("Ext.grid.GridPanel", {
    xtype: "grid",
    title: "学科资源浏览",
    columnWidth: 1,
    store: gridstore,
    emptyText: '<br><br><p align=center><img src="images/blank.png"></p>',
    height: 500,
    columns: [{
        text: "序号",
        width: 40,
        dataIndex: "rank",
        sortable: true
    }, {
        text: "资源标题",
        width: 140,
        flex: 1,
        dataIndex: "Title",
        sortable: true
    }, {
        text: "格式",
        width: 40,
        dataIndex: "extname",
        sortable: true
    }, {
        text: "文件大小",
        width: 80,
        dataIndex: "filesize",
        sortable: false
    }, {
        text: "浏览",
        width: 30,
        dataIndex: "browcount",
        sortable: true
    }, {
        text: "下载",
        width: 30,
        dataIndex: "downcount",
        sortable: true
    }, {
        text: "上载人",
        width: 50,
        dataIndex: "XM",
        sortable: true
    }, {
        text: "上载时间",
        width: 80,
        dataIndex: "fileupdate",
        renderer: function(A) {
            return A.replace("T", " ")
        },
        sortable: true
    }, {
        text: "币值",
        width: 40,
        dataIndex: "price",
        sortable: true
    }],
    bbar: Ext.create("Ext.PagingToolbar", {
        store: gridstore,
        displayInfo: true,
        displayMsg: "显示 {0} - {1} 条，共计 {2} 条",
        emptyMsg: "没有数据"
    }),
    listeners: {
        selectionchange: function(B, A) {
            if (A[0]) {
                Ext.getCmp("bTitle").setValue(A[0].raw.Title);
                Ext.getCmp("bID").setValue(A[0].raw.ID);
                Ext.getCmp("bprice").setValue(A[0].raw.price);
                Ext.getCmp("bmyphoto").getEl().dom.src = ("../GetThumbnail.aspx?id=" + A[0].raw.ID);
                store1.loadData(getChartData(A[0].raw.ID));
                window.parent.frames["plframe"].location = ("../gettwopl.aspx?id=" + A[0].raw.ID)
            }
        }
    }
});

function gosubject() {
    var A = Ext.getCmp("subjecttype");
    if (!A) {
        gridstore.loadPage(1);
        tabs.add({
            title: "学科分类",
            id: "subjecttype",
            iconCls: "read",
            autoScroll: false,
            layout: "column",
            items: [SStree, SSgrid],
            closable: false
        }).show()
    } else {
        tabs.setActiveTab(A)
    }
};
var ivgridstore = Ext.create("Ext.data.Store", {
    pageSize: 22,
    model: "MyData",
    remoteSort: false,
    proxy: {
        type: "ajax",
        url: "../SourceSubjectGrid.aspx",
        reader: {
            root: "items",
            totalProperty: "total"
        },
        simpleSortMode: true
    }
});
var ivtreestore = Ext.create("Ext.data.TreeStore", {
    proxy: {
        type: "ajax",
        url: "../SourceSubjectTree.aspx"
    },
    root: {
        text: "学科",
        id: "9475200d-11d5-4682-bcdd-a7f7d79e0539",
        expanded: true
    },
    folderSort: false
});
var ivtree = Ext.create("Ext.tree.Panel", {
    store: ivtreestore,
    height: 510,
    width: 200,
    collapsible: true,
    title: "学科分类树",
    useArrows: false,
    tools: [{
        type: "expand",
        handler: function() {
            ivtree.expandAll()
        }
    }, {
        type: "collapse",
        handler: function() {
            ivtree.collapseAll()
        }
    }, {
        type: "refresh",
        handler: function(C, A) {
            ivtree.setLoading(true, ivtree.body);
            var B = ivtree.getRootNode();
            B.collapseChildren(true, false);
            Ext.Function.defer(function() {
                ivtree.setLoading(false);
                B.expand(true, true)
            }, 1000)
        }
    }],
    listeners: {
        afterrender: function(A) {
            A.getSelectionModel().select(0)
        },
        itemclick: function(B, A) {
            ivgridstore.currentPage = 1;
            ivgridstore.load({
                start: 0,
                limit: 22,
                params: {
                    subId: A.raw.id
                }
            })
        }
    }
});
var ftiptpl = "名称：{0}<br/>类型：{1}<br/>大小：{2}<br/>上载人：{3}<br/>上载时间：{4}<br/>下载分：{5}<br/>下载/点击：{6}<br/>";
var fview = Ext.create("Ext.view.View", {
    xtype: "view",
    store: ivgridstore,
    tpl: ['<tpl for=".">', '<div class="thumb-wrap" id="{rank}">', '<div class="thumb"><img src="../GetThumbnail.aspx?id={ID}" height="80" width="120"></div>', "<span>{Title}</span></div>", "</tpl>", '<div class="x-clear"></div>'],
    autoScroll: true,
    trackOver: true,
    emptyText: '<br><br><p align=center><img src="images/blank.png"></p>',
    overItemCls: "x-item-over",
    itemSelector: "div.thumb-wrap",
    multiSelect: false,
    region: "center",
    height: "100%",
    listeners: {
        selectionchange: function(B, A) {
            if (A[0]) {
                Ext.getCmp("bTitle").setValue(A[0].raw.Title);
                Ext.getCmp("bID").setValue(A[0].raw.ID);
                Ext.getCmp("bprice").setValue(A[0].raw.price);
                Ext.getCmp("bmyphoto").getEl().dom.src = ("../GetThumbnail.aspx?id=" + A[0].raw.ID);
                store1.loadData(getChartData(A[0].raw.ID));
                window.parent.frames["plframe"].location = ("../gettwopl.aspx?id=" + A[0].raw.ID)
            }
        },
        "afterrender": function() {
            Ext.create("Ext.tip.ToolTip", {
                target: fview.el,
                delegate: fview.itemSelector,
                trackMouse: true,
                renderTo: Ext.getBody(),
                anchor: "right",
                listeners: {
                    beforeshow: function(B) {
                        var A = fview.getRecord(B.triggerElement);
                        B.update(Ext.String.format(ftiptpl, A.get("Title"), A.get("extname"), A.get("filesize"), A.get("XM"), A.get("fileupdate"), A.get("price"), A.get("downcount") + "/" + A.get("browcount")))
                    }
                }
            })
        }
    }
});
var ivpanel = new Ext.Panel({
    xtype: "panel",
    title: "学科资源缩略图方式浏览",
    columnWidth: 1,
    height: 510,
    region: "center",
    bbar: Ext.create("Ext.PagingToolbar", {
        store: ivgridstore,
        displayInfo: true,
        displayMsg: "显示 {0} - {1} 条，共计 {2} 条",
        emptyMsg: "没有数据"
    }),
    items: fview
});

function goiv() {
    var A = Ext.getCmp("ivsubject");
    if (!A) {
        ivgridstore.loadPage(1);
        tabs.add({
            title: "图式浏览",
            id: "ivsubject",
            iconCls: "read",
            autoScroll: false,
            layout: "column",
            items: [ivtree, ivpanel],
            closable: false
        }).show()
    } else {
        tabs.setActiveTab(A)
    }
};
var SourceTypegridstore = Ext.create("Ext.data.Store", {
    pageSize: 22,
    model: "MyData",
    remoteSort: false,
    proxy: {
        type: "ajax",
        url: "../SourceTypeGrid.aspx",
        reader: {
            root: "items",
            totalProperty: "total"
        },
        simpleSortMode: true
    }
});
var SourceTypestore = Ext.create("Ext.data.TreeStore", {
    proxy: {
        type: "ajax",
        url: "../SourceTypeTree.aspx"
    },
    root: {
        text: "媒体类型",
        id: "9999",
        expanded: true
    },
    folderSort: false
});
var SourceTypetree = Ext.create("Ext.tree.Panel", {
    store: SourceTypestore,
    region: "west",
    height: "510",
    width: 200,
    collapsible: true,
    title: "媒体类型分类树",
    useArrows: false,
    tools: [{
        type: "expand",
        handler: function() {
            SourceTypetree.expandAll()
        }
    }, {
        type: "collapse",
        handler: function() {
            SourceTypetree.collapseAll()
        }
    }, {
        type: "refresh",
        handler: function(C, A) {
            SourceTypetree.setLoading(true, SourceTypetree.body);
            var B = SourceTypetree.getRootNode();
            B.collapseChildren(true, false);
            Ext.Function.defer(function() {
                SourceTypetree.setLoading(false);
                B.expand(true, true)
            }, 1000)
        }
    }],
    listeners: {
        afterrender: function(A) {
            A.getSelectionModel().select(0)
        },
        itemclick: function(B, A) {
            SourceTypegridstore.currentPage = 1;
            SourceTypegridstore.load({
                start: 0,
                limit: 22,
                params: {
                    subId: A.raw.id
                }
            })
        }
    }
});
var STypegrid = Ext.create("Ext.grid.GridPanel", {
    xtype: "grid",
    title: "媒体类型分类资源浏览",
    columnWidth: 1,
    store: SourceTypegridstore,
    emptyText: '<br><br><p align=center><img src="../images/blank.png"></p>',
    height: 510,
    region: "center",
    columns: [{
        text: "序号",
        width: 40,
        dataIndex: "rank",
        sortable: true
    }, {
        text: "资源标题",
        width: 140,
        flex: 1,
        dataIndex: "Title",
        sortable: true
    }, {
        text: "格式",
        width: 40,
        dataIndex: "extname",
        sortable: true
    }, {
        text: "文件大小",
        width: 80,
        dataIndex: "filesize",
        sortable: false
    }, {
        text: "浏览",
        width: 30,
        dataIndex: "browcount",
        sortable: true
    }, {
        text: "下载",
        width: 30,
        dataIndex: "downcount",
        sortable: true
    }, {
        text: "上载人",
        width: 50,
        dataIndex: "XM",
        sortable: true
    }, {
        text: "上载时间",
        width: 80,
        dataIndex: "fileupdate",
        renderer: function(A) {
            return A.replace("T", " ")
        },
        sortable: true
    }, {
        text: "币值",
        width: 40,
        dataIndex: "price",
        sortable: true
    }],
    bbar: Ext.create("Ext.PagingToolbar", {
        store: SourceTypegridstore,
        displayInfo: true,
        displayMsg: "显示 {0} - {1} 条，共计 {2} 条",
        emptyMsg: "没有数据"
    }),
    listeners: {
        selectionchange: function(B, A) {
            if (A[0]) {
                Ext.getCmp("bTitle").setValue(A[0].raw.Title);
                Ext.getCmp("bID").setValue(A[0].raw.ID);
                Ext.getCmp("bprice").setValue(A[0].raw.price);
                Ext.getCmp("bmyphoto").getEl().dom.src = ("../GetThumbnail.aspx?id=" + A[0].raw.ID);
                store1.loadData(getChartData(A[0].raw.ID));
                window.parent.frames["plframe"].location = ("../gettwopl.aspx?id=" + A[0].raw.ID)
            }
        }
    }
});

function gomedia() {
    var A = Ext.getCmp("mediatype");
    if (!A) {
        SourceTypegridstore.loadPage(1);
        tabs.add({
            title: "媒体分类",
            id: "mediatype",
            iconCls: "pptv",
            autoScroll: false,
            layout: "column",
            items: [SourceTypetree, STypegrid],
            closable: false
        }).show()
    } else {
        tabs.setActiveTab(A)
    }
};
Ext.define("SearchMyData", {
    extend: "Ext.data.Model",
    fields: ["rank", "ID", "Title", "Keyword", "extname", "filesize", "browcount", "downcount", "XM", "fileupdate", "price"]
});
var Searchgridstore = Ext.create("Ext.data.Store", {
    pageSize: 21,
    model: "SearchMyData",
    remoteSort: false,
    proxy: {
        type: "ajax",
        url: "../SearchGrid.aspx",
        reader: {
            root: "items",
            totalProperty: "total"
        },
        simpleSortMode: true
    }
});
SgetzyData = function(A, B) {
    var C = [];
    A = (!A && A !== 0) ? 1 : A;
    Ext.Ajax.request({
        url: "../getzyaddData.aspx?id=" + A + "&p=" + B,
        async: false,
        success: function(D) {
            C = Ext.JSON.decode(D.responseText)
        },
        failure: function(D) {
            Ext.MessageBox.alert("错误", "请与后台服务人员联系")
        }
    });
    return C
};
var Ssubtype = Ext.create("store.json", {
    fields: ["ID", "SubTypename"],
    data: SgetzyData()
});
var Sstoresj = Ext.create("store.json", {
    fields: ["ID", "SubjectName"],
    data: SgetzyData()
});
var Sstoresourcetype = Ext.create("store.json", {
    fields: ["ID", "sourceTypeName"],
    data: SgetzyData()
});
Ssubtype.loadData(SgetzyData(2, "a"));
Sstoresourcetype.loadData(SgetzyData(1, "b"));

function stripscript(A) {
    var C = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）—|{}【】‘；：”“'。，、？ ]");
    var B = "";
    for (var D = 0; D < A.length; D++) {
        B = B + A.substr(D, 1).replace(C, "")
    };
    return B
};
var Searchgrid = Ext.create("Ext.grid.GridPanel", {
    xtype: "grid",
    height: 550,
    region: "center",
    title: "关键词检索资源",
    store: Searchgridstore,
    emptyText: '<br><br><p align=center><img src="images/blank.png"></p>',
    columns: [{
        text: "序号",
        width: 40,
        dataIndex: "rank",
        sortable: true
    }, {
        text: "资源标题",
        width: 150,
        flex: 1,
        dataIndex: "Title",
        sortable: true
    }, {
        text: "媒体格式",
        width: 60,
        dataIndex: "extname",
        sortable: true
    }, {
        text: "关键词",
        width: 140,
        flex: 1,
        dataIndex: "Keyword",
        sortable: true
    }, {
        text: "文件大小",
        width: 80,
        dataIndex: "filesize",
        sortable: false
    }, {
        text: "浏览",
        width: 40,
        dataIndex: "browcount",
        sortable: true
    }, {
        text: "下载",
        width: 40,
        dataIndex: "downcount",
        sortable: true
    }, {
        text: "上载人",
        width: 60,
        dataIndex: "XM",
        sortable: true
    }, {
        text: "上载时间",
        width: 80,
        dataIndex: "fileupdate",
        renderer: function(A) {
            return A.replace("T", " ")
        },
        sortable: true
    }, {
        text: "币值",
        width: 40,
        dataIndex: "price",
        sortable: true
    }],
    dockedItems: [{
        dock: "top",
        xtype: "toolbar",
        items: [{
            xtype: "combobox",
            fieldLabel: "搜索",
            labelWidth: 35,
            id: "slx",
            displayField: "slx",
            mode: "local",
            width: 105,
            value: "标题",
            store: new Ext.data.SimpleStore({
                fields: ["slx"],
                data: [
                    ["标题"],
                    ["关键词"],
                    ["格式名"],
                    ["上载人"]
                ]
            })
        }, {
            xtype: "textfield",
            name: "keyword",
            id: "keyword",
            value: "",
            width: 110
        }, {
            text: "检索",
            iconCls: "fljs",
            handler: function() {
                var A = Ext.getCmp("keyword").value;
                if (A == "") {
                    Ext.Msg.alert("提示", "请输入关键词！")
                } else {
                    if (A != stripscript(A)) {
                        Ext.Msg.alert("提示", "关键词含非法字符！");
                        return
                    };
                    Searchgridstore.load({
                        params: {
                            slx: Ext.getCmp("slx").value,
                            keyword: A,
                            Ssubname: Ext.getCmp("Ssubname").value,
                            Ssotype: Ext.getCmp("Ssotype").value
                        }
                    })
                }
            }
        }, "-", {
            width: 150,
            xtype: "combo",
            fieldLabel: "学科类",
            labelWidth: 45,
            labelAlign: "right",
            store: Ssubtype,
            mode: "local",
            queryMode: "local",
            editable: false,
            displayField: "SubTypename",
            valueField: "ID",
            emptyText: "全部..",
            enabled: true,
            listeners: {
                change: function(A) {
                    Sstoresj.loadData(SgetzyData(3, A.getValue()))
                }
            }
        }, {
            width: 145,
            id: "Ssubname",
            name: "Ssubname",
            xtype: "combo",
            fieldLabel: "学科",
            labelWidth: 40,
            labelAlign: "right",
            store: Sstoresj,
            mode: "local",
            queryMode: "local",
            editable: false,
            displayField: "SubjectName",
            valueField: "ID",
            emptyText: "全部..",
            enabled: true
        }, {
            width: 150,
            id: "Ssotype",
            name: "Ssotype",
            xtype: "combo",
            fieldLabel: "资源类",
            labelWidth: 45,
            labelAlign: "right",
            store: Sstoresourcetype,
            hiddenName: "Ssotype",
            triggerAction: "all",
            mode: "local",
            displayField: "sourceTypeName",
            valueField: "ID",
            queryMode: "local",
            editable: false,
            emptyText: "全部..",
            allowBlank: false,
            enabled: true
        }]
    }, {
        dock: "bottom",
        xtype: "pagingtoolbar",
        store: Searchgridstore,
        pageSize: 21,
        displayInfo: true,
        displayMsg: "显示 {0} - {1} 条，共计 {2} 条",
        emptyMsg: "没有数据"
    }],
    listeners: {
        selectionchange: function(B, A) {
            if (A[0]) {
                Ext.getCmp("bTitle").setValue(A[0].raw.Title);
                Ext.getCmp("bID").setValue(A[0].raw.ID);
                Ext.getCmp("bprice").setValue(A[0].raw.price);
                Ext.getCmp("bmyphoto").getEl().dom.src = ("../GetThumbnail.aspx?id=" + A[0].raw.ID);
                store1.loadData(getChartData(A[0].raw.ID));
                window.parent.frames["plframe"].location = ("../gettwopl.aspx?id=" + A[0].raw.ID)
            }
        }
    }
});

function gosearch() {
    var A = Ext.getCmp("searchtab");
    if (!A) {
        Searchgridstore.loadPage(1);
        tabs.add({
            title: "快速检索",
            id: "searchtab",
            iconCls: "fljs",
            autoScroll: false,
            items: [Searchgrid],
            closable: false
        }).show()
    } else {
        tabs.setActiveTab(A)
    }
};

function gouploadsi() {
    var A = Ext.getCmp("uploadsi");
    if (!A) {
        tabs.add({
            title: "文件上载",
            id: "uploadsi",
            iconCls: "ablum-add",
            autoScroll: true,
            html: '<iframe  id="uploadsiframe" width=100% height=600 src="../uploadsi.aspx"></iframe>',
            closable: true
        }).show()
    } else {
        A.show();
        tabs.setActiveTab(A)
    }
};

function gouploadmu() {
    var A = Ext.getCmp("uploadmu");
    if (!A) {
        tabs.add({
            title: "批量上载",
            id: "uploadmu",
            iconCls: "upload",
            autoScroll: true,
            html: '<iframe id="uploadmuframe" width=100% height=600 src="../uploadmu.aspx"></iframe>',
            closable: true
        }).show()
    } else {
        A.show();
        tabs.setActiveTab(A)
    }
};
var tabs = new Ext.TabPanel({
    border: false,
    activeTab: 0,
    items: [mainpanel]
});
Ext.onReady(function() {
    var A = new Ext.XTemplate('<tpl for=".">', '<div class="ux-desktop-shortcut" id="{text}-shortcut">', '<div class="ux-desktop-shortcut-icon">', '<img src="', Ext.BLANK_IMAGE_URL, '" title="{text}">', "</div>", '<span class="ux-desktop-shortcut-text">{text}</span>', "</div>", "</tpl>", '<div class="x-clear"></div>');
    new Ext.Viewport({
        layout: "border",
        listeners: {
            resize: function(B, C, D) {
                if (!Ext.isEmpty(SStree)) {
                    SStree.setHeight(D - 140);
                    SSgrid.setHeight(D - 140)
                };
                if (!Ext.isEmpty(SourceTypetree)) {
                    SourceTypetree.setHeight(D - 140);
                    STypegrid.setHeight(D - 140)
                };
                if (!Ext.isEmpty(ivtree)) {
                    ivtree.setHeight(D - 140);
                    ivpanel.setHeight(D - 140)
                };
                if (!Ext.isEmpty(document.getElementById("uploadmuframe"))) {
                    document.getElementById("uploadmuframe").height = D - 140
                };
                if (!Ext.isEmpty(document.getElementById("uploadsiframe"))) {
                    document.getElementById("uploadsiframe").height = D - 1450
                };
                if (!Ext.isEmpty(Searchgrid)) {
                    Searchgrid.setHeight(D - 140)
                };
                if (!Ext.isEmpty(Ext.getCmp("sya"))) {
                    var E = (C - 350) / 4;
                    Ext.getCmp("sya").setWidth(E);
                    Ext.getCmp("syb").setWidth(E);
                    Ext.getCmp("syc").setWidth(E);
                    Ext.getCmp("syd").setWidth(E);
                    Ext.getCmp("sye").setWidth(E * 2 + 10);
                    Ext.getCmp("syf").setWidth(E * 2 + 10);
                    Ext.getCmp("syg").setWidth(E * 2 + 10);
                    Ext.getCmp("syh").setWidth(E * 2 + 10);
                    E = D - 580;
                    if (E < 80) {
                        E = 80
                    };
                    Ext.getCmp("syg").setHeight(E);
                    Ext.getCmp("syh").setHeight(E)
                }
            }
        },
        items: [{
                region: "north",
                border: false,
                height: 80,
                margins: "0 0 5 0",
                bodyStyle: "background-image:url(images/topbg.jpg);",
                html: '<div style="position:absolute;top:20px; left:450px; font-family:楷体;font-size:32px; font-weight:bold;color:#dddddd;">' + dwmc + '</div><div id="Lab2" style="position:absolute;bottom:5px; right:5px; font-family:楷体;font-size:14px; color:#ffffff;">' + lu + "</div>"
            },
            mainmenu, {
                region: "south",
                collapsible: false,
                split: true,
                height: 20,
                minHeight: 20,
                maxHeight: 20,
                title: '<div align="center" style="font-size:12px;color:#46A3FF;">Copyright © 2013 LinBSoft Software Studio (LinBin).  All rights reserved. mail: linbsoft@163.com  QQ: 1151409271</div>'
            }, {
                region: "east",
                title: "资源详细信息",
                iconCls: "copy",
                collapsible: true,
                split: true,
                width: 200,
                layout: "border",
                items: [rtopform, pjchartcolumn, plpanel]
            }, {
                region: "center",
                items: [tabs]
            }
        ]
    });
    Ext.create("widget.uxNotification", {
        title: "信息提示",
        corner: "br",
        stickOnClick: false,
        manager: "desktop",
        iconCls: "ux-notification-icon-information",
        html: "教学资源库管理平台  <br>初始化完成!"
    }).show()
});