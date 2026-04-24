const { useState, useEffect, useMemo } = React;

// === TWEAK DEFAULTS — edit-mode persists these ===
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "comfy"
}/*EDITMODE-END*/;

// ---- utilities ----
function toTitle(filename) {
  return filename
    .replace(/\.html?$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

function pad(n, w = 2) { return String(n).padStart(w, "0"); }

function formatDate(d = new Date()) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// ---- masthead ----
function Masthead({ count }) {
  return (
    <header className="masthead">
      <div className="masthead-top">
        <div className="volume">
          <span>Vol. I</span>
          <span>No. 01</span>
        </div>
        <div>{formatDate()}</div>
        <div>Interactive Demos&nbsp;/&nbsp;Client Review</div>
      </div>

      <h1 className="masthead-title">
        The Demos<span className="amp"> &amp; </span>Prototypes
      </h1>

      <div className="masthead-sub">
        <p className="tagline">
          A private gallery of interactive HTML prototypes — each one a working
          sketch of the product we're building for you.
        </p>
        <div className="masthead-meta">
          <span>Catalogue</span>
          <span className="num">{pad(count, 2)}</span>
        </div>
      </div>
    </header>
  );
}

// ---- toolbar ----
function SearchIcon() {
  return (
    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function Toolbar({ query, setQuery, shown, total }) {
  return (
    <div className="toolbar">
      <div className="search">
        <SearchIcon />
        <input
          autoFocus
          placeholder="Search by name…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="toolbar-count">
        {shown === total ? `${pad(total,2)} entries` : `${pad(shown,2)} of ${pad(total,2)}`}
      </div>
    </div>
  );
}

// ---- card ----
function DemoCard({ item, index }) {
  const title = toTitle(item.filename);
  const viewerUrl = `viewer.html?f=${encodeURIComponent(item.filename)}`;

  return (
    <a className="card" href={viewerUrl}>
      <div className="card-head">
        <span className="card-index">№ {pad(index + 1, 3)}</span>
        <span className="card-chevron">→</span>
      </div>
      <h3 className="card-title">{title}</h3>
      <div className="card-filename">{item.filename}</div>
    </a>
  );
}

// ---- empty state ----
function Empty({ query }) {
  if (query) {
    return (
      <div className="empty">
        <h2>No entries found</h2>
        <p>Nothing in the catalogue matches “{query}”. Try another name.</p>
      </div>
    );
  }
  return (
    <div className="empty">
      <h2>The catalogue is empty</h2>
      <p>
        Drop HTML files into the <code>html_standalones/</code> folder and add
        their filenames to <code>manifest.js</code>. They'll appear here.
      </p>
    </div>
  );
}

// ---- tweaks ----
function DemoTweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Display">
        <TweakRadio
          label="Card density"
          value={tweaks.density}
          options={[
            { value: "compact", label: "Compact" },
            { value: "comfy", label: "Comfy" },
            { value: "spacious", label: "Spacious" },
          ]}
          onChange={v => setTweak("density", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ---- app ----
function App() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(() => window.DEMO_MANIFEST || []);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // map tweak → root attribute for CSS
  useEffect(() => {
    const density = tweaks.density === "compact" ? "compact"
      : tweaks.density === "spacious" ? "spacious" : "";
    if (density) document.documentElement.setAttribute("data-density", density);
    else document.documentElement.removeAttribute("data-density");
  }, [tweaks.density]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(it =>
      it.filename.toLowerCase().includes(q) ||
      toTitle(it.filename).toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className="page">
      <Masthead count={items.length} />
      <Toolbar query={query} setQuery={setQuery} shown={filtered.length} total={items.length} />

      {filtered.length === 0 ? (
        <Empty query={query} />
      ) : (
        <div className="grid">
          {filtered.map((item, i) => (
            <DemoCard key={item.filename} item={item} index={i} />
          ))}
        </div>
      )}

      <div className="ornament">· · ·</div>

      <footer className="footer">
        <span>Interactive Prototypes Catalogue</span>
        <span className="fleur">❦</span>
        <span>Printed for internal review</span>
      </footer>

      <DemoTweaks tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
