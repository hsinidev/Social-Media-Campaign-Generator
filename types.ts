
export interface CampaignData {
  productDescription: string;
  brandVoice: string;
  authorName: string;
}

export interface PlatformsState {
  twitter: boolean;
  instagram: boolean;
  linkedin: boolean;
  facebook: boolean;
  quora: boolean;
}

export interface InstagramPost {
  caption: string;
  image_idea: string;
}

export interface CampaignResponse {
  author: string;
  poweredBy: string;
  tweets: string[];
  instagram_posts: InstagramPost[];
  linkedin_post: string;
  facebook_post: string;
  quora_answer: string;
}
