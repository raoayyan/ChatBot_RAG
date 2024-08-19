// api/youtube/route.js
// import { YoutubeTranscript } from "youtube-transcript";
import { fetchTranscript } from "@/utils/youtube-transcript";
import { URLSearchParams } from "url";
import { NextResponse } from "next/server";

import { processAndStoreContent } from "@/utils/textProcessing";
import { initPinecone } from "@/utils/pineconeUtils";


export async function GET(req, res) {
  console.log("hitting");
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const url = new URL(req.url); // Replace with your base URL if needed
  const searchParams = new URLSearchParams(url.search);
  const youtubelink = searchParams.get("youtubelink");

  try {
    const videoId = extractVideoId(youtubelink);
    console.log("vid",videoId)
    if (!videoId) {
      return new NextResponse("Invalid YouTube URL", { status: 400 });
    }

   
    // const transcript = await YoutubeTranscript.fetchTranscript(youtubelink);
    const transcript = await fetchTranscript(videoId);
    
    const allText = transcript.map((item) => item.text).join(" ");
    
    const pinecone = initPinecone();
    const index = pinecone.Index("ai-chat-bot"); // Replace with your Pinecone index name
  
    // Process and store the content
    await processAndStoreContent(index, allText);
   
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return new NextResponse("Error processing request: " + error.message, {
      status: 500,
    });
  }
  function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
}
