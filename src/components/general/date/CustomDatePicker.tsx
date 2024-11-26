import DatePicker from "antd/es/date-picker";
import { format } from "date-fns";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const dateFormat = 'YYYY-MM-DD';

interface CustomDatePickerProps {
    onDatePicked: (val: string) => void
}

export default function CustomDatePicker(props: CustomDatePickerProps) {
    const { onDatePicked } = props

    const onChange = (date: Dayjs) => {
        if (date) {
            console.log('Date: ', date);
            onDatePicked(date.format('YYYY/MM/DD').toString());
        } else {
            console.log('Clear');
        }
    };

    return (
        <DatePicker
            presets={[
                { label: 'Yesterday', value: dayjs().add(-1, 'd') },
                { label: 'Last Week', value: dayjs().add(-7, 'd') },
                { label: 'Last Month', value: dayjs().add(-1, 'month') },
            ]}
            defaultValue={dayjs(format(new Date(), 'yyyy/MM/dd'))}
            onChange={onChange}
        />
    )
}
