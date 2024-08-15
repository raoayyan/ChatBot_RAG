
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { fetchEmbeddings } from "./apiUtils";
// export const extractPdfText = async (file) => {
//   const dataBuffer = await file.arrayBuffer();
//   const data = await pdf(new Uint8Array(dataBuffer));
//   return data.text;
// };
import { storeEmbedding } from "./pineconeUtils";

export  const textSplitter = async (text) => {
  // console.log("data in textspliter cominf",text)
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 80,
      });
  
      const chunkedDocs = await splitter.createDocuments([text]);
    
      return chunkedDocs;
};

export const processAndStoreContent = async (index, content) => {
  const chunks = await textSplitter(content);
 
//this way if order of storing embedding is not important we can reduce a lot of time my doing Promise.all it will execute all in parallel thus reduce time
  await Promise.all(chunks.map(async (chunk, i) => {
    const embedding = await fetchEmbeddings(chunk.pageContent);
    const metadata = {
      text: chunk.pageContent,
    };
    await storeEmbedding(index, `chunk-${i}`, embedding, metadata);
  }));

};

