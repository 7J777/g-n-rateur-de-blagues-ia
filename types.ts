export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface JokeResult {
  joke: string;
  sources: GroundingChunk[];
}