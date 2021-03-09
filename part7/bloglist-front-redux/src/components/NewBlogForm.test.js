import React from "react"
import NewBlogForm from "./NewBlogForm"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"

describe("<NewBlogForm />", () => {
    test("form uses correct information when creating a new blog" , () => {
        const mockhandler = jest.fn()
        const component = render(
            <NewBlogForm loginStatus={true} createBlog={mockhandler} />
        )
        const form = component.container.querySelector("#form")
        const titleInput = component.container.querySelector("#titleInput")
        const authorInput = component.container.querySelector("#authorInput")
        const urlInput = component.container.querySelector("#urlInput")
        const testBlog = {
            title: "title test",
            author: "author test",
            url: "url test"
        }
        fireEvent.change(titleInput, {
            target: { value: testBlog.title }
        })
        fireEvent.change(authorInput, {
            target: { value: testBlog.author }
        })
        fireEvent.change(urlInput, {
            target: { value: testBlog.url }
        })
        fireEvent.submit(form)

        expect(mockhandler.mock.calls[0][0]).toMatchObject(testBlog)
    })
})