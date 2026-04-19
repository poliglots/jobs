export interface Job {
  id: string;
  source?: string;
  title: string;
  company: string;
  location: string;
  description: string;
  jobDescription?: string;
  basicQualifications?: string;
  preferredQualifications?: string;
  url: string;
  postedAt: string;
}

export interface JobLog extends Job {
  level: string;
  message: string;
}
