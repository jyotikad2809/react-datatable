import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          users: [
            {
              id: 1,
              firstName: "John",
              username: "john_doe",
              email: "john@example.com",
            },
            {
              id: 2,
              firstName: "Jane",
              username: "jane_doe",
              email: "jane@example.com",
            },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders loading and then user data", async () => {
  render(<App />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });
});

test("shows error when fetch fails", async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
    })
  );

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("error in fetching data")).toBeInTheDocument();
  });
});
