import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  ListItemIcon,
  ListItemText as ListItemTextMUI,
} from '@mui/material';

const drawerWidth = 240;

// Role permissions mapping with detailed description
const rolePermissions = {
  Admin: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canView: true,
    details: [
      "Can create new items",
      "Can edit existing items",
      "Can delete items",
      "Can view all items",
    ],
  },
  HR: {
    canAdd: true,
    canEdit: true,
    canDelete: false,
    canView: true,
    details: [
      "Can create new items",
      "Can edit existing items",
      "Cannot delete items",
      "Can view all items",
    ],
  },
  User: {
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canView: true,
    details: [
      "Cannot create new items",
      "Cannot edit existing items",
      "Cannot delete items",
      "Can view all items",
    ],
  },
};

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [currentItem, setCurrentItem] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setMobileOpen(false);
  };

  const permissions = rolePermissions[selectedRole] || {};

  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    setCurrentItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentItem(null);
  };

  const handleSave = (newItem) => {
    if (modalMode === 'add') {
      setItems([...items, { id: items.length + 1, ...newItem }]);
      setSnackbarMessage('Item added successfully');
    } else if (modalMode === 'edit') {
      setItems(items.map((item) => (item.id === currentItem.id ? { ...currentItem, ...newItem } : item)));
      setSnackbarMessage('Item updated successfully');
    }
    setOpenSnackbar(true);
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setSnackbarMessage('Item deleted successfully');
    setOpenSnackbar(true);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Admin', 'HR', 'User'].map((role) => (
          <ListItem key={role} disablePadding>
            <ListItemButton onClick={() => handleRoleSelect(role)}>
              <ListItemText primary={role} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px}` } }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Role Based Access Control
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          {selectedRole ? `Welcome, ${selectedRole}` : 'Please select a role'}
        </Typography>

        {/* Display Role-Based Access Control Description */}
        {!selectedRole && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              What is Role-Based Access Control (RBAC)?
            </Typography>
            <Typography variant="body1">
              Role-Based Access Control (RBAC) is a method of restricting system access to authorized users based on their roles.
              Each user is assigned a role, and each role is granted specific permissions. This helps ensure that individuals have
              access only to the resources they need to perform their job functions, enhancing security and reducing the risk of
              unauthorized access. The main roles are typically categorized as follows:
            </Typography>
            <List sx={{ ml: 4, mt: 2 }}>
              <ListItem>
                <ListItemText primary="Admin: Has full access to all functionalities" />
              </ListItem>
              <ListItem>
                <ListItemText primary="HR: Can manage employee-related data, but can't delete items" />
              </ListItem>
              <ListItem>
                <ListItemText primary="User: Can only view data, but cannot modify or delete" />
              </ListItem>
            </List>
          </Box>
        )}

        {/* Display role-specific details with bullet points */}
        {selectedRole && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Role Permissions
            </Typography>
            <List>
              {permissions.details.map((detail, index) => (
                <ListItem key={index}>
                  <ListItemIcon>•</ListItemIcon>
                  <ListItemTextMUI primary={detail} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {permissions.canView && (
          <Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    {(permissions.canEdit || permissions.canDelete) && <TableCell>Actions</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      {(permissions.canEdit || permissions.canDelete) && (
                        <TableCell>
                          {permissions.canEdit && (
                            <Button size="small" onClick={() => handleOpenModal('edit', item)} startIcon={<EditIcon />} variant="contained" sx={{ marginRight: 1 }}>
                              Edit
                            </Button>
                          )}
                          {permissions.canDelete && (
                            <Button size="small" color="error" onClick={() => handleDelete(item.id)} startIcon={<DeleteIcon />} variant="contained">
                              Delete
                            </Button>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {permissions.canAdd && (
              <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleOpenModal('add')}>
                Add Item
              </Button>
            )}
          </Box>
        )}

        {/* Modal for adding/editing items */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ p: 4, backgroundColor: 'white', mx: 'auto', my: '10%', width: '50%' }}>
            <Typography variant="h6" gutterBottom>
              {modalMode === 'add' ? 'Add Item' : 'Edit Item'}
            </Typography>
            <TextField
              fullWidth
              label="Name"
              defaultValue={modalMode === 'edit' ? currentItem?.name : ''}
              sx={{ mb: 2 }}
              onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Description"
              defaultValue={modalMode === 'edit' ? currentItem?.description : ''}
              sx={{ mb: 2 }}
              onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSave(currentItem)}
                disabled={!currentItem?.name || !currentItem?.description}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Snackbar for success messages */}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
