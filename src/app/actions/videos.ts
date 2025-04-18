'use server';

import { getVideoUrl } from '@/lib/blob';

/**
 * Server action to get video URLs from Vercel Blob
 * This provides a way for client components to access Blob data
 */
export async function getVideoUrlFromBlob(fileName: string): Promise<string> {
  if (!fileName) return '';

  try {
    // Extract just the filename part (without full path)
    const fileNameOnly = fileName.split('/').pop() || fileName;

    // First, try the exact path as provided
    let url = await getVideoUrl(fileName);

    // If that doesn't work and we're using a path, try searching with the path format
    if (!url.includes('vercel-storage.com') && fileName.startsWith('/videos/')) {
      // Remove the leading slash to match how files were uploaded
      const pathWithoutLeadingSlash = fileName.substring(1);
      url = await getVideoUrl(pathWithoutLeadingSlash);
    }

    // If still no match, try just the filename
    if (!url.includes('vercel-storage.com')) {
      url = await getVideoUrl(fileNameOnly);
    }

    console.log(`Final URL for ${fileName}: ${url}`);

    // If URL exists in Blob, return it, otherwise return the original path
    return url || fileName;
  } catch (error) {
    console.error('Error getting video URL:', error);
    // Return the original path as fallback
    return fileName;
  }
}
