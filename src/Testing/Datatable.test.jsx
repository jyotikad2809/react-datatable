import { render, screen, within } from "@testing-library/react";
import Datatable from "../components/Datatable";

describe("Datatable component", () => {
  const mockedHeaders = [
    { id: 1, label: "age" },
    { id: 2, label: "name" },
    { id: 3, label: "email" },
  ];
  const mockedUsers = [
    {
      id: 1,
      username: "jyotikad",
      firstName: "jyoti",
      email: "jyoti1234@gmail.com",
    },
    {
      id: 2,
      username: "chetankad",
      firstName: "chetan",
      email: "chetan1234@gmail.com",
    },
    {
      id: 3,
      username: "sachinsharma",
      firstName: "sachin",
      email: "sachin1234@gmail.com",
    },
  ];

  test("should display the table with headers and user data", () => {
    render(
      <Datatable
        users={mockedUsers}
        headers={mockedHeaders}
        error={false}
        errorMessage={"error in fetching data"}
        loading={false}
      />
    );

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    mockedHeaders.forEach((header) => {
      expect(screen.getByText(header.label)).toBeInTheDocument();
    });

    mockedUsers.forEach((user) => {
      expect(screen.getByText(user.firstName)).toBeInTheDocument();
      expect(screen.getByText(user.username)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
    const ids = mockedUsers.map(
      (user) => screen.getByText(user.id.toString()).textContent
    );

    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });
});
