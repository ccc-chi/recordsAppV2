import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import { App } from "../App";
import userEvent from "@testing-library/user-event";

// APIをモック
jest.mock("@supabase/supabase-js", () => {
  return {
    createClient: jest.fn(() => ({
      from: jest.fn(() => ({
        select: jest.fn(() => Promise.resolve({ data: [], error: null })),
      })),
    })),
  };
});

describe("App Test", () => {
  test("タイトルが表示されている", async () => {
    render(<App />);
    const title = await screen.findByTestId("title");
    expect(title).toBeInTheDocument();
  });
  test("エラーが表示される", async () => {
    render(<App />);
    const user = userEvent.setup();
    await screen.findByRole("textbox");
    await screen.findByRole("spinbutton");
    const button = await screen.findByTestId("addButton");
    button;

    // 初期表示ではエラーがない
    expect(screen.queryByTestId("error")).toBeNull();

    // 何も入力せずボタンをクリックするとエラーが表示する
    await user.click(button);
    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  test("記録が追加できる", async () => {
    render(<App />);
    const user = userEvent.setup();
    const inputTitle = await screen.findByRole("textbox");
    const inputTime = await screen.findByRole("spinbutton");
    const button = await screen.findByTestId("addButton");

    // 入力して登録
    await user.type(inputTitle, "登録テスト");
    await user.type(inputTime, "1");
    await user.click(button);
    // 登録されたことを確認
    await waitFor(() => {
      expect(screen.getByText(/登録テスト/)).toBeInTheDocument();
    });
  });

  test("記録を削除できる", async () => {
    render(<App />);
    const user = userEvent.setup();

    // テストで登録したものを削除する
    const listItem = await screen.findByText(/登録テスト/);
    const listElement = listItem.closest("li");
    const deleteButton = within(listElement).getByRole("button", {
      name: "削除",
    });
    await user.click(deleteButton);
    // 削除されたことを確認
    await waitFor(() => {
      expect(screen.queryByText(/登録テスト/)).toBeNull();
    });
  });
});
