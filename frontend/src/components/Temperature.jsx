import React, { useEffect, useState } from 'react';
import CustomTable from './CustomTable';
import { useGetTemperatureQuery } from '../baseApi';
import TemperatureIcon from '../images/icons8-termómetro-96.png';
import { Col, Row, Tag } from 'antd';
import Title from 'antd/es/typography/Title';

import { Slider } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
const marks = {
    0: '0°C',
    20: '20°C',
    37: '37°C',
    80: '80°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
  };

const Temperature = () => {
    const [toastId, setToastId] = useState(null);
    const [defaultTemperature, setDefaultTemperature] = useState([20, 80]);
    const { data, error, isLoading } = useGetTemperatureQuery(undefined, {
        pollingInterval: 3000,
    });

    const onChangeComplete = (value) => {
        setDefaultTemperature(value)
        // console.log('onChangeComplete: ', value);
    };

    useEffect(() => {
        if(data){
            if(data[0].value < defaultTemperature[0] || data[0].value > defaultTemperature[1]){
              if (toastId) {
                toast.dismiss(toastId);
              }

              const newToastId = toast.error('Cuidado, temperatura fuera de Rango!', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
              setToastId(newToastId);
            }          
        }
    }, [data]);

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            key: 'value',
            render: (value) => {
              let color = 'green';
          
              if (value < defaultTemperature[0] || value > defaultTemperature[1]) {
                color = 'volcano';
              }
          
              return (
                <span>
                  <Tag color={color} key={value}>
                    {value}
                  </Tag>
                </span>
              );
            },
          },
        {
            title: 'Unidad',
            dataIndex: 'unit',
            key: 'unit',
        },
    ]

    return (
        <>
            <Row>
                <Col span={24} style={{textAlign: 'center'}}>
                    <Title>Temperatura</Title>    
                </Col>
                <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={TemperatureIcon} alt='icon' />
                    <Title>{data && `${data[0]?.value} ${data[0]?.unit}`}</Title>
                </Col>
                <Col span={24} style={{padding: '0 100px'}}>
                    <Slider onChangeComplete={onChangeComplete} range marks={marks} defaultValue={defaultTemperature} />
                </Col>
                <Col span={24}>
                    <CustomTable data={data} isLoading={isLoading} defaultColumns={columns}/>
                </Col>
            </Row>   

            <ToastContainer />
        </>
    );
};

export default Temperature;