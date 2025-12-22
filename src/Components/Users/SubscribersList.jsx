import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import TableContainer from "../TableContainer/TableContainer";

import { Box, TablePagination } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { loader } from "../../utils";
import { getAllUsersWithSubscriptions } from "../service/admin";

const SubscribersList = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [allData, setAllData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [openSubscriptionsModal, setOpenSubscriptionsModal] = useState(false);
  const [selectedUserSubscriptions, setSelectedUserSubscriptions] =
    useState(null);
  const navigate = useNavigate();

  const getSubscribers = async () => {
    loader.start();
    try {
      const subscribersData = await getAllUsersWithSubscriptions().then(
        (res) => {
          return res.data.data;
        }
      );

      // Process data to show user summary with all subscription details
      const processedData = [];
      subscribersData.forEach((subscriber) => {
        if (subscriber.subscriptions && subscriber.subscriptions.length > 0) {
          // Sort subscriptions by start date (most recent first)
          const sortedSubscriptions = subscriber.subscriptions.sort(
            (a, b) => new Date(b.startDate) - new Date(a.startDate)
          );

          // Count subscription stats
          const totalSubscriptions = subscriber.subscriptions.length;

          // Get all plan names for summary
          const allPlans = [
            ...new Set(subscriber.subscriptions.map((sub) => sub.planName)),
          ];

          processedData.push({
            subscriberId: subscriber.subscriberId,
            name: subscriber.name,
            mobileNumber: subscriber.mobileNumber,
            allSubscriptions: subscriber.subscriptions, // Keep all subscription data
            allPlans: allPlans,
            totalSubscriptions,
            latestSubscription: sortedSubscriptions[0], // Most recent subscription for quick view
          });
        } else {
          // If no subscriptions, still show the subscriber
          processedData.push({
            subscriberId: subscriber.subscriberId,
            name: subscriber.name,
            mobileNumber: subscriber.mobileNumber,
            allSubscriptions: [],
            allPlans: ["No Plan"],
            totalSubscriptions: 0,
            latestSubscription: null,
          });
        }
      });

      processedData.sort((a, b) => {
        const aDate = new Date(a?.latestSubscription?.startDate || 0);
        const bDate = new Date(b?.latestSubscription?.startDate || 0);
        return bDate - aDate; // Sort in descending order (most recent first)
      });

      setAllData(processedData);
      console.log(processedData);
      setData(processedData);
      setTotalData(processedData?.length || 0);
      paginate(processedData, page);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
    loader.stop();
  };

  function filterData(e) {
    const value = e.trim();
    setSearchInput(value);
    let filteredData = allData;
    let total = allData.length;
    if (value) {
      const searchValue = value.toLowerCase();
      filteredData = allData.filter(
        (res) =>
          (typeof res.name === "string" &&
            res.name.toLowerCase().includes(searchValue)) ||
          (res.allPlans &&
            res.allPlans.some((plan) =>
              plan.toLowerCase().includes(searchValue)
            )) ||
          (res.mobileNumber &&
            res.mobileNumber.toString().toLowerCase().includes(searchValue))
      );
      total = filteredData.length;
    }
    setTotalData(total);
    setPage(0);
    setData(filteredData.slice(0, rowsPerPage)); // Always show first page of filtered data
  }

  function paginate(subscribersData, cpage) {
    const filteredData = subscribersData.filter(
      (res) =>
        (res.name &&
          typeof res.name === "string" &&
          res.name.toLowerCase().includes(searchInput.toLowerCase())) ||
        (res.allPlans &&
          res.allPlans.some((plan) =>
            plan.toLowerCase().includes(searchInput.toLowerCase())
          )) ||
        (res.mobileNumber &&
          res.mobileNumber
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()))
    );
    const startIndex = cpage * rowsPerPage;
    const slicedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    setData(slicedData);
  }

  useEffect(() => {
    getSubscribers();
  }, [rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    paginate(allData, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewAllSubscriptions = (userSubscriptions) => {
    setSelectedUserSubscriptions(userSubscriptions);
    setOpenSubscriptionsModal(true);
  };

  const handleCloseModal = () => {
    setOpenSubscriptionsModal(false);
    setSelectedUserSubscriptions(null);
  };

  return (
    <>
      <Box>
        <h2 className="fw-600">Subscribers Management</h2>
        <div className={`row mt-4`}>
          <div className={`col-lg-5 col-md-6 col-sm-12 col-12`}>
            <input
              type="search"
              placeholder="Search by name, plan name or mobile number"
              className="form-control w-100"
              value={searchInput}
              onChange={(e) => filterData(e.target.value)}
            />
          </div>
        </div>
      </Box>

      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>All Plans</TableCell>
                <TableCell>Latest Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((res, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell className="pointer text-capitalize">
                      {res?.name || "N/A"}
                    </TableCell>

                    <TableCell className="text-capitalize">
                      {res?.mobileNumber ? res?.mobileNumber : "N/A"}
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {res?.allPlans?.map((plan, idx) => {
                          const isCurrentPlan =
                            res?.latestSubscription?.planName === plan;
                          const isActivePlan = res?.allSubscriptions?.find(
                            (sub) =>
                              sub.planName === plan && sub.status === "active"
                          );
                          return (
                            <Chip
                              key={idx}
                              label={plan}
                              size="small"
                              color={
                                isActivePlan
                                  ? "success"
                                  : isCurrentPlan
                                  ? "primary"
                                  : "default"
                              }
                              variant={isActivePlan ? "filled" : "outlined"}
                            />
                          );
                        })}
                      </Box>
                    </TableCell>

                    <TableCell>
                      {res?.latestSubscription && (
                        <Box>
                          <Chip
                            label={res.latestSubscription.status}
                            color={
                              res.latestSubscription.status === "active"
                                ? "success"
                                : "error"
                            }
                            size="small"
                          />
                          <Typography
                            variant="caption"
                            display="block"
                            sx={{ mt: 0.5 }}
                          >
                            {new Date(
                              res.latestSubscription.startDate
                            ).toLocaleDateString()}
                          </Typography>
                        </Box>
                      )}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleViewAllSubscriptions(res)}
                        disabled={res?.totalSubscriptions === 0}
                      >
                        View All ({res?.totalSubscriptions || 0})
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={totalData}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>

      {/* Modal for viewing all subscriptions */}
      <Dialog
        open={openSubscriptionsModal}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">
              All Subscriptions - {selectedUserSubscriptions?.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mobile: {selectedUserSubscriptions?.mobileNumber}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedUserSubscriptions?.allSubscriptions?.length > 0 ? (
            <Grid container spacing={1.5} sx={{ mt: 1 }}>
              {selectedUserSubscriptions.allSubscriptions.map(
                (subscription, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        border:
                          subscription.status === "active"
                            ? "2px solid #4caf50"
                            : "1px solid #e0e0e0",
                        backgroundColor:
                          subscription.status === "active"
                            ? "#f1f8e9"
                            : "white",
                        minHeight: "160px",
                      }}
                    >
                      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="start"
                          mb={1}
                        >
                          <Typography
                            variant="subtitle1"
                            component="div"
                            fontWeight="bold"
                            noWrap
                          >
                            {subscription.planName}
                          </Typography>
                          <Chip
                            label={subscription.status}
                            color={
                              subscription.status === "active"
                                ? "success"
                                : "error"
                            }
                            size="small"
                            sx={{ fontSize: "0.75rem", height: "20px" }}
                          />
                        </Box>

                        <Box sx={{ mb: 1.5 }}>
                          {subscription.features
                            ?.slice(0, 2)
                            .map((feature, idx) => (
                              <Chip
                                key={idx}
                                label={feature}
                                size="small"
                                variant="outlined"
                                sx={{
                                  mr: 0.5,
                                  mb: 0.5,
                                  fontSize: "0.7rem",
                                  height: "18px",
                                  "& .MuiChip-label": { px: 1 },
                                }}
                              />
                            ))}
                          {subscription.features?.length > 2 && (
                            <Chip
                              label={`+${
                                subscription.features.length - 2
                              } more`}
                              size="small"
                              variant="outlined"
                              color="primary"
                              sx={{
                                fontSize: "0.7rem",
                                height: "18px",
                                "& .MuiChip-label": { px: 1 },
                              }}
                            />
                          )}
                        </Box>

                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ mb: 0.5 }}
                        >
                          <strong>Start:</strong>{" "}
                          {new Date(
                            subscription.startDate
                          ).toLocaleDateString()}
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ mb: 0.5 }}
                        >
                          <strong>Expiry:</strong>{" "}
                          {new Date(
                            subscription.expiryDate
                          ).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              py={4}
            >
              No subscriptions found for this user.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SubscribersList;
