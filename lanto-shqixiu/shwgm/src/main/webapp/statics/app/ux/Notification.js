Ext.define("app.ux.Notification", {
    extend: "Ext.window.Window",
    alias: "widget.uxNotification",
    cls: "ux-notification-window",
    autoClose: true,
    iconCls:'info_a_icon',
    autoHeight: true,
    plain: false,
    draggable: true,
    shadow: false,
    focus: Ext.emptyFn,
    manager: null,
    useXAxis: false,
    position: "br",
    spacing: 6,
    paddingX: 30,
    paddingY: 10,
    slideInAnimation: "easeIn",
    slideBackAnimation: "bounceOut",
    slideInDuration: 1500,
    slideBackDuration: 1000,
    hideDuration: 1500,
    autoCloseDelay: 7000,
    stickOnClick: true,
    stickWhileHover: true,
    isHiding: false,
    readyToHide: false,
    destroyAfterHide: false,
    closeOnMouseOut: false,
    xPos: 0,
    yPos: 0,
    statics: {
        defaultManager: {
            el: null
        }
    },
    initComponent: function() {
        var A = this;
        if (Ext.isDefined(A.corner)) {
            A.position = A.corner
        };
        if (Ext.isDefined(A.slideDownAnimation)) {
            A.slideBackAnimation = A.slideDownAnimation
        };
        if (Ext.isDefined(A.autoDestroyDelay)) {
            A.autoCloseDelay = A.autoDestroyDelay
        };
        if (Ext.isDefined(A.autoHideDelay)) {
            A.autoCloseDelay = A.autoHideDelay
        };
        if (Ext.isDefined(A.autoHide)) {
            A.autoClose = A.autoHide
        };
        if (Ext.isDefined(A.slideInDelay)) {
            A.slideInDuration = A.slideInDelay
        };
        if (Ext.isDefined(A.slideDownDelay)) {
            A.slideBackDuration = A.slideDownDelay
        };
        if (Ext.isDefined(A.fadeDelay)) {
            A.hideDuration = A.fadeDelay
        };
        A.position = A.position.replace(/c/, "");
        A.updateAlignment(A.position);
        A.setManager(A.manager);
        A.callParent(arguments)
    },
    onRender: function() {
        var A = this;
        A.el.hover(function() {
            A.mouseIsOver = true
        }, function() {
            A.mouseIsOver = false;
            if (A.closeOnMouseOut) {
                A.closeOnMouseOut = false;
                A.close()
            }
        }, A);
        this.callParent(arguments)
    },
    updateAlignment: function(A) {
        var B = this;
        switch (A) {
            case "br":
                B.paddingFactorX = -1;
                B.paddingFactorY = -1;
                B.siblingAlignment = "br-br";
                if (B.useXAxis) {
                    B.managerAlignment = "bl-br"
                } else {
                    B.managerAlignment = "tr-br"
                };
                break;
            case "bl":
                B.paddingFactorX = 1;
                B.paddingFactorY = -1;
                B.siblingAlignment = "bl-bl";
                if (B.useXAxis) {
                    B.managerAlignment = "br-bl"
                } else {
                    B.managerAlignment = "tl-bl"
                };
                break;
            case "tr":
                B.paddingFactorX = -1;
                B.paddingFactorY = 1;
                B.siblingAlignment = "tr-tr";
                if (B.useXAxis) {
                    B.managerAlignment = "tl-tr"
                } else {
                    B.managerAlignment = "br-tr"
                };
                break;
            case "tl":
                B.paddingFactorX = 1;
                B.paddingFactorY = 1;
                B.siblingAlignment = "tl-tl";
                if (B.useXAxis) {
                    B.managerAlignment = "tr-tl"
                } else {
                    B.managerAlignment = "bl-tl"
                };
                break;
            case "b":
                B.paddingFactorX = 0;
                B.paddingFactorY = -1;
                B.siblingAlignment = "b-b";
                B.useXAxis = 0;
                B.managerAlignment = "t-b";
                break;
            case "t":
                B.paddingFactorX = 0;
                B.paddingFactorY = 1;
                B.siblingAlignment = "t-t";
                B.useXAxis = 0;
                B.managerAlignment = "b-t";
                break;
            case "l":
                B.paddingFactorX = 1;
                B.paddingFactorY = 0;
                B.siblingAlignment = "l-l";
                B.useXAxis = 1;
                B.managerAlignment = "r-l";
                break;
            case "r":
                B.paddingFactorX = -1;
                B.paddingFactorY = 0;
                B.siblingAlignment = "r-r";
                B.useXAxis = 1;
                B.managerAlignment = "l-r";
                break
        }
    },
    getXposAlignedToManager: function() {
        var B = this;
        var A = 0;
        if (B.manager && B.manager.el && B.manager.el.dom) {
            if (!B.useXAxis) {
                return B.el.getLeft()
            } else {
                if (B.position == "br" || B.position == "tr" || B.position == "r") {
                    A += B.manager.el.getAnchorXY("r")[0];
                    A -= (B.el.getWidth() + B.paddingX)
                } else {
                    A += B.manager.el.getAnchorXY("l")[0];
                    A += B.paddingX
                }
            }
        };
        return A
    },
    getYposAlignedToManager: function() {
        var B = this;
        var A = 0;
        if (B.manager && B.manager.el && B.manager.el.dom) {
            if (B.useXAxis) {
                return B.el.getTop()
            } else {
                if (B.position == "br" || B.position == "bl" || B.position == "b") {
                    A += B.manager.el.getAnchorXY("b")[1];
                    A -= (B.el.getHeight() + B.paddingY)
                } else {
                    A += B.manager.el.getAnchorXY("t")[1];
                    A += B.paddingY
                }
            }
        };
        return A
    },
    getXposAlignedToSibling: function(A) {
        var B = this;
        if (B.useXAxis) {
            if (B.position == "tl" || B.position == "bl" || B.position == "l") {
                return (A.xPos + A.el.getWidth() + A.spacing)
            } else {
                return (A.xPos - B.el.getWidth() - B.spacing)
            }
        } else {
            return B.el.getLeft()
        }
    },
    getYposAlignedToSibling: function(A) {
        var B = this;
        if (B.useXAxis) {
            return B.el.getTop()
        } else {
            if (B.position == "tr" || B.position == "tl" || B.position == "t") {
                return (A.yPos + A.el.getHeight() + A.spacing)
            } else {
                return (A.yPos - B.el.getHeight() - A.spacing)
            }
        }
    },
    getNotifications: function(A) {
        var B = this;
        if (!B.manager.notifications[A]) {
            B.manager.notifications[A] = []
        };
        return B.manager.notifications[A]
    },
    setManager: function(A) {
        var B = this;
        B.manager = A;
        if (typeof B.manager == "string") {
            B.manager = Ext.getCmp(B.manager)
        };
        if (!B.manager) {
            B.manager = B.statics().defaultManager;
            if (!B.manager.el) {
                B.manager.el = Ext.getBody()
            }
        };
        if (typeof B.manager.notifications == "undefined") {
            B.manager.notifications = {}
        }
    },
    beforeShow: function() {
        var A = this;
        if (A.stickOnClick) {
            if (A.body && A.body.dom) {
                Ext.fly(A.body.dom).on("click", function() {
                    A.cancelAutoClose();
                    A.addCls("notification-fixed")
                }, A)
            }
        };
        if (A.autoClose) {
            A.task = new Ext.util.DelayedTask(A.doAutoClose, A);
            A.task.delay(A.autoCloseDelay)
        };
        A.el.setX(-10000);
        A.el.setOpacity(1)
    },
    afterShow: function() {
        var B = this;
        var A = B.getNotifications(B.managerAlignment);
        if (A.length) {
            B.el.alignTo(A[A.length - 1].el, B.siblingAlignment, [0, 0]);
            B.xPos = B.getXposAlignedToSibling(A[A.length - 1]);
            B.yPos = B.getYposAlignedToSibling(A[A.length - 1])
        } else {
            B.el.alignTo(B.manager.el, B.managerAlignment, [(B.paddingX * B.paddingFactorX), (B.paddingY * B.paddingFactorY)], false);
            B.xPos = B.getXposAlignedToManager();
            B.yPos = B.getYposAlignedToManager()
        };
        Ext.Array.include(A, B);
        B.el.animate({
            to: {
                x: B.xPos,
                y: B.yPos,
                opacity: 1
            },
            easing: B.slideInAnimation,
            duration: B.slideInDuration,
            dynamic: true
        });
        this.callParent(arguments)
    },
    slideBack: function() {
        var C = this;
        var B = C.getNotifications(C.managerAlignment);
        var A = Ext.Array.indexOf(B, C);
        if (!C.isHiding && C.el && C.manager && C.manager.el && C.manager.el.dom && C.manager.el.isVisible()) {
            if (A) {
                C.xPos = C.getXposAlignedToSibling(B[A - 1]);
                C.yPos = C.getYposAlignedToSibling(B[A - 1])
            } else {
                C.xPos = C.getXposAlignedToManager();
                C.yPos = C.getYposAlignedToManager()
            };
            C.stopAnimation();
            C.el.animate({
                to: {
                    x: C.xPos,
                    y: C.yPos
                },
                easing: C.slideBackAnimation,
                duration: C.slideBackDuration,
                dynamic: true
            })
        }
    },
    cancelAutoClose: function() {
        var A = this;
        if (A.autoClose) {
            A.task.cancel()
        }
    },
    doAutoClose: function() {
        var A = this;
        if (!(A.stickWhileHover && A.mouseIsOver)) {
            A.close()
        } else {
            A.closeOnMouseOut = true
        }
    },
    removeFromManager: function() {
        var C = this;
        if (C.manager) {
            var B = C.getNotifications(C.managerAlignment);
            var A = Ext.Array.indexOf(B, C);
            if (A != -1) {
                Ext.Array.erase(B, A, 1);
                for (; A < B.length; A++) {
                    B[A].slideBack()
                }
            }
        }
    },
    hide: function() {
        var A = this;
        if (!A.isHiding && A.el) {
            A.isHiding = true;
            A.cancelAutoClose();
            A.stopAnimation();
            A.el.slideOut('b',
			{	
				duration:A.hideDuration,
				callback : function()
				{
					// 渐隐动作执行完成时,手动触发hide事件,并将hidden属性设置true
					A.removeFromManager();
                    A.readyToHide = true;
                    A.hide(A.animateTarget, A.doClose, A)
				}
			});
//            A.el.animate({
//                to: {
//                    opacity: 0
//                },
//                easing: "easeIn",
//                duration: A.hideDuration,
//                dynamic: false,
//                listeners: {
//                    afteranimate: function() {
//                        A.removeFromManager();
//                        A.readyToHide = true;
//                        A.hide(A.animateTarget, A.doClose, A)
//                    }
//                }
//            })
        };
        if (A.readyToHide) {
            A.isHiding = false;
            A.readyToHide = false;
            A.removeCls("notification-fixed");
            A.callParent(arguments);
            if (A.destroyAfterHide) {
                A.destroy()
            }
        }
    },
    destroy: function() {
        var A = this;
        if (!A.hidden) {
            A.destroyAfterHide = true;
            A.hide(A.animateTarget, A.doClose, A)
        } else {
            A.callParent(arguments)
        }
    }
});