import React, {useState, useEffect, } from 'react';
import { EditOutlined , PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Avatar, notification, message, Button, Skeleton, Switch, Divider, Modal as ModalAntd, } from 'antd';
import Modal from '../../../Modal/Modal';
import AvatarC from "../../../../assets/img/png/containerAvatar.png";
import {activateContainerApi, deleteContainerApi} from "../../../../api/containers";
import {getAccessTokenApi} from "../../../../api/auth";
import EditContainerFrom from "../EditContainerForm/EditContainerForm";
import AddContainer from "../AddContainer/AddContainer";
import InfiniteScroll from 'react-infinite-scroll-component';
import VirtualList from 'rc-virtual-list';




import "./ListContainers.scss";

const { confirm } = ModalAntd;
const count = 3;
const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 700;

export default function ListContainer(props){
    const {containersActive, containersInactive, setReloadContainers} = props;
    const [viewContainersActives, setViewContainersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    function addContainer (){
      setIsVisibleModal(true);
      setModalTitle(`Agreagar un nuevo contenedor`);
      setModalContent(<AddContainer setIsVisibleModal={setIsVisibleModal} setReloadContainers={setReloadContainers} />);
    }
    return (
        <div className='list-cont' >
          <div className='list-cont__switch'>
            <Switch
                defaultChecked
                checkedChildren="Ubicasiones Activas" 
                unCheckedChildren="Ubicasiones inactivas"
                onChange={() => setViewContainersActives(!viewContainersActives)}
            />
            <Divider  type='vertical'/>
            <Button 
                type='primary'
                onClick={() => addContainer()}
            >
                Agregar contenedor
            </Button>
          </div>
          {viewContainersActives ? (
            <ContainersActive
              containersActive={containersActive}
              setIsVisibleModal={setIsVisibleModal}
              setModalTitle={setModalTitle}
              setModalContent={setModalContent}
              setReloadContainers={setReloadContainers}
            />
          ) : (
            <containersInactive 
              containersInactive={containersInactive}
              setReloadContainers={setReloadContainers}
            />
          )}
          

          <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>   
        </div>
      );
}

const ContainersActive = () => {
  const [data, setData] = useState([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(body => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {item => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};


// const containersInactive = () => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);

//   const loadMoreData = () => {
//     if (loading) {
//       return;
//     }
//     setLoading(true);
//     fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
//       .then(res => res.json())
//       .then(body => {
//         setData([...data, ...body.results]);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     loadMoreData();
//   }, []);

//   return (
//     <div
//       id="scrollableDiv"
//       style={{
//         height: 400,
//         overflow: 'auto',
//         padding: '0 16px',
//         border: '1px solid rgba(140, 140, 140, 0.35)',
//       }}
//     >
//       <InfiniteScroll
//         dataLength={data.length}
//         next={loadMoreData}
//         hasMore={data.length < 50}
//         loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
//         endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
//         scrollableTarget="scrollableDiv"
//       >
//         <List
//           dataSource={data}
//           renderItem={item => (
//             <List.Item key={item.id}>
//               <List.Item.Meta
//                 avatar={<Avatar src={item.picture.large} />}
//                 title={<a href="https://ant.design">{item.name.last}</a>}
//                 description={item.email}
//               />
//               <div>Content</div>
//             </List.Item>
//           )}
//         />
//       </InfiniteScroll>
//     </div>
//   );
// };

// class ContainersInactive extends React.Component {
//   state = {
//     initLoading: true,
//     loading: false,
//     data: [],
//     list: [],
//   };

//   componentDidMount() {
//     fetch(fakeDataUrl)
//       .then(res => res.json())
//       .then(res => {
//         this.setState({
//           initLoading: false,
//           data: res.results,
//           list: res.results,
//         });
//       });
//   }

//   onLoadMore = () => {
//     this.setState({
//       loading: true,
//       list: this.state.data.concat(
//         [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
//       ),
//     });
//     fetch(fakeDataUrl)
//       .then(res => res.json())
//       .then(res => {
//         const data = this.state.data.concat(res.results);
//         this.setState(
//           {
//             data,
//             list: data,
//             loading: false,
//           },
//           () => {
//             // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
//             // In real scene, you can using public method of react-virtualized:
//             // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
//             window.dispatchEvent(new Event('resize'));
//           },
//         );
//       });
//   };

//   render(props) {
//     console.log(props);
//     const { initLoading, loading, list } = this.state;
//     const loadMore =
//       !initLoading && !loading ? (
//         <div
//           style={{
//             textAlign: 'center',
//             marginTop: 12,
//             height: 32,
//             lineHeight: '32px',
//           }}
//         >
//           <Button onClick={this.onLoadMore}>loading more</Button>
//         </div>
//       ) : null;

//     return (
//       <div className='list-cont' >
//         <List
//           className="list-cont"
//           loading={initLoading}
//           itemLayout="horizontal"
//           loadMore={loadMore}
//           dataSource={list}
//           renderItem={item => (
//             <List.Item
//               actions={[<a key="list-loadmore-edit"><PoweroffOutlined/></a>, <a key="list-loadmore-more"><DeleteOutlined/></a>]}
//             >
//               <Skeleton avatar title={false} loading={item.loading} active>
//                 <List.Item.Meta
//                   src={AvatarC}
//                   title={<a href="https://ant.design">{item.name.last}</a>}
//                   description="Ant Design, a design language for background applications, is refined by Ant UED Team"
//                 />
//               </Skeleton>
//             </List.Item>
//           )}
//         />
//       </div>
//     );
//   }
// }
