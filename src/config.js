import { config } from "dotenv";

config();

export default {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || "",
    azureStorageConfig: {
        connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
        accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
        accountKey: process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY,
        containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
        blobURL:
          "https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net",
      }
};
