const UserMapper = (user: any) => {
  return {
    name: user.name,
    email: user.email,
  };
};

export default UserMapper;
