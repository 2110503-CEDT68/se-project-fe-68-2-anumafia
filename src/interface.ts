export interface UserItem {
  _id: string;
  name: string;
  email: string;
  tel: string;
  role: string;
  createdAt: string;
  token?: string;
  yellowCards: {
	count: number;
	records: {
		reason: string;
		issuedAt: string;
	}
  };
  ban: {
		isBanned: boolean;
		reason: string;
	};
}

export interface CompanyItem {
  _id: string;
  name: string;
  address: string;
  website: string;
  description: string;
  tel: string;
  id: string; 
}

export interface CompanyJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CompanyItem[];
}

export interface InterviewItem {
  _id: string;
  company: CompanyItem | string; 
  user: UserItem | string;
  sessionDate: string; 
  createdAt: string;
}

export interface InterviewJson {
  success: boolean;
  count: number;
  data: InterviewItem[];
}

export interface UserJson {
  success: boolean;
  count: number;
  data: UserItem[];
}