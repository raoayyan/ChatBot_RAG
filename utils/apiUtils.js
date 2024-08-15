export const fetchEmbeddings = async (text) => {
  
    const response = await fetch('https://api-inference.huggingface.co/models/intfloat/multilingual-e5-large', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}` },
      body: JSON.stringify({ inputs: text })
    });
    const embeddings = await response.json();
    return embeddings;
  };
  
  export const generateResponse = async (userQuery, context) => {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        prompt: `Context: ${context}\n\nQuestion: ${userQuery}`,
        max_tokens: 200
      })
    });
    const data = await response.json();
    return data.choices[0].text;
  };
  