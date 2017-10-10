VOUCHER_VOUCHER_LABEL = {
	voucherId : '代金券ID',
	voucherName : '代金券名称',
	voucherCode : '代金券CODE',
	voucherType : '代金券类型',
	voucherStatus : '代金券状态',
	voucherCount : '代金券数量',
	voucherActivateCount : '已激活数量',
	voucherUseCount : '已使用数量',
	voucherScopeCode : '使用范围',
	voucherScopeNote : '使用范围说明',
	voucherStartTime : '开始时间',
	voucherEndTime : '截至时间',
	days : '有效天数',
	money : '代金券面值',
	limitMoney : '最低消费额',
	createTime : '创建时间',
	userId : '创建者ID',
	userName : '创建者名称',
	terraceCode : '平台CODE',
	note : '代金券说明',
	userLimit : '个人领取上限',
	voucherBillCount : '代金券票据数量',
	userType : '创建者类型',

	voucherInfo : '代金券列表',
	addVoucher : '新增代金券',
	editVoucher : '编辑代金券',

	operation : '代金券操作',
	stopVoucher : '暂停发放',
	unstopVoucher : '继续发放',
	forcestopVoucher : '强制停止',
	manageVoucherBill : '票据管理',
	voucherToUser : '指定用户发放',
	voucherToAll : '全部用户发放',

	normal : '正常',
	overdate : '过期',
	countzero : '发放完',
	stopped : '停止',
	cancelled : '强制停止',

	unknown : '未知',
	blankText : '不可为空',

	manageVoucherBillTitle : '管理代金券【{0}】票据'
};

VOUCHER_VOUCHER_MESSAGE = {
	noVoucher : '没有代金券',

	confirmStopVoucher : '确定要停止发放: [{0}]?',
	confirmUnstopVoucher : '确定要继续发放: [{0}]?',
	confirmForceStopVoucher : '确定要强制停止: [{0}]?',
};

VOUCHER_VOUCHER_PROPERTY = {
	voucherId : '代金券ID',
	voucherName : '代金券名称',
	voucherCode : '代金券CODE',
	voucherType : '代金券类型',
	voucherStatus : '代金券状态',
	voucherCount : '代金券数量',
	voucherActivateCount : '代金券已激活数量',
	voucherUseCount : '代金券已使用数量',
	voucherScopeCode : '代金券适用范围CODE',
	voucherScopeNote : '代金券使用范围说明',
	voucherStartTime : '代金券有效期开始时间',
	voucherEndTime : '代金券有效期截至时间',
	days : '代金券有效天数',
	money : '代金券面值',
	limitMoney : '代金券最低消费额',
	createTime : '代金券创建时间',
	userId : '代金券创建者ID',
	userName : '代金券创建者名称',
	terraceCode : '平台CODE',
	isAutoGet : '是否自动领取',
	note : '说明'
};

VOUCHER_USER_LABEL = {
		giveVoucher : '发放',
		selectUser : '指定用户'
	};

VOUCHER_USER_PROPERTY = {
		id : '用户ID',
		fullName : '用户姓名'
	};

VOUCHER_USER_MESSAGE = {
		empty : '没有用户'
	};

VOUCHER_VOUCHER_COMBO = {
	terraceCode : [['yearbook','忆尔'],['cookbook','菜谱易']],

	voucherType : [['00','优惠券'],['10','资金抵用券']],
	voucherType_add : [['00','优惠券']],
	voucherStatus : [['00','正常'],['10','过期'],['20','发放完'],['30','停止'],['99','强制停止']],
	voucherStatus_add : [['00','正常']],
	isAutoGet : [['Y','是'],['N','否']],

	voucherScopeCode : [['YBOOK_PRICE','Yearbook纪念册']],
	voucherScopeNoteS : {
		'YBOOK_PRICE' : '用户在Yearbook中，制作书册并下单付款时，在满足条件的情况下，可以使用'
	}
};

VOUCHER_VOUCHER_GLOBAL = {
	currentDomain : null,
	currentScopeData : null,
	currentScopeComboData : null
};

VOUCHER_BILL_LABEL = {
	voucherBillCode : '票据CODE',
	voucherBillPassword : '票据密码',
	voucherBillStatus : '票据状态',
	voucherBillActivateTime : '激活时间',
	voucherBillCreator : '创建者',
	userVoucherId : '对应用户代金券ID',

	voucherBillCount : '生成票据数量',
	voucherBillHasPasswd : '是否生成密码',

	addVoucherBill : '生成代金券票据',

	unknown : '未知',
};

VOUCHER_BILL_MESSAGE = {
	noVoucherBill : '对应代金券没有票据'
};

VOUCHER_BILL_PROPERTY = {
	voucherBillCode : '票据CODE',
	voucherBillPassword : '票据密码',
	voucherBillStatus : '票据状态',
	voucherBillActivateTime : '激活时间',
	voucherBillCreator : '创建者',
	userVoucherId : '对应用户代金券ID'
};

VOUCHER_BILL_COMBO = {
	voucherBillStatus : [['00','未激活'],['10','已激活'],['20','失效']]
};