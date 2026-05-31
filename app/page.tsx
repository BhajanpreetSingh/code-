"use client";

import {
  BadgeCheck,
  Bell,
  Check,
  Clock,
  Compass,
  FolderLock,
  Hotel,
  ImageIcon,
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
  Shuffle,
  Sparkles,
  Stamp,
  Sun,
  Timer,
  Upload,
  Wallet,
  WandSparkles
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "itinerary", label: "Itinerary", icon: MapPinned },
  { id: "experiences", label: "Experiences", icon: ImageIcon },
  { id: "budget", label: "Budget", icon: Wallet },
  { id: "documents", label: "Documents", icon: FolderLock },
  { id: "companion", label: "AI Companion", icon: MessageCircleHeart }
];

const focusItems = [
  { label: "Flights booked", done: true },
  { label: "Hotel confirmed", done: true },
  { label: "Visa pending", done: false },
  { label: "Insurance pending", done: false }
];

const dayStories = [
  {
    day: "Day 1",
    title: "Arrival in Shibuya",
    body: "Check in, slow ramen dinner, and a quiet first walk beneath the city lights.",
    image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=900&q=80"
  },
  {
    day: "Day 2",
    title: "Aoyama design wander",
    body: "Garden museum, Omotesando architecture, and sunset from Shibuya Sky.",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=80"
  },
  {
    day: "Day 3",
    title: "Yanaka old Tokyo",
    body: "Ceramics, tiny cafes, shrine lanes, and the lantern market AI discovered.",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80"
  }
];

const experiences = [
  {
    className: "tall",
    label: "Food Experience",
    title: "Vegetarian izakaya tasting",
    image: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1000&q=85"
  },
  {
    label: "Photography",
    title: "Blue hour at Meguro River",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=85"
  },
  {
    label: "Cultural",
    title: "Private tea ritual",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85"
  },
  {
    className: "wide-card",
    label: "Hidden Gem",
    title: "Quiet book cafes in Kichijoji",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1200&q=85"
  }
];

const budgetCategories = [
  ["Flights", "$2,400"],
  ["Hotels", "$2,060"],
  ["Food", "$720"],
  ["Activities", "$1,000"],
  ["Transport", "$310"]
];

const documents = [
  { label: "Passport", status: "Ready", icon: BadgeCheck },
  { label: "Visa", status: "Pending", icon: Stamp },
  { label: "Insurance", status: "Missing", icon: ShieldPlus },
  { label: "Flight Tickets", status: "Uploaded", icon: Plane },
  { label: "Hotel Bookings", status: "Uploaded", icon: Hotel }
];

const prompts = ["Plan my perfect day", "Find hidden food spots", "Replan because of rain", "Suggest local experiences"];

export default function Home() {
  const [activePage, setActivePage] = useState("overview");
  const [isDark, setIsDark] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    document.body.classList.toggle("collapsed", isCollapsed);
    document.body.classList.toggle("nav-open", isNavOpen);
  }, [isDark, isCollapsed, isNavOpen]);

  const pageTitle = useMemo(() => navItems.find((item) => item.id === activePage)?.label ?? "Overview", [activePage]);

  function openPage(pageId: string) {
    setActivePage(pageId);
    setIsNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="Wayfound overview" onClick={() => openPage("overview")}>
          <span className="brand-mark"><Compass /></span>
          <span>
            <strong>Wayfound</strong>
            <small>Travel Companion</small>
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
            <input type="search" placeholder="Search places, notes, bookings" />
          </label>
          <button className="icon-btn" type="button" aria-label="Notifications"><Bell /></button>
          <button className="icon-btn" id="themeToggle" type="button" aria-label="Toggle theme" onClick={() => setIsDark((value) => !value)}>
            {isDark ? <Sun /> : <Moon />}
          </button>
          <button className="profile" type="button" aria-label="Open profile">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80" alt="" />
          </button>
        </header>

        <section className={`page overview-page ${activePage === "overview" ? "active" : ""}`} id="overview" hidden={activePage !== "overview"}>
          <article className="trip-hero">
            <div className="hero-image" />
            <div className="hero-content">
              <p className="eyebrow">Upcoming Adventure</p>
              <h1>Tokyo, Japan</h1>
              <div className="trip-meta">
                <span>12 Oct - 22 Oct</span>
                <span>10 Days</span>
                <span>4 Travelers</span>
              </div>
              <button className="primary-btn"><WandSparkles /> Refine with AI</button>
            </div>
            <div className="readiness-card glass">
              <div className="ring" style={{ "--value": 82 } as React.CSSProperties}><span>82%</span></div>
              <div>
                <strong>Trip Readiness</strong>
                <p>Your essentials are almost complete.</p>
              </div>
            </div>
          </article>

          <div className="overview-grid">
            <article className="panel focus-card">
              <p className="eyebrow">Today&apos;s Focus</p>
              <h2>Finish the essentials</h2>
              <ul className="clean-list">
                {focusItems.map((item) => (
                  <li className={item.done ? "done" : undefined} key={item.label}>
                    {item.done ? <Check /> : <Clock />} {item.label}
                  </li>
                ))}
              </ul>
            </article>

            <article className="panel insight-card">
              <p className="eyebrow">AI Travel Insight</p>
              <h2>A hidden autumn festival is happening during your visit.</h2>
              <p>Wayfound found a small lantern market in Yanaka on your second evening, close to your food walk.</p>
              <button className="secondary-btn">Add to itinerary</button>
            </article>

            <article className="panel milestone-card">
              <p className="eyebrow">Next Milestone</p>
              <h2>Apply for Visa</h2>
              <span className="time-pill"><Timer /> 15 minutes</span>
              <button className="primary-btn">Start now</button>
            </article>
          </div>
        </section>

        <section className={`page story-page ${activePage === "itinerary" ? "active" : ""}`} id="itinerary" hidden={activePage !== "itinerary"}>
          <div className="page-heading">
            <p className="eyebrow">Itinerary</p>
            <h2>Each day, shaped like a story.</h2>
          </div>
          <div className="story-timeline">
            {dayStories.map((story) => (
              <article className="day-story" key={story.day}>
                <img src={story.image} alt="" />
                <div>
                  <span>{story.day}</span>
                  <h3>{story.title}</h3>
                  <p>{story.body}</p>
                </div>
              </article>
            ))}
          </div>
          <button className="floating-action"><Shuffle /> Optimize the week</button>
        </section>

        <section className={`page ${activePage === "experiences" ? "active" : ""}`} id="experiences" hidden={activePage !== "experiences"}>
          <div className="page-heading">
            <p className="eyebrow">Experiences</p>
            <h2>Inspiration that feels personal.</h2>
          </div>
          <div className="masonry">
            {experiences.map((experience) => (
              <article
                className={`experience ${experience.className ?? ""}`}
                key={experience.title}
                style={{ "--img": `url('${experience.image}')` } as React.CSSProperties}
              >
                <span>{experience.label}</span>
                <h3>{experience.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className={`page calm-page ${activePage === "budget" ? "active" : ""}`} id="budget" hidden={activePage !== "budget"}>
          <div className="page-heading centered">
            <p className="eyebrow">Budget</p>
            <h2>Simple money clarity, no spreadsheet energy.</h2>
          </div>
          <article className="budget-card panel">
            <div className="budget-main">
              <span>Total Budget</span>
              <strong>$8,000</strong>
              <p>$6,420 spent. $1,580 remaining.</p>
              <div className="budget-progress"><span /></div>
            </div>
            <div className="category-list">
              {budgetCategories.map(([label, value]) => (
                <div key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
          </article>
        </section>

        <section className={`page ${activePage === "documents" ? "active" : ""}`} id="documents" hidden={activePage !== "documents"}>
          <div className="page-heading">
            <p className="eyebrow">Documents</p>
            <h2>Your travel wallet, quietly organized.</h2>
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
              <h2>Your personal travel expert.</h2>
              <p>Ask for a perfect day, hidden food, rainy-day replans, local etiquette, or a calmer route.</p>
            </div>
            <div className="chat-window">
              <div className="chat-line ai">I noticed rain on Wednesday, so I moved your outdoor garden walk to Friday and found a gallery route nearby.</div>
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
