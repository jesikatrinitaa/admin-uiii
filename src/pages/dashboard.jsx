import { useState, useEffect } from "react";
import Card from "../components/Elements/Card";
import MainLayout from "../components/Layouts/MainLayout";

const DashboardPage = () => {
  const [upcomingBills, setUpcomingBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [goalsLoading, setGoalsLoading] = useState(true);
  const [goalsData, setGoalsData] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch(
          "https://jwt-auth-eight-neon.vercel.app/bills",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer YOUR_TOKEN_HERE`, // Ganti dengan token yang valid
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bills");
        }

        const data = await response.json();
        setUpcomingBills(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchGoals = async () => {
      setGoalsLoading(true);
      setTimeout(() => {
        setGoalsData("Your savings goal is $5000");
        setGoalsLoading(false);
      }, 2000); // Simulasi fetching data (2 detik)
    };

    fetchBills();
    fetchGoals();
  }, []);

  return (
    <MainLayout type="dashboard">
      {/* top content start */}
      <div className="md:grid md:grid-cols-3 md:gap-x-6">
        <Card title="Total Balance" />
        <Card title="Goals">
          {goalsLoading ? (
            <div className="flex justify-center items-center h-20">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <p>{goalsData}</p>
          )}
        </Card>
        <Card title="Upcoming Bill">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : upcomingBills.length > 0 ? (
            <ul>
              {upcomingBills.map((bill) => (
                <li key={bill.id} className="border-b p-2">
                  {bill.name} - ${bill.amount}
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming bills</p>
          )}
        </Card>
        <Card
          variant="md:col-span-1 md:row-span-2"
          title="Recent Transaction"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
        <Card variant="md:col-span-2" title="Statistics" />
        <Card variant="md:col-span-2" title="Expenses Breakdown" />
      </div>
      {/* bottom content end */}
    </MainLayout>
  );
};

export default DashboardPage;
