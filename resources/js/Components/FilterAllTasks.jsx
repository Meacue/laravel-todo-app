import { useState } from 'react';

const TaskFilters = (props) => {

    const [filters, setFilters] = useState([
        {
            key: 'выполнена',
            name: 'выполнена'
        },
        {
            key: 'выполняется',
            name: 'выполняется'
        },
        {
            key: 'отменена',
            name: 'отменена'
        },
        {
            key: 'к выполнению',
            name: 'к выполнению'
        },
    ])


    return (
        <div className="filters ">
            {filters.map(el => (
                <div 
                    key={el.key}
                    onClick={() => props.chooseFilter(el.key)}
                >{el.name}</div>
            ))}
        </div>
    );
}

export default TaskFilters;