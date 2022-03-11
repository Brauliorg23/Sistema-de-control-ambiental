import { Table } from 'antd';



export default function ListReports(props){
    const {reports, setReloadReports, ubi, ar} =props

    const columns = [
      {
        title: 'usuario',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        fixed: 'left',
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'John',
            value: 'John',
          },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
      },
      {
        title: 'fecha',
        dataIndex: 'date',
        key: 'date',
        width: 150,
        fixed: 'left',
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'John',
            value: 'John',
          },
        ],
        sorter: (a, b) => a.date - b.date,
      },
      {
        title: 'Tipo de reciduo',
        children: [
          {
            title: 'Reciduo 1',
            dataIndex: 'reciduo 1',
            key: 'reciduo 1',
            children: [
              {
                title: 'nombre',
                dataIndex: 'street',
                key: 'street',
                width: 100,
              },
              {
                title: 'estado',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
            width: 150,
          },
          {
            title: 'Reciduo 2',
            dataIndex: 'reciduo 2',
            key: 'reciduo 2',
            children: [
              {
                title: 'nombre',
                dataIndex: 'street',
                key: 'street',
                width: 100,
              },
              {
                title: 'estado',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
            width: 150,
          },
          {
            title: 'Reciduo 3',
            dataIndex: 'reciduo 3',
            key: 'reciduo 3',
            children: [
              {
                title: 'nombre',
                dataIndex: 'street',
                key: 'street',
                width: 100,
              },
              {
                title: 'estado',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
            width: 150,
          },
          {
            title: 'Reciduo 4',
            dataIndex: 'reciduo 4',
            key: 'reciduo 4',
            children: [
              {
                title: 'nombre',
                dataIndex: 'street',
                key: 'street',
                width: 100,
              },
              {
                title: 'estado',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
            width: 150,
          },
          {
            title: 'Reciduo 5',
            dataIndex: 'reciduo 5',
            key: 'reciduo 5',
            children: [
              {
                title: 'nombre',
                dataIndex: 'street',
                key: 'street',
                width: 100,
              },
              {
                title: 'estado',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
            width: 150,
          },
          {
            title: 'Reciduo 6',
            dataIndex: 'reciduo 6',
            key: 'reciduo 6',
            children: [
              {
                title: 'nombre',
                dataIndex: 'street',
                key: 'street',
                width: 100,
              },
              {
                title: 'estado',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
            width: 150,
          },
          {
            title: 'Reciduo 7',
            dataIndex: 'reciduo 7',
            key: 'reciduo 7',
            children: [
              {
                title: 'nombre',
                dataIndex: 'street',
                key: 'street',
                width: 100,
              },
              {
                title: 'estado',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
            width: 150,
          },
        ],
      },
      
    ];
    
    const data = [];
    // for (let i = 0; i < 100; i++) {
    //   data.push({
    //     key: i,
    //     name: modules.map(function(module){return module.user.name}),
    //     age: i + 1,
    //     street: 'Lake Park',
    //     building: 'C',
    //     number: 2035,
    //     companyAddress: 'Lake Street 42',
    //     companyName: 'SoftLake Co',
    //     gender: 'M',
    //   });
    // }

    reports.map(function(report){
      if (ubi === report.module.ubication.title) {
        if (ar === report.module.area.title) {
          return data.push({
            codigo: report.module.codigo,
            name: report.user.name,
            ubication: report.module.ubication.title
          })
        }
      }      
    })

    
    console.log(data);
    return(
        <Table
            columns={columns}
            dataSource={data}
            bordered
            size="middle"
        />
    );
}