export type TextSegment = {
  id: string;
  content: string;
};

export type ExtractedEntity = {
  type: string;
  value: string;
  normalized?: string;
  source_segment_id?: string;
};

export type ProposedAction = {
  function: string;
  arguments: Record<string, any>;
  source_segment_id: string;
};
