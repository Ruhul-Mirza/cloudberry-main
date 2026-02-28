// components/DataTable/RowMenu.jsx
import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Link,
  Box,
} from "@mui/joy";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

/**
 * Row Action Menu Component
 *
 * @param {Object} props
 * @param {Function} props.onEdit - Edit callback
 * @param {Function} props.onDelete - Delete callback
 * @param {Function} props.onRename - Rename callback
 * @param {Function} props.onMove - Move callback
 * @param {Array} props.actions - Custom actions
 * @param {Object} props.row - Current row data
 * @param {Boolean} props.showDownload - Show download link
 * @param {Function} props.onDownload - Download callback
 */
export default function RowMenu({
  onEdit,
  onDelete,
  onRename,
  onMove,
  actions = [],
  row,
  showDownload = false,
  onDownload,
}) {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      {showDownload && (
        <Link
          level="body-xs"
          component="button"
          onClick={() => onDownload?.(row)}
        >
          Download
        </Link>
      )}

      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "plain", color: "neutral", size: "sm" },
          }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          {onEdit && (
            <MenuItem onClick={onEdit}>
              <EditRoundedIcon fontSize="small" style={{ marginRight: 8 }} />
              Edit
            </MenuItem>
          )}
          {onRename && <MenuItem onClick={onRename}>Rename</MenuItem>}
          {onMove && <MenuItem onClick={onMove}>Move</MenuItem>}

          {/* Custom actions */}
          {actions.map((action, index) => (
            <MenuItem
              key={index}
              onClick={() => action.onClick(row)}
              color={action.color}
            >
              {action.icon && (
                <span style={{ marginRight: 8 }}>{action.icon}</span>
              )}
              {action.label}
            </MenuItem>
          ))}

          {(onEdit || onRename || onMove || actions.length > 0) && onDelete && (
            <Divider />
          )}
          {onDelete && (
            <MenuItem color="danger" onClick={onDelete}>
              <DeleteRoundedIcon fontSize="small" style={{ marginRight: 8 }} />
              Delete
            </MenuItem>
          )}
        </Menu>
      </Dropdown>
    </Box>
  );
}
