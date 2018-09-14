--------------------------------------------------------
--  �ļ��Ѵ��� - ������-����-09-2015   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table TBL_NWR_ROUTE_RULE
--------------------------------------------------------
/* Create Tables */

-- �̻���·�ɹ����Ӧ��ϵ��
CREATE TABLE tbl_nwr_merchant_route_ralate
(
	-- �̻���
	mer_id varchar2(16) NOT NULL,
	-- ·�ɱ��
	route_id char(8) NOT NULL,
	-- �����־
	enable_flg char(1),
	PRIMARY KEY (mer_id)
);


-- ·�ɹ����
CREATE TABLE tbl_nwr_route_rule
(
	-- ·�ɱ��
	route_id char(8) NOT NULL,
	-- ��Ʒ����
	pay_type_id char(4) NOT NULL,
	-- ���б��
	bank_code varchar2(10) NOT NULL,
	-- ������
	card_type char(1) NOT NULL,
	-- �˻�����
	card_acct_type char(1) NOT NULL,
	-- ͨ����Ϣ
	channel varchar2(10),
	-- ���غ�
	channel_bank varchar2(10),
	-- �����־
	enable_flg char(1),
	PRIMARY KEY (route_id, pay_type_id, bank_code, card_type, card_acct_type)
);


-- �ض��̻���
CREATE TABLE tbl_nwr_special_merchant
(
	-- �̻���
	mer_id varchar2(16) NOT NULL,
	-- ��Ʒ����
	pay_type_id char(4) NOT NULL,
	-- ���б��
	bank_code varchar2(10) NOT NULL,
	-- ������
	card_type char(1) NOT NULL,
	-- �˻�����
	card_acct_type char(1) NOT NULL,
	-- ͨ����Ϣ
	channel varchar2(10),
	-- ���غ�
	channel_bank varchar2(10),
	-- �����־
	enable_flg char(1),
	PRIMARY KEY (mer_id, pay_type_id, bank_code, card_type, card_acct_type)
);


-- ����·�ɷ�����־
CREATE TABLE tbl_nwr_translog
(
	-- ��־���
	log_no number(10,0) NOT NULL,
	-- �̻���
	mer_id varchar2(16),
	-- ·�ɱ��
	route_id char(8),
	-- ��Ʒ����
	pay_type_id char(4),
	-- ���б��
	bank_code varchar2(10),
	-- ������
	card_type char(1),
	-- �˻�����
	card_acct_type char(1),
	-- ������Ϣ
	add_info varchar2(200),
	-- ���غ�
	channel_bank varchar2(10),
	-- ��־ʱ��
	add_timestamp timestamp,
	PRIMARY KEY (log_no)
);







/* Comments */

COMMENT ON TABLE tbl_nwr_merchant_route_ralate IS '�̻���·�ɹ����Ӧ��ϵ��';
COMMENT ON COLUMN tbl_nwr_merchant_route_ralate.mer_id IS '�̻���';
COMMENT ON COLUMN tbl_nwr_merchant_route_ralate.route_id IS '·�ɱ��';
COMMENT ON COLUMN tbl_nwr_merchant_route_ralate.enable_flg IS '�����־';
COMMENT ON TABLE tbl_nwr_route_rule IS '·�ɹ����';
COMMENT ON COLUMN tbl_nwr_route_rule.route_id IS '·�ɱ��';
COMMENT ON COLUMN tbl_nwr_route_rule.pay_type_id IS '��Ʒ����';
COMMENT ON COLUMN tbl_nwr_route_rule.bank_code IS '���б��';
COMMENT ON COLUMN tbl_nwr_route_rule.card_type IS '������';
COMMENT ON COLUMN tbl_nwr_route_rule.card_acct_type IS '�˻�����';
COMMENT ON COLUMN tbl_nwr_route_rule.channel IS 'ͨ����Ϣ';
COMMENT ON COLUMN tbl_nwr_route_rule.channel_bank IS '���غ�';
COMMENT ON COLUMN tbl_nwr_route_rule.enable_flg IS '�����־';
COMMENT ON TABLE tbl_nwr_special_merchant IS '�ض��̻���';
COMMENT ON COLUMN tbl_nwr_special_merchant.mer_id IS '�̻���';
COMMENT ON COLUMN tbl_nwr_special_merchant.pay_type_id IS '��Ʒ����';
COMMENT ON COLUMN tbl_nwr_special_merchant.bank_code IS '���б��';
COMMENT ON COLUMN tbl_nwr_special_merchant.card_type IS '������';
COMMENT ON COLUMN tbl_nwr_special_merchant.card_acct_type IS '�˻�����';
COMMENT ON COLUMN tbl_nwr_special_merchant.channel IS 'ͨ����Ϣ';
COMMENT ON COLUMN tbl_nwr_special_merchant.channel_bank IS '���غ�';
COMMENT ON COLUMN tbl_nwr_special_merchant.enable_flg IS '�����־';
COMMENT ON TABLE tbl_nwr_translog IS '����·�ɷ�����־';
COMMENT ON COLUMN tbl_nwr_translog.log_no IS '��־���';
COMMENT ON COLUMN tbl_nwr_translog.mer_id IS '�̻���';
COMMENT ON COLUMN tbl_nwr_translog.route_id IS '·�ɱ��';
COMMENT ON COLUMN tbl_nwr_translog.pay_type_id IS '��Ʒ����';
COMMENT ON COLUMN tbl_nwr_translog.bank_code IS '���б��';
COMMENT ON COLUMN tbl_nwr_translog.card_type IS '������';
COMMENT ON COLUMN tbl_nwr_translog.card_acct_type IS '�˻�����';
COMMENT ON COLUMN tbl_nwr_translog.add_info IS '������Ϣ';
COMMENT ON COLUMN tbl_nwr_translog.channel_bank IS '���غ�';
COMMENT ON COLUMN tbl_nwr_translog.add_timestamp IS '��־ʱ��';


--------------------------------------------------------
--  DDL for Table TBL_USERS
--------------------------------------------------------
  CREATE TABLE "TBL_USERS" 
   (	"USER_NAME" VARCHAR2(50 BYTE), 
	"PASSWORD" VARCHAR2(50 BYTE), 
	"ENABLED" NUMBER(1,0), 
	"USER_NAME_CN" VARCHAR2(50 BYTE),
	PRIMARY KEY ("USER_NAME")
   );
--------------------------------------------------------
--  DDL for Table TBL_AUTHORITIES
--------------------------------------------------------

  CREATE TABLE "TBL_AUTHORITIES" 
   (	"USER_NAME" VARCHAR2(50 BYTE), 
	"AUTHORITY" VARCHAR2(50 BYTE)
   );

   
SET DEFINE OFF;
REM INSERTING into TBL_USERS
SET DEFINE OFF;
Insert into TBL_USERS (USER_NAME,PASSWORD,ENABLED,USER_NAME_CN) values ('user1','24c9e15e52afc47c225b757e7bee1f9d',1,'��¼�û�');
Insert into TBL_USERS (USER_NAME,PASSWORD,ENABLED,USER_NAME_CN) values ('user2','7e58d63b60197ceb55a1c487989a3720',1,'��ͨ�û�');
Insert into TBL_USERS (USER_NAME,PASSWORD,ENABLED,USER_NAME_CN) values ('admin','21232f297a57a5a743894a0e4a801fc3',1,'ϵͳ����Ա');
REM INSERTING into TBL_NWR_SPECIAL_MERCHANT
SET DEFINE OFF;
Insert into TBL_NWR_SPECIAL_MERCHANT (MER_ID,PAY_TYPE_ID,BANK_CODE,CARD_TYPE,CARD_ACCT_TYPE,CHANNEL,CHANNEL_BANK,ENABLE_FLG) values ('10000002','0001','12345678','1','1','01','EE','1');
Insert into TBL_NWR_SPECIAL_MERCHANT (MER_ID,PAY_TYPE_ID,BANK_CODE,CARD_TYPE,CARD_ACCT_TYPE,CHANNEL,CHANNEL_BANK,ENABLE_FLG) values ('10000003','0002','55667788','0','0','02','55','1');
Insert into TBL_NWR_SPECIAL_MERCHANT (MER_ID,PAY_TYPE_ID,BANK_CODE,CARD_TYPE,CARD_ACCT_TYPE,CHANNEL,CHANNEL_BANK,ENABLE_FLG) values ('10000002','0003','55667788','0','1','02','55','1');
REM INSERTING into TBL_AUTHORITIES
SET DEFINE OFF;
Insert into TBL_AUTHORITIES (USER_NAME,AUTHORITY) values ('user1','ROLE_ADMIN');
Insert into TBL_AUTHORITIES (USER_NAME,AUTHORITY) values ('user1','ROLE_PASS');
Insert into TBL_AUTHORITIES (USER_NAME,AUTHORITY) values ('admin','ROLE_ADMIN');
Insert into TBL_AUTHORITIES (USER_NAME,AUTHORITY) values ('admin','ROLE_PASS');
Insert into TBL_AUTHORITIES (USER_NAME,AUTHORITY) values ('user2','ROLE_PASS');
REM INSERTING into TBL_NWR_MERCHANT_ROUTE_RALATE
SET DEFINE OFF;

