import { Table, Tag, Space } from 'antd';

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
        title: 'fecha',
        dataIndex: 'date',
        key: 'date',
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
        sorter: (a, b) => a.date - b.date,
      },      
    ];

    for (let index = 0; index < 10; index++) {
      var cont = contens[index].conten;
      if (cont !== null && cont !== undefined) {
        columns.push(
          {
            title: cont.title,
            dataIndex: 'tags',
            key: 'tags',
            
            width: 100,
            render: tags => {
              let color = "green";
              if (tags[index] === "Mal") {           
                color = 'volcano';                
              }else{
              }
              
              return (
                <Tag color={color} key={tags[index]}>
                  {tags[index]}
                </Tag>
              );
            }       
          }
      );
      }
    }
    
    const data = [];    
    reports.map(function(report){      
      if (ubi === report.module.ubication.title) {
        if (ar === report.module.area.title) {
          if (report.user !== null){
            return data.push({
              codigo: report.module.codigo,
              name: report.user.name,
              date: report.date,
              tags: [report.conten1, report.conten2, report.conten3, report.conten4, report.conten5, report.conten6, report.conten7, report.conten8, report.conten9, report.conten10 ]
            })
          }else{
            return data.push({
              codigo: report.module.codigo,
              date: report.date,
              tags: [report.conten1, report.conten2, report.conten3, report.conten4, report.conten5, report.conten6, report.conten7, report.conten8, report.conten9, report.conten10 ]
            })
          }          
        }
      }      
    })

    return(
        <Table
            columns={columns}
            dataSource={data}
            bordered
            size="middle"
            scroll={{ x: 1500, y: 300 }}
        />
    );
}