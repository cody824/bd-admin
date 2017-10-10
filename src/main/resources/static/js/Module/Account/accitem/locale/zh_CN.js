ACCITEM_LABEL = {
		rowNumber : '序号',
		memAccName : '账户名',
		accItemCode : '账号CODE',
		accItemAllBalna : '总金额',
		accItemBailBalna : '保证金',
		accItemUseBalna : '可用金额',
		accItemState : '状态',
		accItemDate : '开户日期',
		
		
		active : '开通',
		locked : '锁定',
		cancelled : '注销',
		unknown : '未知',
		
		lockAccitem : '锁定账户',
		unLockAccitem : '解锁账户',
		cancelAccitem : '注销账户',
		listRelationUser : '查看账户明细',
		listReconciliation : '查看对账明细',
		listAccCondeta : '查看冻结明细',
		transfer : '转入资金',
		transferMoney : '转入金额',
		transferDescription : '转账备注',
		operation : '账户操作',
		
		accitemInfo : '虚拟账户'
};

ACCITEM_MESSAGE = {
		noAccitem : '没有用户',
		
		lockAccitem : '锁定账户[{0}]！',
		unLockAccitem : '解锁账户[{0}]！',
		cancelAccitem : '注销账户[{0}]！',
		
		confirmLockAccitem: '确定要锁定账户: [{0}]?',
		confirmUnLockAccitem: '确定要解锁账户: [{0}]?',
		confirmCancelAccitem: '确定要注销账户: [{0}]?',
};

ACCITEM_PROPERTY = {
		memAccName : '账户名',
		accItemCode : '账号CODE',
		accItemAllBalna : '总金额',
		accItemBailBalna : '保证金',
		accItemUseBalna : '可用金额',
		accItemState : '状态',
		accItemDate : '开户日期',
};

RELATIONUSER_LABEL = {
		relationId : '关联标识ID',
		relationUserId : '平台对应用户ID',
		relationName : '用户名',
		relationIsAdmin : '是否是主账号',
		relationState : '账户状态',
		relationUseBalna : '每天可交易金额',
		relationHasUseBalna : '当天已交易金额',
		relationTakeBalna : '每天可提现金额',
		relationHasTakeBalna : '当天已提现金额',
		relationBoundType : '绑定密保类型',
		relationBoundValue : '绑定密保值',
		relationDate : '开通时间',
		relationKey : '密钥',
		terrace: '所属平台',
		relationRemark : '备注',
		relationCreatMan : '开通人员',

		active : '开通',
		locked : '锁定',
		cancelled : '注销',
		unknown : '未知',
		
		lockRelationUser : '锁定用户',
		unlockRelationUser : '解锁用户',
		cancelRelationUser : '注销用户',
		listReconciliation : '查看对账明细',
		
		operation : '用户操作',
		
		relationUserInfo : '虚拟账户'
};

RELATIONUSER_MESSAGE = {
		noRelationUser : '没有关联用户',

		confirmLockRelationUser: '确定要锁定用户: [{0}]?',
		confirmUnlockRelationUser: '确定要解锁用户: [{0}]?',
		confirmCancelRelationUser: '确定要注销用户: [{0}]?',
};

RELATIONUSER_PROPERTY = {
		relationId : '关联标识ID',
		relationUserId : '平台对应用户ID',
		relationName : '用户名',
		relationIsAdmin : '是否是主账号',
		relationState : '账户状态',
		relationUseBalna : '每天可交易金额',
		relationHasUseBalna : '当天已交易金额',
		relationTakeBalna : '每天可提现金额',
		relationHasTakeBalna : '当天已提现金额',
		relationBoundType : '绑定密保类型',
		relationBoundValue : '绑定密保值',
		relationDate : '开通时间',
		relationKey : '密钥',
		terrace: '所属平台',
		relationRemark : '备注',
		relationCreatMan : '开通人员'
};

RECONCILIATION_LABEL = {
	reconciliationID : '明细ID',
	reconciliationMode : '明细',
	reconciliationChange : '摘要',
	reconciliationTime : '时间',
	accItemUseBalna : '账户可用余额',
	accItemAllBalna : '总余额',
	accItemChangeBalna : '收入/支出',
	accItemChangeBalna_in : '收入',
	accItemChangeBalna_out : '支出',
	relationId : '关联标识ID',
	accItem : '资金账户',

	unknown : '未知'
};

RECONCILIATION_MESSAGE = {
	noReconciliation : '没有对账明细'
};

RECONCILIATION_PROPERTY = {

};


ACCCONDETA_LABEL = {
	condetaId : '冻结明细ID',
	relationUserBuyID : '冻结用户ID',
	relationUserSellID : '收入方ID',
	condetaMoney : '冻结金额',
	condetaType : '冻结类型',
	condetaNote : '冻结备注',
	condetaState : '冻结状态',
	terraceCode : '平台CODE',
	condetaTime : '冻结时间',
	condetaDoTime : '解冻时间',

	unknown : '未知',
};

ACCCONDETA_MESSAGE = {
	noAccCondeta : '没有明细',
};

ACCCONDETA_PROPERTY = {
	condetaId : '冻结明细ID',
	relationUserBuyID : '冻结用户ID',
	relationUserSellID : '收入方ID',
	condetaMoney : '冻结金额',
	condetaType : '冻结类型',
	condetaNote : '冻结备注',
	condetaState : '冻结状态',
	terraceCode : '平台CODE',
	condetaTime : '冻结时间',
	condetaDoTime : '解冻时间',
};