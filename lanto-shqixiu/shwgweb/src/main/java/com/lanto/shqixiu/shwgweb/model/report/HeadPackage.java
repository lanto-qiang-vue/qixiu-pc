package com.lanto.shqixiu.shwgweb.model.report;

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
