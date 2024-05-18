/**
* @jest-environment node
*/
import {GET} from "@/app/api/SignedinHistory/route"
import initialUser from '@/lib/initial-user'
jest.mock('@/lib/initial-user', ()=>{
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe('[GET]/api/SignedinHistory', () => {
  test('[GET]: Should return status code 401 when not log in', async () => {
    (initialUser as jest.Mock).mockResolvedValue(null);
    const req = {
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(401)
    expect(data["message"]).toEqual("Unauthorized: Please login to use this feature")
  })

  test("[GET]: Should return status code 200 and user's history match with userID when logged in", async () => {
    (initialUser as jest.Mock).mockResolvedValue({id: "6613696f2e2f1db9bf9661fc"});
    const req = {
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    for(const x of data)
      expect(x.userID).toEqual("6613696f2e2f1db9bf9661fc")
  })

  test('[GET]: Should return status code 500 when error in database', async () => {
    (initialUser as jest.Mock).mockRejectedValue(new Error("Something went wrong"));
    const req = {
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(500)
  })
})