import { useState } from "react";

const KNOWN_SOURCES = ["aws", "google", "here", "mastercard"];

const TECH_STACKS = [
  "Python", "Java", "Go", "TypeScript", "JavaScript", "C++",
  "Rust", "Kotlin", "SQL", "AWS", "Kubernetes", "React", "Node.js", "ML", "AI",
];

function dotClass(source: string) {
  return KNOWN_SOURCES.includes(source) ? `sb-source-dot dot-${source}` : "sb-source-dot dot-default";
}

function SectionHeader({ label, showClear, onClear }: { label: string; showClear: boolean; onClear: () => void }) {
  return (
    <div className="sb-label-row">
      <span className="sb-label">{label}</span>
      {showClear && (
        <button className="sb-clear-btn" onClick={onClear}>Clear all</button>
      )}
    </div>
  );
}

function Nav({
  lastUpdate,
  sources,
  sourceFilters,
  onSourceToggle,
  onSourceClear,
  locationFilters,
  onLocationAdd,
  onLocationRemove,
  locationSuggestions,
  techFilters,
  onTechToggle,
  onTechClear,
}: {
  lastUpdate: string;
  sources: string[];
  sourceFilters: string[];
  onSourceToggle: (src: string) => void;
  onSourceClear: () => void;
  locationFilters: string[];
  onLocationAdd: (loc: string) => void;
  onLocationRemove: (loc: string) => void;
  locationSuggestions: string[];
  techFilters: string[];
  onTechToggle: (tech: string) => void;
  onTechClear: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (locationSuggestions.includes(val)) {
      onLocationAdd(val);
      setInputValue("");
    } else {
      setInputValue(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onLocationAdd(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <aside id="sidebar">
      <div className="sb-brand-row">
        <a
          className="sb-brand"
          href="https://poliglots.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jobs · Poliglots
        </a>
        <button
          className="sb-toggle"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle filters"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className={`sb-collapsible${isOpen ? " is-open" : ""}`}>

        {/* Location */}
        <div className="sb-section">
          <SectionHeader label="Location" showClear={locationFilters.length > 0} onClear={() => locationFilters.forEach(onLocationRemove)} />
          {locationFilters.length > 0 && (
            <div className="filter-chips">
              {locationFilters.map((loc) => (
                <span key={loc} className="filter-chip">
                  {loc}
                  <button className="filter-chip-remove" onClick={() => onLocationRemove(loc)} aria-label={`Remove ${loc}`}>✕</button>
                </span>
              ))}
            </div>
          )}
          <input
            className="sb-input"
            type="text"
            placeholder="Add country…"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            list="location-suggestions"
          />
          <datalist id="location-suggestions">
            {locationSuggestions
              .filter((loc) => !locationFilters.includes(loc))
              .map((loc) => (
                <option key={loc} value={loc} />
              ))}
          </datalist>
        </div>

        {/* Companies */}
        <div className="sb-section">
          <SectionHeader label="Companies" showClear={sourceFilters.length > 0} onClear={onSourceClear} />
          {sourceFilters.length > 0 && (
            <div className="filter-chips">
              {sourceFilters.map((s) => (
                <span key={s} className="filter-chip">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                  <button className="filter-chip-remove" onClick={() => onSourceToggle(s)} aria-label={`Remove ${s}`}>✕</button>
                </span>
              ))}
            </div>
          )}
          <div className="sb-sources">
            {sources.map((s) => (
              <button
                key={s}
                className={`sb-source-btn${sourceFilters.includes(s) ? " is-active" : ""}`}
                onClick={() => onSourceToggle(s)}
              >
                <span className={dotClass(s)} />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="sb-section">
          <SectionHeader label="Tech stack" showClear={techFilters.length > 0} onClear={onTechClear} />
          {techFilters.length > 0 && (
            <div className="filter-chips">
              {techFilters.map((t) => (
                <span key={t} className="filter-chip">
                  {t}
                  <button className="filter-chip-remove" onClick={() => onTechToggle(t)} aria-label={`Remove ${t}`}>✕</button>
                </span>
              ))}
            </div>
          )}
          <div className="sb-tech-pills">
            {TECH_STACKS.map((tech) => (
              <button
                key={tech}
                className={`sb-tech-pill${techFilters.includes(tech) ? " is-active" : ""}`}
                onClick={() => onTechToggle(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <p className="sb-updated">Updated {lastUpdate} UTC</p>
      </div>
    </aside>
  );
}

export default Nav;
