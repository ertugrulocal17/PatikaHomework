import { Context, context, PersistentUnorderedMap, PersistentVector, RNG, u128} from "near-sdk-as";

import { isEmpty, AccountId } from "../../utils";

export const users = new PersistentUnorderedMap<u32, User>("u");
export const userIdList = new PersistentVector<u32>("ul");

@nearBindgen
export class User {
    id: u32;
    name: string;
    account: AccountId;

    constructor(name: string){
        const rng = new RNG<u32>(1, u32.MAX_VALUE);
        const roll = rng.next();

        this.id = roll;
        this.name = name;
        this.account= context.sender;
    }

    static createUser (name: string): string {
        assert(isEmpty(name), "Name can not be empty!")
        assert(Context.attachedDeposit > u128.One, "You need to attach 1 NEAR!")

        const newUser = new User(name)

        users.set(newUser.id, newUser);
        userIdList.push(newUser.id);
        
        return `New User Created: ${newUser.name}`;
    }

    // Users List
    static usersList(): User[] {
        let allUsers = users.length;
        let offset: u32 = 0;
        return users.values(offset, offset + allUsers);
    }


    // User Login
    static loginUser(userId: u32): string {
        let userExists = users.getSome(userId)
        return (userExists ? 'Welcome to NEARFLIX!' : 'No User');
    }
    // Delete User
    static deleteUser(userId: u32): string {
        users.delete(userId)
        return "User Deleted!"
    }

}