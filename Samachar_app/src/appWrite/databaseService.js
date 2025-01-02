import {Client, Databases, Storage, Query, ID} from "appwrite"
import config from "../conf/conf";
class DatabaseService {
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(config.appWriteUrl)
        .setProject(config.appWriteProjectID)

        this.storage =  new Storage(this.client)

        this.databases =  new Databases(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        console.log("hello", title);
        try {
            console.log("hello");
          return  await this.databases.createDocument(
                config.appWriteDatbaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
             
            )
        
        } catch (error) {
            console.log("Something goes wrong while creating POST: ", error)  
            return false      
        }
    }
    

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appWriteDatbaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {
            console.log("Something goes wrong while Updating POST: ", error)
            return false
            
        }
    }

    async deletPost(slug){
        try {
           return await this.databases.deleteDocument(
                config.appWriteDatbaseID,
                config.appWriteCollectionID,
                slug
            )
            
        } catch (error) {
            console.log("Something goes wrong while Deleting a POST: ", error)  
            return false
        }
    }

    async getALLPosts(queries = [Query.equal("status", "active")] ){
        try {
           return await this.databases.listDocuments(
                config.appWriteDatbaseID,
                config.appWriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Something goes wrong while getting all POSTs: ", error)
            return false
        }
    }

    async getSinglePost(slug){
        try {
            return await this.databases.getDocument(
                config.appWriteDatbaseID,
                config.appWriteCollectionID,
                slug
            )
            
        } catch (error) {
            console.log(`Something goes wrong while getting a POST: ---${slug}--- `, error)
            return false
            
        }
    }


    //--------------------------Image upload service----------------------

    async uploadFile(file){
        try {
            const image = await this.storage.createFile(
                config.appWriteBucketID,
                ID.unique(),
                file
            )
            return image
            
        } catch (error) {
            console.log(`Something goes wrong while Uploading image: `, error)
            return false

            
        }
    }

     getFilePreview(fileID){
        try {

           return this.storage.getFilePreview(
                config.appWriteBucketID,
                fileID
            )
            
        } catch (error) {
            console.log(`Something goes wrong while getting image Preview:  `, error)
            return false
            
        }
    }

    async deleteFile(fileID){
        try {
            await this.storage.deleteFile(
                config.appWriteBucketID,
                fileID
            )
            return true
            
        } catch (error) {
            console.log(`Something goes wrong while deletng image :  `, error)
            return false

            
        }
    }


}

const databaseService = new DatabaseService();
export default databaseService