import React from 'react';
import {Layout, Row, Col, Image, Space} from 'antd';

const { Content } = Layout;

const images = [
  {items: ['apps/Rectangle.svg', 'apps/Rectangle.svg', 'apps/Rectangle.svg']},
  {items: ['apps/Rectangle.svg', 'apps/Rectangle.svg', 'apps/Rectangle.svg']},
  {items: ['apps/Rectangle.svg', 'apps/Rectangle.svg', 'apps/Rectangle.svg']}
];

export const Nft = () => {
  return (
    <Content>
      <div style={{padding: '10px 20px'}}>
        <Row gutter={16}>
          {
            images.map((image, index) =>
              <Col span={8} className="gutter-row" key={index}>
                {
                  image.items.map((item, key) =>
                    <div key={key} style={{marginBottom: '20px'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3 style={{color: 'black', fontSize: '20px'}}>Metaverse Blast</h3>
                        <Space>
                          <div style={{marginTop: '5px'}}>
                            <Image src="./apps/Vector.svg" preview={false} />
                          </div>
                          <span style={{color: 'black'}}>25</span>
                        </Space>
                      </div>
                      <Image src={item} preview={false} />
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