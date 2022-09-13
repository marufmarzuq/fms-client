import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import BaseLayout from "./layout/BaseLayout";
import Dashboard from "./pages/dashboard/Dashboard";

import AllBatches from "./pages/batches/allBatches/AllBatches";

// import CreateDailyData from "./pages/daily_data/update_daily_data/CreateDailyData";
import AllIdeaFarms from "./pages/ideaFarms/allIdeaFarms/AllIdeaFarms";
import CreateIdeaFarm from "./pages/ideaFarms/createIdeaFarms/CreateIdeaFarm";
import AllSatelliteFarms from "./pages/satelliteFarms/allSatelliteFarms/AllSatelliteFarms";
import AllFarmers from "./pages/farmers/allFarmers/AllFarmers";
import AllHatcheries from "./pages/hatcheries/allHatcheries/AllHatcheries";
import CreateHatchery from "./pages/hatcheries/createHatchery/CreateHatchery";
import CreateFarmerForm from "./pages/farmers/createFarmer/CreateFarmerForm";
import CreateDailyData from "./pages/dailyData/createDailyData/CreateDailyData"
import AllTasks from "./pages/tasks/allTasks/AllTasks";
import DailyData from "./pages/dailyData/dailyDataReport/DailyData";
import BatchesOverview from "./pages/batches/batchesOverview/BatchesOverview";
import CreateSatelliteFarm from "./pages/satelliteFarms/createSatelliteFarm/CreateSatelliteFarm";
import CreateBatch from "./pages/batches/createBatch/CreateBatch";
import CreateStock from "./pages/stock/createStock/CreateStock";
import CreateTask from "./pages/tasks/createTask/CreateTask";
import CreateSales from "./pages/sales/createSales/CreateSales";
import UpdateVaccination from "./pages/vaccination/updateVaccination/UpdateVaccination";
import CreateVaccination from "./pages/vaccination/create_vaccination/CreateVaccination"

function App() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="/idea-farm" element={<BaseLayout />}>
        {/* <Route path="overview" element={<AddSatelliteFarm />} /> */}
        <Route path="all-farms" element={<AllIdeaFarms />} />
        <Route path="create" element={<CreateIdeaFarm />} />
      </Route>
      <Route path="/satellite-farms" element={<BaseLayout />}>
        {/* <Route path="overview" element={<AddSatelliteFarm />} /> */}
        <Route path="all-farms" element={<AllSatelliteFarms />} />
        <Route path="create" element={<CreateSatelliteFarm />} />
      </Route>
      <Route path="/hatcheries" element={<BaseLayout />}>
        {/* <Route path="overview" element={<AddSatelliteFarm />} /> */}
        <Route path="all-hatcheries" element={<AllHatcheries />} />
        <Route path="create" element={<CreateHatchery />} />
      </Route>
      <Route path="/farmers" element={<BaseLayout />}>
        {/* <Route path="overview" element={<AddSatelliteFarm />} />  */}
        <Route path="all-farmers" element={<AllFarmers />} />
         <Route path="create" element={<CreateFarmerForm />} />
      </Route>
      <Route path="/batches" element={<BaseLayout />}>
        <Route path="overview" element={<BatchesOverview/>} />
        <Route path="all-batches" element={<AllBatches />} />
        <Route path="create" element={<CreateBatch />} />
      </Route>
      <Route path="/stock" element={<BaseLayout />}>
      {/* <Route path="inbound" element={<CreateStock />} /> */}
        {/* <Route path="outbound" element={<CreateStock />} /> */}
        <Route path="create" element={<CreateStock />} />
      </Route>
      <Route path="/vaccination" element={<BaseLayout />}>
        {/* <Route path="reports" element={<UpdateVaccination />} />  */}
        <Route path="create" element={<UpdateVaccination />} />
      </Route>
      <Route path="/tasks" element={<BaseLayout />}>
        <Route path="reports" element={<AllTasks />} />
        <Route path="create" element={<CreateTask/>} />
      </Route>
      <Route path="/daily-data" element={<BaseLayout />}>
          <Route path ="create" element =  {<CreateDailyData/>}/>
          <Route path ="reports" element =  {<DailyData/>}/>
      </Route>
      <Route path="/sales" element={<BaseLayout />}>
          <Route path ="create" element =  {<CreateSales/>}/>
          <Route path ="reports" element =  {<DailyData/>}/>
      </Route> 
    </Routes>
  );
}

export default App;