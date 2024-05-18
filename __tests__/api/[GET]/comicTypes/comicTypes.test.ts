/**
* @jest-environment node
*/
import {GET} from "@/app/api/comicTypes/route"

describe('[GET]/api/comic/comicTypes', () => {

  test('[GET]: Should return status code 200 and list with 45 items', async () => {
    const res = await GET()
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toBe(45)
  })
})