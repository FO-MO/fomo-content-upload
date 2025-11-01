import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const video = formData.get("video") as File;
    const thumbnail = formData.get("thumbnail") as File;

    if (!title || !description || !video || !thumbnail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const videosDir = path.join(uploadsDir, "videos");
    const thumbnailsDir = path.join(uploadsDir, "thumbnails");

    await mkdir(videosDir, { recursive: true });
    await mkdir(thumbnailsDir, { recursive: true });

    // Generate unique filenames
    const timestamp = Date.now();
    const videoExt = video.name.split(".").pop();
    const thumbnailExt = thumbnail.name.split(".").pop();
    const videoFilename = `video_${timestamp}.${videoExt}`;
    const thumbnailFilename = `thumb_${timestamp}.${thumbnailExt}`;

    // Convert files to buffers and save
    const videoBuffer = Buffer.from(await video.arrayBuffer());
    const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());

    const videoPath = path.join(videosDir, videoFilename);
    const thumbnailPath = path.join(thumbnailsDir, thumbnailFilename);

    await writeFile(videoPath, videoBuffer);
    await writeFile(thumbnailPath, thumbnailBuffer);

    // Prepare data to send to external API
    const uploadData = {
      title,
      description,
      videoUrl: `/uploads/videos/${videoFilename}`,
      thumbnailUrl: `/uploads/thumbnails/${thumbnailFilename}`,
      uploadedAt: new Date().toISOString(),
      fileSize: video.size,
      videoType: video.type,
    };

    // TODO: Send to your external database API
    // Example:
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.API_KEY}`,
    //   },
    //   body: JSON.stringify(uploadData),
    // });
    // const result = await response.json();

    // For now, just log the data
    console.log("Upload Data:", uploadData);

    return NextResponse.json({
      success: true,
      message: "Video uploaded successfully",
      data: uploadData,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload video" },
      { status: 500 }
    );
  }
}
