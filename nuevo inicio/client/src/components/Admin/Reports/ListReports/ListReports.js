import { Table } from 'antd';



export default function ListReports(props){
    const {reports, mod, ubi, ar} =props
    console.log(mod);

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
        key: 'TypeR',
        children: [
          
        ],
      }
    ];

    if (mod.conten3 !== "null" ) {
      columns.TypeR.children.push(
        
            {
              title: 'Contenedor 1',
              dataIndex: 'reciduo 1',
              key: 'reciduo 1',
              children: [
                {
                  title: mod.conten1.title,
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
    );
    } else {
      
    }
    

    
    const data = [];

    

    reports.map(function(report){
      if (ubi === report.module.ubication.title) {
        if (ar === report.module.area.title) {
          if (
            report.module.conten3 === "null"
          ){
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
          return data.push({
            codigo: report.module.codigo,
            name: report.user.name,
            date: report.date,
            type1: report.module.conten1.title,
            type2: report.module.conten2.title,
            // type3: report.module.conten3.title,
            type4: report.module.conten4.title,
            type5: report.module.conten5.title,
            type6: report.module.conten6.title,
            type7: report.module.conten7.title,
          })
        }
      }      
    })

    return(
        <Table
            columns={columns}
            dataSource={data}
            bordered
            size="middle"
        />
    );
}