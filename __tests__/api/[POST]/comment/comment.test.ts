/**
 * @jest-environment node
*/
import {POST} from "@/app/api/follow/route"
import initialUser from '@/lib/initial-user'
import prisma from '@/lib/db'
jest.mock('@/lib/initial-user', ()=>{
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock('@/lib/db', ()=>{
  return {
    __esModule: true,
    default: {
      comments:{
        create: jest.fn()
      }
    }
  };
});

describe('[GET]/api/comment/follow', () => {
  test('[GET]: Should return status code 401 when not log in', async () => {
    (initialUser as jest.Mock).mockResolvedValue(null);
    const req = {
      comicsID: "65f90375ba609768fc30cfdb",
      content: "test"
    } as any
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(401)
    expect(data["message"]).toEqual("Unauthorized: Please login to use this feature")
  })
})