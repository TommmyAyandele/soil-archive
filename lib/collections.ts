import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface CollectionConfig {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description?: string;
  region: string;
  year: string;
  yearRange: string;
  featured: boolean;
  tags: string[];
  coverColor: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export interface Document {
  type: "text" | "letter" | "poem" | "photograph" | "speech";
  title: string;
  date?: string;
  author?: string;
  body: string;
  placeholder?: boolean;
}

export interface UIPerspective {
  id: string;
  label: string;
  position: string;
  description: string;
}

export interface CollectionUI {
  hero: {
    subtitle: string;
    description: string;
    tags: string[];
  };
  sections: {
    overviewLabel: string;
    documentsLabel: string;
    documentsHeading: string;
    timelineLabel: string;
    timelineHeading: string;
    teachingLabel: string;
    teachingHeading: string;
  };
  sidebar: {
    label: string;
    executed: string;
  };
  courtroom: {
    heading: string;
    location: string;
    body: string;
    footnote: string;
    heroFootnote: string;
  };
  perspectives: UIPerspective[];
}

const CONTENT_DIR = path.join(process.cwd(), "content", "collections");

export const SUPPORTED_LANGS = ["english", "igbo", "hausa", "yoruba", "khana"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export function getAllCollections(): CollectionConfig[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const slugs = fs.readdirSync(CONTENT_DIR).filter((d) => {
    return fs.statSync(path.join(CONTENT_DIR, d)).isDirectory();
  });
  return slugs
    .map((slug) => getCollectionConfig(slug))
    .filter(Boolean) as CollectionConfig[];
}

export function getCollectionConfig(slug: string): CollectionConfig | null {
  const configPath = path.join(CONTENT_DIR, slug, "config.json");
  if (!fs.existsSync(configPath)) return null;
  const raw = fs.readFileSync(configPath, "utf-8");
  return { slug, ...JSON.parse(raw) };
}

export function getAvailableLanguages(slug: string): string[] {
  const transDir = path.join(CONTENT_DIR, slug, "translations");
  const available: string[] = ["english"];
  if (!fs.existsSync(transDir)) return available;
  const dirs = fs.readdirSync(transDir).filter((d) => {
    const p = path.join(transDir, d);
    if (!fs.statSync(p).isDirectory()) return false;
    return fs.existsSync(path.join(p, "index.mdx"));
  });
  return [...available, ...dirs];
}

export function getCollectionOverview(
  slug: string,
  lang?: string
): { content: string; data: Record<string, unknown> } | null {
  const normalized = lang?.toLowerCase();
  if (normalized && normalized !== "english") {
    const transPath = path.join(CONTENT_DIR, slug, "translations", normalized, "index.mdx");
    if (fs.existsSync(transPath)) {
      const raw = fs.readFileSync(transPath, "utf-8");
      const { content, data } = matter(raw);
      return { content, data };
    }
  }
  const mdxPath = path.join(CONTENT_DIR, slug, "index.mdx");
  if (!fs.existsSync(mdxPath)) return null;
  const raw = fs.readFileSync(mdxPath, "utf-8");
  const { content, data } = matter(raw);
  return { content, data };
}

export function getCollectionTimeline(slug: string, lang?: string): TimelineEntry[] {
  const normalized = lang?.toLowerCase();
  if (normalized && normalized !== "english") {
    const transPath = path.join(CONTENT_DIR, slug, "translations", normalized, "timeline.json");
    if (fs.existsSync(transPath)) {
      return JSON.parse(fs.readFileSync(transPath, "utf-8"));
    }
  }
  const jsonPath = path.join(CONTENT_DIR, slug, "timeline.json");
  if (!fs.existsSync(jsonPath)) return [];
  return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
}

export function getCollectionUI(slug: string, lang?: string): CollectionUI | null {
  const normalized = lang?.toLowerCase();
  if (normalized && normalized !== "english") {
    const transPath = path.join(CONTENT_DIR, slug, "translations", normalized, "ui.json");
    if (fs.existsSync(transPath)) {
      return JSON.parse(fs.readFileSync(transPath, "utf-8")) as CollectionUI;
    }
  }
  const basePath = path.join(CONTENT_DIR, slug, "ui.json");
  if (!fs.existsSync(basePath)) return null;
  return JSON.parse(fs.readFileSync(basePath, "utf-8")) as CollectionUI;
}

export function getCollectionDocuments(slug: string, lang?: string): Document[] {
  const normalized = lang?.toLowerCase();
  if (normalized && normalized !== "english") {
    const transPath = path.join(CONTENT_DIR, slug, "translations", normalized, "documents.json");
    if (fs.existsSync(transPath)) {
      return JSON.parse(fs.readFileSync(transPath, "utf-8"));
    }
  }
  const jsonPath = path.join(CONTENT_DIR, slug, "documents.json");
  if (!fs.existsSync(jsonPath)) return [];
  return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
}
