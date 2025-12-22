import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import {
  HiUsers,
  HiUserGroup,
  HiVideoCamera,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { TbPackages } from "react-icons/tb";
import { MdPayments, MdBroadcastOnHome } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { loader } from "../../utils";
import { getAllDashboardStats } from "../service/admin";

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalSubscribers: 0,
    totalPlans: 0,
    totalChannels: 0,
    activeSubscriptions: 0,
    expiredSubscriptions: 0,
    totalUsersInTvApp: 0,
    totalUsersInAndriodApp: 0,
    totalUsersInIosApp: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    loader.start();
    setLoading(true);

    try {
      // Fetch all dashboard data from single API endpoint
      const response = await getAllDashboardStats();
      const dashboardData = response.data.data || {};

      setDashboardStats({
        totalUsers: dashboardData.totalUsers || 0,
        totalSubscribers: dashboardData.totalSubscribers || 0,
        totalPlans: dashboardData.totalPlans || 0,
        totalChannels: dashboardData.totalChannels || 0,
        activeSubscriptions: dashboardData.activeSubscriptions || 0,
        expiredSubscriptions: dashboardData.expiredSubscriptions || 0,
        totalUsersInTvApp: dashboardData.totalUsersInTvApp || 0,
        totalUsersInAndriodApp: dashboardData.totalUsersInAndriodApp || 0,
        totalUsersInIosApp: dashboardData.totalUsersInIosApp || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Set default values in case of error
      setDashboardStats({
        totalUsers: 0,
        totalSubscribers: 0,
        totalPlans: 0,
        totalChannels: 0,
        activeSubscriptions: 0,
        expiredSubscriptions: 0,
        totalUsersInTvApp: 0,
        totalUsersInAndriodApp: 0,
        totalUsersInIosApp: 0,
      });
    } finally {
      setLoading(false);
      loader.stop();
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {title}
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {loading ? "..." : value}
              </Typography>
              {subtitle && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                backgroundColor: `${color}20`,
                borderRadius: "50%",
                p: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={24} color={color} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Welcome back! Here's what's happening with your platform today.
        </Typography>
      </Box>

      {/* Main Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <StatCard
          title="Total Users"
          value={dashboardStats.totalUsers}
          icon={HiUsers}
          color="#3B76EF"
        />
        <StatCard
          title="Total Tv Users"
          value={dashboardStats.totalUsersInTvApp}
          icon={HiUsers}
          color="#3B76EF"
        />
        <StatCard
          title="Total Andriod Users"
          value={dashboardStats.totalUsersInAndriodApp}
          icon={HiUsers}
          color="#3B76EF"
        />
        <StatCard
          title="Total Ios Users"
          value={dashboardStats.totalUsersInIosApp}
          icon={HiUsers}
          color="#3B76EF"
        />
        <StatCard
          title="Total Subscribers"
          value={dashboardStats.totalSubscribers}
          icon={FaUsers}
          color="#10B981"
        />
        <StatCard
          title="Total Plans"
          value={dashboardStats.totalPlans}
          icon={TbPackages}
          color="#F59E0B"
        />
        <StatCard
          title="Total Free Channels"
          value={dashboardStats.totalChannels}
          icon={HiVideoCamera}
          color="#EF4444"
        />
        {/* <StatCard
          title="Total Exclusive Channels"
          value={dashboardStats.totalChannels}
          icon={HiVideoCamera}
          color="#EF4444"
        /> */}
      </Grid>

      {/* Additional Stats */}
      <Grid container spacing={3} mb={4}>
        <StatCard
          title="Active Subscriptions"
          value={dashboardStats.activeSubscriptions}
          icon={HiOutlineChartBar}
          color="#8B5CF6"
        />
        <StatCard
          title="Expired Subscriptions"
          value={dashboardStats.expiredSubscriptions}
          icon={HiUserGroup}
          color="#F97316"
        />
      </Grid>
    </Box>
  );
};

export default Dashboard;
