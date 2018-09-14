package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;

public class TrPlateNumLetter implements Serializable {
	private Integer id;	//ID
	private String letterName;	//名称

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getLetterName() {
		return letterName;
	}
	public void setLetterName(String letterName) {
		this.letterName = letterName;
	}
}
