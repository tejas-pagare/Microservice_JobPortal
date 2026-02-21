"use client";
import CarrerGuide from "@/components/carrer-guide";
import Hero from "@/components/hero";
import Loading from "@/components/loading";
import ResumeAnalyzer from "@/components/resume-analyser";
import RecruiterLandingPage from "@/components/recruiter/RecruiterLandingPage";
import { useAppData } from "@/context/AppContext";
import React from "react";

const Home = () => {
  const { loading, user, isAuth } = useAppData();
  if (loading) return <Loading />;

  if (isAuth && user?.role === "recruiter") {
    return <RecruiterLandingPage />;
  }

  return (
    <div>
      <Hero />
      <CarrerGuide />
      <ResumeAnalyzer />
    </div>
  );
};

export default Home;

