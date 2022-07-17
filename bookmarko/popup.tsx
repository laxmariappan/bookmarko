import { useState } from "react"

import "./style.css"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className=" p-3  w-full bg-gray-200">
      <div className=" bg-white  p-2">
        <h2 className="text-2xl text-indigo-600">
          Welcome to your{" "}
          <a href="https://www.plasmo.com" target="_blank">
            Plasmo
          </a>{" "}
          Extension!
        </h2>
        <input
          className="form-input bg-gray-100"
          onChange={(e) => setData(e.target.value)}
          value={data}
        />
        <a
          href="https://docs.plasmo.com"
          className="bg-indigo-600 text-white p-1"
          target="_blank">
          View Docs
        </a>
      </div>
    </div>
  )
}

export default IndexPopup
