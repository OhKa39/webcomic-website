/**
* @jest-environment node
*/
import {GET} from "@/app/api/history/route"

describe('[GET]/api/history', () => {
  test('[GET]: Should return status code 200 - with exact IDs', async () => {
    const req = {
      nextUrl:{
        searchParams:
          new URLSearchParams({
            IDs: "65f90375ba609768fc30cfdb,65f90376ba609768fc30cfdc,65f90377ba609768fc30cfdd,65f903aaba609768fc30cfe7"
          })
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toBe(4)
  })

  test('[GET]: Should return status code 400 - with at least 1 wrong comicID format in IDs', async () => {
    const req = {
      nextUrl:{
        searchParams:
          new URLSearchParams({
            IDs: "65f90375ba609768fc30cfdb,2314rqe,65f90377ba609768fc30cfdd,65f903aaba609768fc30cfe7"
          })
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Bad request: contain at least one wrong id format in IDs")
  })

  test('[GET]: Should return status code 400 - with at least 1 true comicID format but not in db', async () => {
    const req = {
      nextUrl:{
        searchParams:
          new URLSearchParams({
            IDs: "65f90375ba609768fc30cfdb,65f90377ba609768fc30cfff,65f90377ba609768fc30cfdd,65f903aaba609768fc30cfe7"
          })
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toEqual(3)
  })
})