package com.lanto.shqixiu.shwgc.model.report;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.softbase.controller.ParamInit;

import com.thoughtworks.xstream.XStream;

public class ObjectToXML {

	private static Logger logger = Logger.getLogger(ObjectToXML.class);// 日志
	
	public final static String SrvUrl = ParamInit.printSrvUrl;

	public static String toReportXML(NodeInfo node,DataSet... sets) throws Exception{
		StringBuffer xmlStr = new StringBuffer();
		xmlStr.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
		xmlStr.append("<GZJRDP Version=\"1.0\">\n");
		XStream xstream = new XStream();
		HeadPackage head = new HeadPackage("getReportReq",node); 
//		logger.info(node.getSrvUrl());
		List pkgList = new ArrayList();
		int i = 0;
		for(DataSet set : sets){
			TableDataPkg master = new TableDataPkg(set.getSetName(),"" + i++);
			Object data = set.getData();
			if(data instanceof List){
				master.setList((List)data);
			}else{
				List<Object> li = new ArrayList<Object>();
				li.add(data);
				master.setList(li);
			}
			TableInfo tableinfo = new TableInfo();
			tableinfo.setTableName("");
			tableinfo.setSQLText("");
			tableinfo.setFieldInfoList(getFieldList(set.getClazz()));
			master.setTbinfo(tableinfo);
			pkgList.add(master);
			xstream.alias("DataRecord", set.getClazz());
		}
		DataPackXml pkxml = new DataPackXml();
		pkxml.setTableDataPkgList(pkgList);
		
		DataPackage datapackage = new DataPackage(head,pkxml);
		xstream.alias("DataPackage", DataPackage.class);
		xstream.alias("DataPackXml", DataPackXml.class);
		xstream.alias("TableDataPkg", TableDataPkg.class);
		xstream.alias("FieldInfo", FieldInfo.class);
		xmlStr.append(xstream.toXML(datapackage));
		xmlStr.append("\n");
		xmlStr.append("</GZJRDP>");
//		logger.info(xmlStr.toString());
		return xmlStr.toString();

	}

	private static List<FieldInfo> getFieldList(Class clazz) throws NoSuchMethodException, SecurityException{
		Field[] fields = clazz.getDeclaredFields();
		int i = 1;
		List<FieldInfo> flist = new ArrayList<FieldInfo>();
		for(Field fieldName : fields){
			
			String dataType = "1";
			Class type = fieldName.getType();
			dataType = getDataType(type);
			
			FieldInfo field = new FieldInfo(""+i++,fieldName.getName(),fieldName.getName(),dataType);
			flist.add(field);
		}
		return flist;
	}
	
	private static String getDataType(Class type){
		 
		String dataType = "1";
		String typeName = type.getName();
		for (DataType data : DataType.values()) { 
			if(data.text.equalsIgnoreCase(typeName)){
				dataType = data.value;
				break;
			}
		}
		return dataType;
	}
	
	public enum DataType {
		RpString("java.lang.String","1"), RpInt("java.lang.Integer","3"),Rplong("long","3"), RpLong("java.lang.Long","3"),
		Rpint("int","3"), RpBoolean("java.lang.Boolean","5"),Rpboolean("boolean","5"), RpFloat("java.lang.Float","6"),
		RpDouble("java.lang.Double","6"), Rpdouble("double","6"), Rpfloat("float","6"),RpDate("java.util.Date","11") ;
		private String text;
		private String value;
		
		private DataType(String text,String value){
			this.text=text;
			this.value=value;
		}
	}
	
	
//	private static Class getParameterizedTypeClass(DataSet set) throws Exception{
//		Field field = set.getClass().getDeclaredField("data");
//		Class type = field.getType();
//		if (type.isAssignableFrom(List.class)) {
//			Type fc = field.getGenericType(); // 如果是List类型，得到其Generic的类型
//			if (fc == null) {
//				throw new Exception("请指定List的类型【泛型】");
//			}
//			if (fc instanceof ParameterizedType) // 如果是泛型参数的类型
//			{
//				ParameterizedType pt = (ParameterizedType) fc;
//				logger.info(pt.getActualTypeArguments()[0]);
//				return (Class) pt.getActualTypeArguments()[0];// 得到泛型里的class类型对象。
//			}
//		}
////		logger.info(type);
//		return type;
//	}


}
