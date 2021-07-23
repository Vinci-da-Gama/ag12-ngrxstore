export interface AuthenSuccessPayloadInterface {
  email: string;
	localUserId: string;
	_token: string;
	_tokenExpiredOnDate: Date;
	redirect: boolean;
}
