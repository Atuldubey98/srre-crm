async function loginUser() {
  const body = {
    email: "atuldubey017@gmail.com",
    password: "12345678",
  };
  const response = await (
    await fetch("http://127.0.0.1:9000/api/v1/auth/login", {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return response;
}
async function runCustomerRequests(token = "") {
  const customerApiData = await fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  const customersRequest = customerApiData.users
    .map((user) => ({
      name: user.company.name,
      contact: {
        phoneNumber: user.phone,
        name: user.firstName + " " + user.lastName,
      },
      address: [
        {
          location: user.company.address.address,
        },
        {
          location: user.address.address,
        },
      ],
    }))
    .map((customer) =>
      fetch("http://localhost:9000/api/v1/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
        method: "POST",
      })
    );
  await Promise.all(customersRequest);
}
function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

/**
 *
 * @param {string} token
 * @returns {Promise<[]>}
 */
async function getCustomers(token = "") {
  return fetch("http://localhost:9000/api/v1/customers", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((res) => res.json());
}
(async () => {
  const data = await loginUser();
  const token = data.data.token;
  await runCustomerRequests(token);
  const { data: customers } = await getCustomers(token);
  const reportRequests = customers
    .filter((customer) => customer.address.length !== 0)
    .map((customer) => {
      const addressId =
        customer.address[getRandomInteger(customer.address.length)]._id;
      return {
        customer: customer._id,
        customerAddress: addressId,
        serviceDate : "2023-09-01",
        acMetaInfo: [
          {
            tonnage: 5,
            modelNumber: "kahsdioh1kahsdkjasd",
            typeOfAC: "splitac",
            services: ["64e35d776e76008aca656d2f"],
          },
        ],
        description: "This is descriptions ",
        status: "Complete",
        technician : "64dd0b5a64e7507f57e375cc"
      };
    })
    .map(async (report) => {
      return fetch("http://localhost:9000/api/v1/service-reports", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
        method: "POST",
      }).then((res) => res.json());
    });
  const serviceReports = await Promise.all(reportRequests);
  console.log(serviceReports);
})();
