/**
* @jest-environment node
*/
import {GET} from "@/app/api/comic/[comicID]/route"

describe('[GET]/api/comic/[comicID]', () => {

  test('[GET]: Should return status code 200 - with exact comicID', async () => {
    const params = {
      params:{
        comicID: "65f90375ba609768fc30cfdb"
      }
    } as any
    const req = {nextUrl:{}} as any

    const res = await GET(req,params)
    const data = await res.json()
    expect(res.status).toBe(200)
  })

  test('[GET]: Should return status code 404 - with wrong comicID format', async () => {
    const params = {
      params:{
        comicID: "123"
      }
    } as any
    const req = {nextUrl:{}} as any

    const res = await GET(req,params)
    const data = await res.json()
    expect(res.status).toBe(404)
  })

  test('[GET]: Should return status code 404 - with true comicID format but not in db', async () => {
    const params = {
      params:{
        comicID: "65f90375ba609768fc30cefc"
      }
    } as any
    const req = {nextUrl:{}} as any

    const res = await GET(req,params)
    const data = await res.json()
    expect(res.status).toBe(404)
  })
})