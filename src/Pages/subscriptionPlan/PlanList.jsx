import React, { useEffect, useState } from "react";
import TableContainer from "../../Components/TableContainer/TableContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  loader,
  searchDataWithMultipleKeys,
  paginate,
  snackbar,
} from "../../utils";
import { deletePlans, getPlans } from "../../Components/service/admin";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { AddPlan } from "./AddPlan";

export default function PlanList() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Fetch all plans
  async function fetchAllPlans() {
    try {
      loader.start();
      const res = await getPlans();
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    fetchAllPlans();
  }, []);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(["name"], allData, search);
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function handleDeletePlan(data) {
    try {
      loader.start();
      await deletePlans(data._id);
      snackbar.success("Plan deleted successfully");
      setAllData((prev) => prev.filter((item) => item._id !== data._id));
      setFilteredData((prev) => prev.filter((item) => item._id !== data._id));
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  // Paginate filtered data
  const paginatedData = paginate(filteredData, page, rowsPerPage);

  return (
    <>
      <h2 className="fw-600">Plans</h2>
      <div className="row mt-4">
        <div className="col-lg-5 col-md-6 col-sm-12 col-12">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Plan"
            className="form-control"
          />
        </div>
        <div className="col d-flex justify-content-end">
          <AddPlan onSubmit={fetchAllPlans} />
        </div>
      </div>

      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plan Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>Features</TableCell>
                <TableCell>Validity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((plan, index) => (
                <TableRow hover key={index}>
                  <TableCell className="text-capitalize">{plan.name}</TableCell>
                  <TableCell>{plan.price}</TableCell>
                  <TableCell>{plan.gstPercent}%</TableCell>
                  {/* <TableCell>{plan.features}</TableCell> */}
                  <TableCell>
                    {plan.features && plan.features.length > 0
                      ? plan.features.join(", ")
                      : "—"}
                  </TableCell>
                  {/* <TableCell>{plan.month / 30} months</TableCell> */}
                  <TableCell>{plan.month} months</TableCell>
                  <TableCell>
                    <div className="d-flex gap-2">
                      <AddPlan
                        formData={plan}
                        mode="edit"
                        onSubmit={fetchAllPlans}
                      />
                      <DeleteButton
                        confirmation
                        display="Plan"
                        data={plan}
                        onDelete={handleDeletePlan}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[rowsPerPage]}
          />
        </TableContainer>
      </div>
    </>
  );
}
