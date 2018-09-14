package com.lanto.shqixiu.shwgm.model.app;

import java.io.Serializable;

public class TbCorpCommentScore implements Serializable {
	private String scoreId;
	private String commentId;
	private String itemId;
	private String score;
	private String itemQz;
	public String getScoreId() {
		return scoreId;
	}
	public void setScoreId(String scoreId) {
		this.scoreId = scoreId;
	}
	public String getCommentId() {
		return commentId;
	}
	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	public String getItemQz() {
		return itemQz;
	}
	public void setItemQz(String itemQz) {
		this.itemQz = itemQz;
	}
	
	 
	
}
