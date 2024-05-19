/**
* @jest-environment node
*/
import {GET} from "@/app/api/follow/route"
import initialUser from '@/lib/initial-user'
jest.mock('@/lib/initial-user', ()=>{
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe('[GET]/api/comment/follow', () => {
  test('[GET]: Should return status code 401 when not log in', async () => {
    (initialUser as jest.Mock).mockResolvedValue(null);
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset:"20"})
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(401)
    expect(data["message"]).toEqual("Unauthorized: Please login to use this feature")
  })

  test("[GET]: Should return status code 200 and user's follow list when logged in", async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset:"999"})
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    for(const x of data.comics)
    {
      expect(x.isTurnOn).toBe(true)
      expect(x.eventType).toEqual("FOLLOW")
    } 
  })

  test('[GET]: Should return status code 400 - with page contain alphabet char', async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1a", offset: "20"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Bad request: Page or offset must be a number")
  })

  test('[GET]: Should return status code 400 - with offset contain alphabet char', async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset: "20we"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Bad request: Page or offset must be a number")
  })
})