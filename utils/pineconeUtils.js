import { Pinecone } from "@pinecone-database/pinecone";

export const initPinecone = () => {
    const pinecone = new Pinecone({
      apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY,
    });
    
    return pinecone;
  };

export const storeEmbedding = async (index, id, embedding,metadata) => {
  
  await index.namespace("yt-embed").upsert([{
    id,
    values: embedding,
    metadata: metadata
  }]);
};

export const queryEmbedding = async (index, embedding) => {
  const queryResponse = await index.namespace("yt-embed").query({
    topK: 5,
    vector: embedding,
    includeValues: true, 
    includeMetadata: true,
  });

  return queryResponse.matches;
};

