import {Col, Row, Tabs, Layout, Input, Button, Checkbox, Slider, Select, Space, DatePicker, Image} from 'antd';
import React, { useEffect, useState} from 'react';
import { ArtCard } from '../../components/ArtCard';
import Masonry from 'react-masonry-css';
import { useCreatorArts, useUserArts } from '../../hooks';
import { useMeta } from '../../contexts';
import { CardLoader } from '../../components/MyLoader';
import { useWallet } from '@solana/wallet-adapter-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuctionMarketView } from '../auctionMarketView';

const { TabPane } = Tabs;
const { Content } = Layout;
const {Option} = Select;

const checkbox = ['List price', 'Reserve Price', 'Live auction', 'Upcoming auction', 'Secondary sale', 'Open offer', 'Owned by creator', 'Never recived an offer', 'Genesis piece'];
const lists = [
  {name: ['Still image', '3d artwork']},
  {name: ['GIF', 'Video']}
];

const images = [
  {items: ['./market/Rectangle.svg', './market/Rectangle3.svg', './market/Rectangle6.svg']},
  {items: ['./market/Rectangle1.svg', './market/Rectangle4.svg', './market/Rectangle7.svg']},
  {items: ['./market/Rectangle2.svg', './market/Rectangle5.svg', './market/Rectangle8.svg']}
];

const smoothScroll = function (targetEl, duration) {
  let target = document.querySelector(targetEl);
  let targetPosition = target.getBoundingClientRect().top - 0;
  let startPosition = window.pageYOffset;
  let startTime = null;

  const ease = function(t,b,c,d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const animation = function(currentTime){
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0,run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
  };
  requestAnimationFrame(animation);

};

function onChange(date, dateString) {
  console.log(date, dateString);
}

export enum MarketViewState {
  Metaplex = '0',
  Owned = '1',
  Created = '2',
}

export const MarketView = () => {
  const { connected, publicKey } = useWallet();
  const ownedMetadata = useUserArts();
  const createdMetadata = useCreatorArts(publicKey?.toBase58() || '');
  const { metadata, isLoading } = useMeta();
  const [activeKey, setActiveKey] = useState(MarketViewState.Metaplex);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const items =
    activeKey === MarketViewState.Owned
      ? ownedMetadata.map(m => m.metadata)
      : activeKey === MarketViewState.Created
      ? createdMetadata
      : metadata;

  useEffect(() => {
    if (connected) {
      setActiveKey(MarketViewState.Owned);
    } else {
      setActiveKey(MarketViewState.Metaplex);
    }
  }, [connected, setActiveKey]);

  

  const artworkGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!isLoading
        ? items.map((m, idx) => {
            const id = m.pubkey;
            return (
              <Link to={`/art/${id}`} key={idx}>
                <ArtCard
                  key={id}
                  pubkey={m.pubkey}
                  preview={false}
                  height={250}
                  width={250}
                />
              </Link>
            );
          })
        : [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
    </Masonry>
  );

  const marketAllGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!isLoading
        ? items.map((m, idx) => {
            const id = m.pubkey;
            return (
              <Link to={`/marketall/${id}`} key={idx}>
                <ArtCard
                  key={id}
                  pubkey={m.pubkey}
                  preview={false}
                  height={250}
                  width={250}
                />
              </Link>
            );
          })
        : [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
    </Masonry>
  );

return (
  <Content>
  <div style={{backgroundColor: '#F3F3F3'}} className="space_entire">
    <Row gutter={16}>
      <Col span={11} offset={3} className="gutter-row">
        <Input className="subscribe" defaultValue="Search" />
      </Col>
      <Col span={2} offset={1} className="gutter-row" style={{marginTop: '8px'}}>
        <Button type="primary" className="stream">Collectible</Button>
      </Col>
      <Col span={2} className="gutter-row" style={{marginTop: '8px', textAlign: 'center'}}>
        <Link to={`/arts`}>
          <Button type="primary" className="stream">Art</Button>
        </Link>
      </Col>
      <Col span={2} className="gutter-row" style={{marginTop: '8px'}}>
        <Link to={`/photography`}>
          <Button type="primary" className="stream">Photography</Button>
        </Link>
      </Col>
      <Col span={3} className="gutter-row"></Col>
    </Row>
  </div>
  <div className="little_space">
    <Row className="menu" gutter={16}>
      <Col span={5} className="gutter-row">
        <h2>Status</h2>
        <Row gutter={20} style={{marginTop: '30px'}}>
          <Col span={12}>
            <Input type="button" onClick={ () => smoothScroll("#scroll", 1000)} defaultValue="Buy" className="subscribe market-button" readOnly />
          </Col>
          <Col span={12}>
            <Input type="button" onClick={ () => smoothScroll("#scroll", 1000)} defaultValue="Auction" className="subscribe market-button" readOnly />
          </Col>
        </Row>
        <h2 style={{marginTop: '30px'}}>Artwork Details</h2>
        {
          checkbox.map((item, index) =>
            <div key={index}>
              <Checkbox style={{color: 'black'}}>{item}</Checkbox>
            </div>
          )
        }
        <h2 style={{marginTop: '30px'}}>Price Range</h2>
        <Slider range defaultValue={[0, 100]} />
        <Row gutter={20} style={{marginTop: '30px'}}>
          <Col span={12}>
            <Input defaultValue="$ 0" className="subscribe" />
          </Col>
          <Col span={12}>
            <Input defaultValue="$ 100,000 +" className="subscribe" />
          </Col>
        </Row>
        <h2 style={{marginTop: '30px'}}>Categories</h2>
        <Select defaultValue="Architectural Concepts" className="subscribe" style={{width: '100%'}}>
          <Option value="architectural_concepts">Architectural Concepts</Option>
        </Select>
        <h2 style={{marginTop: '30px'}}>File Types</h2>
        <Row gutter={16}>
          {
            lists.map((list, index) =>
              <Col span={12} className="gutter-row" key={index}>
                {
                  list.name.map((item, key) =>
                    <div key={key}>
                      <Checkbox style={{color: 'black'}}>{item}</Checkbox>
                    </div>
                  )
                }
              </Col>
            )
          }
        </Row>
        <h2 style={{marginTop: '30px'}}>Date minted</h2>
        <Row gutter={16}>
          <Col span={12} className="gutter-row">
            <Space>
              <DatePicker defaultValue={moment('31/09/2021', 'DD/MM/YYYY')} />
          </Space>
          </Col>
          <Col span={12} className="gutter-row">
            <Space>
              <DatePicker defaultValue={moment('31/10/2021', 'DD/MM/YYYY')} />
          </Space>
          </Col>
        </Row>
      </Col>
      <Col span={1}></Col>
      <Col span={18} className="gutter-row">
      <Layout style={{ margin: 0, marginTop: 30 }}>
        <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col style={{ width: '100%', marginTop: 10 }}>
            <Row>
              <Tabs
                activeKey={activeKey}
                onTabClick={key => setActiveKey(key as MarketViewState)}
              >
                <TabPane
                  tab={<span className="tab-title">All</span>}
                  key={MarketViewState.Metaplex}
                >
                  {marketAllGrid}
                </TabPane>
                {connected && (
                  <TabPane
                    tab={<span className="tab-title">Owned</span>}
                    key={MarketViewState.Owned}
                  >
                    {artworkGrid}
                  </TabPane>
                )}
                {connected && (
                  <TabPane
                    tab={<span className="tab-title">Created</span>}
                    key={MarketViewState.Created}
                  >
                    {artworkGrid}
                  </TabPane>
                )}
              </Tabs>
            </Row>
          </Col>
        </Content>
      </Layout>
      <br id="scroll" />
      <AuctionMarketView />
      </Col>
      {/* {
        images.map((image, index) =>
          <Col span={6} className="gutter-row" key={index}>
            {
              image.items.map((item, key) =>
                <div key={key}>
                  <Image src={item} preview={false} className="rectangle6" />
                  <div style={{textAlign: 'center'}}>
                    <h3 style={{color: 'black', fontSize: '20px'}}>Metaverse Blast</h3>
                    <Row>
                      <Col span={6} offset={6}>
                        <p style={{color: '#2D8E69', fontSize: '12px'}}>8.24Ξ ($25,089)</p>
                        <p style={{color: '#2D8E69', fontSize: '10px'}}>15Ξ ($9,160)</p>
                        <hr />
                      </Col>
                      <Col span={6}>
                        <p style={{color: '#2D8E69', fontSize: '12px'}}>List Price</p>
                        <p style={{color: '#2D8E69', fontSize: '10px'}}>Last sale price</p>
                        <hr />
                      </Col>
                      <Col span={6}></Col>
                      <Col span={6} offset={6}>
                        <div className="space-align-block">
                        <p className="artist">ARTIST</p>
                          <Space align="center">
                            <Image src="./avatar.svg" preview={false} style={{marginTop: '5px'}} />
                            <span className="mock-block" style={{color: 'black'}}>marcOmatic</span>
                          </Space>
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="space-align-block" style={{marginTop: '25px'}}>
                          <Space align="center">
                            <Image src="./Vector.svg" preview={false} style={{width: '20px'}} />
                            <span className="mock-block" style={{color: '#C4C4C4'}}>41</span>
                          </Space>
                        </div>
                      </Col>
                      <Col span={6}></Col>
                    </Row>
                  </div>
                </div>
              )
            }
          </Col>
        )
      } */}
    </Row>
  </div>
</Content>
);
  
};

