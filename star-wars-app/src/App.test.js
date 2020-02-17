import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import axios from "axios";

test("App renders", () => {
    const wrapper = rtl.render(<App />);

    const logo = wrapper.getByAltText(/logo/i);

    expect(logo).toBeVisible();
});

jest.mock("axios", () => {
    return {
        get: jest.fn(() => Promise.resolve({
            data: {
                results: [{ name: 'Simon', url: 'asdjgjashgta' }]
            }
        }))
    }
})

test("API successfully is called", () => {
    const wrapper = rtl.render(<App />);

    wrapper.getByAltText(/logo/i);

    expect(axios.get).toHaveBeenCalled();
})

test("Next Button calls upon API", () => {

    const wrapper = rtl.render(<App />);
    const next = wrapper.getByText(/next/i)
    rtl.fireEvent.click(next)

    expect(axios.get).toHaveBeenCalled()
})

test('renders result of API call', async () => {
    const { findByText } = rtl.render(<App />)
    expect(await findByText(/simon/i)).toBeVisible()
})