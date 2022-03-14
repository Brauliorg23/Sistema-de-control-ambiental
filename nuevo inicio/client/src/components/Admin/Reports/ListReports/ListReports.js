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
            title: 'Contenedor 1',
            dataIndex: 'reciduo 1',
            key: 'reciduo 1',
            children: [
              {
                title: 'Typo ',
                dataIndex: 'type1',
                key: 'type1',
                width: 100,
              },
              {
                title: 'estado',
                dataIndex: 'des1',
                key: 'des1',
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
                title: 'Tipo ',
                dataIndex: 'type2',
                key: 'type2',
                width: 100,
              },
              {
                title: 'estado',
                dataIndex: 'des2',
                key: 'des2',
                width: 100,
              },
            ],
            width: 150,
          },
          {
            title: 'Tipo',
            dataIndex: 'type3',
            key: 'type3',
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
            title: 'Tipo',
            dataIndex: 'type4',
            key: 'type4',
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
            title: 'Tipo',
            dataIndex: 'type5',
            key: 'type5',
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
            title: 'Tipo',
            dataIndex: 'type6',
            key: 'type6',
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
            title: 'Tipo',
            dataIndex: 'type7',
            key: 'type7',
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
            date: report.date,
            type1: report.module.conten1.title,
            type2: report.module.conten2.title,
            type3: report.module.conten3.title,
            type4: report.module.conten4.title,
            type5: report.module.conten5.title,
            type6: report.module.conten6.title,
            type7: report.module.conten7.title,
          })
        }
      }      
    })

    console.log(reports);
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