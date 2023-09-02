import axios from "axios";
/**
 * axios instance
 */
const instance = axios.create({
  baseURL: "http://localhost:9000",
});
/**
 * login the users
 * @param {{email : string; password : string}} user
 *
 */
function loginUserAPI(user) {
  return instance.post("/api/v1/auth/login", user);
}
function authRequest(token) {
  instance.defaults.headers.authorization = `Bearer ${token}`;
  return instance;
}
function getCustomersAPI() {
  return axios.get(
    "https://dummyjson.com/users?select=firstName,lastName,university,phone"
  );
}

async function createCustomer(customer, token = "") {
  return authRequest(token).get("/api/v1/customers", customer);
}
async function createManyCustomers(customers, token) {
  return customers.map((customer) => createCustomer(customer, token));
}
function getCustomerAddressAPI() {
  return axios.get("https://dummyjson.com/users?select=address,company");
}

async function generateCustomersForCreation() {
  try {
    const { data } = await getCustomersAPI();
    const customers = data.users.map((user) => {
      const contactName = `${user.firstName} ${user.lastName}`;
      const contactPhoneNumber = `${user.phone}`;
      const name = `${user.university}`;
      return {
        name,
        contact: {
          name: contactName,
          phoneNumber: contactPhoneNumber,
        },
      };
    });
    return customers;
  } catch (error) {
    throw error;
  }
}
async function generateCustomerAddress() {
  const { data } = await getCustomerAddressAPI();
  const addressList = data.users.map((user) => {
    const address1 = `${user.address.address} ${user.address.city} ${user.address.state}`;
    const address2 = `${user.company.address.address} ${user.company.address.city} ${user.company.address.state}`;
    return [{ location: address1 }, { location: address2 }];
  });
  return addressList;
}
(async () => {
  const customers = await generateCustomersForCreation();
  const addressList = await generateCustomerAddress();
  const { data } = await loginUserAPI({
    email: "atuldubey017@gmail.com",
    password: "12345678",
  });
  const responseList = await Promise.all(
    createManyCustomers(customers, data.data.token)
  );
  const newCustomerList = responseList.filter(Boolean);
  console.log(newCustomerList);
})();
