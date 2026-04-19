import "bulma/css/bulma.min.css";
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

function App() {
  const [filterBy, setFilterBy] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [techFilters, setTechFilters] = useState<string[]>([]);

  const toggleTech = (tech: string) =>
    setTechFilters((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );

  const filtered = deduped
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt))
    .filter((item) => {
      if (filterBy && item.level.toLowerCase() !== filterBy.toLowerCase()) return false;
      if (locationFilter && !item.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
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
    <div id="page">
      <Nav
        lastUpdate={lastRun.time.split("GMT")[0]}
        onSourceChange={setFilterBy}
        sources={sources}
        activeSource={filterBy}
        locationFilter={locationFilter}
        onLocationChange={setLocationFilter}
        techFilters={techFilters}
        onTechToggle={toggleTech}
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
