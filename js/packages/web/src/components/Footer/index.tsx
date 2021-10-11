import React from 'react';
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Row, Col, Input } from 'antd';
import { cleanName } from '../../utils/utils';

const community = ['Editiorial', 'Discord', 'Instagram', 'Twitter', 'Blog', 'Help Center'];
const legle = ['Community', 'Guideliness', 'Terms Of Service', 'Privacy Policy', 'Report Content', 'Bug Bounty', 'Program'];

export const Footer = () => {
  return (
    <div className="footer space_entire">
      <Row gutter={16} style={{padding: '50px 0'}}>
        <Col span={6} className="gutter-row">
          <h3 style={{color: 'black', fontSize: '20px'}}>ARTIMAC</h3>
          <p style={{color: 'black', fontSize: '12px'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
          </p>
          <hr style={{margin: '30px 0'}} />
          <div style={{textAlign: 'center'}}>
            <p style={{color: 'black', fontSize: '14px'}}>
              <strong>Subscribe To Our Newsletter</strong>
            </p>
            <Row gutter={16}>
              <Col span={16} className="gutter-row">
                <Input defaultValue="Email Address" className="subscribe" />
              </Col>
              <Col span={8} className="gutter-row">
                <Button className="start_collecting" style={{marginTop: '5px'}}>SUBSCRIBE</Button>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={3}></Col>
        <Col span={5}>
          <p style={{color: 'black', fontSize: '14px'}}><b>FOR ARTIST</b></p>
          <p style={{color: 'black', fontSize: '12px'}}>Submit artist profile</p>
        </Col>
        <Col span={5}>
          <p style={{color: 'black', fontSize: '14px'}}><b>COMMUNITY</b></p>
          {
            community.map((item, index) =>
              <div key={index}>
                <p style={{color: 'black', fontSize: '12px'}}>{item}</p>
              </div>
            )
          }
        </Col>
        <Col span={5}>
          <p style={{color: 'black', fontSize: '14px'}}><b>LEGLE</b></p>
          {
            legle.map((item, index) =>
              <div key={index}>
                <p style={{color: 'black', fontSize: '12px'}}>{item}</p>
              </div>
            )
          }
        </Col>
      </Row>
    </div>
  );
};
