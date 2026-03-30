import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { v4 as uuid } from "uuid";

const s3 = new S3Client({})

type Input = {
    fileType: string;
}

export const handler = async(event: Input) => {
    try {
        if (!event?.fileType) {
            throw new Error("fileType is required")
        }
        const allowedTypes = ["png", "jpg", "jpeg"]

        if(!allowedTypes.includes(event.fileType)) {
            throw new Error("Invalid file type")
        }

        const key = `${uuid()}.${event.fileType}`;

        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: key,
            ContentType: `image/${event.fileType}`,
          });

          const uploadUrl = await getSignedUrl(s3, command, {
            expiresIn: 60, // 1 minuto
          });
      
          // 5️⃣ Respuesta limpia (para backend)
          return {
            uploadUrl,
            key,
          };
    } catch(error: any) {
        console.error("Error generating upload URL:", error);

        throw new Error(error.message || "Internal error");
    }
}