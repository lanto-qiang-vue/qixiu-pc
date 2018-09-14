package com.lanto.shqixiu.shwgm.util;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;


public class CommonUtils {

	public static Logger logger = Logger.getLogger(CommonUtils.class);

	

	/** Formats a Double representing a price into a string
	 * @param price The price Double to be formatted
	 * @return A String with the formatted price
	 */
	public static String formatPrice(Double price) {
		if (price == null)
			return "";
		return formatPrice(price.doubleValue());
	}

	// ------------------- percentage format handlers -------------------
	static DecimalFormat percentageDecimalFormat = new DecimalFormat("##0.##%");

	/** Formats a Double representing a percentage into a string
	 * @param percentage The percentage Double to be formatted
	 * @return A String with the formatted percentage
	 */
	public static String formatPercentage(Double percentage) {
		if (percentage == null)
			return "";
		return formatPercentage(percentage.doubleValue());
	}

	/** Formats a double representing a percentage into a string
	 * @param percentage The percentage double to be formatted
	 * @return A String with the formatted percentage
	 */
	public static String formatPercentage(double percentage) {
		return percentageDecimalFormat.format(percentage);
	}

	//-------------------------------------------  ȡ��

	static DecimalFormat percentageIntFormat = new DecimalFormat("##0");

	/** Formats a Double representing a percentage into a string
	 * @param percentage The percentage Double to be formatted
	 * @return A String with the formatted percentage
	 */
	public static String formatIntPercentage(Double percentage) {
		if (percentage == null)
			return "";
		return formatIntPercentage(percentage.doubleValue());
	}

	/** Formats a double representing a percentage into a string
	 * @param percentage The percentage double to be formatted
	 * @return A String with the formatted percentage
	 */
	public static String formatIntPercentage(double percentage) {
		return percentageIntFormat.format(percentage);
	}

	// ------------------- quantity format handlers -------------------
	static DecimalFormat quantityDecimalFormat = new DecimalFormat("#,##0.###");

	/** Formats an Long representing a quantity into a string
	 * @param quantity The quantity Long to be formatted
	 * @return A String with the formatted quantity
	 */
	public static String formatQuantity(Long quantity) {
		if (quantity == null)
			return "";
		else
			return formatQuantity(quantity.doubleValue());
	}

	/** Formats an int representing a quantity into a string
	 * @param quantity The quantity long to be formatted
	 * @return A String with the formatted quantity
	 */
	public static String formatQuantity(long quantity) {
		return formatQuantity((double) quantity);
	}

	/** Formats an Long representing a quantity into a string
	 * @param quantity The quantity Long to be formatted
	 * @return A String with the formatted quantity
	 */
	public static String formatQuantity(Integer quantity) {
		if (quantity == null)
			return "";
		else
			return formatQuantity(quantity.doubleValue());
	}

	/** Formats an int representing a quantity into a string
	 * @param quantity The quantity int to be formatted
	 * @return A String with the formatted quantity
	 */
	public static String formatQuantity(int quantity) {
		return formatQuantity((double) quantity);
	}

	/** Formats a Float representing a quantity into a string
	 * @param quantity The quantity Float to be formatted
	 * @return A String with the formatted quantity
	 */
	public static String formatQuantity(Float quantity) {
		if (quantity == null)
			return "";
		else
			return formatQuantity(quantity.doubleValue());
	}

	/** Formats a float representing a quantity into a string
	 * @param quantity The quantity float to be formatted
	 * @return A String with the formatted quantity
	 */
	public static String formatQuantity(float quantity) {
		return formatQuantity((double) quantity);
	}

	/** Formats an Double representing a quantity into a string
	 * @param quantity The quantity Double to be formatted
	 * @return A String with the formatted quantity
	 */
	public static String formatQuantity(Double quantity) {
		if (quantity == null)
			return "";
		else
			return formatQuantity(quantity.doubleValue());
	}

	/**Formats an double representing a quantity into a string
	 * @param quantity The quantity double to be formatted
	 * @return A String with the formatted quantity
	 */
	public static String formatQuantity(double quantity) {
		return quantityDecimalFormat.format(quantity);
	}

	/**precision math addition operation
	 * @param double param1 and double param2 to addition operation
	 * @return A double value
	 */
	public static double add(double param1, double param2) {
		BigDecimal x1 = new BigDecimal(Double.toString(param1));
		BigDecimal x2 = new BigDecimal(Double.toString(param2));
		return x1.add(x2).doubleValue();
	}

	/**precision math addition operation
	 * @param String param1 and String param2 to addition operation
	 * @return A double value
	 */
	public static double add(String param1, String param2) {
		param1 = makeNullForBigDecimal(param1);
		param2 = makeNullForBigDecimal(param2);
		BigDecimal x1 = new BigDecimal(param1);
		BigDecimal x2 = new BigDecimal(param2);
		return x1.add(x2).doubleValue();
	}
	
	public static String makeNullForBigDecimal(String string1) {
		if (string1 != null && string1.length() > 0)
			return string1;
		else
			return "0";
	}
	
	/**
	 * compare two double
	 * @param param1
	 * @param param2
	 * @return
	 */
	public static int compare(String param1, String param2) {
		param1 = makeNull(param1);
		param2 = makeNull(param2);
		BigDecimal x1 = new BigDecimal(param1);
		BigDecimal x2 = new BigDecimal(param2);
		return x1.compareTo(x2);
	}

	/**precision math addition operation
	 * @param list param1 to addition operation
	 * @return A double value
	 */
	public static double add(List param) {
		String n;
		BigDecimal x1;
		BigDecimal x2 = new BigDecimal("0");
		if (param != null && param.size() > 0) {
			Iterator iter = param.iterator();
			while (iter.hasNext()) {
				n = (String) iter.next();
				n = makeNull(n);
				x1 = new BigDecimal(n);
				x2 = x2.add(x1);
			}
		}
		return x2.doubleValue();
	}

	/**precision math addition operation
	 * @param list param1 to addition operation
	 * @return A double value
	 */
	public static double sum(List param) {
		Double n;
		BigDecimal x1;
		BigDecimal x2 = new BigDecimal("0");
		if (param != null && param.size() > 0) {
			Iterator iter = param.iterator();
			while (iter.hasNext()) {
				n = (Double) iter.next();
				if (n != null) {
					x1 = new BigDecimal(n.toString());
					x2 = x2.add(x1);
				}

			}
		}
		return x2.doubleValue();
	}

	/**
	 * precision math subtration operation
	 * @param double param1 and double param2 to subtration operation 
	 * @return A double value
	 */
	public static double sub(double param1, double param2) {
		BigDecimal x1 = new BigDecimal(Double.toString(param1));
		BigDecimal x2 = new BigDecimal(Double.toString(param2));
		return x1.subtract(x2).doubleValue();
	}

	/**
	 * precision math subtration operation
	 * @param String param1 and String param2 to subtration operation 
	 * @return A double value
	 */
	public static double sub(String param1, String param2) {
		param1 = makeNull(param1);
		param2 = makeNull(param2);
		BigDecimal x1 = new BigDecimal(param1);
		BigDecimal x2 = new BigDecimal(param2);
		return x1.subtract(x2).doubleValue();
	}

	/**
	 * precision math multiplication operation
	 * @param double param1 and double param2 to multiplication operation 
	 * @return A double value
	 */
	public static double multiply(double param1, double param2) {
		BigDecimal x1 = new BigDecimal(Double.toString(param1));
		BigDecimal x2 = new BigDecimal(Double.toString(param2));
		return x1.multiply(x2).doubleValue();
	}

	/**
	 * precision math multiplication operation
	 * @param String param1 and double String to multiplication operation 
	 * @return A double value
	 */
	public static double multiply(String param1, String param2) {
		param1 = makeNull(param1);
		param2 = makeNull(param2);
		BigDecimal x1 = new BigDecimal(param1);
		BigDecimal x2 = new BigDecimal(param2);
		BigDecimal p = new BigDecimal("10000");
		x1 = x1.multiply(p);
		x1 = x1.multiply(x2);
		x1 = x1.divide(p, 2, BigDecimal.ROUND_HALF_UP);
		return x1.doubleValue();
	}


	/**
	 * precision math divide operation
	 * @param double param1 and double param2 to divide operation 
	 * @param scale decimal digits
	 * @return A double value
	 */
	public static double div(double param1, double param2, int scale) {

		if (scale < 0) {

			throw new IllegalArgumentException("The scale must be a positive Long or zero");
		}
		BigDecimal x1 = new BigDecimal(Double.toString(param1));
		BigDecimal x2 = new BigDecimal(Double.toString(param2));
		return x1.divide(x2, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
	}

	/**
	 * precision math divide operation
	 * @param String param1 and String param2 to divide operation 
	 * @param scale decimal digits
	 * @return A double value
	 */
	public static double div(String param1, String param2, int scale) {

		if (scale < 0) {

			throw new IllegalArgumentException("The scale must be a positive Long or zero");
		}
		BigDecimal x1 = new BigDecimal(param1);
		BigDecimal x2 = new BigDecimal(param2);
		return x1.divide(x2, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
	}

	/**
	 * precision math round operation
	 * @param double param to round operation 
	 * @param scale decimal digits
	 * @return A double value
	 */
	public static double round(double param1, int scale) {

		if (scale < 0) {

			throw new IllegalArgumentException("The scale must be a positive Long or zero");
		}
		BigDecimal b = new BigDecimal(Double.toString(param1));
		BigDecimal one = new BigDecimal("1");
		return b.divide(one, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
	};

	/**
	 * precision math round operation
	 * @param double param to round operation 
	 * @param scale decimal digits
	 * @return A double value
	 */
	public static double round(String param1, int scale) {
		param1 = makeNull(param1);
		if (scale < 0) {

			throw new IllegalArgumentException("The scale must be a positive Long or zero");
		}
		BigDecimal b = new BigDecimal(param1);
		BigDecimal one = new BigDecimal("1");
		return b.divide(one, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
	};

	/**
	 * calculate tax
	 * @param x1
	 * @param rate
	 * @return
	 */
	public static double calculateTax(String x1, String rate) {
		x1 = makeNull(x1);
		rate = makeNull(rate);
		BigDecimal t = new BigDecimal(x1);
		BigDecimal r = new BigDecimal(rate);
		BigDecimal c = new BigDecimal("1");
		BigDecimal p = new BigDecimal("10000");
		c = r.add(c);
		t = t.multiply(p);
		t = t.divide(c, BigDecimal.ROUND_HALF_UP);
		t = t.multiply(r);
		t = t.divide(p, 2, BigDecimal.ROUND_HALF_UP);
		return t.doubleValue();
	}

	public static double toDouble(String s) {
		s = makeNull(s);
		return Double.valueOf(s).doubleValue();
	}

	/**
	 * conversion A String number to Double
	 * @param param1
	 * @return
	 */
	public static Double parseDouble(String s) {
		s = makeNull(s);
		return Double.valueOf(s);
	}

	/**
	 * conversion A String number with bigDecimal doubleValue
	 * @param s
	 * @return
	 */
	public static Double parseDoubleB(String s) {
		s = makeNull(s);
		BigDecimal x = new BigDecimal(s);
		return new Double(x.doubleValue());
	}

	/**
	 * conversion A String number to float value
	 * @param s
	 * @return
	 */
	public static Float parseFloat(String s) {
		s = makeNull(s);
		return Float.valueOf(s);
	}

	/**
	 * conversion A String number to long value
	 * @param s
	 * @return
	 */
	public static Long parseLong(String s) {
		return Long.valueOf(s);
	}

	/**
	 * conversion A String number to Long value
	 * @param s
	 * @return
	 */
	public static Long parseInteger(String s) {
		s = makeNull(s);
		return Long.valueOf(s);
	}

	/**
	 * conversion A String number to date type value
	 * @param s
	 * @return
	 * @throws Exception 
	 */
	public static Date parseDate(String date) throws Exception {
		return parseDate(date, "yyyy-MM-dd");
	}

	// ------------------- null string handlers -------------------
	/** Checks to see if the passed Object is null, if it is returns an empty but non-null string, otherwise calls toString() on the object
	 * @param obj1 The passed Object
	 * @return The toString() of the passed Object if not null, otherwise an empty non-null String
	 */
	public static String makeString(Object obj1) {
		if (obj1 != null)
			return obj1.toString();
		else
			return "";
	}

	public static String formatDouble(double obj) {
		String str = "0";
		if (obj != 0.0 && obj != 0) {
			str = String.valueOf(obj).toString();
		}
		return str;
	}

	/**
	 * Checks to see if the passed string is <code>null</code> string
	 * @param a sring s 
	 * @return an empty non-null String
	 */
	public static String fixedNullString(String s) {
		if (s != null && s.length() > 0) {
			if ("null".equalsIgnoreCase(s.trim())) {
				return "";
			}
			return s.trim();
		} else {
			return "";
		}

	}

	public static String fixedUIString(Object o) {
		if (o != null) {
			if ("null".equalsIgnoreCase(o.toString())) {
				return "";
			}
			return o.toString();
		} else {
			return "";
		}
	}

	/** Checks to see if the passed string is null, if it is returns an empty but non-null string.
	 * @param string1 The passed String
	 * @return The passed String if not null, otherwise an empty non-null String
	 */
	public static String checkNull(String string1) {
		if (string1 != null)
			return string1;
		else
			return "";
	}

	
	public static String checkStrNull(String string1) {
		if (string1 != null && !"null".equalsIgnoreCase(string1))
			return string1;
		else
			return "";
	}
	
	/** Checks to see if the passed string is null, if it is returns an empty but non-null string.
	 * @param string1 The passed String
	 * @return The passed String if not null, otherwise an empty non-null String
	 */
	public static String checkNull(Object obj) {
		if (obj != null)
			return obj.toString();
		else
			return "";
	}

	/** Checks to see if the passed string array is null.
	 * @param s The passed String array
	 * @return if the passed String array if not null then return true.
	 */
	public static boolean paramCheck(String[] s) {
		if (s != null && s.length > 0)
			return true;
		else
			return false;
	}

	/** Checks to see if the passed string array is empty "".
	 * @param s The passed String array
	 * @return if the passed String array if not null then return true.
	 */
	public static boolean paramCheck(String s) {
		if (s != null && !"".equals(s) && !"0".equals(s) && !"0.00".equals(s))
			return true;
		else
			return false;
	}

	/** Checks to see if the passed string is a empty string <code>""</code> or a null string.
	 * @param s The passed String 
	 * @return if the passed String if not A <code>""</code> String then return true.
	 */
	public static boolean isEmpty(String str) {
		return str == null || str.trim().length() == 0;
	}

	/** Checks to see if the passed string is null, if it is returns an empty but non-null string.
	 * @param string1 The passed String
	 * @return The passed String if not null, otherwise an empty non-null String
	 */
	public static String makeNull(String string1) {
		if (string1 != null && string1.length() > 0)
			return string1;
		else
			return "";
	}

	/** Checks to see if the passed string is non-null, if it is returns an empty but non-null string.
	 * @param string1 The passed String
	 * @return The passed String if not null, otherwise an empty non-null String
	 */
	public static String trim(String string1) {
		if (string1 != null)
			return string1.trim();
		else
			return "";
	}

	/** 
	 * Replaces all occurances of oldString in mainString with newString
	 * 
	 * @param mainString The original string
	 * @param oldString The string to replace
	 * @param newString The string to insert in place of the old
	 * @return mainString with all occurances of oldString replaced by newString
	 */
	public static String replaceString(String mainString, String oldString, String newString) {
		if (mainString == null) {
			return null;
		}
		if (oldString == null || oldString.length() == 0) {
			return mainString;
		}
		if (newString == null) {
			newString = "";
		}

		int i = mainString.lastIndexOf(oldString);

		if (i < 0)
			return mainString;

		StringBuffer mainSb = new StringBuffer(mainString);

		while (i >= 0) {
			mainSb.replace(i, i + oldString.length(), newString);
			i = mainString.lastIndexOf(oldString, i - 1);
		}
		return mainSb.toString();
	}

	/**
	 * Format array of string to A PL/SQL String
	 * @param str
	 * @return A formate string with PL/SQL NOT IN syntax 
	 */
	public static String linkStr(String[] str) {
		String temp = "(";
		for (int i = 0; i < str.length; i++) {
			if (i == 0) {
				temp = temp + "'" + str[i] + "'";
			} else {
				temp = temp + "," + "'" + str[i] + "'";
			}
		}
		temp = temp + ")";
		return temp;
	}


	/**
	 * count the days with compare the firstDate date and the last date 
	 * @param firstDate
	 * @param lastDate
	 * @return A double days
	 */
	public static double compareDateToDays(Date firstDate, Date lastDate) {
		if (firstDate == null || lastDate == null)
			throw new IllegalArgumentException("the paramater is null date.");
		long timeColon1 = firstDate.getTime();
		long timeColon2 = lastDate.getTime();
		long tmpCal = timeColon2 - timeColon1;
		long mm = 24 * 60 * 60 * 1000;
		double days = (double) (tmpCal / mm);
		return Math.abs(days);
	}

	public static boolean checkIsNullStr(String nullStr) {

		boolean ret = false;
		if (nullStr != null && nullStr.length() > 0) {
			if (nullStr.equals("null") || "".equals(nullStr.trim())) {
				ret = true;
			}
		} else {
			ret = true;
		}
		return ret;
	}


	/**
	 *判断是否为合法的TimeStamp格式字符串
	 * @param s
	 * @return
	 * @throws Exception 
	 */
	public static boolean isValidTimestamp(String s) throws Exception {
		SimpleDateFormat df = null;
		try {
			df = new SimpleDateFormat("yyyy-MM-dd");
			df.parse(s);
			return true;
		} catch (Exception e) {
			throw e;
		}
	}

	public static boolean isValidDate(String s) throws Exception {
		SimpleDateFormat df = null;
		try {
			df = new SimpleDateFormat("yyyy");
			df.parse(s);
			return true;
		} catch (Exception e) {
			throw e;
		}
	}
	
	public static boolean isValidDate(String str,String formatstr) {
	      boolean convertSuccess=true;
	      // 指定日期格式为四位年/两位月份/两位日期，注意yyyy/MM/dd区分大小写；
	       SimpleDateFormat format = new SimpleDateFormat(formatstr);
	       try {
	    	   // 设置lenient为false. 否则SimpleDateFormat会比较宽松地验证日期，比如2007/02/29会被接受，并转换成2007/03/01
	          format.setLenient(false);
	          format.parse(str);
	       } catch (ParseException e) {
	          // e.printStackTrace();
	    	   // 如果throw java.text.ParseException或者NullPointerException，就说明格式不对
	           convertSuccess=false;
	       } 
	       return convertSuccess;
	}

	public static Date parseDate(String dateString, String format) throws Exception {
		SimpleDateFormat df = new SimpleDateFormat(format);
		Date result = null;
		try {
			result = df.parse(dateString);
			return result;
		} catch (Exception e) {
			throw e;
		}

	}

	public static Date parseDateTime(String dateString) throws Exception {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		//		DateFormat df = DateFormat.getDateTimeInstance();
		Date result = null;
		try {
			result = df.parse(dateString);
			return result;
		} catch (Exception e) {
			throw e;
		}

	}

	public static Date parseDTime(String dateString) throws Exception {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		//		DateFormat df = DateFormat.getDateTimeInstance();
		Date result = null;
		try {
			result = df.parse(dateString);
			return result;
		} catch (Exception e) {
			throw e;
		}

	}

	public static Date parseHMDate(String dateString) throws Exception {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		//		DateFormat df = DateFormat.getDateTimeInstance();
		Date result = null;
		try {
			result = df.parse(dateString);
			return result;
		} catch (Exception e) {
			throw e;
		}
		
	}

	public static String printDate(Date date) {
		if (date != null) {
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			return df.format(date);
		} else {
			return "";
		}

	}

	public static String printDate(String format, Date date) {
		SimpleDateFormat df = new SimpleDateFormat(format);
		return df.format(date);

	}

	public static String printDateTime(Date date) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return df.format(date);

	}

	public static String getYearMonth(Date date) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM");
		return df.format(date);

	}

	public static long getIntervalDays(Date from, Date to) {
		return (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
	}

	public static String getOriginalFileName(String fileName) {
		int dotPlace = fileName.lastIndexOf(".");
		String firstPart = "";
		String secondPart = "";
		if (dotPlace == -1) {
			return fileName;
		} else {
			firstPart = fileName.substring(0, dotPlace);
			secondPart = fileName.substring(dotPlace + 1, fileName.length());
		}
		dotPlace = firstPart.lastIndexOf(".");
		if (dotPlace == -1) {
			return secondPart;
		} else {
			return firstPart.substring(0, dotPlace + 1) + secondPart;
		}
	}

	public static boolean isNullString(String s) {
		return null == s || s.equals("");
	}



	/**
	 *  取得时间在月份中对应的天数
	 * @param date
	 * @return
	 */
	public static int getMonthDays(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 将从fromDate 到 toDate 之间（包括 fromDate 和 toDate)的时间放到一个list中返回
	 * @param fromDate
	 * @param toDate
	 * @return
	 */
	public static List getDaysList(Date fromDate, Date toDate) {
		ArrayList list = new ArrayList();
		Calendar cal = Calendar.getInstance();
		cal.setTime(fromDate);
		while (fromDate.before(toDate)) {
			list.add(fromDate);
			cal.add(Calendar.DATE, 1);
			fromDate = cal.getTime();
		}
		list.add(toDate);
		return list;
	}

	/**
	 * 如果日期是一个月份的第10天、第20天或最后一天，则返回true，否则返回false
	 * @param date
	 * @return
	 */
	public static boolean isLastTenDays(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		if (cal.getActualMaximum(Calendar.DAY_OF_MONTH) == cal.get(Calendar.DATE))
			return true;
		if (cal.get(Calendar.DATE) == 10)
			return true;
		if (cal.get(Calendar.DATE) == 20)
			return true;
		return false;
	}

	public static Date currentDateTime() {
		return Calendar.getInstance().getTime();
	}

	public static Date getLastDateOfMonth(Date dateTime) {
		Calendar cal1 = Calendar.getInstance();

		cal1.setTime(dateTime);
		Calendar cal2 = new GregorianCalendar(cal1.get(Calendar.YEAR), cal1.get(Calendar.MONTH),
				cal1.getActualMaximum((Calendar.DAY_OF_MONTH)));

		return cal2.getTime();
	}

	public static int getDayOfWeek(Date dateTime) {

		Calendar cal = Calendar.getInstance();
		cal.setTime(dateTime);

		return cal.get(Calendar.DAY_OF_WEEK);
	}

	/**
	 * @param currentDate
	 * @param day
	 * @return Date
	 * @description 日期增加天数
	 */
	public static Date addDay(Date currentDate, int day) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(currentDate);
		calendar.add(Calendar.DAY_OF_MONTH, day);
		return calendar.getTime();
	}

	/**
	 * @param currentDate
	 * @param hour
	 * @return Date
	 * @description 日期时间增加小时
	 */
	public static Date addHour(Date currentDate, int hour) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(currentDate);
		calendar.add(Calendar.HOUR, hour);
		return calendar.getTime();
	}

	/**
	 * @param currentDate
	 * @param day
	 * @return Date
	 * @description 日期增加年份
	 */
	public static Date addYear(Date currentDate, int year) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(currentDate);
		calendar.add(Calendar.YEAR, year);
		return calendar.getTime();
	}

	/**
	 *  判断是否是负数
	 * @param n
	 * @return
	 */
	public static boolean isMinus(Double n) {
		boolean result = false;
		if (n != null && n < 0) {
			result = true;
		}
		return result;
	}


	/**
	 * 显式转换为负长整型值
	 * @param id
	 * @return
	 */
	public static Long toMinus(Long id) {
		String key;
		Long l = 0L;
		if (id == null) {
			throw new IllegalArgumentException("is not a long number");
		}
		key = "-" + id.toString();
		l = new Long(key);
		return l;
	}

	/**
	 * 显式转换为负浮点数
	 * @param id
	 * @return
	 */
	public static Double toMinus(Double id) {
		String key;
		Double l = 0.0;
		if (id == null) {
			throw new IllegalArgumentException("is not a double number");
		}
		key = "-" + id.toString();
		l = new Double(key);
		return l;
	}

	/**
	 * 判断字符串是否是数字
	 * @param s
	 * @return
	 */
	public static boolean isNumber(String s) {
		Pattern pattern = Pattern.compile("(\\+|\\-)?\\d+(\\.\\d+)?");
		Matcher matcher = pattern.matcher(s);
		return matcher.matches();
	}

	/**
	 * 处理Double类型数据的四舍五入以及小数位精确到第N位
	 * @param d  需要处理的double类型的数据
	 * @param decimalNum  需要精确的小数位数
	 */
	public static String printDouble(double d, int decimalNum) {
		NumberFormat numberFormat = NumberFormat.getNumberInstance();
		numberFormat.setMaximumFractionDigits(decimalNum);
		numberFormat.setGroupingUsed(false);

		return numberFormat.format(d);
	}


	public static Float floatValue(Double d) {
		if (d != null) {
			return (Float) d.floatValue();
		}
		return null;
	}

	public static Double doubleValue(Float f) {
		if (f != null) {
			return (Double) f.doubleValue();
		}
		return null;
	}

	public static String valueOf(Long integer) {
		if (integer != null) {
			return String.valueOf(integer);
		} else {
			return null;
		}
	}

	public static String formatString(String str) {
		String rv = "";
		if (str != null) {
			if (str.contains(";")) {
				rv = str.replace(";", "<br>");
			} else {
				rv = str;
			}
		}
		return rv;
	}

	/**
	 * 获取当前月第一天
	 * @user : EricHe
	 * @date : 2012-11-7
	 * @return
	 */
	public static String getNowMonthDay(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM");
		String nowDate = df.format(new Date())+"-01";
		return nowDate;
	}
	

	/**
	 * 将字符串格式成sql like 的形式
	 * @param str
	 * @param delim
	 * @param column
	 * @return
	 */
	public static boolean isInnerNetwork(String ip) {
		String allowIpRegex = "(127[.]0[.]0[.]1)|(localhost)|" + "(10[.]\\d{1,3}[.]\\d{1,3}[.]\\d{1,3})|"
				+ "(172[.]((1[6-9])|(2\\d)|(3[01]))[.]\\d{1,3}[.]\\d{1,3})|" + "(192[.]168[.]\\d{1,3}[.]\\d{1,3})";
		//Pattern pattern = Pattern.compile(allowIpRegex);
		return Pattern.matches(allowIpRegex, ip);
	}

	public static String removeLeadingZeros(String str) {
		String temp = str.replaceAll("^[0]+", "");
		if ("".equals(temp)) {
			return "0";
		}
		return temp;
	}

	/**
	 * 返回价格统一格式
	 * @param price
	 * @return 价格统一格式
	 */
	public static String formartPrice(double price) {
		java.text.DecimalFormat df = new java.text.DecimalFormat("#0.00");
		return df.format(price);

	}
	
	public static boolean checkIsNotNullAndZero(Integer id){
		if(id != null && !"0".equals(id.toString())){
			return true;
		}
		
		return false;
	}
	
	
	public static String toStringByArray(Object[] obj){
		String result = " [ ";
		int i = 0;
		for(Object o : obj){
			if(i == 0){
				result = result + o ;
			}else{
				result = result + " , " + o ;
			}
			i ++ ;
		}
		result = result + "]";
		return result;
	}
	
	/** 根据时间变量返回时间字符串
	 * @return 返回时间字符串
	 * @param pattern 时间字符串样式
	 * @param date 时间变量
	 */
	public static String dateToString(Date date, String pattern) {

		if (date == null) {

			return null;
		}

		try {

			SimpleDateFormat sfDate = new SimpleDateFormat(pattern);
			sfDate.setLenient(false);

			return sfDate.format(date);
		} catch (Exception e) {

			return null;
		}
	}

	public static String decode(String str) throws UnsupportedEncodingException{
		if (str==null || str.equals(""))return "";
		return URLDecoder.decode(str,"UTF-8");
	}
	
	private static String encode(String str) throws UnsupportedEncodingException{
		if (str==null || str.equals(""))return "";
		return URLEncoder.encode(str,"UTF-8");
	}
	
	public static Timestamp time() {
		return new java.sql.Timestamp(System.currentTimeMillis());
	}
	
	public static Timestamp paseTimestamp(String str) throws Exception {
		Date dt = parseDateTime(str);
		return new java.sql.Timestamp(dt.getTime());
	}
	
	/**
	 * 从表名转化成model的CLASS名称
	 * @param tname
	 * @return
	 */
	public static String parseClassName(String tname) {
		if(CommonUtils.checkIsNullStr(tname)){
			return "";
		}
		byte ascii = -32;
		tname = tname.toLowerCase();
		StringBuilder sbd = new StringBuilder();
		for (int i = 0; i < tname.length(); ++i) {
			if ((tname.charAt(i) == '_') && (i + 1 < tname.length())) {
				++i;
				if ((tname.charAt(i) >= 'a') && (tname.charAt(i) <= 'z'))
					sbd.append((char) (tname.charAt(i) + ascii));
				else
					sbd.append(tname.charAt(i));
			} else {
				sbd.append(tname.charAt(i));
			}
		}
		char first = sbd.charAt(0);
		first = (char)(first + ascii);
		sbd.deleteCharAt(0);
		sbd.insert(0, first);
		return sbd.toString();
	}
	
	/**
	 * 从表字段名转化成model的字段名称
	 * @param tname
	 * @return
	 */
	public static String parseFieldName(String tname) {
		if(CommonUtils.checkIsNullStr(tname)){
			return "";
		}
		byte ascii = -32;
		tname = tname.toLowerCase();
		StringBuilder sbd = new StringBuilder();
		for (int i = 0; i < tname.length(); ++i) {
			if ((tname.charAt(i) == '_') && (i + 1 < tname.length())) {
				++i;
				if ((tname.charAt(i) >= 'a') && (tname.charAt(i) <= 'z'))
					sbd.append((char) (tname.charAt(i) + ascii));
				else
					sbd.append(tname.charAt(i));
			} else {
				sbd.append(tname.charAt(i));
			}
		}
		return sbd.toString();
	}
}
