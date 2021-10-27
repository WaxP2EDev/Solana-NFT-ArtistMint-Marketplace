import React, { useState } from 'react';
import {
  Row,
  Col,
  Divider,
  Layout,
  Tag,
  Button,
  Skeleton,
  List,
  Card,
} from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useArt, useExtendedArt } from '../../hooks';

import { ArtContent } from '../../components/ArtContent';
import { shortenAddress, useConnection } from '@oyster/common';
import { useWallet } from '@solana/wallet-adapter-react';
import { MetaAvatar } from '../../components/MetaAvatar';
import { sendSignMetadata } from '../../actions/sendSignMetadata';
import { ViewOn } from '../../components/ViewOn';
import { ArtType } from '../../types';

const { Content } = Layout;

export const MarketAllView = () => {
  const { id } = useParams<{ id: string }>();
  const wallet = useWallet();
  const connection = useConnection();
  const art = useArt(id);
  const [comment, setComment] = useState("");
  let badge = '';
  if (art.type === ArtType.NFT) {
    badge = 'Unique';
  } else if (art.type === ArtType.Master) {
    badge = 'NFT 0';
  } else if (art.type === ArtType.Print) {
    badge = `${art.edition} of ${art.supply}`;
  }
  const { ref, data } = useExtendedArt(id);
  const description = data?.description;
  const attributes = data?.attributes;
  const pubkey = wallet?.publicKey?.toBase58() || '';
  const tag = (
    <div className="info-header">
      <Tag color="blue">UNVERIFIED</Tag>
    </div>
  );
  const commentClick = (e) =>  {
    console.log('Free pizza!');
    console.log(e.target.previousElementSibling.value);
    setComment(e.target.previousElementSibling.value);
  }
  const unverified = (
    <>
      {tag}
      <div style={{ fontSize: 12 }}>
        <i>
          This artwork is still missing verification from{' '}
          {art.creators?.filter(c => !c.verified).length} contributors before it
          can be considered verified and sellable on the platform.
        </i>
      </div>
      <br />
    </>
  );

  return (
    <Content>
      <Col>
        <Row ref={ref}>
          <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ padding: '30px' }}>
            <Row>
              <Col span={4}></Col>
              <Col span={16}>
                <ArtContent
                  style={{ width: '300px', height: '300px', margin: '0 auto' }}
                  height={300}
                  width={300}
                  className="artwork-image"
                  pubkey={id}
                  active={true}
                  allowMeshRender={true}
                  artView={true}
                />
              </Col>
              <Col span={4}></Col>
            </Row>
            <Row>
              <Col span={4}></Col>
              <Col span={16}>
                <textarea className="form-control market-textarea" rows="5" id="comment" name="text"></textarea>
                <button className="btn btn-primary" onClick={(e) => commentClick(e)}>Add Comment</button>
              </Col>
              <Col span={4}></Col>
            </Row>
          </Col>
          {/* <Divider /> */}
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            style={{ textAlign: 'left', fontSize: '1.4rem' }}
          >
            <Row>
              <div className="art-text-color" style={{ fontWeight: 700, fontSize: '4rem' }}>
                {art.title || <Skeleton paragraph={{ rows: 0 }} />}
              </div>
            </Row>
            <Row>
              <Col span={6}>
                <h6 className="art-text-color">Royalties</h6>
                <div className="royalties art-text-color">
                  {((art.seller_fee_basis_points || 0) / 100).toFixed(2)}%
                </div>
              </Col>
              <Col span={12}>
                <ViewOn id={id} />
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="art-text-color" style={{ marginTop: 5 }}>Created By</h6>
                <div className="creators art-text-color">
                  {(art.creators || []).map((creator, idx) => {
                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 5,
                        }}
                      >
                        <MetaAvatar creators={[creator]} size={64} />
                        <div>
                          <span className="creator-name art-text-color">
                            {creator.name ||
                              shortenAddress(creator.address || '')}
                          </span>
                          <div style={{ marginLeft: 10 }}>
                            {!creator.verified &&
                              (creator.address === pubkey ? (
                                <Button
                                  onClick={async () => {
                                    try {
                                      await sendSignMetadata(
                                        connection,
                                        wallet,
                                        id,
                                      );
                                    } catch (e) {
                                      console.error(e);
                                      return false;
                                    }
                                    return true;
                                  }}
                                >
                                  Approve
                                </Button>
                              ) : (
                                tag
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="art-text-color" style={{ marginTop: 5 }}>Edition</h6>
                <div className="art-edition art-text-color">{badge}</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Divider />
                {art.creators?.find(c => !c.verified) && unverified}
                <h6 className="art-text-color">Description</h6>
                <div className="royalties art-text-color">{description}</div>
                <br />
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="art-text-color">Comment</h6>
                <Row>
                  <Col span={20}>
                    <div className="royalties art-text-color market-word">{comment}</div>
                  </Col>
                  <Col span={4}></Col>
                </Row>
                <br />
              </Col>
            </Row>
            <Row>
              <Col>
                {attributes && (
                  <>
                    <Divider />
                    <h6 className="art-text-color">Attributes</h6>
                    <List size="large" grid={{ column: 4 }}>
                      {attributes.map(attribute => (
                        <List.Item key={attribute.trait_type}>
                          <Card className="art-text-color" title={attribute.trait_type}>
                            {attribute.value}
                          </Card>
                        </List.Item>
                      ))}
                    </List>
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <Col span={2}></Col>
              <Col span={16}>
                <Link to={`/offer/create`}>
                  <button className="profile-button">Make offer</button>
                </Link>
              </Col>
              <Col span={6}></Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Content>
  );
};
