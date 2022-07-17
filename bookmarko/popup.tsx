import { useEffect, useState } from "react"

import "./style.css"

function IndexPopup() {
  const [pageData, setPageData] = useState({ url: "", title: "" })
  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url
        const title = tabs[0].title
        setPageData({ url, title })
      })
  }, [])

  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  async function saveData(bookmark) {
    console.log(bookmark)
    return true
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)

    const data = new FormData(e.target)
    const bookmark = Object.fromEntries(data.entries())

    bookmark.tags = bookmark.tags
      .split(",")
      .filter((tag) => tag.trim().length !== 0)
      .map((tag) => ({
        name: tag.trim()
      }))

    const result = await saveData(bookmark)

    if (result) {
      setIsSaved(true)
    } else {
      setIsSaving(false)
    }
  }

  return (
    <div className=" p-3  w-full bg-gray-200">
      <div className=" bg-white  p-2">
        {isSaved ? (
          <div className="h-80 w-60">
            <h2 className="text-2xl text-indigo-600">Saved</h2>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input
                name="title"
                type="text"
                defaultValue={pageData.title}
                title={pageData.title}
                required
              />
            </div>
            <div>
              <label>URL</label>
              <input
                name="url"
                type="url"
                defaultValue={pageData.url}
                title={pageData.url}
                required
              />
            </div>

            <div>
              <label>Tags</label>
              <input name="tags" type="text" />
              <small>Separate Tags with Commas</small>
            </div>
            <div>
              <label>Notes</label>
              <textarea name="notes" rows={3}></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-indigo-600 text-white p-1">
                {isSaving ? <span>Saving</span> : <span>Save</span>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default IndexPopup
