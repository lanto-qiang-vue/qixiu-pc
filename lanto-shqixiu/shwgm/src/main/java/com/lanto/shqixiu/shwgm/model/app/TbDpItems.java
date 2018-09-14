package com.lanto.shqixiu.shwgm.model.app;
import java.io.Serializable;

/***
 * 
 * @author Administrator从服务器段获取分数点评明细-基础数据
 *
 */
public class TbDpItems implements Serializable {
	private String id;
	private String score;
	private String itemqz;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	public String getItemqz() {
		return itemqz;
	}
	public void setItemqz(String itemqz) {
		this.itemqz = itemqz;
	}
	@Override
	public String toString() {
		return "TbCommentItems [id=" + id + ", score=" + score + ", itemqz="
				+ itemqz + "]";
	}
	
	
}