import { list, put } from '@vercel/blob';

/**
 * Gets a video URL from Vercel Blob
 * @param fileName The name of the file to retrieve
 * @returns The URL of the video file
 */
export async function getVideoUrl(fileName: string): Promise<string> {
  try {
    // Handle both full paths and just filenames
    const searchPath = fileName.startsWith('/') ? fileName.substring(1) : fileName;

    console.log(`Searching for Blob: ${searchPath}`);
    const { blobs } = await list({ prefix: searchPath, limit: 1 });

    // If a blob was found, return its URL
    if (blobs.length > 0) {
      console.log(`Found Blob URL: ${blobs[0].url}`);
      return blobs[0].url;
    }

    // If we have a full path but didn't find a direct match, try with just the filename
    if (searchPath.includes('/')) {
      const justFileName = searchPath.split('/').pop() || '';
      console.log(`Trying with just filename: ${justFileName}`);
      const { blobs: filenameBlobs } = await list({ prefix: justFileName, limit: 1 });
      if (filenameBlobs.length > 0) {
        console.log(`Found Blob URL via filename: ${filenameBlobs[0].url}`);
        return filenameBlobs[0].url;
      }
    }

    console.log(`No Blob found for: ${fileName}, returning original path`);
    // Return the local path as fallback
    return fileName;
  } catch (error) {
    console.error('Error fetching video from Blob:', error);
    // Return the local path as fallback
    return fileName;
  }
}

/**
 * Uploads a video to Vercel Blob
 * @param file The file to upload
 * @param fileName The name to give the file
 * @returns The URL of the uploaded file
 */
export async function uploadVideo(file: File, fileName: string): Promise<string> {
  try {
    const { url } = await put(fileName, file, { access: 'public' });
    return url;
  } catch (error) {
    console.error('Error uploading to Blob:', error);
    throw error;
  }
}
