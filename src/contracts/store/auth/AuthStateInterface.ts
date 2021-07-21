import { UserMode } from '../../modes/user-mode/user';

export interface AuthStateInterface {
	user: UserMode | null;
	authError: string | null;
	loading: boolean;
}
