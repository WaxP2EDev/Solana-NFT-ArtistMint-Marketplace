import React from 'react';
import {Layout, Row, Col, Image} from 'antd';

const { Content } = Layout;

const images = [
  {items: ['work/Rectangle.svg', 'work/Rectangle.svg', 'work/Rectangle.svg']},
  {items: ['work/Rectangle.svg', 'work/Rectangle.svg', 'work/Rectangle.svg']},
  {items: ['work/Rectangle.svg', 'work/Rectangle.svg', 'work/Rectangle.svg']}
];

export const Work = () => {
  return (
    <Content>
      <div style={{padding: '10px 20px'}}>
        <Row gutter={16}>
          {
            images.map((image, index) =>
              <Col span={8} className="gutter-row" key={index}>
                {
                  image.items.map((item, key) =>
                    <div key={key}>
                      <Image src={item} preview={false} className="rectangle6" />
                      <div style={{textAlign: 'center'}}>
                        <h3 style={{color: 'black', fontSize: '20px'}}>Metaverse Blast</h3>
                        <Row>
                          <Col span={12}>
                            <p style={{color: '#2D8E69', fontSize: '12px'}}>8.24Ξ ($25,089)</p>
                            <p style={{color: '#2D8E69', fontSize: '10px'}}>15Ξ ($9,160)</p>
                          </Col>
                          <Col span={12}>
                            <p style={{color: '#2D8E69', fontSize: '12px'}}>List Price</p>
                            <p style={{color: '#2D8E69', fontSize: '10px'}}>Last sale price</p>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  )
                }
              </Col>
            )
          }
        </Row>
      </div>
    </Content>
  )
}