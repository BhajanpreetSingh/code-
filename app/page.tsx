"use client";

import {
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  CloudSun,
  Compass,
  FolderLock,
  Hotel,
  ImageIcon,
  Map,
  MapPinned,
  Menu,
  MessageCircleHeart,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Plane,
  Search,
  Send,
  ShieldPlus,
  Sparkles,
  Stamp,
  Sun,
  Upload,
  Wallet,
  WandSparkles
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  { id: "journey", label: "Journey", icon: Plane },
  { id: "itinerary", label: "Itinerary", icon: MapPinned },
  { id: "discover", label: "Discover", icon: Sparkles },
  { id: "budget", label: "Budget", icon: Wallet },
  { id: "wallet", label: "Travel Wallet", icon: FolderLock },
  { id: "companion", label: "AI Companion", icon: MessageCircleHeart }
];

const journeySteps = [
  { label: "Flights Ready", detail: "Seats selected for all travelers", done: true },
  { label: "Hotel Reserved", detail: "Aoyama boutique stay confirmed", done: true },
  { label: "Visa Pending", detail: "Application draft is prepared", done: false },
  { label: "Insurance Needed", detail: "Choose coverage before departure", done: false }
];

const dayStories = [
  {
    day: "Day 1",
    title: "Shibuya, softly at night",
    weather: "18 C, clear",
    map: "2.4 km gentle route",
    image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1200&q=86",
    moments: ["Morning arrival and private transfer", "Afternoon check-in with skyline tea", "Evening ramen walk under city lights"]
  },
  {
    day: "Day 2",
    title: "Design lanes of Aoyama",
    weather: "20 C, crisp",
    map: "4 stops curated",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=86",
    moments: ["Morning garden museum", "Afternoon Omotesando architecture", "Evening sunset from Shibuya Sky"]
  },
  {
    day: "Day 3",
    title: "Old Tokyo in Yanaka",
    weather: "17 C, golden",
    map: "Lantern route nearby",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=86",
    moments: ["Morning shrine lanes", "Afternoon ceramics and tiny cafes", "Evening autumn lantern market"]
  }
];

const discoveries = [
  {
    label: "Hidden Gems",
    title: "A candlelit listening bar in Ebisu",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1100&q=86"
  },
  {
    label: "Local Food",
    title: "Vegetarian izakaya tasting",
    image: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1100&q=86"
  },
  {
    label: "Photography",
    title: "Blue hour along Meguro River",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1100&q=86"
  },
  {
    label: "Cultural",
    title: "Private tea ritual in a quiet machiya",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1100&q=86"
  },
  {
    label: "Nature",
    title: "Autumn maples at Rikugien Garden",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1200&q=86"
  }
];

const budgetCategories = [
  ["Flights", "$2,400"],
  ["Hotels", "$2,060"],
  ["Food", "$720"],
  ["Experiences", "$1,000"],
  ["Transport", "$310"]
];

const documents = [
  { label: "Passport", status: "Ready", icon: BadgeCheck },
  { label: "Visa", status: "Pending", icon: Stamp },
  { label: "Insurance", status: "Needed", icon: ShieldPlus },
  { label: "Flight Tickets", status: "Uploaded", icon: Plane },
  { label: "Hotel Reservations", status: "Uploaded", icon: Hotel }
];

const prompts = ["Plan my perfect day.", "Find hidden local restaurants.", "Adjust my plans because of rain.", "Suggest unique experiences nearby."];

export default function Home() {
  const [activePage, setActivePage] = useState("journey");
  const [isDark, setIsDark] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    document.body.classList.toggle("collapsed", isCollapsed);
    document.body.classList.toggle("nav-open", isNavOpen);
  }, [isDark, isCollapsed, isNavOpen]);

  const pageTitle = useMemo(() => navItems.find((item) => item.id === activePage)?.label ?? "Journey", [activePage]);

  function openPage(pageId: string) {
    setActivePage(pageId);
    setIsNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#journey" aria-label="Wayfound journey" onClick={() => openPage("journey")}>
          <span className="brand-mark"><Compass /></span>
          <span>
            <strong>Wayfound</strong>
            <small>Luxury Travel AI</small>
          </span>
        </a>

        <nav className="nav-list" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                className={activePage === item.id ? "active" : undefined}
                href={`#${item.id}`}
                key={item.id}
                onClick={(event) => {
                  event.preventDefault();
                  openPage(item.id);
                }}
              >
                <Icon />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <button className="collapse-btn" type="button" aria-label="Collapse sidebar" onClick={() => setIsCollapsed((value) => !value)}>
          {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </button>
      </aside>

      <main className="main" aria-label={pageTitle}>
        <header className="topbar">
          <button className="icon-btn mobile-menu" type="button" aria-label="Open navigation" onClick={() => setIsNavOpen((value) => !value)}>
            <Menu />
          </button>
          <label className="search">
            <Search />
            <input type="search" placeholder="Search Tokyo, notes, reservations" />
          </label>
          <button className="icon-btn" type="button" aria-label="Toggle theme" onClick={() => setIsDark((value) => !value)}>
            {isDark ? <Sun /> : <Moon />}
          </button>
          <button className="profile" type="button" aria-label="Open profile">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80" alt="" />
          </button>
        </header>

        <section className={`page journey-page ${activePage === "journey" ? "active" : ""}`} id="journey" hidden={activePage !== "journey"}>
          <article className="trip-hero">
            <div className="hero-image" />
            <div className="hero-content">
              <p className="eyebrow">Your next memory begins here</p>
              <h1>Tokyo</h1>
              <div className="trip-meta">
                <span><CalendarDays /> Oct 12 - Oct 22</span>
                <span>10 Days</span>
                <span>4 Travelers</span>
              </div>
              <button className="primary-btn"><WandSparkles /> Continue Planning</button>
            </div>
            <div className="hero-note">
              <span>AI Insight</span>
              <strong>Tokyo&apos;s Autumn Lantern Festival is happening 2 km from your hotel.</strong>
              <button type="button">Add the evening <ChevronRight /></button>
            </div>
          </article>

          <section className="journey-progress" aria-label="Today's Journey Progress">
            <div className="section-kicker">
              <p className="eyebrow">Today&apos;s Journey Progress</p>
              <h2>The essentials are becoming effortless.</h2>
            </div>
            <div className="preparation-line">
              {journeySteps.map((step) => (
                <article className={step.done ? "step-card done" : "step-card"} key={step.label}>
                  <span>{step.done ? <Check /> : <Sparkles />}</span>
                  <strong>{step.label}</strong>
                  <p>{step.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className={`page story-page ${activePage === "itinerary" ? "active" : ""}`} id="itinerary" hidden={activePage !== "itinerary"}>
          <div className="page-heading">
            <p className="eyebrow">Itinerary</p>
            <h2>Every day reads like a travel story.</h2>
          </div>
          <div className="editorial-timeline">
            {dayStories.map((story) => (
              <article className="day-story" key={story.day}>
                <img src={story.image} alt="" />
                <div>
                  <span>{story.day}</span>
                  <h3>{story.title}</h3>
                  <div className="story-meta">
                    <small><CloudSun /> {story.weather}</small>
                    <small><Map /> {story.map}</small>
                  </div>
                  <ul>
                    {story.moments.map((moment) => <li key={moment}>{moment}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`page discover-page ${activePage === "discover" ? "active" : ""}`} id="discover" hidden={activePage !== "discover"}>
          <div className="page-heading">
            <p className="eyebrow">Discover</p>
            <h2>One beautiful reason to get lost.</h2>
          </div>
          <div className="masonry">
            {discoveries.map((discovery, index) => (
              <article
                className={`experience ${index === 0 ? "tall" : ""} ${index === 4 ? "wide-card" : ""}`}
                key={discovery.title}
                style={{ "--img": `url('${discovery.image}')` } as React.CSSProperties}
              >
                <span>{discovery.label}</span>
                <h3>{discovery.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className={`page calm-page ${activePage === "budget" ? "active" : ""}`} id="budget" hidden={activePage !== "budget"}>
          <div className="page-heading centered">
            <p className="eyebrow">Budget</p>
            <h2>Clarity without killing the romance.</h2>
          </div>
          <article className="budget-card panel">
            <div className="budget-main">
              <span>Budget Used</span>
              <strong>$6,420</strong>
              <p>$1,580 remains for spontaneous magic.</p>
              <div className="budget-progress"><span /></div>
            </div>
            <div className="category-list">
              {budgetCategories.map(([label, value]) => (
                <div key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
          </article>
        </section>

        <section className={`page wallet-page ${activePage === "wallet" ? "active" : ""}`} id="wallet" hidden={activePage !== "wallet"}>
          <div className="page-heading">
            <p className="eyebrow">Travel Wallet</p>
            <h2>Your digital passport, beautifully ready.</h2>
          </div>
          <div className="document-grid">
            {documents.map((document) => {
              const Icon = document.icon;
              return (
                <article key={document.label}>
                  <Icon />
                  <span>{document.label}</span>
                  <strong>{document.status}</strong>
                </article>
              );
            })}
            <button className="upload-card"><Upload /><span>Upload document</span></button>
          </div>
        </section>

        <section className={`page companion-page ${activePage === "companion" ? "active" : ""}`} id="companion" hidden={activePage !== "companion"}>
          <div className="companion-shell">
            <div className="companion-intro">
              <p className="eyebrow">AI Companion</p>
              <h2>A personal travel expert, not a chatbot.</h2>
              <p>Ask Wayfound for a perfect day, hidden food, rainy-day replans, etiquette, routes, or a more memorable evening.</p>
            </div>
            <div className="chat-window">
              <div className="chat-line ai">I moved your garden walk away from Wednesday&apos;s rain and found a gallery route with a late tea room nearby.</div>
              <div className="prompt-grid">
                {prompts.map((prompt) => <button key={prompt}>{prompt}</button>)}
              </div>
              <label className="chat-input">
                <input placeholder="Ask Wayfound anything about your trip" />
                <button type="button" aria-label="Send message"><Send /></button>
              </label>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
