import React from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { SkeletonLoader } from "./Loader";

const BaseTable = ({
  columns = [],
  rows = [],
  isLoading = false,
  height = 400,
  width = 900,
  renderRow,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        sx={{
          width: "100%",
          maxWidth: width,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ maxHeight: height, scrollbarWidth: "thin" }}>
          <Table stickyHeader sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      width: col.width || "auto",
                      backgroundColor: "#a4a5f5",
                      textAlign: col.align || "left",
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ p: 3 }}
                  >
                    <SkeletonLoader />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {rows.length > 0 &&
                  rows.map(
                    (row, index) =>
                      typeof renderRow === "function" &&
                      renderRow({ row, index })
                  )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default BaseTable;
