import { ActivityType } from "./activity/activity.type";

export interface baseMongooseType {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface baseState {
  loading: boolean;
  error: string;
}

export interface ActivityProps {
  activity: ActivityType;
}
export type { ActivityType };

export interface SlideshowProps {
  pages: SlidePage[];
}

interface SlidePage {
  title: string | undefined;
  font: string | undefined;
  background: string | undefined;
  text: string | undefined;
}

export interface TestimonialProps {
  testimonial: {
    title: string | undefined;
    text: string | undefined;
    image: string | undefined;
    name: string | undefined;
  };
}
