import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"



describe("<Button />", () => {
    const blog = {
        title: "testrun",
        author: "pyry",
        url: "https://www.youtube.com",
        likes: 0
    }
    test("renders only blog title and author on default", () => {


        const component = render (
            <Blog blog = {blog} />
        )

        expect(component.container).toHaveTextContent("testrun")
        expect(component.container).toHaveTextContent("pyry")
        const url = component.queryByText("https://www.youtube.com/")
        expect(url).toBeNull()
        const likes = component.queryByText("0")
        expect(likes).toBeNull()

    })

    test("render all blog information when button is pressed", () => {

        const component = render(
            <Blog blog={blog} />
        )

        const button = component.getByText("view")
        fireEvent.click(button)

        expect(component.container).toHaveTextContent("testrun")
        expect(component.container).toHaveTextContent("pyry")
        expect(component.container).toHaveTextContent("https://www.youtube.com")
        expect(component.container).toHaveTextContent("0")
    })

    test("clicking the like button twice calls the handler twice", () => {
        const mockHandler = jest.fn()
        const component = render(
            <Blog blog={blog} testHandler={mockHandler} />
        )
        const viewButton = component.getByText("view")
        fireEvent.click(viewButton)
        const likeButton = component.getByText("like")
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

