import { Table } from 'antd';



export default function ListReports(props){
    const {modules, setReloadModules} =props

    const columns = [
      {
        title: 'Usuario',
        dataIndex: 'name',
        key: 'name',
        width: 100,
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
        title: 'Modulo',
        children: [
          {
            title: 'ubicacion',
            dataIndex: 'ubication',
            key: 'age',
            width: 150,
            sorter: (a, b) => a.age - b.age,
          },
          {
            title: 'Contenedores',
            children: [
              {
                title: 'contenedor 1',
                dataIndex: 'contenedor 1',
                key: 'contenedor 1',
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
                title: 'contenedor 2',
                dataIndex: 'contenedor 2',
                key: 'contenedor 2',
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
        ],
      },
      {
        title: 'Company',
        children: [
          {
            title: 'Company Address',
            dataIndex: 'companyAddress',
            key: 'companyAddress',
            width: 200,
          },
          {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
          },
        ],
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 80,
        fixed: 'right',
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

    modules.map(function(module){
      return data.push({
        name: module.user.name,
        ubication: module.module.ubication.title
      })
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