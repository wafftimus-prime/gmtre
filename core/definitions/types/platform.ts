import { AppFeature } from "../models/application";

// Types
export type Scheme = 'auto' | 'dark' | 'light';
export type Screens = { [key: string]: string };
export type Theme = 'theme-default' | string;
export type Themes = { id: string; name: string }[];
export type Layout =
  | 'empty'
  // Horizontal
  | 'centered'
  | 'enterprise'
  | 'material'
  | 'modern'
  // Vertical
  | 'classic'
  | 'classy'
  | 'compact'
  | 'dense'
  | 'futuristic'
  | 'thin';


