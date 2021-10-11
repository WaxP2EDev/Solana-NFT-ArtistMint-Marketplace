import React from 'react';
import {
  Layout,
  Row,
  Col,
  Image,
  Button,
  Input,
  Space,
} from 'antd';
import {LinkOutlined} from '@ant-design/icons';

const { Content } = Layout;
const {TextArea} = Input;

export const ThoughtView = () => {
  return (
    <Content style={{margin: '0 10vw'}}>
      <Row className="rectangle2" style={{padding: 20}}>
        <Col span={24}>
          <div className="space-align-block" style={{backgroundColor: "#F3F3F3", padding: '15px 10px'}}>
            <Space align="center">
              <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
              <span className="mock-block" style={{color: 'black'}}>What's happening?</span>
            </Space>
            <div style={{justifyContent: 'space-between', display: 'flex', padding: "0 20px", marginTop: '20px'}}>
              <div style={{marginTop: '5px'}}>
                <Image src="./img/bi_image-fill.svg" preview={false} style={{paddingRight: '10px'}} />
                <Image src="./img/Vector.svg" preview={false} style={{paddingRight: '10px'}} />
                <Image src="./img/Vector (1).svg" preview={false} />
              </div>
              <Button className="start_collecting" style={{marginTop: 0}}>Post</Button>
            </div>
          </div>
          <div className="space-align-block" style={{backgroundColor: "#F3F3F3", padding: '20px 30px', marginTop: '30px'}}>
            <Space align="center">
              <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
              <span className="mock-block" style={{color: 'black'}}>@tegusu_inc</span>
            </Space>
            <div style={{width: '100%'}}>
              <Image src="./img/Rectangle 45.svg" preview={false} width="100%" />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Space align="end">
                <Image src="./img/Vector (3).svg" preview={false} />
                <span style={{color: 'black'}}>51</span>
                <span style={{marginRight: '15px'}}></span>
                <Image src="./img/Vector (4).svg" preview={false} />
                <span style={{marginRight: '20px'}}></span>
                <Image src="./img/Vector (5).svg" preview={false} />
              </Space>
            </div>
            <div style={{marginTop: '20px'}}>
              <Space align="center">
                <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                <span className="mock-block" style={{color: 'black'}}>@tegusu_inc</span>
              </Space>
            </div>
            <h4 style={{marginTop: '20px'}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
              printer took a galley of type and scrambled it to 
            </h4>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Space align="end">
                <Image src="./img/Vector (3).svg" preview={false} />
                <span style={{color: 'black'}}>51</span>
                <span style={{marginRight: '15px'}}></span>
                <Image src="./img/Vector (4).svg" preview={false} />
                <span style={{marginRight: '20px'}}></span>
                <Image src="./img/Vector (5).svg" preview={false} />
              </Space>
            </div>
            <div>
              <Space align="center" style={{marginTop: '20px'}}>
                <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                <span className="mock-block" style={{color: 'black'}}>@tegusu_inc</span>
              </Space>
            </div>
            <div style={{width: '100%'}}>
              <Image src="./img/Rectangle 46.svg" preview={false} width="100%" />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Space align="end">
                <Image src="./img/Vector (3).svg" preview={false} />
                <span style={{color: 'black'}}>51</span>
                <span style={{marginRight: '15px'}}></span>
                <Image src="./img/Vector (4).svg" preview={false} />
                <span style={{marginRight: '20px'}}></span>
                <Image src="./img/Vector (5).svg" preview={false} />
              </Space>
            </div>
          </div>
        </Col>
      </Row>
    </Content>
  )
}