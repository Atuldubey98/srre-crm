import encryptionRepository from "./encryption.repostory.js";
import {
  PasswordDoestNotMatchError,
  UserDoesNotExistsError,
  UserExistsError,
} from "./errors.js";
import User from "./user.model.js";
const {
  encryptPassword,
  checkPasswordMatching,
  getTokenAndEncryptionThePayload,
} = encryptionRepository();
export default function userRepository() {
  const defaultUserSelect = {
    name: 1,
    email: 1,
    _id: 1,
    createdAt: 1,
    updatedAt: 1,
  };
  async function getEmployeeById(userId = "") {
    return User.findById(userId).select(defaultUserSelect);
  }

  async function getAllEmployees() {
    return User.find({ role: "EMPLOYEE" }).select(defaultUserSelect);
  }
  async function loginUser(user) {
    try {
      const existingUser = await findByUserByEmailId(user.email);
      if (!existingUser) {
        throw new UserDoesNotExistsError();
      }
      const isPasswordMatching = await checkPasswordMatching(
        user.password,
        existingUser.password
      );
      if (!isPasswordMatching) {
        throw new PasswordDoestNotMatchError();
      }
      const userPayload = {
        email: existingUser.email,
        role: existingUser.role,
        name: existingUser.name,
        _id: existingUser._id,
      };
      const token = await getTokenAndEncryptionThePayload(userPayload);
      return {
        user: userPayload,
        token,
      };
    } catch (error) {
      throw error;
    }
  }
  async function findByUserByEmailId(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async function deleteEmployeeById(userId) {
    return User.findByIdAndDelete(userId);
  }
  async function createUser(user) {
    try {
      const existingUser = await findByUserByEmailId(user.email);
      if (existingUser) {
        throw new UserExistsError();
      }
      const encryptedPassword = await encryptPassword(user.password);
      const newUser = new User({
        ...user,
        password: encryptedPassword,
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  return Object.freeze({
    createUser,
    loginUser,
    getAllEmployees,
    deleteEmployeeById,
    getEmployeeById,
  });
}
