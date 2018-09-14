Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath("Ext.ux.DataView", "js");
Ext.require(["Ext.ux.DataView.DragSelector", "Ext.ux.DataView.Draggable"]);
var photoViewer = Ext.create("Ext.Component", {
    draggable: {
        delegate: "div.thumb-viewer-title"
    },
    resizable: {
        handles: "all",
        minWidth: 720,
        minHeight: 480,
        pinned: true,
        transparent: true
    },
    wrapWidth: 720,
    wrapHeight: 480,
    floating: true,
    constrain: true,
    hidden: true,
    maximized: false,
    cls: "thumb-viewer",
    html: '<div class="thumb-viewer-title"><div class="thumb-viewer-title-text"></div><div class="thumb-viewer-title-tools"><div class="thumb-viewer-close-item"></div></div></div><div class="thumb-viewer-wrap"><img /></div><div class="thumb-viewer-info"></div><div class="thumb-viewer-toolbar"></div>',
    listeners: {
        show: function() {
            photoViewer.navPrevBtn.setDisabled(photoViewer.viewIndex == 0);
            photoViewer.navNextBtn.setDisabled(photoViewer.viewIndex == imgstore.getCount() - 1);
            Ext.getBody().mask()
        },
        hide: function() {
            Ext.getBody().unmask()
        },
        resize: function() {
            photoViewer.wrapWidth = photoViewer.el.getWidth() - 200 - 2;
            photoViewer.wrapHeight = photoViewer.el.getHeight() - 88;
            photoViewer.el.down("div.thumb-viewer-wrap").setStyle({
                width: photoViewer.wrapWidth,
                height: photoViewer.wrapHeight
            });
            photoViewer.el.down("div.thumb-viewer-info").setStyle({
                height: photoViewer.wrapHeight
            });
            var A = photoViewer.el.down("img");
            positionImage(imgstore.getAt(photoViewer.viewIndex), null, null, false, true);
            if (photoViewer.toolbar) {
                photoViewer.toolbar.el.setWidth(photoViewer.el.getWidth());
                photoViewer.toolbar.doLayout()
            }
        },
        afterrender: function(A) {
            A.el.down("div.thumb-viewer-close-item").on("click", function() {
                photoViewer.hide()
            });
            A.el.on("click", function() {
                A.toFront()
            });
            A.el.down("div.thumb-viewer-title").on("dblclick", function() {
                if (photoViewer.maximized === true) {
                    photoViewer.el.setStyle(photoViewer.state.position);
                    photoViewer.setSize(photoViewer.state.size);
                    photoViewer.maximized = false;
                    delete photoViewer.state
                } else {
                    var B = A.el.parent();
                    photoViewer.state = {
                        position: {
                            left: photoViewer.el.getLeft(),
                            top: photoViewer.el.getTop()
                        },
                        size: {
                            width: photoViewer.el.getWidth(),
                            height: photoViewer.el.getHeight()
                        }
                    };
                    photoViewer.setSize({
                        width: B.getWidth(),
                        height: B.getHeight()
                    });
                    photoViewer.el.setStyle({
                        left: 0,
                        top: 0
                    });
                    photoViewer.maximized = true
                }
            });
            photoViewer.toolbar = Ext.create("Ext.container.Container", {
                renderTo: A.el.down("div.thumb-viewer-toolbar"),
                layout: {
                    type: "hbox",
                    pack: "center",
                    align: "middle"
                }
            });
            photoViewer.navPrevBtn = Ext.create("Ext.Component", {
                cls: "toolbar-item toolbar-nav toolbar-nav-prev",
                overCls: "toolbar-nav-over",
                title: "上一张",
                html: "<img  />",
                listeners: {
                    render: function() {
                        this.el.addClsOnClick("toolbar-nav-prev-click");
                        this.el.on("click", function() {
                            viewPhoto(imgstore.getAt(photoViewer.viewIndex - 1))
                        })
                    }
                }
            });
            photoViewer.toolbar.add(photoViewer.navPrevBtn);
            photoViewer.zoomInBtn = Ext.create("Ext.Component", {
                cls: "toolbar-item toolbar-item-zoom-in",
                overCls: "toolbar-item-over",
                title: "放大",
                html: "<img  />",
                listeners: {
                    render: function() {
                        this.el.addClsOnClick("toolbar-item-zoom-in-click");
                        this.el.on("click", zoomIn)
                    }
                }
            });
            photoViewer.toolbar.add(photoViewer.zoomInBtn);
            photoViewer.zoomOutBtn = Ext.create("Ext.Component", {
                cls: "toolbar-item toolbar-item-zoom-out",
                overCls: "toolbar-item-over",
                title: "缩小",
                html: "<img  />",
                listeners: {
                    render: function() {
                        this.el.addClsOnClick("toolbar-item-zoom-out-click");
                        this.el.on("click", zoomOut)
                    }
                }
            });
            photoViewer.toolbar.add(photoViewer.zoomOutBtn);
            photoViewer.rotateLeftBtn = Ext.create("Ext.Component", {
                cls: "toolbar-item toolbar-item-rotate-left",
                overCls: "toolbar-item-over",
                title: "左转",
                html: "<img  />",
                listeners: {
                    render: function() {
                        this.el.addClsOnClick("toolbar-item-rotate-left-click");
                        this.el.on("click", function() {
                            photoViewer.rotated = true;
                            if (photoViewer.rotate) {
                                photoViewer.rotate = photoViewer.rotate > 0 ? photoViewer.rotate - 90 : photoViewer.rotate + 90
                            } else {
                                photoViewer.rotate = -270
                            };
                            photoViewer.el.down("img").setStyle({
                                "-webkit-transform": "rotate(" + photoViewer.rotate + "deg)",
                                "ease-in-out": "0.2s"
                            });
                            positionImage(imgstore.getAt(photoViewer.viewIndex), null, null, false, true)
                        })
                    }
                }
            });
            photoViewer.toolbar.add(photoViewer.rotateLeftBtn);
            photoViewer.rotateRighttBtn = Ext.create("Ext.Component", {
                cls: "toolbar-item toolbar-item-rotate-right",
                overCls: "toolbar-item-over",
                title: "右转",
                html: "<img  />",
                listeners: {
                    render: function() {
                        this.el.addClsOnClick("toolbar-item-rotate-right-click");
                        this.el.on("click", function() {
                            photoViewer.rotated = true;
                            if (photoViewer.rotate) {
                                photoViewer.rotate = photoViewer.rotate > 0 ? photoViewer.rotate + 90 : photoViewer.rotate - 90
                            } else {
                                photoViewer.rotate = 90
                            };
                            photoViewer.el.down("img").setStyle({
                                "-webkit-transform": "rotate(" + photoViewer.rotate + "deg)",
                                "ease-in-out": "0.2s"
                            });
                            positionImage(imgstore.getAt(photoViewer.viewIndex), null, null, false, true)
                        })
                    }
                }
            });
            photoViewer.toolbar.add(photoViewer.rotateRighttBtn);
            photoViewer.navNextBtn = Ext.create("Ext.Component", {
                cls: "toolbar-item toolbar-nav toolbar-nav-next",
                overCls: "toolbar-nav-over",
                title: "下一张",
                html: "<img  />",
                listeners: {
                    render: function() {
                        this.el.addClsOnClick("toolbar-nav-next-click");
                        this.el.on("click", function() {
                            viewPhoto(imgstore.getAt(photoViewer.viewIndex + 1))
                        })
                    }
                }
            });
            photoViewer.toolbar.add(photoViewer.navNextBtn)
        }
    }
});

function viewPhoto(B) {
    if (B) {
        clearRotate();
        photoViewer.viewIndex = imgstore.indexOf(B);
        if (photoViewer.navNextBtn) {
            photoViewer.navPrevBtn.setDisabled(photoViewer.viewIndex == 0);
            photoViewer.navNextBtn.setDisabled(photoViewer.viewIndex == imgstore.getCount() - 1)
        };
        photoViewer.show();
        var D = photoViewer.el.down("img");
        D.dom.src = B.data.src;
        positionImage(B);
        var A = Ext.getBody();
        var C = photoViewer.el.down("div.thumb-viewer-title-text");
        C.update("查看相片：" + B.data.name);
        var E = photoViewer.el.down("div.thumb-viewer-info");
        E.update("<h1>文件信息:</h1><p>" + Ext.String.format(tiptpl, B.get("name"), B.get("type"), B.get("size"), B.get("trueWidth") + "×" + B.get("trueHeight"), Ext.Date.format(B.get("lastmod"), "Y年m月d日 H时i分")) + "</p>")
    }
};

function zoomIn() {
    var C = photoViewer.el.down("img");
    var B = C.getWidth();
    var A = C.getHeight();
    B += B * 0.25;
    A += A * 0.25;
    positionImage(imgstore.getAt(photoViewer.viewIndex), B, A, true)
};

function zoomOut() {
    var C = photoViewer.el.down("img");
    var B = C.getWidth();
    var A = C.getHeight();
    B -= B * 0.25;
    A -= A * 0.25;
    positionImage(imgstore.getAt(photoViewer.viewIndex), B, A, true)
};

function clearRotate() {
    if (photoViewer.rotated === true) {
        photoViewer.el.down("img").setStyle({
            "-webkit-transform": "none"
        });
        delete photoViewer.rotate
    }
};

function isRotate() {
    var A = photoViewer.rotate;
    return ((A == 90 || A == 270 || A == -90 || A == -270) && photoViewer.rotated === true)
};

function positionImage(G, A, H, E, F) {
    A = A || (!isRotate() ? G.data.trueWidth : G.data.trueHeight);
    H = H || (!isRotate() ? G.data.trueHeight : G.data.trueWidth);
    var J = photoViewer.wrapWidth,
        I = photoViewer.wrapHeight;
    if (!E) {
        if (H > I) {
            var D = I / H;
            H = I;
            A = A * D
        };
        if (A > J) {
            var D = J / A;
            A = J;
            H = H * D
        }
    };
    var B = photoViewer.el.down("img");
    var C = photoViewer.el.down("div.thumb-viewer-wrap");
    B.setStyle({
        width: A + "px",
        height: H + "px"
    });
    if (A <= J) {
        B.setStyle({
            marginLeft: (J - A) / 2 + "px"
        })
    } else {
        B.setStyle({
            marginLeft: "0px"
        });
        C.dom.scrollLeft = C.dom.scrollWidth;
        C.dom.scrollLeft = (C.dom.scrollLeft / 2)
    }; if (H <= I) {
        B.setStyle({
            marginTop: (I - H) / 2 + "px"
        })
    } else {
        B.setStyle({
            marginTop: "0px"
        });
        C.dom.scrollTop = C.dom.scrollHeight;
        C.dom.scrollTop = (C.dom.scrollTop / 2)
    }
};
cgetzyaddData = function(A, B) {
    var C = [];
    A = (!A && A !== 0) ? 1 : A;
    Ext.Ajax.request({
        url: "getzyaddData.aspx?id=" + A + "&p=" + B,
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
var cstoresourcetype = Ext.create("store.json", {
    fields: ["ID", "sourceTypeName"],
    data: cgetzyaddData()
});
var cstoresubtype = Ext.create("store.json", {
    fields: ["ID", "SubTypename"],
    data: cgetzyaddData()
});
var cstoresubject = Ext.create("store.json", {
    fields: ["ID", "SubjectName"],
    data: cgetzyaddData()
});
var PhotoModel = Ext.define("ImageModel", {
    extend: "Ext.data.Model",
    fields: [{
        name: "name"
    }, {
        name: "type"
    }, {
        name: "size"
    }, {
        name: "lastmod",
        type: "date",
        dateFormat: "timestamp"
    }, {
        name: "file"
    }, {
        name: "src"
    }, {
        name: "width"
    }, {
        name: "height"
    }, {
        name: "trueWidth"
    }, {
        name: "trueHeight"
    }, {
        name: "display"
    }, {
        name: "uploaded"
    }, {
        name: "absolute"
    }, {
        name: "top"
    }, {
        name: "left"
    }]
});
var imgstore = Ext.create("Ext.data.Store", {
    model: PhotoModel
});
var ddtip;
var tiptpl = "名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：{0}<br/>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：{1}<br/>大&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小：{2}<br/>尺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;寸：{3}<br/>修改时间：{4}<br/>";

function bindClickEvent(B, A) {
    B.on("click", A);
    B.handler = A;
    console.log(B);
    B.disable = function() {
        this.addCls(this.diableCls);
        this.mask()
    };
    B.enable = function() {
        this.removeCls(this.diableCls);
        this.unmask()
    }
};
var view = Ext.create("Ext.view.View", {
    store: imgstore,
    tpl: ['<tpl for=".">', '<div class="thumb-wrap" id="{name}">', '<div class="thumb-upload-progress">0%</div>', '<tpl if="loaded === false"><div class="thumb-loading-tip" >正在加载</div></tpl>', '<div class="thumb"><tpl if="absolute === true"><img src="{src}" height="{height}" width="{width}" style="position:absolute;top:{top};left:{left}"></tpl><tpl if="absolute === false"><img src="{src}" height="{height}" width="{width}"></tpl></div>', "<span>{name}</span></div>", "</tpl>", '<div class="x-clear"></div>'],
    style: {
        backgroundColor: "#FFFFFF",
        fontFamily: "微软雅黑"
    },
    simpleSelect: true,
    plugins: [Ext.create("Ext.ux.DataView.DragSelector", {})],
    multiSelect: true,
    trackOver: true,
    overItemCls: "x-item-over",
    itemSelector: "div.thumb-wrap",
    autoScroll: true,
    height: 434,
    width: "100%",
    listeners: {
        "afterrender": function() {
            view.emptyText = '<div class="thumb-empty-text" style="line-height:' + this.getHeight() + 'px;"><img src="resources/themes/images/default/shared/icon-info.gif" />&nbsp;&nbsp;&nbsp;没有显示的相片</div>', ddtip = view.el.createChild({
                tag: "div",
                cls: "dd-tip",
                html: "图片拖动到这里(部分浏览器不支持拖动,登录后上载才被保存！)"
            });
            Ext.create("Ext.tip.ToolTip", {
                target: view.el,
                delegate: view.itemSelector,
                trackMouse: true,
                renderTo: Ext.getBody(),
                anchor: "right",
                listeners: {
                    beforeshow: function(B) {
                        var A = view.getRecord(B.triggerElement);
                        B.update(Ext.String.format(tiptpl, A.get("name"), A.get("type"), A.get("size"), A.get("trueWidth") + "×" + A.get("trueHeight"), Ext.Date.format(A.get("lastmod"), "Y年m月d日 H时i分")))
                    }
                }
            })
        },
        selectionchange: function(A, B) {
            var C = B.length;
            delBtn.setDisabled(C <= 0)
        },
        itemcontextmenu: function(D, A, C, E, B) {
            view.getSelectionModel().select(A);
            B.stopEvent();
            menu.showAt(B.getXY());
            menu.doConstrain()
        },
        itemdblclick: function(D, A, C, E, B) {
            viewPhoto(A)
        }
    }
});

function uploadPhoto(B) {
    if (!B.data.uploaded) {
        var A = Ext.get(view.getNode(B)).down("div.thumb-upload-progress");
        A.show();
        var C = new XMLHttpRequest();
        C.open("post", "upimgfile.aspx", true);
        C.upload.onprogress = function(E) {
            return function(F) {
                if (F.lengthComputable) {
                    var G = Math.round((F.loaded * 100) / F.total);
                    E.update(G + "%")
                }
            }
        }(A);
        C.upload.onload = function(E) {
            return function(F) {
                A.update("上传成功!");
                B.data.uploaded = true
            }
        }(A);
        var D = new FormData();
        D.append("ctitle", Ext.getCmp("ctitle").getValue());
        D.append("csubname", Ext.getCmp("csubname").getValue());
        D.append("csotype", Ext.getCmp("csotype").getValue());
        D.append("cprice", Ext.getCmp("cprice").getValue());
        D.append("file", B.data.file);
        C.send(D)
    }
};

function deleteSelected() {
    imgstore.remove(view.selModel.getSelection())
};

function deleteAll() {
    imgstore.removeAll()
};

function uploadAll() {
    var A = this.up("form").getForm();
    if (A.isValid()) {
        imgstore.each(function(B) {
            uploadPhoto(B)
        })
    }
};

function uploadSelected() {
    var A = this.up("form").getForm();
    if (A.isValid()) {
        Ext.each(view.selModel.getSelection(), function(B) {
            uploadPhoto(B)
        })
    }
};

function menuuploadSelected() {
    var A = Ext.getCmp("panelm2-5").getForm();
    if (A.isValid()) {
        Ext.each(view.selModel.getSelection(), function(B) {
            uploadPhoto(B)
        })
    }
};
var menu = Ext.create("Ext.menu.Menu", {
    items: [{
        text: "上传",
        iconCls: "upload",
        handler: menuuploadSelected
    }, {
        text: "删除",
        iconCls: "delete",
        handler: deleteSelected
    }]
});
var addBtn = Ext.create("Ext.button.Button", {
    text: "添加",
    cls: Ext.baseCSSPrefix + "form-file-wrap",
    preventDefault: false,
    style: "margin-left:3px",
    iconCls: "add"
});
var delBtn = Ext.create("Ext.button.Button", {
    text: "删除",
    handler: deleteSelected,
    iconCls: "delete",
    disabled: true
});

function stopdft(A) {
    A.stopPropagation();
    A.preventDefault()
};
Ext.onReady(function() {
    Ext.Loader.setConfig({
        enabled: false
    });
    cstoresubtype.loadData(cgetzyaddData(2, "a"));
    cstoresourcetype.loadData(cgetzyaddData(1, "b"));
    Ext.create("Ext.form.Panel", {
        renderTo: "upimgfile",
        border: true,
        id: "panelm2-5",
        flex: 1,
        height: 518,
        bodyStyle: "background-image: url(images/body-bkg.png);",
        labelWidth: 35,
        labelAlign: "right",
        layout: "column",
        items: [{
                id: "cschoolCombo",
                xtype: "combo",
                fieldLabel: "学科分类",
                labelAlign: "right",
                store: cstoresubtype,
                mode: "local",
                queryMode: "local",
                editable: false,
                displayField: "SubTypename",
                valueField: "ID",
                emptyText: "请选择..",
                allowBlank: false,
                enabled: true,
                selectOnFocus: true,
                forceSelection: true,
                listeners: {
                    change: function(C) {
                        cstoresubject.loadData(cgetzyaddData(3, C.getValue()));
                        Ext.getCmp("csubname").setValue("")
                    }
                }
            }, {
                id: "csubname",
                name: "csubname",
                xtype: "combo",
                fieldLabel: "学科",
                labelAlign: "right",
                store: cstoresubject,
                mode: "local",
                queryMode: "local",
                editable: false,
                displayField: "SubjectName",
                valueField: "ID",
                emptyText: "请选择..",
                allowBlank: false,
                enabled: true,
                selectOnFocus: true,
                forceSelection: true
            }, {
                xtype: "numberfield",
                id: "cprice",
                name: "cprice",
                fieldLabel: "下载分",
                labelAlign: "right",
                labelWidth: 70,
                width: 120,
                value: 0,
                minValue: 0,
                maxValue: 10
            }, {
                id: "csotype",
                name: "csotype",
                xtype: "combo",
                fieldLabel: "资源类型",
                style: "margin-top:5px;margin-bottom:5px",
                labelAlign: "right",
                store: cstoresourcetype,
                hiddenName: "csotype",
                triggerAction: "all",
                mode: "local",
                displayField: "sourceTypeName",
                valueField: "ID",
                queryMode: "local",
                editable: false,
                emptyText: "请选择..",
                allowBlank: false,
                enabled: true,
                selectOnFocus: true,
                forceSelection: true
            }, {
                xtype: "textfield",
                fieldLabel: "标题",
                labelAlign: "right",
                style: "margin-top:5px;margin-bottom:5px",
                allowBlank: false,
                width: 300,
                blankText: "请输入标题..",
                id: "ctitle",
                name: "ctitle"
            },
            view
        ],
        buttons: [{
                text: "上传",
                iconCls: "upload",
                menu: [{
                    text: "上传所有项",
                    handler: uploadAll
                }, {
                    text: "上传选中项",
                    handler: uploadSelected
                }]
            }, {
                text: "清空",
                handler: deleteAll,
                iconCls: "clear"
            },
            addBtn, delBtn, {
                text: "刷新",
                handler: function() {
                    view.refresh()
                },
                iconCls: "refresh"
            }, {
                xtype: "button",
                layout: "form",
                iconCls: "logout",
                text: "关闭",
                handler: function() {
                    Ext.getCmp("m2-5").close()
                }
            }
        ],
        listeners: {
            afterrender: function() {
                addBtn.el.createChild({
                    cls: Ext.baseCSSPrefix + "form-file-input",
                    tag: "input",
                    type: "file",
                    multiple: true,
                    style: "width:100%",
                    size: 1
                }).on("change", function() {
                    process(this.dom.files)
                });
                Ext.getBody().on("dragover", function(C) {
                    stopdft(C);
                    ddtip.show()
                });
                Ext.getBody().on("dragleave", function(C) {
                    ddtip.hide()
                });
                view.el.on("dragenter", function(C) {
                    stopdft(C);
                    ddtip.hide();
                    view.el.highlight()
                });
                view.el.on("dragleave", function(C) {
                    stopdft(C);
                    ddtip.show()
                });
                view.el.dom.ondrop = function(C) {
                    stopdft(C);
                    ddtip.hide();
                    process(C.dataTransfer.files)
                }
            }
        }
    });
    if (!window.FileReader) {
        function A() {
            Ext.Msg.alert("提示", '<img src="images/delete.gif"> 经检测，本浏览器不支持HTML5文件拖拽功能！')
        };
        var B = new Ext.util.DelayedTask(A);
        B.delay(2000)
    }
});

function add(C) {
    console.log(C);
    var A = Ext.ModelManager.create({
        name: C.name,
        size: (C.size / 1024).toFixed(1) + "KB",
        type: C.type,
        file: C,
        lastmod: C.lastModifiedDate || new Date(),
        loaded: false,
        absolute: false
    }, PhotoModel);
    imgstore.add(A);
    var B = new FileReader();
    B.onload = (function(D) {
        return function() {
            D.data.src = this.result;
            var E = Ext.get(view.getNode(D)).down("img");
            E.dom.src = D.data.src;
            E.on("load", function(G, F) {
                return function() {
                    var L = 80 / this.getHeight();
                    var J = this.getWidth();
                    var I = this.getHeight();
                    if (J > 120) {
                        var L = 120 / J;
                        J = 120;
                        I = I * L
                    };
                    if (I > 80) {
                        var L = 80 / I;
                        I = 80;
                        J = J * L
                    };
                    Ext.apply(G.data, {
                        width: J,
                        height: I,
                        trueWidth: this.getWidth(),
                        trueHeight: this.getHeight(),
                        loaded: true
                    });
                    if (this.getWidth() < 80 && this.getHeight() < 120) {
                        this.setWidth(G.data.trueWidth);
                        this.setHeight(G.data.trueHeight);
                        var H = (80 - G.data.trueHeight) / 2;
                        var K = (120 - G.data.trueWidth) / 2;
                        Ext.apply(G.data, {
                            absolute: true,
                            top: H,
                            left: K
                        });
                        this.setStyle({
                            position: "absolute",
                            top: H,
                            left: K
                        })
                    } else {
                        this.setWidth(G.data.width);
                        this.setHeight(G.data.height)
                    }
                }
            }(D));
            E.on("error", function(F) {
                return function() {
                    Ext.get(this).hide();
                    Ext.get(view.getNode(F)).down("div.thumb-loading-tip").update("加载图片失败")
                }
            }(D))
        }
    })(A);
    B.readAsDataURL(C)
};

function process(A) {
    for (var B = 0; B < A.length; B++) {
        var C = A[B];
        add(C)
    }
};