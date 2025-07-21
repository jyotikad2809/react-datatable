import { render, screen } from "@testing-library/react";
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

  expect(screen.getAllByText(/loading/i)).toHaveLength(2);

  const johns = await screen.findAllByText("John");
  const janes = await screen.findAllByText("Jane");

  expect(johns.length).toBe(2);
  expect(janes.length).toBe(2);
});

test("shows error when fetch fails", async () => {
  global.fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

  render(<App />);

  const errors = await screen.findAllByText("error in fetching data");
  expect(errors).toHaveLength(2);
});
