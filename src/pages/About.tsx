
import React from "react";
import Layout from "@/components/layout/Layout";
import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import ValuesSection from "@/components/about/ValuesSection";
import Stats from "@/components/about/Stats";
import TeamMembers from "@/components/about/TeamMembers";
import Timeline from "@/components/about/Timeline";
import CallToAction from "@/components/about/CallToAction";

const About = () => {
  return (
    <Layout>
      <AboutHero />
      <MissionVision />
      <ValuesSection />
      <Stats />
      <Timeline />
      <TeamMembers />
      <CallToAction />
    </Layout>
  );
};

export default About;
