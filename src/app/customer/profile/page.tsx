'use client'

import BillsPage from "@/app/admin/bills/page";
import { useAuthStore } from "@/stores";

export default function ProfilePage() {
    const { user } = useAuthStore();

    return (
        <div className="p-body flex flex-row">
            <div className="w-[20%] flex flex-col">
                <div>My Profile</div>
                <div>Full name: {user?.fullname}</div>
                <div>Username: {user?.username}</div>
                <div>Phone number: {user?.phoneNumber}</div>
                <div>Bio: {user?.bio}</div>
            </div>
            <div className="flex-grow ps-5">
                {user ? <div>
                    <BillsPage />
                </div>
                    : <div>You don't have account? Register first</div>}
            </div>
        </div>
    )
}
