Ext.define('app.utils.vtype.CommonVtype', {
	override: "Ext.form.field.VTypes",
	/**
	 * 电子邮件:vtype:'email', 该输入项必须是电子邮件地址，格式如： "user@example.com"
	 * 链接:vtype:'url', '该输入项必须是URL地址，格式如： "http:/' + '/www.example.com"'
	 * 半角字母：vtype:'alpha', '该输入项只能包含半角字母和_',
	 * 半角字母和数字: vtype:'alphanum','该输入项只能包含半角字母,数字和_'
	 */
	/**IP地址**/
	IPAddress:  function(v) {
        return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v);
    },
    IPAddressText: '该输入项必须是IP地址，格式如： "192.168.1.1"',
    IPAddressMask: /[\d\.]/i,
    /**手机号码**/
    TELphone : function(v){
    	return /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/.test(v);
    },
    TELphoneText : '请输入正确的手机号码',
    TELphoneMask: /[\d]/i,
    /**电话号码**/
    phone : function(v){
    	return /0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}$/.test(v);
    },
    phoneText : '该输入项必须是电话号码，格式：“020-888888”',
    /**车牌号码**/
    License : function(v){
    	return /^[\u4e00-\u9fa5_A-Z_0-9]{7}$/.test(v);
    },
    LicenseText: '请输入正确的车牌号，格式：“粤A88888”' ,
    /**邮政编码**/
    ZipCode : function(v){
    	return /^[1-9][0-9]{5}$/.test(v);
    },
    ZipCodeText:'该输入项必须是邮政编码，格式：“510001”',
    notEmpty : function(v){
    	return /\S/.test(v);
    },
    notEmptyText:'该输入项为必填项.',
    /**数字**/
	onlyNumber:  function(v) {
        return /^[\d]+$/.test(v);
    },
    onlyNumberText: '该输入项只能输入数字',
    onlyNumberMask: /[\d]/i,
    plateNum:  function(v) {
        return /^[\u4e00-\u9fa5]{1}[A-Z]{1}.[A-Z_0-9_\u4e00-\u9fa5]{5}$/.test(v);
    },
    plateNumText: '请输入正确的车牌号码，格式如： "粤A.XXXXX"'
});