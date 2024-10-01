import React from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import Forecast from "../components/Forecast";
import RainChart from "../components/RainChart";
import GlobalMap from "../components/GlobalMap";
import CitiesSidebar from "../components/CitiesSidebar";
import styled from "styled-components";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

// const ContentContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   max-width: 1200px;
// `;

const MainSection = styled.div`
  flex: 3;
  margin-right: 20px;
`;

const SidebarSection = styled.div`
  flex: 1;
`;

const Index = () => {
  return (
    <HomePageContainer>
      <MainSection>
        <WeatherDisplay />
        <Forecast />
        <RainChart />
      </MainSection>
      <SidebarSection>
        <CitiesSidebar />
      </SidebarSection>
      <GlobalMap />
    </HomePageContainer>
  );
};

export default Index;
