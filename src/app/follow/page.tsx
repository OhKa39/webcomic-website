"use client"

import { useState } from "react";
import { User } from "@prisma/client"
import initialUser from "@/lib/initial-user"
export default async function FollowPage() {
    const user = await initialUser()
    try {
        if (!user) alert("Please Login First")
    }
    catch {

    }


    return (
        <div>
            <h1>Truyện đã theo dõi</h1>

        </div>
    );
}

