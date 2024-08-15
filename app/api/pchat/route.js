import { NextResponse } from "next/server";
import OpenAI from "openai";
import { fetchEmbeddings } from "@/utils/apiUtils";
import { queryEmbedding } from "@/utils/pineconeUtils";
import { initPinecone } from "@/utils/pineconeUtils";

export async function POST(req) {
    
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  try {
    const data = await req.json();
    const userQuery = data[data.length-1].content;

    const pinecone = initPinecone();
    const index = pinecone.Index("ai-chat-bot");

   const userEmbedding = await fetchEmbeddings(userQuery);
  
    const relevantChunks = await queryEmbedding(index, userEmbedding);
    
    const context = relevantChunks.map(chunk => chunk.metadata.text).join(' ');
    

    const prompt = `Context: ${context}\n\nQuestion: ${userQuery}`;
    const completion = await openai.chat.completions.create({
      messages: [
        ...data,
        { role: "system", content: prompt },
      ],
      model: "qwen/qwen-2-7b-instruct:free",
      promt:prompt,
      stream: true,
    });

    // export const generateResponse = async (userQuery, context) => {
    //   const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       model: 'meta-llama/llama-3.1-8b-instruct:free',
    //       prompt: `Context: ${context}\n\nQuestion: ${userQuery}`,
    //       max_tokens: 200
    //     })
    //   });
    //   const data = await response.json();
    //   return data.choices[0].text;
    // };
  
    
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0].delta.content;
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (error) {
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream);
  } catch (error) {
    return new NextResponse("Error processing request: " + error.message, {
      status: 500,
    });
  }
}
