"use client";

import React from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import Forecast from "../components/Forecast";
import RainChart from "../components/RainChart";
import GlobalMap from "../components/GlobalMap";
import CitiesSidebar from "../components/CitiesSidebar";
import styled from "styled-components";

const HomePageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  height: 100vh; /* Full-height layout */
  background-color: #f4f7fc; /* Light background */
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  margin-right: 20px;
  gap: 20px; /* Space between components */
`;

const SidebarSection = styled.div`
  flex: 1;
  width: 250px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Soft shadow */
  height: calc(100vh - 40px); /* Full height minus padding */
  overflow-y: auto; /* Scrollable sidebar */
`;

const SectionCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const FullWidthSection = styled(SectionCard)`
  height: 400px; /* Taller section for the map */
  width: calc(100% - 40px); /* Full width with margin */
`;

const Home = () => {
  return (
    <HomePageContainer>
      <SidebarSection>
        <CitiesSidebar />
      </SidebarSection>

      <MainSection>
        <SectionCard>
          <WeatherDisplay />
        </SectionCard>
        <SectionCard>
          <Forecast />
        </SectionCard>
        <SectionCard>
          <RainChart />
        </SectionCard>
        <FullWidthSection>
          <GlobalMap />
        </FullWidthSection>
      </MainSection>
    </HomePageContainer>
  );
};

export default Home;
