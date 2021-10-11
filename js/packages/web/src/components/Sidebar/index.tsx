import React from 'react';
import {
  Layout,
  Row,
  Col,
  Image,
  Button
} from 'antd';
import {LinkOutlined} from '@ant-design/icons';

const { Content } = Layout;

export const Sidebar = () => {
  return (
    <Content>
      <div style={{textAlign: 'center'}}>
        <Image src="./sidebar/avatar.svg" preview={false} width="150px" />
        <h2>Tegusu Inc</h2>
        <h4 style={{marginBottom: 0}}>Director, Designer</h4>
        <h4>Tegusu Inc</h4>
        <Button className="start_collecting" style={{width: '100%', marginTop: '30px'}}>Follow</Button>
        <br />
        <Button className="message">Message</Button>
        <Row style={{marginTop: '50px'}}>
          <Col span={12} style={{textAlign: 'left'}}>
            <p>Project Views</p>
            <p>Appreciations</p>
            <p>Followers</p>
            <p>Following</p>
          </Col>
          <Col span={12} style={{textAlign: 'right'}}>
            <p>1,909,194</p>
            <p>125,830</p>
            <p>52,503</p>
            <p>162</p>
          </Col>
        </Row>
        <div style={{marginTop: '40px'}}>
          <h4 style={{color: '#9A9A9A', textAlign: 'left'}}>On the web</h4>
          <Button className="message">Esty</Button>
          <Button className="message">Facebook</Button>
          <Button className="message">Instagram</Button>
        </div>
        <div style={{marginTop: '40px'}}>
          <h4 style={{color: '#9A9A9A', textAlign: 'left'}}>LINKS</h4>
          <Button className="links">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              tegusu web
              <LinkOutlined style={{marginTop: '5px'}} />
            </div>
          </Button>
          <Button className="links">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              tegusu instagram
              <LinkOutlined style={{marginTop: '5px'}} />
            </div>
          </Button>
        </div>
      </div>
    </Content>
  )
}