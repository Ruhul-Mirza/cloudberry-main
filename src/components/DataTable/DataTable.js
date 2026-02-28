// components/DataTable/DataTable.jsx
import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  Input,
  Link,
  Sheet,
  Table,
  Typography,
  FormControl,
  FormLabel,
  Select,
  Option,
  Modal,
  ModalDialog,
  ModalClose,
  Divider,
  Avatar,
  Skeleton,
  Tooltip, // 👈 ADD THIS
} from "@mui/joy";
import { iconButtonClasses } from "@mui/joy/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RowMenu from "./RowMenu";

/**
 * Reusable DataTable Component
 *
 * @param {Object} props
 * @param {Array} props.data - Array of data objects to display
 * @param {Array} props.columns - Column configuration
 * @param {Function} props.onEdit - Callback when edit is clicked
 * @param {Function} props.onDelete - Callback when delete is clicked
 * @param {Function} props.onRename - Callback when rename is clicked
 * @param {Array} props.filters - Filter configuration
 * @param {Boolean} props.showCheckbox - Show row selection checkboxes
 * @param {Boolean} props.showPagination - Show pagination controls
 * @param {Number} props.itemsPerPage - Items per page
 * @param {Boolean} props.loading - Show loading state
 */
export default function DataTable({
  data = [],
  columns = [],
  onEdit,
  onDelete,
  onRename,
  onMove,
  filters = [],
  showCheckbox = false,
  showPagination = true,
  itemsPerPage = 10,
  actions = [],
  loading = false,
}) {
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting logic
  const sortedData = useMemo(() => {
    const sortableColumn = columns.find((col) => col.sortable);
    if (!sortableColumn) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortableColumn.field];
      const bValue = b[sortableColumn.field];

      if (order === "desc") {
        return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });
  }, [data, order, columns]);

  // Search and filter logic
  const filteredData = useMemo(() => {
    let result = sortedData;

    // Search
    if (searchTerm) {
      result = result.filter((row) =>
        columns.some((col) => {
          const value = row[col.field];
          return (
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        }),
      );
    }

    // Filters
    Object.keys(filterValues).forEach((filterKey) => {
      const filterValue = filterValues[filterKey];

      if (
        filterValue !== undefined &&
        filterValue !== null &&
        filterValue !== "all"
      ) {
        result = result.filter((row) => {
          const rowValue = row[filterKey];

          // Handle boolean explicitly
          if (typeof rowValue === "boolean") {
            return String(rowValue) === String(filterValue);
          }

          // Handle object values (edge case)
          if (typeof rowValue === "object" && rowValue !== null) {
            return Object.values(rowValue).some(
              (v) =>
                String(v).toLowerCase() === String(filterValue).toLowerCase(),
            );
          }

          // Default string / number handling
          return (
            String(rowValue).toLowerCase() === String(filterValue).toLowerCase()
          );
        });
      }
    });

    return result;
  }, [sortedData, searchTerm, filterValues, columns]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleSelectAll = (event) => {
    setSelected(event.target.checked ? paginatedData.map((row) => row.id) : []);
  };

  const handleSelect = (id, checked) => {
    setSelected((ids) =>
      checked ? ids.concat(id) : ids.filter((itemId) => itemId !== id),
    );
  };

  const handleFilterChange = (filterKey, value) => {
    setFilterValues((prev) => ({ ...prev, [filterKey]: value }));
  };

  const renderFilters = () => (
    <>
      {filters.map((filter) => (
        <FormControl key={filter.field} size="sm">
          <FormLabel>{filter.label}</FormLabel>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={32} />
          ) : (
            <Select
              size="sm"
              placeholder={filter.placeholder || `Filter by ${filter.label}`}
              value={filterValues[filter.field] || ""}
              onChange={(e, value) => handleFilterChange(filter.field, value)}
              slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
            >
              <Option value="all">All</Option>
              {filter.options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )}
        </FormControl>
      ))}
    </>
  );

  const renderCellContent = (row, column) => {
    if (column.render) {
      return column.render(row[column.field], row);
    }

    const value = row[column.field];

    if (column.type === "avatar") {
      return (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar size="sm">{value.initial}</Avatar>
          <div>
            <Typography level="body-xs">{value.name}</Typography>
            <Typography level="body-xs">{value.email}</Typography>
          </div>
        </Box>
      );
    }

    if (column.type === "chip") {
      return (
        <Chip
          variant="soft"
          size="sm"
          startDecorator={column.chipConfig?.[value]?.icon}
          color={column.chipConfig?.[value]?.color || "neutral"}
        >
          {value}
        </Chip>
      );
    }
    if (column.field === "message" || column.field === "youtube_embed") {
      return (
        <Tooltip title={value || ""} placement="bottom" arrow>
          <Typography
            level="body-xs"
            sx={{
              maxWidth: column.width || 250,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            {value}
          </Typography>
        </Tooltip>
      );
    } else {
      return <Typography level="body-xs">{value}</Typography>;
    }
  };

  const renderSkeletonRow = (index) => (
    <tr key={`skeleton-${index}`}>
      {showCheckbox && (
        <td style={{ textAlign: "center", width: 120 }}>
          <Skeleton
            variant="rectangular"
            width={18}
            height={18}
            sx={{ mx: "auto" }}
          />
        </td>
      )}
      {columns.map((column, colIndex) => (
        <td key={`skeleton-col-${colIndex}`}>
          {column.type === "avatar" ? (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="80%" height={16} />
                <Skeleton variant="text" width="60%" height={14} />
              </Box>
            </Box>
          ) : column.type === "chip" ? (
            <Skeleton
              variant="rectangular"
              width={80}
              height={24}
              sx={{ borderRadius: "sm" }}
            />
          ) : (
            <Skeleton
              variant="text"
              width={column.width ? `${column.width * 0.7}px` : "70%"}
            />
          )}
        </td>
      ))}
      {(onEdit || onDelete || onRename || onMove || actions.length > 0) && (
        <td>
          <Skeleton variant="circular" width={32} height={32} />
        </td>
      )}
    </tr>
  );

  return (
    <>
      {/* Mobile Search and Filter */}
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
      >
        {loading ? (
          <>
            <Skeleton variant="rectangular" sx={{ flexGrow: 1 }} height={40} />
            <Skeleton variant="rectangular" width={40} height={40} />
          </>
        ) : (
          <>
            <Input
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
              sx={{ flexGrow: 1 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton
              size="sm"
              variant="outlined"
              color="neutral"
              onClick={() => setFilterOpen(true)}
            >
              <FilterAltIcon />
            </IconButton>
          </>
        )}
        <Modal open={filterOpen} onClose={() => setFilterOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setFilterOpen(false)}>
                Apply Filters
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>

      {/* Desktop Search and Filter */}
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search</FormLabel>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={32} />
          ) : (
            <Input
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </FormControl>
        {renderFilters()}
      </Box>

      {/* Table */}
      <Sheet
        className="TableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              {showCheckbox && (
                <th
                  style={{
                    width: 48,
                    textAlign: "center",
                    padding: "12px 6px",
                  }}
                >
                  {loading ? (
                    <Skeleton
                      variant="rectangular"
                      width={18}
                      height={18}
                      sx={{ mx: "auto" }}
                    />
                  ) : (
                    <Checkbox
                      size="sm"
                      indeterminate={
                        selected.length > 0 &&
                        selected.length !== paginatedData.length
                      }
                      checked={
                        selected.length === paginatedData.length &&
                        paginatedData.length > 0
                      }
                      onChange={handleSelectAll}
                      color={selected.length > 0 ? "primary" : undefined}
                      sx={{ verticalAlign: "text-bottom" }}
                    />
                  )}
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.field}
                  style={{
                    width: column.width || "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {loading ? (
                    <Skeleton variant="text" width="60%" />
                  ) : column.sortable ? (
                    <Link
                      underline="none"
                      color="primary"
                      component="button"
                      onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                      endDecorator={<ArrowDropDownIcon />}
                      sx={{
                        fontWeight: "lg",
                        "& svg": {
                          transition: "0.2s",
                          transform:
                            order === "desc"
                              ? "rotate(0deg)"
                              : "rotate(180deg)",
                        },
                      }}
                    >
                      {column.label}
                    </Link>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
              {(onEdit ||
                onDelete ||
                onRename ||
                onMove ||
                actions.length > 0) && (
                <th
                  style={{
                    width: 140,
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  Action{" "}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: itemsPerPage }, (_, i) =>
                renderSkeletonRow(i),
              )
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (showCheckbox ? 1 : 0) +
                    (onEdit ||
                    onDelete ||
                    onRename ||
                    onMove ||
                    actions.length > 0
                      ? 1
                      : 0)
                  }
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      py: 8,
                    }}
                  >
                    <Typography level="body-md" color="neutral">
                      No data available
                    </Typography>
                  </Box>
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.id}>
                  {showCheckbox && (
                    <td style={{ textAlign: "center", width: 120 }}>
                      <Checkbox
                        size="sm"
                        checked={selected.includes(row.id)}
                        color={
                          selected.includes(row.id) ? "primary" : undefined
                        }
                        onChange={(event) =>
                          handleSelect(row.id, event.target.checked)
                        }
                        sx={{ verticalAlign: "text-bottom" }}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.field} className="text-center">
                      {renderCellContent(row, column)}
                    </td>
                  ))}
                  {(onEdit ||
                    onDelete ||
                    onRename ||
                    onMove ||
                    actions.length > 0) && (
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <RowMenu
                        onEdit={onEdit ? () => onEdit(row) : undefined}
                        onDelete={onDelete ? () => onDelete(row) : undefined}
                        onRename={onRename ? () => onRename(row) : undefined}
                        onMove={onMove ? () => onMove(row) : undefined}
                        actions={actions}
                        row={row}
                      />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Sheet>

      {/* Pagination */}
      {showPagination && (totalPages > 1 || loading) && (
        <Box
          className="Pagination"
          sx={{
            pt: 2,
            gap: 1,
            [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
            display: { xs: "none", md: "flex" },
          }}
        >
          {loading ? (
            <>
              <Skeleton variant="rectangular" width={100} height={32} />
              <Box sx={{ flex: 1 }} />
              {Array.from({ length: 5 }, (_, i) => (
                <Skeleton key={i} variant="circular" width={32} height={32} />
              ))}
              <Box sx={{ flex: 1 }} />
              <Skeleton variant="rectangular" width={80} height={32} />
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                startDecorator={<KeyboardArrowLeftIcon />}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </Button>

              <Box sx={{ flex: 1 }} />
              {Array.from(
                { length: Math.min(totalPages, 10) },
                (_, i) => i + 1,
              ).map((page) => (
                <IconButton
                  key={page}
                  size="sm"
                  variant={page === currentPage ? "solid" : "outlined"}
                  color={page === currentPage ? "primary" : "neutral"}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </IconButton>
              ))}
              <Box sx={{ flex: 1 }} />

              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                endDecorator={<KeyboardArrowRightIcon />}
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
              >
                Next
              </Button>
            </>
          )}
        </Box>
      )}
    </>
  );
}
