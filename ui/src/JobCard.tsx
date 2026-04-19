import { useState } from "react";
import Modal from "./Modal";
import type { JobLog } from "../../crawl/src/store";

const stripHtml = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/\s{2,}/g, " ").trim();

const KNOWN_SOURCES = ["aws", "google", "here", "mastercard"];

function sourceBadgeClass(level: string) {
  return KNOWN_SOURCES.includes(level) ? `source-${level}` : "source-default";
}

function JobCard({ job }: { job: JobLog }) {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <>
      <article className="job-card" onClick={() => setIsModalActive(true)}>
        <div className="job-card-header">
          <p className="job-title">{job.title}</p>
          <span className={`source-badge ${sourceBadgeClass(job.level)}`}>
            {job.level}
          </span>
        </div>
        <div className="job-card-body">
          <p className="job-location">{job.location}</p>
          <p className="job-message">{stripHtml(job.jobDescription || job.message)}</p>
          <time className="job-date">
            {new Date(job.postedAt).toDateString()}
          </time>
        </div>
      </article>
      <Modal
        isActive={isModalActive}
        onClose={() => setIsModalActive(false)}
        source={job.level}
        title={job.title}
        company={job.company}
        location={job.location}
        url={job.url}
        jobDescription={job.jobDescription ?? ""}
        basicQualifications={job.basicQualifications ?? ""}
        preferredQualifications={job.preferredQualifications ?? ""}
      />
    </>
  );
}

export default JobCard;
