import HeaderDashboard from "../../organisms/header/HeaderDashboard";
import InfoItems from "../../organisms/home/InfoItems";
import QuickActions from "../../organisms/home/QuickActions";

const DashboardTemplate = () => {
  return (
    <>
      <HeaderDashboard />
      <main className="p-4 min-h-[calc(100vh-145.5px)]">
        <InfoItems />
        <QuickActions />
      </main>
    </>
  );
};

export default DashboardTemplate;