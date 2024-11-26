# Role-Based Access Control (RBAC) React App

This is a simple React app demonstrating **Role-Based Access Control (RBAC)** using Material-UI components. The app allows different users (Admin, HR, User) to view, create, edit, and delete items based on their roles and permissions.

## Folder Structure
rbac/ ├── src/ │ ├── components/ │ │ └── drawer/ │ │ └── drawer.js # Main component for the app's layout and logic │ ├── App.js # The root component that renders the drawer component │ ├── index.js # Entry point for the React app │ ├── App.css # Global styles └── README.md # Documentation for the app

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/rbac-react-app.git
cd rbac-react-app
```

2. Install dependencies:

npm install

3. Run the development Server:

npm start

The app will be available at http://localhost:3000/.

Features
Role-Based Access Control
Admin:

Can create new items
Can edit existing items
Can delete items
Can view all items
HR:

Can create new items
Can edit existing items
Cannot delete items
Can view all items
User:

Cannot create new items
Cannot edit existing items
Cannot delete items
Can view all items
Functionalities
View Items: Depending on the selected role, users can view the items in the table.
Create Items: Admins and HR can create new items.
Edit Items: Admins and HR can edit existing items.
Delete Items: Only Admins can delete items.
Responsive Drawer: The app uses a responsive navigation drawer that can be toggled on mobile devices. The drawer displays the available roles (Admin, HR, User) and allows the user to switch between them.
Code Structure
src/components/drawer/drawer.js
This is the main component of the app, which contains the following key parts:

Role Selection: Users can select a role from the navigation drawer (Admin, HR, or User). The selected role determines the permissions available to the user.

Permissions: Based on the selected role, different permissions are granted. These permissions control the ability to view, create, edit, or delete items.

Modal for Add/Edit Item: A modal is used to add or edit items. Users with appropriate permissions can open this modal to make changes.

Table for Displaying Items: A Material-UI table is used to display the items, with action buttons for editing and deleting (based on permissions).

Permissions Management
The rolePermissions object maps roles to specific permissions (canAdd, canEdit, canDelete, and canView). For example:
```bash
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
```

Modal for Creating and Editing Items
When the user clicks the "Add Item" button (if they have permission to do so), a modal will appear where they can input the name and description of a new item. Similarly, if the user has permission to edit an item, they can click the "Edit" button in the table to modify an existing item.

Material-UI Components
Drawer: A responsive side navigation that shows roles and permissions.
Table: Displays a list of items with the ability to view, edit, or delete based on the permissions.
Modal: For adding and editing items.
Snackbar: Provides feedback for actions like saving, deleting, or editing items.
How to Use
Select a Role: Click on any of the roles (Admin, HR, User) from the side drawer to see the permissions associated with that role.

View Items: All users can view the list of items in the table.

Create New Item: Admin and HR roles can click the "Add Item" button to create a new item. Users without this permission won't see the button.

Edit Item: Admin and HR roles can click the "Edit" button on any item to modify its details.

Delete Item: Only Admin can delete items by clicking the "Delete" button next to an item.

Conclusion
This React app demonstrates the concept of Role-Based Access Control (RBAC) with different user roles and permissions. The app is built using Material-UI for a clean and responsive UI. Depending on the selected role, users can perform different actions on the list of items.

Feel free to customize and expand this app as per your needs!
