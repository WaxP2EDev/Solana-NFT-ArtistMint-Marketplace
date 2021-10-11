import React from 'react';
import {
  Row,
  Col,
  Image,
  Button,
  Tooltip,
  Checkbox,
  Space,
  Input
} from 'antd';
import { TagsTwoTone } from '@ant-design/icons';

const {TextArea} = Input;

const title = 
  <div className="tooltip">
    <div style={{marginBottom: '10px'}}>
      <Checkbox>Follow-up</Checkbox>
    </div>
    <div style={{marginBottom: '10px'}}>
      <Checkbox>Follow-up</Checkbox>
    </div>
    <div style={{marginBottom: '10px'}}>
      <Checkbox>Follow-up</Checkbox>
    </div>
    <div style={{marginBottom: '10px'}}>
      <Checkbox>Follow-up</Checkbox>
    </div>
    <div style={{marginBottom: '10px'}}>
      <Checkbox>Follow-up</Checkbox>
    </div>
  </div>

export const ArtsView = () => {
  return (
    <>
      <div className="rectangle2 space_entire">
        <Row gutter={16} style={{padding: '100px 0'}}>
          <Col span={15} className="gutter-row">
            <Image src="./market/Rectangle 41.svg" preview={false} width="100%" />
              <Row style={{marginTop: '30px'}}>
                <Col span={4}>
                  <Row>
                    <Col span={8}>
                      <Image src="./avatar.svg" preview={false} />
                    </Col>
                    <Col span={14} offset={2}>
                      <div style={{marginTop: '5px'}}>
                        <p style={{marginBottom: 0}}>marcomatic</p>
                        <p style={{opacity: 0.25}}>ARTIST</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={4}>
                  <Row>
                    <Col span={8}>
                      <Image src="./avatar.svg" preview={false} />
                    </Col>
                    <Col span={14} offset={2}>
                      <div style={{marginTop: '5px'}}>
                        <p style={{marginBottom: 0}}>marcomatic</p>
                        <p style={{opacity: 0.25}}>OWNER</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={4} offset={8}>
                  <Row>
                    <Col span={4}>
                      <div style={{marginTop: '15px'}}>
                        <Image src="./market/heart.svg" preview={false} />
                      </div>
                    </Col>
                    <Col span={18} offset={2}>
                      <div style={{marginTop: '5px'}}>
                        <p style={{marginBottom: 0}}>51</p>
                        <p style={{opacity: 0.25}}>Favorites</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={4}>
                  <Row>
                    <Col span={4}>
                      <div style={{marginTop: '15px'}}>
                        <Image src="./market/eye.svg" preview={false} />
                      </div>
                    </Col>
                    <Col span={18} offset={2}>
                      <div style={{marginTop: '5px'}}>
                        <p style={{marginBottom: 0}}>51</p>
                        <p style={{opacity: 0.25}}>Views</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
          </Col>
          <Col span={1}></Col>
          <Col span={8} className="gutter-row">
            <p style={{color: '#2D8E69', fontSize: '16px'}}>List Price</p>
            <p style={{color: '#2D8E69', fontSize: '20px'}}>8.24Ξ ($25,089)</p>
            <p style={{color: '#2D8E69', fontSize: '14px'}}>Current offer:  0.52Ξ</p>
            <h1>School of Bharat</h1>
            <h4>Edition 1 of 1</h4>
            <p style={{color: 'black'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when 
              an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            <p style={{color: '#B8B8B8'}}>#animation #cryptopunks #gif #investing #krybharat #meebits</p>
            <h4>Image Details</h4>
            <p>Image Size  2500x1667px  4.67MB</p>
            <p>Published Date  Sep 10, 2021</p>
            <br />
            <p>© 2021 ShootingStarLog Book</p>
            <Button type="primary" className="collections" size="large">SIGN UP TO COLLECT</Button>
            <h4 style={{marginTop: '50px'}}>Add to Group
              <span style={{marginLeft: '20px'}}>
                <Tooltip title={title} placement="bottomLeft">
                  <TagsTwoTone twoToneColor="#000" style={{paddingTop: '5px'}} />
                </Tooltip>
              </span>
            </h4>
          </Col>
        </Row>
      </div>
      <div className="space_entire">
        <Row gutter={64} style={{paddingTop: '100px', paddingBottom: '30px'}}>
          <Col span={12} className="gutter-row">
            <h2 style={{marginBottom: '50px'}}>History</h2>
            <div>
              <Space align="center">
                <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                <span className="mock-block" style={{color: 'black'}}>walecyberpunk</span>
              </Space>
              <div>
                <Input defaultValue="Won auction with a bid of 0.782Ξ ($1,586)" />
              </div>
              <p style={{color: '#C4C4C4', marginLeft: '30px'}}>2 MONTHS AGO</p>
            </div>
            <div>
              <Space align="center">
                <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                <span className="mock-block" style={{color: 'black'}}>walecyberpunk</span>
              </Space>
              <div>
                <Input defaultValue="Won auction with a bid of 0.782Ξ ($1,586)" />
              </div>
              <p style={{color: '#C4C4C4', marginLeft: '30px'}}>2 MONTHS AGO</p>
            </div>
            <div>
              <Space align="center">
                <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                <span className="mock-block" style={{color: 'black'}}>walecyberpunk</span>
              </Space>
              <div>
                <Input defaultValue="Won auction with a bid of 0.782Ξ ($1,586)" />
              </div>
              <p style={{color: '#C4C4C4', marginLeft: '30px'}}>2 MONTHS AGO</p>
            </div>
          </Col>
          <Col span={12} className="gutter-row">
            <h2 style={{marginBottom: '50px'}}>Comments 15</h2>
            <Row gutter={16}>
              <Col span={3} className="gutter-row">
                <Image src="./avatar.svg" preview={false} />
              </Col>
              <Col span={21} className="gutter-row">
                <TextArea defaultValue="Add a new comment" className="subscribe" style={{backgroundColor: '#F3F3F3'}} />
                <Button type="primary" className="start_collecting" style={{marginTop: '10px', float: 'right'}}>Post</Button>
              </Col>
            </Row>
            <Row gutter={16} style={{marginTop: '20px'}}>
              <Col span={3} className="gutter-row">
                <Image src="./avatar.svg" preview={false} />
              </Col>
              <Col span={21} className="gutter-row">
                <div style={{backgroundColor: '#F3F3F3', padding: '20px', borderRadius: '5px'}}>
                  <p><b>username</b></p>
                  <p style={{marginBottom: 0}}>It's cool</p>
                </div>
                <Space align="center">
                  <div style={{marginTop: '5px'}}><Image src="./market/message.svg" preview={false} /></div>
                  <span className="mock-block" style={{color: 'black'}}>reply</span>
                  <div style={{marginTop: '5px', marginLeft: '10px'}}><Image src="./market/b_heart.svg" preview={false} /></div>
                </Space>
              </Col>
            </Row>
            <Row gutter={16} style={{marginTop: '20px'}}>
              <Col offset={3} span={3} className="gutter-row">
                <Image src="./avatar.svg" preview={false} />
              </Col>
              <Col span={18} className="gutter-row">
                <div style={{backgroundColor: '#F3F3F3', padding: '20px', borderRadius: '5px'}}>
                  <p><b>username</b></p>
                  <p style={{marginBottom: 0}}>It's cool</p>
                </div>
                <Space align="center">
                  <div style={{marginTop: '5px'}}><Image src="./market/message.svg" preview={false} /></div>
                  <span className="mock-block" style={{color: 'black'}}>reply</span>
                  <div style={{marginTop: '5px', marginLeft: '10px'}}><Image src="./market/b_heart.svg" preview={false} /></div>
                </Space>
              </Col>
            </Row>
            <Row gutter={16} style={{marginTop: '20px'}}>
              <Col span={3} className="gutter-row">
                <Image src="./avatar.svg" preview={false} />
              </Col>
              <Col span={21} className="gutter-row">
                <div style={{backgroundColor: '#F3F3F3', padding: '20px', borderRadius: '5px'}}>
                  <p><b>username</b></p>
                  <p style={{marginBottom: 0}}>It's cool</p>
                </div>
                <Space align="center">
                  <div style={{marginTop: '5px'}}><Image src="./market/message.svg" preview={false} /></div>
                  <span className="mock-block" style={{color: 'black'}}>reply</span>
                  <div style={{marginTop: '5px', marginLeft: '10px'}}><Image src="./market/b_heart.svg" preview={false} /></div>
                </Space>
              </Col>
            </Row>
            <Row gutter={16} style={{marginTop: '20px'}}>
              <Col offset={3} span={3} className="gutter-row">
                <Image src="./avatar.svg" preview={false} />
              </Col>
              <Col span={18} className="gutter-row">
                <div style={{backgroundColor: '#F3F3F3', padding: '20px', borderRadius: '5px'}}>
                  <p><b>username</b></p>
                  <p style={{marginBottom: 0}}>It's cool</p>
                </div>
                <Space align="center">
                  <div style={{marginTop: '5px'}}><Image src="./market/message.svg" preview={false} /></div>
                  <span className="mock-block" style={{color: 'black'}}>reply</span>
                  <div style={{marginTop: '5px', marginLeft: '10px'}}><Image src="./market/b_heart.svg" preview={false} /></div>
                </Space>
              </Col>
            </Row>
            <Row gutter={16} style={{marginTop: '20px'}}>
              <Col span={3} className="gutter-row">
                <Image src="./avatar.svg" preview={false} />
              </Col>
              <Col span={21} className="gutter-row">
                <div style={{backgroundColor: '#F3F3F3', padding: '20px', borderRadius: '5px'}}>
                  <p><b>username</b></p>
                  <p style={{marginBottom: 0}}>It's cool</p>
                </div>
                <Space align="center">
                  <div style={{marginTop: '5px'}}><Image src="./market/message.svg" preview={false} /></div>
                  <span className="mock-block" style={{color: 'black'}}>reply</span>
                  <div style={{marginTop: '5px', marginLeft: '10px'}}><Image src="./market/b_heart.svg" preview={false} /></div>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}