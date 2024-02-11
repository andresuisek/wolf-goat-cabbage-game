import React, { useEffect, useState } from 'react';
import CustomTable from './CustomTable';
import { useGetHumidityQuery } from '../baseApi';
import HumidityIcon from '../images/icons8-higrómetro-96.png';
import Title from 'antd/es/typography/Title';
import { Col, Row, Slider, Tag } from 'antd';
import { toast } from 'react-toastify';

const marks = {
    0: '0%',
    40: '40%',
    60: '60%',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100%</strong>,
    },
  };

const Humidity = () => {
    const [toastId, setToastId] = useState(null);
    const [defaultHumidity, setDefaultHumidity] = useState([40, 70]);
    const { 
        data,
        isLoading,
        isFetching,
    } = useGetHumidityQuery(undefined, {
        pollingInterval: 3000
    });

    const onChangeComplete = (value) => {
        setDefaultHumidity(value)
    };

    useEffect(() => {
        if(data){
            if(data[0].value < defaultHumidity[0] || data[0].value > defaultHumidity[1]){
                if (toastId) {
                    toast.dismiss(toastId);
                }

                const newToastId = toast.info('Cuidado, Humedad fuera de Rango!', {
                    position: "top-right",
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
          
              if (value < defaultHumidity[0] || value > defaultHumidity[1]) {
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
                    <Title>Humedad</Title>    
                </Col>
                <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={HumidityIcon} alt='icon' />
                    <Title>{data && `${data[0]?.value} ${data[0]?.unit}`}</Title>
                </Col>
                <Col span={24} style={{padding: '0 100px'}}>
                    <Slider onChangeComplete={onChangeComplete} range marks={marks} defaultValue={defaultHumidity} />
                </Col>
                <Col span={24}>
                    <CustomTable data={data} isLoading={isLoading} defaultColumns={columns}/>
                </Col>                
            </Row>
        </>
    );
};

export default Humidity;