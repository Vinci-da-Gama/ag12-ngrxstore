export class UserMode {
	constructor(
		public email: string,
		public localUserId: string,
		private _token: string,
		private _tokenExpiredOnDate: Date
	) {}

	get token() : string | null {
		if (!this._tokenExpiredOnDate || new Date() > this._tokenExpiredOnDate) {
			return null;
		}
		return this._token;
	}

}
