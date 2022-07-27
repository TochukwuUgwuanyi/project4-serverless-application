import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { S3Client } from "@aws-sdk/client-s3";
import {
    CreateBucketCommand,
    DeleteObjectCommand,
    PutObjectCommand,
    DeleteBucketCommand }
  from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { REGION } from "./dbConnection";

AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic


  
const s3Client = new S3Client({ region: REGION });
export { s3Client };



  // Set parameters
  // Create a random name for the Amazon Simple Storage Service (Amazon S3) bucket and key
  export const bucketParams = {
    Bucket: `test-bucket-${Math.ceil(Math.random() * 10 ** 10)}`,
    Key: `test-object-${Math.ceil(Math.random() * 10 ** 10)}`,
    Body: "BODY"
  };

export class AttachmentUtils{
    getGeneratedSignedUrl = async(currentUserID:string, todoId:string)=>{
        //CustomTODO: user "currentUserID" and "todoId" to generate the Bucket and Key in "bucketParams" above
        try {
            // Create a command to put the object in the S3 bucket.
            const command = new PutObjectCommand(bucketParams);
            // Create the presigned URL.
            const signedUrl = await getSignedUrl(s3Client, command, {
              expiresIn: 3600,
            });
        
            console.log(signedUrl);
            return signedUrl;
           
          } catch (err) {
            console.log("Error creating presigned URL", err);
          }
      }
      
      createBucket = async()=>{
        try {
            // Create an S3 bucket.
            console.log(`Creating bucket ${bucketParams.Bucket}`);
            await s3Client.send(new CreateBucketCommand({ Bucket: bucketParams.Bucket }));
            console.log(`Waiting for "${bucketParams.Bucket}" bucket creation...`);
          } catch (err) {
            console.log("Error creating bucket", err);
          }
      }
    
    
      pushToBucket = async(currentUserID:string, todoId:string)=>{
        try {
           const signedUrl = await this.getGeneratedSignedUrl(currentUserID, todoId);
            console.log(signedUrl);
            // const response = await fetch(signedUrl, {method: 'PUT', body: bucketParams.Body});
            // console.log(
            //   `\nResponse returned by signed URL: ${await response}\n`
            // );
          } catch (err) {
            console.log("Error creating presigned URL", err);
          }
      }
    
    
      
      deleteObj = async () => {
    
        try {
          // Delete the object.
          console.log(`\nDeleting object "${bucketParams.Key}"} from bucket`);
          await s3Client.send(
            new DeleteObjectCommand({ Bucket: bucketParams.Bucket, Key: bucketParams.Key })
          );
        } catch (err) {
          console.log("Error deleting object", err);
        }
    
      };
    
       deleteBucket = async () => {
        try {
          // Delete the S3 bucket.
          console.log(`\nDeleting bucket ${bucketParams.Bucket}`);
          await s3Client.send(
            new DeleteBucketCommand({ Bucket: bucketParams.Bucket })
          );
        } catch (err) {
          console.log("Error deleting bucket", err);
        }
      };
}

  

  


