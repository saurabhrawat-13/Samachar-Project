import { Client, ID, Account } from "appwrite"
import config from "../conf/conf";
class AuthService {
    appWriteClient = new Client();
    account;

    constructor() {
        this.appWriteClient
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectID)
        this.account = new Account(this.appWriteClient);
    }

    async createAccount({ name, email, password }) {
        try {
            const account = await this.account.create(ID.unique(), email, password, name)
            if(account){
                return this.login({ email, password })

            }else{
                return account
            }
             
        } catch (error) {
            console.log("Something went wrong while creating Account : ", error)
            throw error

        }

    }


    async login({ email, password }) {
        try {
            const login = await this.account.createEmailPasswordSession(email, password)
            return login
        } catch (error) {
            console.log("Something went wrong while Login to your Account : ", error)
            throw error

        }

    }

    async getCurrentUser() {
        try {
            const user = await this.account.get()
            return user
        } catch (error) {
            console.log("Something went wrong while fetching Current User : ", error)
            return null

        }

    }

    async logout() {
        try {
            const user = await this.account.deleteSessions()
        } catch (error) {
            console.log("Something went wrong while logging out : ", error)

        }



    }
}

const authService = new AuthService();

export default authService;