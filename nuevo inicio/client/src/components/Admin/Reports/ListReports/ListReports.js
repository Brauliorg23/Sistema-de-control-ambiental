import { Table, Tag } from 'antd';

export default function ListReports(props){
    const {reports, mod, ubi, ar} =props    
    var contens = [{
      conten: mod.conten1,},
      {conten: mod.conten2,},
      {conten: mod.conten3,},
      {conten: mod.conten4,},
      {conten: mod.conten5,},
      {conten: mod.conten6,},
      {conten: mod.conten7,},
      {conten: mod.conten8,},
      {conten: mod.conten9,},
      {conten: mod.conten10,
    }];

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
    ];

    for (let index = 0; index < 10; index++) {
      var cont = contens[index].conten;
      if (cont !== null) {
        columns.push(
          {
            title: cont.title,
            dataIndex: cont._id,
            key: cont._id,
            children: [            
              {
                title: 'Estado de la condicion',
                dataIndex: index,
                key: index,
                width: 50,
              },
            ],
            width: 100,
            render: tags => (
              <>
                {tags.map(tag => {
                  let color = tag.length > 5 ? 'geekblue' : 'green';
                  if (tag === 'loser') {
                    color = 'volcano';
                  }
                  return (
                    { text: 'bien', status: 'Success' }
                  );
                })}
              </>
            ),
          }
      );
      }
    }
    
    const data = [];    

    reports.map(function(report){
      if (ubi === report.module.ubication.title) {
        if (ar === report.module.area.title) {          
          return data.push({
            codigo: report.module.codigo,
            name: report.user.name,
            date: report.date,
            0: report.conten1,
            1: report.conten2,
            2: report.conten3,
            3: report.conten4,
            4: report.conten5,
            5: report.conten6,
            6: report.conten7,
            7: report.conten8,
            8: report.conten9,
            9: report.conten10,
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