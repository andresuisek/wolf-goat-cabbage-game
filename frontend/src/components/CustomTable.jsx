import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Fecha del registro',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Valor',
        dataIndex: 'value',
        key: 'value',
    },
    {
        title: 'Unidad',
        dataIndex: 'unit',
        key: 'unit',
    },
]

const CustomTable = ({data, isLoading, defaultColumns=columns}) => {
    return (
        <Table columns={defaultColumns} dataSource={data} loading={isLoading} />
    );
};

export default CustomTable;