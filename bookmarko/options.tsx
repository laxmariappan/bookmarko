import { useEffect, useState } from "react"

import "./style.css"

function OptionsIndex() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("https://kipumi.us5.instawp.xyz/wp-json/wp/v2/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return (
    <div className=" bg-indigo-500 p-10">
      {data.map(function (item, index) {
        console.log(item)
        return (
          <div key={index} className="p-2">
            <div className="  mb-1 text-white ">
              <h3 className="text-xl  font-bold">
                <a href={item.link}>{item.title.rendered}</a>
              </h3>
              <div
                className="text-sm "
                dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
              />
              <div
                className=" mb-1"
                dangerouslySetInnerHTML={{ __html: item.content.rendered }}
              />
              <br />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OptionsIndex
