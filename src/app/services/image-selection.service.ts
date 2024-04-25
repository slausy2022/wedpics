import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})

export class ImageSelectionService {

  constructor() {}

  async selectImageFromGallery(): Promise<Photo | null> {
    const options = {
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
      quality: 100

    };

    try {
      const selectedImage = await Camera.getPhoto(options); // Retourne l'URI de l'image sélectionnée

      return selectedImage;

    } catch (error) {
      console.error("Erreur lors du choix de l'image :", error);
      return null;
    }
  }

  async takePhoto(): Promise<Photo | null> {
    const options = {
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      allowEditing: true,
      quality: 100
    };

    try {
        // Vérifier si la permission de la caméra a déjà été accordée
      const permission = await this.checkCameraPermission();
      if (!permission) {
        // Demander la permission si elle n'a pas été accordée
        await this.requestCameraPermission();
      }

      const selectedImage = await Camera.getPhoto(options); // Retourne l'URI de l'image sélectionnée
      //return selectedImage.base64String!; // Retourne l'URI de l'image sélectionnée


      return selectedImage;

    } catch (error) {
      console.error("Erreur lors de la prise de photo :", error);
      return null;
    }
  }

  async checkCameraPermission() {
    const result = await Camera.checkPermissions();
    return result.camera;
  }

  async requestCameraPermission() {
    const result = await Camera.requestPermissions({ permissions: ['camera'] });
    if (!result.camera) {
      throw new Error('Permission not granted for camera');
    }
  }

}
