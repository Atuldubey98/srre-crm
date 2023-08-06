async function loginUser() {
  const body = {
    email: "atuldubey017@gmail.com",
    password: "hasjdasdasd",
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

(async () => {
  const data = await loginUser();
  console.log(data.data.token);
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
          Authorization: `Bearer ${data.data.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
        method: "POST",
      })
    );
  await Promise.all(customersRequest);
})();
