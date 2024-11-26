'use client'

import { useParams } from "next/navigation";


export default function ProductDetailsPage() {
    const params = useParams()

    return (
        <div className={`p-body`}>
            <div>
                ProductDetailsPage: {params.code}
            </div>
        </div>
    )
}
