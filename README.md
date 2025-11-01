# Foomo - Video Upload Platform

A modern, beautiful video upload platform built with Next.js, featuring a clean green and white theme.

## Features

- 📹 Video file upload with preview
- 🖼️ Thumbnail image upload with preview
- ✍️ Video title and description input
- 🎨 Beautiful green/white themed UI
- ⚡ Fast and responsive interface
- 🔄 Real-time upload progress
- ✅ Success/error notifications

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file based on `.env.example`:

```bash
# Copy the example file
cp .env.example .env.local
```

3. Configure your API endpoint in `.env.local`:

```env
API_ENDPOINT=https://your-api-endpoint.com/videos
API_KEY=your_api_key_here
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Connecting to Your Database API

The upload functionality is ready to integrate with your database API. Here's how:

### 1. Configure Environment Variables

Edit `.env.local` and add your API details:

```env
API_ENDPOINT=https://your-backend-api.com/api/videos
API_KEY=your_secret_api_key
```

### 2. Update the API Route

Open `app/api/upload/route.ts` and uncomment the API call section:

```typescript
// Uncomment and configure this section:
const response = await fetch(process.env.API_ENDPOINT!, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
  body: JSON.stringify(uploadData),
});
const result = await response.json();
```

### 3. Data Format

The following data is sent to your API:

```json
{
  "title": "Video Title",
  "description": "Video Description",
  "videoUrl": "/uploads/videos/video_1234567890.mp4",
  "thumbnailUrl": "/uploads/thumbnails/thumb_1234567890.jpg",
  "uploadedAt": "2025-11-01T12:00:00.000Z",
  "fileSize": 1024000,
  "videoType": "video/mp4"
}
```

### 4. File Storage

Files are currently stored locally in `public/uploads/`:

- Videos: `public/uploads/videos/`
- Thumbnails: `public/uploads/thumbnails/`

For production, consider using cloud storage (AWS S3, Cloudinary, etc.) and update the API route accordingly.

## Project Structure

```
fomo-content-upload/
├── app/
│   ├── api/
│   │   └── upload/
│   │       └── route.ts          # Upload API endpoint
│   ├── globals.css               # Global styles with green theme
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main upload page
├── public/
│   └── uploads/                  # Uploaded files (gitignored)
├── .env.example                  # Environment variables template
└── README.md                     # This file
```

## Customization

### Colors

The green theme colors are defined in `app/globals.css`:

```css
:root {
  --primary-green: #10b981;
  --primary-green-dark: #059669;
  --primary-green-light: #d1fae5;
  --accent-green: #34d399;
}
```

### API Integration

Modify `app/api/upload/route.ts` to integrate with your specific database:

- Replace the fetch URL with your API endpoint
- Adjust headers for your authentication method
- Transform the data format as needed for your API

## Production Deployment

### Build the Application

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

The easiest way to deploy is using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Remember to add your environment variables in the Vercel dashboard.

## Security Notes

⚠️ **Important for Production:**

1. Add file size limits in `next.config.ts`
2. Implement file type validation
3. Add rate limiting to prevent abuse
4. Use cloud storage instead of local file system
5. Sanitize user inputs
6. Add authentication/authorization
7. Use HTTPS in production
8. Keep API keys secure (never commit `.env.local`)

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **React 19** - UI library

## Support

For issues or questions, please open an issue in the repository.

## License

MIT License - feel free to use this project for your needs!
