import "./App.css";
import data from "../../dist/jobs.json";
import lastRun from "../../dist/time.json";
import JobCard from "./JobCard";
import Nav from "./Nav";
import { useState } from "react";

const sources = [...new Set(data.map((item) => item.level))].sort();

const seenIds = new Set<string>();
const deduped = data.filter((item) => {
  if (seenIds.has(item.id)) return false;
  seenIds.add(item.id);
  return true;
});

const locations = [...new Set(
  deduped
    .map((item) => item.location.split(",").at(-1)?.trim())
    .filter(Boolean) as string[]
)].sort();

function App() {
  const [sourceFilters, setSourceFilters] = useState<string[]>([]);
  const [locationFilters, setLocationFilters] = useState<string[]>([]);
  const [techFilters, setTechFilters] = useState<string[]>([]);

  const toggleSource = (src: string) =>
    setSourceFilters((prev) =>
      prev.includes(src) ? prev.filter((s) => s !== src) : [...prev, src]
    );

  const addLocation = (loc: string) =>
    setLocationFilters((prev) => (prev.includes(loc) ? prev : [...prev, loc]));
  const removeLocation = (loc: string) =>
    setLocationFilters((prev) => prev.filter((l) => l !== loc));

  const toggleTech = (tech: string) =>
    setTechFilters((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );

  const filtered = deduped
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    .filter((item) => {
      if (sourceFilters.length > 0 && !sourceFilters.includes(item.level)) return false;
      if (locationFilters.length > 0 && !locationFilters.some((l) => item.location.toLowerCase().includes(l.toLowerCase()))) return false;
      if (techFilters.length > 0) {
        const haystack = [
          item.title,
          item.description,
          item.jobDescription ?? "",
          item.basicQualifications ?? "",
          item.preferredQualifications ?? "",
        ].join(" ").toLowerCase();
        if (!techFilters.some((t) => haystack.includes(t.toLowerCase()))) return false;
      }
      return true;
    });

  return (
    <div id="layout">
      <Nav
        lastUpdate={lastRun.time.split("GMT")[0]}
        sources={sources}
        sourceFilters={sourceFilters}
        onSourceToggle={toggleSource}
        onSourceClear={() => setSourceFilters([])}
        locationFilters={locationFilters}
        onLocationAdd={addLocation}
        onLocationRemove={removeLocation}
        locationSuggestions={locations}
        techFilters={techFilters}
        onTechToggle={toggleTech}
        onTechClear={() => setTechFilters([])}
      />
      <div id="main">
        {filtered.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default App;
