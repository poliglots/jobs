import { useState } from "react";

const KNOWN_SOURCES = ["aws", "google", "here", "mastercard"];

const TECH_STACKS = [
  "Python", "Java", "Go", "TypeScript", "JavaScript", "C++",
  "Rust", "Kotlin", "SQL", "AWS", "Kubernetes", "React", "Node.js", "ML", "AI",
];

function Nav({
  lastUpdate,
  onSourceChange,
  sources,
  activeSource,
  locationFilter,
  onLocationChange,
  techFilters,
  onTechToggle,
}: {
  lastUpdate: string;
  onSourceChange: (val: string) => void;
  sources: string[];
  activeSource: string;
  locationFilter: string;
  onLocationChange: (val: string) => void;
  techFilters: string[];
  onTechToggle: (tech: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (source: string) => {
    onSourceChange(activeSource === source ? "" : source);
    setIsExpanded(false);
  };

  return (
    <header id="navbar">
      <div className="nav-row nav-row-top">
        <a
          className="nav-brand"
          href="https://poliglots.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jobs · Poliglots
        </a>
        <button
          className="nav-toggle"
          onClick={() => setIsExpanded((v) => !v)}
          aria-label="Toggle sources"
        >
          {isExpanded ? "✕" : "☰"}
        </button>
        <div className={`nav-sources${isExpanded ? " is-open" : ""}`}>
          <span className="nav-sources-label">Companies</span>
          {sources.map((s) => {
            const cls = KNOWN_SOURCES.includes(s) ? `source-${s}` : "source-default";
            return (
              <button
                key={s}
                className={`nav-source-btn ${cls}${activeSource === s ? " is-active" : ""}`}
                onClick={() => handleClick(s)}
              >
                {s}
              </button>
            );
          })}
        </div>
        <span className="nav-updated">updated {lastUpdate} UTC</span>
      </div>
      <div className="nav-row nav-row-filters">
        <input
          className="nav-location-input"
          type="text"
          placeholder="Filter by location…"
          value={locationFilter}
          onChange={(e) => onLocationChange(e.target.value)}
        />
        <div className={`nav-tech-pills${isExpanded ? " is-open" : ""}`}>
          <span className="nav-sources-label">Tech</span>
          {TECH_STACKS.map((tech) => (
            <button
              key={tech}
              className={`nav-tech-pill${techFilters.includes(tech) ? " is-active" : ""}`}
              onClick={() => onTechToggle(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Nav;
