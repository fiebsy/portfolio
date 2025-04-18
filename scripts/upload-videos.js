#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { put } from '@vercel/blob';
import * as dotenv from 'dotenv';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Get the token from environment variables
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_TOKEN) {
  console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is missing');
  process.exit(1);
}

/**
 * Get all files in a directory recursively
 */
async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

/**
 * Upload a video file to Vercel Blob
 */
async function uploadFile(filePath) {
  try {
    // Get the relative path from the public directory
    const relativePath = filePath.replace(/^.*?public[\\/]/, '');

    // Upload the file to Vercel Blob
    const fileStream = fs.createReadStream(filePath);
    const { url } = await put(relativePath, fileStream, {
      access: 'public',
      token: BLOB_TOKEN,
    });

    console.log(`✅ Uploaded ${relativePath} to ${url}`);
    return url;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error);
    return null;
  }
}

/**
 * Main function to upload all videos
 */
async function main() {
  console.log(`Using Blob token: ${BLOB_TOKEN.substring(0, 10)}...`);

  // Get current directory where the script is executed
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Get all video files from the public/videos directory
  const videosDir = path.join(path.resolve(__dirname, '..'), 'public', 'videos');
  const videoFiles = await getFiles(videosDir);

  // Filter only MP4 files
  const mp4Files = videoFiles.filter((file) => file.endsWith('.mp4'));

  console.log(`Found ${mp4Files.length} MP4 files to upload`);

  // Upload each file
  for (const file of mp4Files) {
    await uploadFile(file);
  }

  console.log('✨ Upload complete!');
}

// Execute the script
main().catch((error) => {
  console.error('Error in main execution:', error);
  process.exit(1);
});
