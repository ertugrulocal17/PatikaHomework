
import { User } from "./model";

// Create a new User
export function newUser(name: string): string {
  return User.createUser(name);
}

// View All Users
export function usersList():User[] {
    return User.usersList();
}

// User Login
export function userLogin(userId: u32): string{
    return User.loginUser(userId);
}

// // Delete User 
export function deleteUser(userId: u32): string {
    return User.deleteUser(userId)
}