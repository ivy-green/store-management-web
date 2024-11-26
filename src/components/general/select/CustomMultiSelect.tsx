import { item } from "@/assets/data/billStatus";
import { useEffect, useState } from "react";

interface CustomMultiSelect {
    onSelect: (items: item[]) => void,
    defaultVals?: number[],
    list: item[]
}

export default function CustomMultiSelect({ onSelect, defaultVals = [], list }: CustomMultiSelect) {
    const [selectedList, setSelectedList] = useState<item[]>([]);

    const isOnSelect = (item: item) => {
        return selectedList.some(val => val.label === item.label);
    }

    const toggleSelect = (item: item) => {
        setSelectedList((prevList) => {
            if (prevList.some(val => val.label === item.label)) {
                onSelect(prevList.filter(val => val.label !== item.label));
                return prevList.filter(val => val.label !== item.label);
            } else {
                onSelect([...prevList, item]);
                return [...prevList, item];
            }
        });
    }

    useEffect(() => {
        setSelectedList(list.filter(item => defaultVals.some(val => val === item.value)))
    }, [])

    return (
        <div className="flex flex-row border-[1px] rounded">
            {selectedList && list.map((item, index) =>
                <SelectItem
                    key={index} data={item}
                    onSelected={isOnSelect(item)}
                    onClick={() => {
                        toggleSelect(item)
                    }} />)}
        </div>
    )
}


interface SelectIBillStatusDatarops {
    data: item,
    onSelected: boolean,
    onClick: () => void,
}

const SelectItem = ({ data, onSelected, onClick }: SelectIBillStatusDatarops) => {
    return <div
        className={`px-5 py-3 flex-grow text-center rounded transition-all duration-300 cursor-pointer 
            ${onSelected ?
                " bg-slate-600 text-white hover:bg-slate-400 hover:text-dark" :
                " hover:bg-slate-600 hover:text-white"}
            `}
        onClick={onClick}>
        {data.label}
    </div>
}
