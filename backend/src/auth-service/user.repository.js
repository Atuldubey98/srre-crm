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
  /**
   * 
   * @param {string} userId 
   */
  async function getEmployeeById(userId = "") {
    return User.findById(userId).select(defaultUserSelect);
  }
  /**
   * 
   * getting all the employees
   */
  async function getAllEmployees() {
    return User.find({ role: "EMPLOYEE" }).select(defaultUserSelect);
  }
  /**
   * login user repository
   * @param {{email: string; password : string;}} user 
   */
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
  /**
   * 
   * @param {string} email 
   */
  async function findByUserByEmailId(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  /**
   * delete employee by id
   * @param {string} userId 
   */
  async function deleteEmployeeById(userId) {
    return User.findByIdAndDelete(userId);
  }
  /**
   * registering a new user
   * @param {{email : string; password : string;}} user 
   */
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
