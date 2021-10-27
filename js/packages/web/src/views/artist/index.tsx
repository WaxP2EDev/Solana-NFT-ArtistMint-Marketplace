import { Col, Divider, Row, Tabs, Layout, Image, Button } from 'antd';
import React, { useEffect, useState} from 'react';
import Masonry from 'react-masonry-css';
import { Link, useParams } from 'react-router-dom';
import { ArtCard } from '../../components/ArtCard';
import { CardLoader } from '../../components/MyLoader';
import { useCreator, useCreatorArts, useUserArts } from '../../hooks';
import { useMeta } from '../../contexts';
import { useWallet } from '@solana/wallet-adapter-react';
import { TableOutlined, FormatPainterOutlined, HeartOutlined, EyeInvisibleOutlined, HistoryOutlined, TagOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Content } = Layout;

export enum ArtistViewState {
  Collected = '0',
  Created = '1',
  Favorited = '2',
  Hidden = '3',
  Activity = '4',
  Offers = '5',
}

export const ArtistView = () => {
  const { connected, publicKey } = useWallet();
  const collectedMetadata = useUserArts();
  const createdMetadata = useCreatorArts(publicKey?.toBase58() || '');
  const favoriteMetadata = ['asdas', 'dfdf'];
  const hiddenMetadata = ['favoriteMetadata', 'dfdf'];
  const activityMetadata = ['favoriteMetadata', 'dfdf'];
  const offersMetadata = ['favoriteMetadata', 'dfdf'];
  const { metadata, isLoading } = useMeta();
  const [activeKey, setActiveKey] = useState(ArtistViewState.Collected);
  const { id } = useParams<{ id: string }>();
  const creator = useCreator(id);
  const [walletAddress, setWalletAddress] = useState(creator?.info.address);
  const [artistName, setArtistName] = useState("");
  const [artistContent, setArtistContent] = useState("");

  const artwork = useCreatorArts(id);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const items =
  activeKey === ArtistViewState.Collected
    ? collectedMetadata.map(m => m.metadata)
    : activeKey === ArtistViewState.Created
    ? createdMetadata
    : activeKey === ArtistViewState.Favorited
    ? favoriteMetadata
    : activeKey === ArtistViewState.Hidden
    ? hiddenMetadata
    : activeKey === ArtistViewState.Activity
    ? activityMetadata
    : activeKey === ArtistViewState.Offers
    ? offersMetadata
    : metadata ;

  const postClick = (e) =>  {
      console.log('Free pizza!');
      console.log(e.target.previousElementSibling.value);
      setArtistContent(e.target.previousElementSibling.value);
  }

  useEffect(() => {
    if (connected) {
      setActiveKey(ArtistViewState.Collected);
    } else {
      setActiveKey(ArtistViewState.Created);
    }
  }, [connected, setActiveKey]);

  useEffect(() => {
    setWalletAddress(creator?.info.address.slice(0,4) + "..." + creator?.info.address.slice(28,32));
  });
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

  const message = (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <div>
          <p className="artist-message"><b>{artistName}</b></p>
          <p className="artist-message">{artistContent}</p>
        </div>
      </Col>
      <Col span={4}></Col>
    </Row>
  );

  return (
    <>
      <Col>
        <Divider />
        <Row
          style={{ margin: '0 30px', textAlign: 'left', fontSize: '1.4rem' }}
        >
          <Layout style={{ margin: 0, marginTop: 30 }}>
            <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Col span={3}></Col>
              <Col span={18} style={{ width: '100%', marginTop: 10 }}>
                <Image src="./NFT_profile.jpg"></Image>
                <h6 style={{ color:'black' }}>Artist address</h6>
                <p>
                  {/* <MetaAvatar creators={creator ? [creator] : []} size={100} /> */}
                  {/* {creator?.info.name || creator?.info.address} */}
                  {walletAddress}
                </p>
                <br />
                <h6 style={{ color:'black' }}>ABOUT THE CREATOR</h6>
                <div className="info-content">{creator?.info.description}</div>
                <br />
                {/* <h6 style={{ color:'black' }}>Art Created</h6>
                {artworkGrid} */}
                <Row>
                  <Tabs
                    activeKey={activeKey}
                    onTabClick={key => setActiveKey(key as ArtistViewState)}
                  >
                    {connected && (
                      <TabPane
                        tab={<span className="tab-title tab-style"><TableOutlined />Collected</span>}
                        key={ArtistViewState.Collected}
                      >
                        {artworkGrid}
                      </TabPane>
                    )}
                    {connected && (
                      <TabPane
                        tab={<span className="tab-title tab-style"><FormatPainterOutlined />Created</span>}
                        key={ArtistViewState.Created}
                      >
                        {artworkGrid}
                      </TabPane>
                    )}
                    {connected && (
                      <TabPane
                        tab={<span className="tab-title tab-style"><HeartOutlined />Favorited</span>}
                        key={ArtistViewState.Favorited}
                      >
                        {artworkGrid}
                      </TabPane>
                    )}
                    {connected && (
                      <TabPane
                        tab={<span className="tab-title tab-style"><EyeInvisibleOutlined />Hidden</span>}
                        key={ArtistViewState.Hidden}
                      >
                        {artworkGrid}
                      </TabPane>
                    )}
                    {connected && (
                      <TabPane
                        tab={<span className="tab-title tab-style"><HistoryOutlined />Activity</span>}
                        key={ArtistViewState.Activity}
                      >
                        {artworkGrid}
                      </TabPane>
                    )}
                    {connected && (
                      <TabPane
                        tab={<span className="tab-title tab-style"><TagOutlined />Offers</span>}
                        key={ArtistViewState.Offers}
                      >
                        {artworkGrid}
                      </TabPane>
                    )}
                  </Tabs>
                </Row>
                <hr />
                <Row>
                  <Col span={12}>
                    <div className="artist-chart">
                      <p className="artist-comment"></p>
                      <select value={artistName} onChange={(e) => { setArtistName(e.target.value); }} className="artist-select" name="pets" id="pet-select">
                        <option value={walletAddress}>{walletAddress}</option>
                        <option value="Artist2">Artist2</option>
                        <option value="Artist3">Artist3</option>
                      </select>
                      <br />
                      <textarea className="form-control artist-textarea" rows="5" id="comment" name="text"></textarea>
                      <button className="btn btn-primary" onClick={(e) => postClick(e)}>Post</button>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      {message}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={3}></Col>
            </Content>
          </Layout>
        </Row>
      </Col>
    </>
  );
};