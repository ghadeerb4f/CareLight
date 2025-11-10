import { Client, Account, Avatars, Databases } from "react-native-appwrite";

export const client = new Client();
// real database Endpoint https://fra.cloud.appwrite.io/v1
// real database set project 690b1427002f13847d0a
// .setEndpoint("https://fra.cloud.appwrite.io/v1")
// .setProject("690f049c001bfad86e3a");
client
.setEndpoint("https://fra.cloud.appwrite.io/v1")
.setProject("691075620002ed1f320e");
// .setProject("690b1427002f13847d0a"); real one


export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);


//   There were two appwrite accounts because requests are limited , thank for reading❤️