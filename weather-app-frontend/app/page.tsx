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
  height: 100vh;
  background-color: ${(props) =>
    props.theme.body}; /* Use theme-based background */
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  margin-right: 20px;
  gap: 20px;
`;

const SidebarSection = styled.div`
  flex: 1;
  width: 250px;
  background-color: ${(props) => props.theme.sidebarBg};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: calc(100vh - 40px);
  overflow-y: auto;
`;

const SectionCard = styled.div`
  background-color: ${(props) => props.theme.cardBg};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const FullWidthSection = styled(SectionCard)`
  height: 400px;
  width: calc(100% - 40px);
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
