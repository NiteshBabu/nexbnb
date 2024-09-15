import { ImageResponse, Photo } from "@/models/Image.models";
import { getPlaiceholder } from "plaiceholder";
const getBase64 = async (url: string) => {
  try {
    const resp = await fetch(url);
    const buffer = Buffer.from(await resp.arrayBuffer());

    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (e) {
    return new Promise((resolve) =>
      resolve(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGNglDE0dE0wco1jYJNmmDRh4v87e7onzjDxSGJYUmf9/9uULTPjUoONAP5HD3IKCaCjAAAAAElFTkSuQmCC"
      )
    );
  }
};

export const getBlurredUrl = async (
  images: ImageResponse
): Promise<Photo[]> => {
  const base64Promises = images.map((photo: Photo) => getBase64(photo.url));
  const base64Urls = await Promise.all(base64Promises);
  return images.map((photo, indx) => ({
    ...photo,
    blurredDataUrl: base64Urls[indx],
  }));
};
