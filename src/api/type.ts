interface I18nName {
	en_us: string;
	ja_jp: string;
	zh_cn: string;
}

interface LicensePlan {
	end_time: string;
	i18n_name: I18nName;
	license_plan_key: string;
	product_name: string;
	start_time: string;
	subscription_id: string;
}

interface Avatar {
	avatar_240: string;
	avatar_640: string;
	avatar_72: string;
	avatar_origin: string;
}

interface DepartmentName {
	i18n_name: I18nName;
	name: string;
}

interface DepartmentPath {
	department_ids: string[];
	department_path_name: DepartmentName;
}

interface Department {
	department_id: string;
	department_name: DepartmentName;
	department_path: DepartmentPath;
}

interface Order {
	department_id: string;
	department_order: number;
	is_primary_dept: boolean;
	user_order: number;
}

interface Status {
	is_activated: boolean;
	is_exited: boolean;
	is_frozen: boolean;
	is_resigned: boolean;
	is_unjoin: boolean;
}

export interface User {
	assign_info: LicensePlan[];
	avatar: Avatar;
	city: string;
	country: string;
	department_ids: string[];
	department_path: Department[];
	description: string;
	email: string;
	employee_no: string;
	employee_type: number;
	en_name: string;
	enterprise_email: string;
	gender: number;
	is_tenant_manager: boolean;
	job_title: string;
	join_time: number;
	mobile: string;
	mobile_visible: boolean;
	name: string;
	nickname: string;
	open_id: string;
	orders: Order[];
	status: Status;
	union_id: string;
	user_id: string;
	work_station: string;
}

export type UserToken = {
	name: string;
	avatar: string;
	open_id: string;
	union_id: string;
	user_access_token: string;
};

interface Leader {
	leaderType: number;
	leaderID: string;
}

export type DepartmentData = {
	name: string;
	i18n_name: I18nName;
	parent_department_id: string;
	department_id: string;
	open_department_id: string;
	leader_user_id: string;
	chat_id: string;
	order: string;
	unit_ids: string[];
	member_count: number;
	status: Status;
	leaders: Leader[];
	group_chat_employee_types: number[];
	department_hrbps: string[];
	primary_member_count: number;
};
