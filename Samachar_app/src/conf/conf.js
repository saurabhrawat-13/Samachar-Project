const config = {
    appWriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECTID),
    appWriteDatbaseID : String(import.meta.env.VITE_APPWRITE_DATABASEID),
    appWriteCollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTIONID),
    appWriteBucketID : String(import.meta.env.VITE_APPWRITE_BUCKETID),
}
export default config