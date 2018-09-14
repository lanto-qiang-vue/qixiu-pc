package com.lanto.shqixiu.shwgc.test;

import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.softbase.utils.CommonUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class JsonTest {
	public <T> List<T> getPojoList(String json,Class<T> cls)throws Exception {
		List<T> list = new ArrayList<T>();
		Gson gson = new GsonBuilder().enableComplexMapKeySerialization().create();
		List<Map<String, Object>> jsm = gson.fromJson(json,new TypeToken<List<Map<String, Object>>>() {}.getType());
		for (Map m : jsm) {
			T po = (T) cls.newInstance();
			Method[] methods = cls.getMethods();
			for (int i = 0; i < methods.length; ++i) {
				if (methods[i].getName().startsWith("set")) {
					Set<String> mset = new HashSet<String>();
					mset = m.keySet();
					String key = parseColName(methods[i]);
					Method mth = methods[i];
					for(String mkey : mset){
						if(key.equalsIgnoreCase(mkey)){
							mth.invoke(po, new Object[] { getValue(m.get(mkey), mth.getParameterTypes()[0]) });
						}
					}
					
				}
			}
			list.add(po);
		}
		return list;
	}
	
	public <T> T getPojo(String json,Class<T> cls) throws Exception{
		T po = (T) cls.newInstance();
		Gson gson = new GsonBuilder().enableComplexMapKeySerialization().create();
		Map<String,Object> jsm = gson.fromJson(json,Map.class);
		Method[] methods = cls.getMethods();
		for (int i = 0; i < methods.length; ++i) {
			if (methods[i].getName().startsWith("set")) {
				Set<String> mset = new HashSet<String>();
				mset = jsm.keySet();
				String key = parseColName(methods[i]);
				Method mth = methods[i];
				for(String mkey : mset){
					if(key.equalsIgnoreCase(mkey)){
						mth.invoke(po, new Object[] { getValue(jsm.get(mkey), mth.getParameterTypes()[0]) });
					}
				}
				
			}
		}
		return po;
	}

	private String parseColName(Method meth) {
		String name = meth.getName().substring(3);

		StringBuilder sbuf = new StringBuilder();

		for (int i = 0; i < name.length(); ++i) {
			char ch = name.charAt(i);
			if ((ch <= 'Z') && (ch >= 'A') && (i != 0))
				sbuf.append('_');
			sbuf.append(ch);
		}
		return sbuf.toString().toUpperCase();
	}

	public Object getValue(Object o, Class targetType) throws Exception {
		if (o == null) {
			return null;
		}
		if (String.class.equals(targetType)) {
			return o.toString();
		}
		if (Integer.class.equals(targetType) || "int".equals(targetType)) {
			if (!CommonUtils.isNumber(o.toString())) {
				return null;
			}
			return Double.valueOf(o.toString()).intValue();
		}
		if (Long.class.equals(targetType) || "long".equals(targetType)) {
			if (!CommonUtils.isNumber(o.toString())) {
				return null;
			}
			return Double.valueOf(o.toString()).longValue();
		}
		if (Blob.class.equals(targetType)) {
			return null;
		}
		if (Clob.class.equals(targetType)) {
			return null;
		}
		if (Date.class.equals(targetType)) {
			return CommonUtils.parseDate(o.toString());
		}
		if (Timestamp.class.equals(targetType)) {
			return CommonUtils.paseTimestamp(o.toString());
		}
		if (Float.class.equals(targetType) || "float".equals(targetType)) {
			if (!CommonUtils.isNumber(o.toString())) {
				return null;
			}
			return Float.valueOf(o.toString());
		}
		if (Double.class.equals(targetType) || "double".equals(targetType)) {
			if (!CommonUtils.isNumber(o.toString())) {
				return null;
			}
			return Double.valueOf(o.toString());
		}
		if (BigInteger.class.equals(targetType)) {
			if (!CommonUtils.isNumber(o.toString())) {
				return null;
			}
			BigDecimal b = BigDecimal.valueOf(Double.valueOf(o.toString()));
			return ((b != null) ? b.toBigInteger() : null);
		}
		if (BigDecimal.class.equals(targetType)) {
			if (!CommonUtils.isNumber(o.toString())) {
				return null;
			}
			return BigDecimal.valueOf(Double.valueOf(o.toString()));
		}
		if (Boolean.class.equals(targetType) || "boolean".equals(targetType)) {
			if ("true".equals(o.toString())) {
				return true;
			}
			if ("false".equals(o.toString())) {
				return false;
			}
			if (CommonUtils.isNumber(o.toString())) {
				int bint = Double.valueOf(o.toString()).intValue();
				return Boolean.valueOf(bint == 0);
			} else {
				return false;
			}
		}
		return null;

	}

}
