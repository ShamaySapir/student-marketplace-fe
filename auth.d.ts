import "next-auth";
import { User } from "next-auth";
import { UserType } from "./constants";
type CustomUser = {
  type: UserType;
  displayName: string;
};

declare module "next-auth" {
  interface Session {
    isSeller: boolean;
    displayName: string;
    user: User & CustomUser;
  }
}
