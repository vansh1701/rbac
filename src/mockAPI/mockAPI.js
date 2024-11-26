const mockData = {
    users: [
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    ],
    roles: [
      { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
      { id: 2, name: 'Editor', permissions: ['read', 'write'] },
    ],
  };
  
  export const getUsers = () => Promise.resolve(mockData.users);
  export const getRoles = () => Promise.resolve(mockData.roles);
  export const createUser = (user) => {
    mockData.users.push(user);
    return Promise.resolve(user);
  };
  