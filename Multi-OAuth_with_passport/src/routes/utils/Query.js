export const getAllUsersQuery = "SELECT * FROM users";

export const getUserById = "SELECT * FROM users WHERE user_id = $1";

export const checkEmailExists = "SELECT * FROM users  WHERE email = $1";
// export const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";

export const addUsers =
  "INSERT INTO users (user_id, provider, email, password, full_name) VALUES ($1, $2, $3, $4, $5)";

export const deleteUserByID = "DELETE FROM users WHERE id = $1;";

export const updateUserById = "UPDATE users SET name = $1 WHERE id = $2 ";
