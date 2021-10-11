import React, { useState } from 'react';
import {
  Button,
  Layout,
  Row,
  Col
} from 'antd'
import {Sidebar} from '../../components/Sidebar';
import {ThoughtView} from '../../components/ThoughtView';
import {Work} from '../../components/Work';
import {Collections} from '../../components/Collections';
import { Applications } from '../../components/Applications';
import { Nft } from '../../components/Nft';

const {Content} = Layout;


export const PhotoView = () => {
  const [tabIndex, setTabIndex] = useState(1);
  return (
    <Content>
      <Row>
        <Col span={24} className="rectangle2" style={{height: '18vw'}} />
      </Row>
      <Row>
        <Col span={4} offset={1} className="gutter-row" style={{minWidth: '16vw', marginTop: -70}}>
          <Sidebar />
        </Col>
        <Col span={16} offset={2} className="gutter-row">
          <Row style={{height: 180}}>
            <Col style={{
              height: 'fit-content',
              display: 'flex',
              justifyContent: 'center',
              alignSelf: 'center',
              width: '100%'}}
            >
              <Button type="primary" className="stream" style={{marginRight: 50}} onClick={() => setTabIndex(1)}>Thoughts</Button>
              <Button type="primary" className="stream" style={{marginRight: 50}} onClick={() => setTabIndex(2)}>Work</Button>
              <Button type="primary" className="stream" style={{marginRight: 50}} onClick={() => setTabIndex(3)}>Collections</Button>
              <Button type="primary" className="stream" style={{marginRight: 50}} onClick={() => setTabIndex(4)}>Appreciations</Button>
              <Button type="primary" className="stream" onClick={() => setTabIndex(5)}>NFTs I Own</Button>
            </Col>
          </Row>
          <Row>
            { tabIndex == 1 &&
              <ThoughtView />
            }
            { tabIndex == 2 &&
              <Work />
            }
            { tabIndex == 3 &&
              <Collections />
            }
            { tabIndex == 4 &&
              <Applications />
            }
            { tabIndex == 5 &&
              <Nft />
            }
          </Row>
        </Col>
      </Row>
    </Content>
  )
}