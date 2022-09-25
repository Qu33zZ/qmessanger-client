import { ISession } from "./ISession";
import { IUser } from "./IUser";

export interface ILoginResponse {
	user: IUser;
	session: ISession;
}
