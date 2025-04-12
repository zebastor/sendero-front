import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { FetchHttpHandler } from '@aws-sdk/fetch-http-handler';
import { environment } from '../../env/enviroment';
@Injectable({
  providedIn: 'root'
})
export class R2servicesService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: environment.R2_CDN_URL,
      credentials: {
        accessKeyId: environment.R2_ACCESS_KEY,
        secretAccessKey: environment.R2_SECRET_KEY,
      },
      requestHandler: new FetchHttpHandler({}) // Forzar fetch
    });
  }

  async uploadFile(file: File, fileName: string): Promise<void> {
    const arrayBuffer = await file.arrayBuffer();
    const params = {
      Bucket: environment.R2_BUCKET_NAME,
      Key: fileName,
      Body: new Uint8Array(arrayBuffer),
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      console.log('Archivo subido con éxito');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    const params = {
      Bucket: environment.R2_BUCKET_NAME,
      Key: fileName,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(params));
      console.log('Archivo eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      throw error;
    }
  }
}
