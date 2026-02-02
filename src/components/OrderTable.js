import * as React from "react";

import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

/* ---------------- DATA ---------------- */

const rows = [
  {
    id: "INV-1234",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: { initial: "O", name: "Olivia Ryhe", email: "olivia@email.com" },
  },
  {
    id: "INV-1233",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: { initial: "S", name: "Steve Hampton", email: "steve.hamp@email.com" },
  },
  {
    id: "INV-1232",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: { initial: "C", name: "Ciaran Murray", email: "ciaran.murray@email.com" },
  },
  {
    id: "INV-1231",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: { initial: "M", name: "Maria Macdonald", email: "maria.mc@email.com" },
  },
  {
    id: "INV-1230",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: { initial: "C", name: "Charles Fulton", email: "fulton@email.com" },
  },
  {
    id: "INV-1229",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: { initial: "J", name: "Jay Hooper", email: "hooper@email.com" },
  },
  {
    id: "INV-1228",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: { initial: "K", name: "Krystal Stevens", email: "k.stevens@email.com" },
  },
  {
    id: "INV-1227",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: { initial: "S", name: "Sachin Flynn", email: "s.flyn@email.com" },
  },
  {
    id: "INV-1226",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: { initial: "B", name: "Bradley Rosales", email: "brad123@email.com" },
  },
];

/* ---------------- SORTING HELPERS ---------------- */

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/* ---------------- ROW MENU ---------------- */

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function OrderTable() {
  const [order, setOrder] = React.useState("desc");
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select size="sm" placeholder="Filter by status">
          <Option value="paid">Paid</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
    </>
  );

  return (
    <>
      {/* MOBILE SEARCH */}
      <Sheet sx={{ display: { xs: "flex", sm: "none" }, gap: 1, my: 1 }}>
        <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
        <IconButton size="sm" variant="outlined" onClick={() => setOpen(true)}>
          <FilterAltIcon />
        </IconButton>
      </Sheet>

      {/* TABLE */}
      <Sheet variant="outlined" sx={{ display: { xs: "none", sm: "block" } }}>
        <Table hoverRow stickyHeader>
          <thead>
            <tr>
              <th>
                <Checkbox
                  size="sm"
                  checked={selected.length === rows.length}
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  onChange={(e) =>
                    setSelected(e.target.checked ? rows.map((r) => r.id) : [])
                  }
                />
              </th>
              <th>
                <Link
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  endDecorator={<ArrowDropDownIcon />}
                >
                  Invoice
                </Link>
              </th>
              <th>Date</th>
              <th>Status</th>
              <th>Customer</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {[...rows].sort(getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    onChange={(e) =>
                      setSelected((prev) =>
                        e.target.checked
                          ? [...prev, row.id]
                          : prev.filter((id) => id !== row.id)
                      )
                    }
                  />
                </td>
                <td>{row.id}</td>
                <td>{row.date}</td>
                <td>
                  <Chip
                    size="sm"
                    variant="soft"
                    startDecorator={{
                      Paid: <CheckRoundedIcon />,
                      Refunded: <AutorenewRoundedIcon />,
                      Cancelled: <BlockIcon />,
                    }[row.status]}
                    color={{
                      Paid: "success",
                      Refunded: "neutral",
                      Cancelled: "danger",
                    }[row.status]}
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Avatar size="sm">{row.customer.initial}</Avatar>
                    <div>
                      <Typography level="body-xs">{row.customer.name}</Typography>
                      <Typography level="body-xs">{row.customer.email}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <RowMenu />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}
