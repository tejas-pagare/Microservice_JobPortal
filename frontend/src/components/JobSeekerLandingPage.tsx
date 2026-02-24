"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Search,
    MapPin,
    Briefcase,
    Users,
    TrendingUp,
    DollarSign,
    PenTool,
    Megaphone,
    HeadphonesIcon,
    BarChart3,
    Code2,
    Building2,
    Globe,
    ArrowRight,
    Star,
    Upload,
    Mail,
    ChevronRight,
    Sparkles,
    FileText,
    Landmark,
    Handshake,
} from "lucide-react";
import CarrerGuide from "@/components/carrer-guide";
import ResumeAnalyzer from "@/components/resume-analyser";

/* ─── dummy data ─── */

const categories = [
    {
        icon: Megaphone,
        title: "Marketing",
        desc: "SEO, content strategy, social media & growth marketing roles.",
    },
    {
        icon: Code2,
        title: "Design & Development",
        desc: "UI/UX design, frontend, backend & full-stack engineering.",
    },
    {
        icon: Users,
        title: "Human Resources",
        desc: "Talent acquisition, employee experience & organizational design.",
    },
    {
        icon: Landmark,
        title: "Finance",
        desc: "Financial analysis, accounting, risk management & FinTech.",
    },
    {
        icon: Handshake,
        title: "Business Consulting",
        desc: "Strategy, management consulting & operational improvement.",
    },
    {
        icon: HeadphonesIcon,
        title: "Customer Support",
        desc: "Client success, technical support & helpdesk management.",
    },
];

const featuredJobs = [
    {
        id: 1,
        title: "Senior React Developer",
        company: "TechNova Inc.",
        location: "Bangalore, India",
        salary: "₹18–25 LPA",
        type: "Full-Time",
        description: "Build scalable front-end applications using React, TypeScript and modern web technologies.",
        logo: "https://ui-avatars.com/api/?name=TN&background=6366f1&color=fff&size=48&rounded=true",
    },
    {
        id: 2,
        title: "Product Marketing Manager",
        company: "GrowthPulse",
        location: "Mumbai, India",
        salary: "₹14–20 LPA",
        type: "Full-Time",
        description: "Drive go-to-market strategy and lead product positioning for SaaS solutions.",
        logo: "https://ui-avatars.com/api/?name=GP&background=22c55e&color=fff&size=48&rounded=true",
    },
    {
        id: 3,
        title: "UX/UI Designer",
        company: "PixelCraft Studio",
        location: "Hyderabad, India",
        salary: "₹12–18 LPA",
        type: "Full-Time",
        description: "Design intuitive user experiences and pixel-perfect interfaces for web and mobile apps.",
        logo: "https://ui-avatars.com/api/?name=PC&background=f59e0b&color=fff&size=48&rounded=true",
    },
    {
        id: 4,
        title: "Data Analyst",
        company: "Insightify",
        location: "Pune, India",
        salary: "₹10–15 LPA",
        type: "Remote",
        description: "Analyze data trends and build dashboards to support business decision-making.",
        logo: "https://ui-avatars.com/api/?name=IN&background=ef4444&color=fff&size=48&rounded=true",
    },
    {
        id: 5,
        title: "Financial Analyst",
        company: "WealthBridge",
        location: "Delhi NCR, India",
        salary: "₹12–17 LPA",
        type: "Full-Time",
        description: "Perform financial modelling, forecasting and investment analysis for enterprise clients.",
        logo: "https://ui-avatars.com/api/?name=WB&background=3b82f6&color=fff&size=48&rounded=true",
    },
    {
        id: 6,
        title: "DevOps Engineer",
        company: "CloudShift Labs",
        location: "Remote",
        salary: "₹20–30 LPA",
        type: "Remote",
        description: "Manage CI/CD pipelines, cloud infrastructure and container orchestration at scale.",
        logo: "https://ui-avatars.com/api/?name=CS&background=8b5cf6&color=fff&size=48&rounded=true",
    },
    {
        id: 7,
        title: "HR Business Partner",
        company: "PeopleFirst Corp",
        location: "Chennai, India",
        salary: "₹10–14 LPA",
        type: "Full-Time",
        description: "Partner with leadership to drive talent strategy, engagement and organizational growth.",
        logo: "https://ui-avatars.com/api/?name=PF&background=ec4899&color=fff&size=48&rounded=true",
    },
    {
        id: 8,
        title: "Content Strategist",
        company: "MediaMinds",
        location: "Bangalore, India",
        salary: "₹8–13 LPA",
        type: "Hybrid",
        description: "Develop content strategies and editorial calendars to boost brand engagement and SEO.",
        logo: "https://ui-avatars.com/api/?name=MM&background=14b8a6&color=fff&size=48&rounded=true",
    },
];





/* ─── component ─── */

const JobSeekerLandingPage = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="jobseeker-landing">
            {/* ═══ HERO ═══ */}
            <section className="jl-section" style={{ paddingBottom: 40, background: "var(--jl-surface)" }}>
                <div className="jl-container">
                    <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
                        <h1 className="jl-h1" style={{ marginBottom: 16 }}>
                            Get The{" "}
                            <span style={{ color: "var(--jl-primary)" }}>Right Job</span>{" "}
                            You Deserve
                        </h1>
                        <p
                            className="jl-body"
                            style={{ color: "var(--jl-text-muted)", marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}
                        >
                            Connect with top employers and discover opportunities that match
                            your skills. Whether you&apos;re a fresher or experienced
                            professional, HireHeaven makes job hunting effortless.
                        </p>

                        {/* Search bar */}
                        <div
                            className="jl-card"
                            style={{
                                padding: 16,
                                display: "flex",
                                gap: 12,
                                flexWrap: "wrap",
                                alignItems: "center",
                                textAlign: "left",
                            }}
                        >
                            <div style={{ flex: "1 1 200px", position: "relative" }}>
                                <Search
                                    size={18}
                                    style={{
                                        position: "absolute",
                                        left: 14,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "var(--jl-text-muted)",
                                    }}
                                />
                                <input
                                    className="jl-input"
                                    placeholder="Job title or keyword"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                />
                            </div>
                            <div style={{ flex: "1 1 200px", position: "relative" }}>
                                <MapPin
                                    size={18}
                                    style={{
                                        position: "absolute",
                                        left: 14,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "var(--jl-text-muted)",
                                    }}
                                />
                                <input
                                    className="jl-input"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                            <Link href="/jobs" style={{ flexShrink: 0 }}>
                                <button className="jl-btn-primary" style={{ height: 46 }}>
                                    <Search size={18} /> Search
                                </button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 48,
                                marginTop: 36,
                                flexWrap: "wrap",
                            }}
                        >
                            {[
                                { val: "10k+", label: "Active Jobs" },
                                { val: "5k+", label: "Companies" },
                                { val: "50k+", label: "Job Seekers" },
                            ].map((s) => (
                                <div key={s.label} style={{ textAlign: "center" }}>
                                    <p
                                        style={{
                                            fontSize: 28,
                                            fontWeight: 700,
                                            color: "var(--jl-primary)",
                                        }}
                                    >
                                        {s.val}
                                    </p>
                                    <p className="jl-caption">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ ONE PLATFORM MANY SOLUTIONS ═══ */}
            <section className="jl-section" style={{ background: "var(--jl-surface)" }}>
                <div className="jl-container">
                    <div style={{ textAlign: "center", marginBottom: 48 }}>
                        <h2 className="jl-h2">One Platform Many Solutions</h2>
                        <p
                            className="jl-body"
                            style={{ color: "var(--jl-text-muted)", marginTop: 8 }}
                        >
                            Explore opportunities across industries and find the perfect fit
                            for your career.
                        </p>
                    </div>
                    <div className="jl-grid-3">
                        {categories.map((cat) => (
                            <div className="jl-card" key={cat.title} style={{ cursor: "pointer" }}>
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 10,
                                        background: "var(--jl-badge-bg)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: 14,
                                    }}
                                >
                                    <cat.icon size={24} style={{ color: "var(--jl-primary)" }} />
                                </div>
                                <h3 className="jl-h3" style={{ marginBottom: 6 }}>
                                    {cat.title}
                                </h3>
                                <p className="jl-caption">{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ FEATURED JOB CIRCULARS ═══ */}
            <section className="jl-section">
                <div className="jl-container">
                    <div style={{ textAlign: "center", marginBottom: 48 }}>
                        <h2 className="jl-h2">
                            <span style={{ color: "var(--jl-primary)" }}>Featured</span> Job
                            Circulars
                        </h2>
                        <p
                            className="jl-body"
                            style={{ color: "var(--jl-text-muted)", marginTop: 8 }}
                        >
                            Handpicked opportunities from top companies across India.
                        </p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                        {featuredJobs.slice(0, 6).map((job) => (
                            <div className="jl-card" key={job.id} style={{ padding: 22, display: "flex", flexDirection: "column" }}>
                                {/* Company logo + name */}
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                                    <img
                                        src={job.logo}
                                        alt={job.company}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 10,
                                            objectFit: "cover",
                                        }}
                                    />
                                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--jl-text-muted)" }}>
                                        {job.company}
                                    </span>
                                </div>

                                {/* Job title */}
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--jl-text)", lineHeight: 1.4, marginBottom: 8 }}>
                                    {job.title}
                                </h3>

                                {/* Type badge */}
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "fit-content",
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: "var(--jl-chip-blue-text)",
                                        background: "var(--jl-chip-blue-bg)",
                                        padding: "4px 12px",
                                        borderRadius: 6,
                                        marginBottom: 12,
                                    }}
                                >
                                    {job.type}
                                </span>

                                {/* Description */}
                                <p
                                    style={{
                                        fontSize: 13,
                                        lineHeight: 1.6,
                                        color: "var(--jl-text-muted)",
                                        marginBottom: 18,
                                        flex: 1,
                                    }}
                                >
                                    {job.description}
                                </p>

                                {/* Salary + Apply button row */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        <DollarSign size={15} style={{ color: "var(--jl-success)" }} />
                                        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--jl-success)" }}>
                                            {job.salary}
                                        </span>
                                    </div>
                                    <Link href="/jobs">
                                        <button className="jl-job-apply-btn">
                                            Apply <ArrowRight size={14} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: "center", marginTop: 40 }}>
                        <Link href="/jobs">
                            <button className="jl-btn-primary">
                                View All Jobs <ArrowRight size={16} />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══ DISCOVER YOUR CAREER PATH ═══ */}
            <section className="jl-section" style={{ background: "var(--jl-surface)" }}>
                <div className="jl-container">
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 48,
                            alignItems: "center",
                        }}
                        className="jl-hero-grid"
                    >
                        {/* Left — descriptive content */}
                        <div>
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "6px 14px",
                                    borderRadius: 999,
                                    background: "var(--jl-badge-bg)",
                                    marginBottom: 20,
                                }}
                            >
                                <Sparkles size={16} style={{ color: "var(--jl-primary)" }} />
                                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--jl-primary)" }}>
                                    AI-Powered Career Guidance
                                </span>
                            </div>
                            <h2 className="jl-h2" style={{ marginBottom: 12 }}>
                                Discover Your <span style={{ color: "var(--jl-primary)" }}>Career Path</span>
                            </h2>
                            <p className="jl-body" style={{ color: "var(--jl-text-muted)", marginBottom: 28 }}>
                                Get personalized job recommendations and learning roadmaps based on your unique skill set. Our AI analyzes industry trends to guide your next career move.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                                {[
                                    { icon: TrendingUp, text: "Personalized career trajectory mapping" },
                                    { icon: Briefcase, text: "AI-matched role recommendations" },
                                    { icon: Star, text: "Skills gap analysis & learning paths" },
                                ].map((item, idx) => (
                                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div
                                            style={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: 8,
                                                background: "var(--jl-badge-bg)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <item.icon size={18} style={{ color: "var(--jl-primary)" }} />
                                        </div>
                                        <span style={{ fontSize: 15, color: "var(--jl-text)" }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — action card */}
                        <div
                            className="jl-card"
                            style={{
                                padding: 0,
                                overflow: "hidden",
                                border: "none",
                                boxShadow: "var(--jl-shadow)",
                            }}
                        >
                            <div
                                style={{
                                    background: "linear-gradient(135deg, var(--jl-card-gradient-from) 0%, var(--jl-card-gradient-via) 60%, var(--jl-card-gradient-to) 100%)",
                                    padding: "32px 28px 20px",
                                    color: "#FFFFFF",
                                }}
                            >
                                <Sparkles size={28} style={{ marginBottom: 12, opacity: 0.8 }} />
                                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
                                    Your Skills Deserve the Right Career
                                </h3>
                                <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6 }}>
                                    Add your skills and get an instant AI-generated career guide with job options, learning paths, and growth strategies.
                                </p>
                            </div>
                            <div style={{ padding: 28 }}>
                                <CarrerGuide />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ OPTIMIZE YOUR RESUME FOR ATS ═══ */}
            <section className="jl-section" style={{ background: "var(--jl-surface)" }}>
                <div className="jl-container">
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 48,
                            alignItems: "center",
                        }}
                        className="jl-hero-grid"
                    >
                        {/* Left — action card */}
                        <div
                            className="jl-card"
                            style={{
                                padding: 0,
                                overflow: "hidden",
                                border: "none",
                                boxShadow: "var(--jl-shadow)",
                            }}
                        >
                            <div
                                style={{
                                    background: "linear-gradient(135deg, var(--jl-card-gradient-from) 0%, var(--jl-card-gradient-via) 60%, var(--jl-card-gradient-to) 100%)",
                                    padding: "32px 28px 20px",
                                    color: "#FFFFFF",
                                }}
                            >
                                <FileText size={28} style={{ marginBottom: 12, opacity: 0.8 }} />
                                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
                                    Is Your Resume ATS-Ready?
                                </h3>
                                <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6 }}>
                                    Upload your resume and get an instant score with detailed recommendations to beat applicant tracking systems.
                                </p>
                            </div>
                            <div style={{ padding: 28 }}>
                                <ResumeAnalyzer />
                            </div>
                        </div>

                        {/* Right — descriptive content */}
                        <div>
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "6px 14px",
                                    borderRadius: 999,
                                    background: "var(--jl-badge-bg)",
                                    marginBottom: 20,
                                }}
                            >
                                <FileText size={16} style={{ color: "var(--jl-primary)" }} />
                                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--jl-primary)" }}>
                                    AI-Powered ATS Analysis
                                </span>
                            </div>
                            <h2 className="jl-h2" style={{ marginBottom: 12 }}>
                                Optimize Your Resume for <span style={{ color: "var(--jl-primary)" }}>ATS</span>
                            </h2>
                            <p className="jl-body" style={{ color: "var(--jl-text-muted)", marginBottom: 28 }}>
                                Most resumes get rejected by ATS before a human ever sees them. Our AI scanner identifies issues and provides actionable fixes to get you past the filters.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                                {[
                                    { icon: BarChart3, text: "Detailed ATS compatibility score" },
                                    { icon: TrendingUp, text: "Section-by-section breakdown" },
                                    { icon: Star, text: "Priority-ranked improvement suggestions" },
                                ].map((item, idx) => (
                                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div
                                            style={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: 8,
                                                background: "var(--jl-badge-bg)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <item.icon size={18} style={{ color: "var(--jl-primary)" }} />
                                        </div>
                                        <span style={{ fontSize: 15, color: "var(--jl-text)" }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ NEWSLETTER ═══ */}
            <section className="jl-section" style={{ background: "var(--jl-surface)" }}>
                <div className="jl-container" style={{ textAlign: "center" }}>
                    <h2 className="jl-h2" style={{ marginBottom: 8 }}>
                        Never Want to Miss Any{" "}
                        <span style={{ color: "var(--jl-primary)" }}>Job News</span>?
                    </h2>
                    <p
                        className="jl-body"
                        style={{ color: "var(--jl-text-muted)", marginBottom: 32 }}
                    >
                        Subscribe to our newsletter and get the latest job updates delivered
                        right to your inbox.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 12,
                            flexWrap: "wrap",
                            maxWidth: 520,
                            margin: "0 auto",
                        }}
                    >
                        <div style={{ flex: "1 1 300px", position: "relative" }}>
                            <Mail
                                size={18}
                                style={{
                                    position: "absolute",
                                    left: 14,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "var(--jl-text-muted)",
                                }}
                            />
                            <input
                                className="jl-input"
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            className="jl-btn-primary"
                            style={{ height: 46, flexShrink: 0 }}
                        >
                            Subscribe <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer className="jl-footer">
                <div className="jl-container">
                    <div className="jl-grid-4" style={{ marginBottom: 40 }}>
                        {/* Col 1 */}
                        <div>
                            <p
                                style={{
                                    fontSize: 22,
                                    fontWeight: 700,
                                    color: "var(--jl-text)",
                                    marginBottom: 12,
                                }}
                            >
                                Hire<span style={{ color: "#ef4444" }}>Heaven</span>
                            </p>
                            <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.75 }}>
                                HireHeaven is India&apos;s fastest-growing job portal connecting
                                talented professionals with leading companies. Find your dream
                                job today.
                            </p>
                        </div>
                        {/* Col 2 */}
                        <div>
                            <p
                                style={{
                                    fontWeight: 600,
                                    color: "var(--jl-text)",
                                    marginBottom: 16,
                                    fontSize: 15,
                                }}
                            >
                                About
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                    fontSize: 14,
                                }}
                            >
                                <Link href="/about">About Us</Link>
                                <Link href="/blog">Blog</Link>
                                <Link href="/about">Partners</Link>
                            </div>
                        </div>
                        {/* Col 3 */}
                        <div>
                            <p
                                style={{
                                    fontWeight: 600,
                                    color: "var(--jl-text)",
                                    marginBottom: 16,
                                    fontSize: 15,
                                }}
                            >
                                Jobs
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                    fontSize: 14,
                                }}
                            >
                                <Link href="/jobs">Browse Jobs</Link>
                                <Link href="/jobs">Categories</Link>
                                <Link href="/about">Contact</Link>
                            </div>
                        </div>
                        {/* Col 4 */}
                        <div>
                            <p
                                style={{
                                    fontWeight: 600,
                                    color: "var(--jl-text)",
                                    marginBottom: 16,
                                    fontSize: 15,
                                }}
                            >
                                Legal
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                    fontSize: 14,
                                }}
                            >
                                <Link href="/legal/terms">Terms of Service</Link>
                                <Link href="/legal/privacy">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            borderTop: "1px solid var(--jl-border)",
                            paddingTop: 20,
                            textAlign: "center",
                            fontSize: 13,
                            opacity: 0.6,
                        }}
                    >
                        © {new Date().getFullYear()} HireHeaven. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Responsive overrides via style tag */}
            <style jsx>{`
        @media (max-width: 768px) {
          .jl-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default JobSeekerLandingPage;
