const QDIV0_API_URL = "https://api.qdiv0.com/v1/chat/completions";

export interface Qdiv0Message {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
}

export interface Qdiv0Options {
  messages: Qdiv0Message[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export async function createQdiv0ChatCompletion(options: Qdiv0Options): Promise<Response> {
  const apiKey = process.env.QDIV0_API_KEY;

  if (!apiKey) {
    throw new Error("QDIV0_API_KEY missing in environment");
  }

  const response = await fetch(QDIV0_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: options.model || "unsloth/qwen3.6-35b-a3b-mtp-gguf",
      messages: options.messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 2000,
      stream: options.stream ?? false,
    }),
  });

  return response;
}

export async function createQdiv0Stream(options: Qdiv0Options): Promise<ReadableStream> {
  const response = await createQdiv0ChatCompletion({ ...options, stream: true });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Qdiv0 API error: ${response.status} - ${error}`);
  }

  return response.body!;
}