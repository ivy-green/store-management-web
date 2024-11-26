"use client";

import { useAuthStore } from "@/stores";
import { Tag } from "antd";
import { ReactNode } from "react";

export default function ProfilePage() {
    const { user, branchName } = useAuthStore();

    return (
        <div>
            <div className="flex flex-row items-center gap-2 mb-3">
                <div className={`text-[1.5em] font-semi-bold me-3`}>Profile</div>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div className="grid-rows-1 border py-5 px-3 rounded">
                    <div className={`flex flex-row gap-5`}>
                        <div className={`bg-[url('/img/icons/profile.png')] rounded-full h-[7em] w-[7em] bg-cover`}></div>
                        <div className="flex flex-col justify-start flex-grow">
                            <ProfileItem label={'Username:'} value={user?.username} />
                            <ProfileItem label={'Fullname:'} value={user?.fullname} />
                            <ProfileItem label={'Email:'} value={user?.email} />
                            <ProfileItem label={'Phone number:'} value={user?.phoneNumber} />
                            <ProfileItem label={'Branch:'} item={<Tag className={`text-xs capitalize font-semi-bold`}>{branchName ?? "master"}</Tag>} />
                        </div>
                    </div>
                </div>
                <div className="col-span-2 border">test</div>
            </div>
        </div>
    )
}


const ProfileItem = ({
    label, value, item
}: ProfileItemProps) => {
    return <div className={`text-sm mb-2 grid grid-cols-2 w-full`}>
        <div className=" font-semibold">{label}</div>
        <div>{value ?? item}</div>
    </div>
}

type ProfileItemProps = {
    label: string,
    value?: string,
    item?: ReactNode
}