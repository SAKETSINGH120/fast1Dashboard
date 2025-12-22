import React, { useEffect, useState } from "react";
import TableContainer from "../../Components/TableContainer/TableContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import {
  loader,
  searchDataWithMultipleKeys,
  paginate,
  snackbar,
} from "../../utils";
import { getAllReferrals } from "../../Components/service/admin";

export default function ReferralList() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  // Fetch all referrals
  async function getAllReferralData() {
    try {
      loader.start();
      let res = await getAllReferrals();
      console.log("data inside funtion call", res);
      const referralData = Array.isArray(res?.data?.data?.referrals)
        ? res?.data?.data?.referrals
        : [];
      setAllData(referralData);
      setFilteredData(referralData);
    } catch (error) {
      console.log("Error fetching referral data:", error);
      snackbar.error("Failed to fetch referral data");
      // Ensure we set empty arrays on error
      setAllData([]);
      setFilteredData([]);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAllReferralData();
  }, []);

  console.log("data", allData);

  // Handle search
  useEffect(() => {
    if (!search.trim()) {
      setFilteredData(Array.isArray(allData) ? allData : []);
      setPage(0);
      return;
    }

    const searchTerm = search.toLowerCase().trim();
    const searchedData = (Array.isArray(allData) ? allData : []).filter(
      (referral) => {
        const referrerName = referral?.referrerId?.name?.toLowerCase() || "";
        const referrerMobile =
          referral?.referrerId?.mobile_number?.toLowerCase() || "";
        const referredName =
          referral?.referredUserId?.name?.toLowerCase() || "";
        const referredMobile =
          referral?.referredUserId?.mobile_number?.toLowerCase() || "";
        const referralCode = referral?.referralCodeUsed?.toLowerCase() || "";

        return (
          referrerName.includes(searchTerm) ||
          referrerMobile.includes(searchTerm) ||
          referredName.includes(searchTerm) ||
          referredMobile.includes(searchTerm) ||
          referralCode.includes(searchTerm)
        );
      }
    );

    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Format currency helper
  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "₹0";
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // Paginate the filtered data
  const paginatedData = paginate(
    Array.isArray(filteredData) ? filteredData : [],
    page,
    rowsPerPage
  );

  return (
    <>
      <h2 className="fw-600">Referral Management</h2>

      {/* Summary Statistics */}
      <Box sx={{ mb: 3, mt: 2 }}>
        <div className="row">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <Typography variant="h4" className="text-primary mb-1">
                  {Array.isArray(filteredData) ? filteredData.length : 0}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Referrals
                </Typography>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <Typography variant="h4" className="text-success mb-1">
                  {(Array.isArray(filteredData) ? filteredData : []).length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Referrals Made
                </Typography>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <Typography variant="h4" className="text-warning mb-1">
                  {(Array.isArray(filteredData) ? filteredData : []).reduce(
                    (sum, item) => sum + (item.referrerReward || 0),
                    0
                  )}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Referrer Rewards
                </Typography>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <Typography variant="h4" className="text-info mb-1">
                  {formatCurrency(
                    (Array.isArray(filteredData) ? filteredData : []).reduce(
                      (sum, item) => sum + (item.newUserReward || 0),
                      0
                    )
                  )}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total New User Rewards
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Box>

      <div className="row mt-4">
        <div className="col-lg-5 col-md-6 col-sm-12 col-12">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by referrer name, mobile, referred user name, mobile, or referral code..."
            className="form-control"
          />
        </div>
      </div>

      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Referrer Details</TableCell>
                <TableCell>Referred User Details</TableCell>
                {/* <TableCell>Referral Code Used</TableCell> */}
                <TableCell>Referrer Reward</TableCell>
                <TableCell>New User Reward</TableCell>
                <TableCell>Referral Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((referral, index) => (
                  <TableRow hover key={referral._id || index}>
                    <TableCell>
                      <div>
                        <Typography variant="body2" className="fw-bold">
                          {referral?.referrerId?.name || "N/A"}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {referral?.referrerId?.mobile_number || "N/A"}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          display="block"
                        >
                          Code: {referral?.referrerId?.referralCode || "N/A"}
                        </Typography>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <Typography variant="body2" className="fw-bold">
                          {referral?.referredUserId?.name || "N/A"}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {referral?.referredUserId?.mobile_number || "N/A"}
                        </Typography>
                      </div>
                    </TableCell>

                    {/* <TableCell>
                      <Chip
                        label={referral?.referralCodeUsed || "N/A"}
                        color="primary"
                        size="small"
                        variant="outlined"
                      />
                    </TableCell> */}

                    <TableCell>
                      <Typography
                        variant="body2"
                        className="fw-bold text-success"
                      >
                        {formatCurrency(referral?.referrerReward)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" className="fw-bold text-info">
                        {formatCurrency(referral?.newUserReward)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(
                          referral?.referralDate || referral?.createdAt
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="py-4"
                    >
                      {search
                        ? "No referrals found matching your search."
                        : "No referral data available."}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Table Pagination */}
          <TablePagination
            component="div"
            count={Number(filteredData.length)} // Total count of filtered data
            page={page} // Current page value
            onPageChange={(event, newPage) => setPage(newPage)} // Handle page change
            rowsPerPage={rowsPerPage} // Number of rows per page
            rowsPerPageOptions={[rowsPerPage]} // Disable changing rows per page
          />
        </TableContainer>
      </div>
    </>
  );
}
