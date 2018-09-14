package com.lanto.shqixiu.shcheck.model.report;

import java.util.ArrayList;
import java.util.List;

public class HeadPackage {
	
	
	private String PackName;
	
	private NodeInfo NodeInfo;
	
	public HeadPackage(String packName, NodeInfo nodeInfo) {
		super();
		PackName = packName;
		NodeInfo = nodeInfo;
	}
	public String getPackName() {
		return PackName;
	}
	public void setPackName(String packName) {
		PackName = packName;
	}
	public NodeInfo getNodeInfo() {
		return NodeInfo;
	}
	public void setNodeInfo(NodeInfo nodeInfo) {
		NodeInfo = nodeInfo;
	}
	
	
	
	
}
