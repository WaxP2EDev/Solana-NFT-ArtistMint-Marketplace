import { Layout, Row, Col, Image, Button, Space, Input } from 'antd';
import React from 'react';
import { useStore } from '@oyster/common';
import { useMeta } from '../../contexts';
import { AuctionListView } from './auctionList';
import { SetupView } from './setup';
import { Link } from 'react-router-dom';

export const HomeView = () => {
  const { isLoading, store } = useMeta();
  const { isConfigured } = useStore();

  const showAuctions = (store && isConfigured) || isLoading;

  const collections = [
    {
      image: 'Rectangle 6.svg', name1: 'Metaverse Blast', text1: '8.24Ξ ($25,089)', text2: 'List Price', text3: '15Ξ ($9,160)', 
      text4: 'Last sale price', name2: '@username', avatar: 'avatar.svg', number: '41', 
      subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting'
    },
    {
      image: 'Rectangle 6.svg', name1: 'Metaverse Blast', text1: '8.24Ξ ($25,089)', text2: 'List Price', text3: '15Ξ ($9,160)', 
      text4: 'Last sale price', name2: '@username', avatar: 'avatar.svg', number: '41',
      subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting'
    },
    {
      image: 'Rectangle 6.svg', name1: 'Metaverse Blast', text1: '8.24Ξ ($25,089)', text2: 'List Price', text3: '15Ξ ($9,160)', 
      text4: 'Last sale price', name2: '@username', avatar: 'avatar.svg', number: '41',
      subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting'
    }
  ];

  const items = [
    {title: 'Trending Artists', images: ['./img/Ellipse 7.svg', './img/Ellipse 8.svg', './img/Ellipse 9.svg', './img/Ellipse 10.svg', './img/Ellipse 10.svg']},
    {title: 'Top Collectors', images: ['./img/Ellipse 7.svg', './img/Ellipse 8.svg', './img/Ellipse 9.svg', './img/Ellipse 10.svg', './img/Ellipse 10.svg']}
  ];

  const [visible, setVisible] = React.useState(true);

  return (
    <Layout>
      <div className="rectangle2 space_entire">
        <Row style={{marginBottom: '50px'}}>
          <Col span={12}>
            <h1 className="section-title">Collect Digital Art</h1>
            <h4>Buy and sell NFTs from the world’s top artists</h4>
            <Link to={`/`}>
              <Button type="primary" size="large" className="start_collecting">Start Collecting</Button>
            </Link>
          </Col>
          <Col span={12}>
            <h4 className="feature_img">FEATURED ART</h4>
            <Image src="./Art.svg" preview={false} width="100%" />
          </Col>
          <Col span={12}></Col>
          <Col span={3}>
              <h4>ARTIST</h4>
              <div className="space-align-block">
                <Space align="center">
                  <Image src="./avatar.svg" preview={false} />
                  <span className="mock-block" style={{color: 'black'}}>@username</span>
                </Space>
              </div>
            </Col>
          <Col span={3} className="pic">
            <div style={{marginTop: '30px'}}>
              <p style={{color: '#2D8E69', fontSize: '12px'}}>8.24Ξ ($25,089)</p>
              <p style={{color: '#2D8E69', fontSize: '10px'}}>List Price</p>
            </div>
          </Col>
          <Col span={3} className="pic">
            <div style={{marginTop: '30px'}}>
              <p style={{color: '#2D8E69', fontSize: '12px'}}>15Ξ ($9,160)</p>
              <p style={{color: '#2D8E69', fontSize: '10px'}}>Last sale price</p>
            </div>
          </Col>
          <Col span={3}>
            <p style={{color: '#C4C4C4', textAlign: 'right', marginTop: '45px'}}>41</p>
          </Col>
        </Row>
      </div>
      <div className="little_space">
        <h2>Top Collectibles</h2>
        <hr />
        <Row gutter={16}>
          {
            collections.map((collection, index) =>
              <Col span={8} className="gutter-row" key={index}>
                <Image src={collection.image} preview={false} className="rectangle6" />
                <div style={{textAlign: 'center'}}>
                  <h3 style={{color: 'black', fontSize: '20px'}}>{collection.name1}</h3>
                  <Row>
                    <Col span={6} offset={6}>
                      <p style={{color: '#2D8E69', fontSize: '12px'}}>{collection.text1}</p>
                      <p style={{color: '#2D8E69', fontSize: '10px'}}>{collection.text2}</p>
                      <hr />
                    </Col>
                    <Col span={6}>
                      <p style={{color: '#2D8E69', fontSize: '12px'}}>{collection.text3}</p>
                      <p style={{color: '#2D8E69', fontSize: '10px'}}>{collection.text4}</p>
                      <hr />
                    </Col>
                    <Col span={6}></Col>
                    <Col span={6} offset={6}>
                      <div className="space-align-block">
                        <p className="artist">ARTIST</p>
                        <Space align="center">
                          <Image src={collection.avatar} preview={false} />
                          <span className="mock-block" style={{color: 'black'}}>{collection.name2}</span>
                        </Space>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="space-align-block" style={{marginTop: '40px'}}>
                        <Space align="center">
                          <Image src="./Vector.svg" preview={false} style={{width: '20px'}} />
                          <span className="mock-block" style={{color: '#C4C4C4'}}>{collection.number}</span>
                        </Space>
                      </div>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                </div>
              </Col>
            )
          }
        </Row>
        <div style={{textAlign: 'center'}}>
          <Button type="primary" size="large" className="collections">See other collections</Button>
        </div>
      </div>
      <div className="little_space">
        <h2>Top Art</h2>
        <hr />
        <Row gutter={16}>
          {
            collections.map((collection, index) =>
              <Col span={8} className="gutter-row" key={index}>
                <Image src={collection.image} preview={false} className="rectangle6" />
                <div style={{textAlign: 'center'}}>
                  <h3 style={{color: 'black', fontSize: '20px'}}>{collection.name1}</h3>
                  <Row>
                    <Col span={6} offset={6}>
                      <p style={{color: '#2D8E69', fontSize: '12px'}}>{collection.text1}</p>
                      <p style={{color: '#2D8E69', fontSize: '10px'}}>{collection.text2}</p>
                      <hr />
                    </Col>
                    <Col span={6}>
                      <p style={{color: '#2D8E69', fontSize: '12px'}}>{collection.text3}</p>
                      <p style={{color: '#2D8E69', fontSize: '10px'}}>{collection.text4}</p>
                      <hr />
                    </Col>
                    <Col span={6}></Col>
                    <Col span={6} offset={6}>
                      <div className="space-align-block">
                      <p className="artist">ARTIST</p>
                        <Space align="center">
                          <Image src={collection.avatar} preview={false} />
                          <span className="mock-block" style={{color: 'black'}}>{collection.name2}</span>
                        </Space>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="space-align-block" style={{marginTop: '40px'}}>
                        <Space align="center">
                          <Image src="./Vector.svg" preview={false} style={{width: '20px'}} />
                          <span className="mock-block" style={{color: '#C4C4C4'}}>{collection.number}</span>
                        </Space>
                      </div>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                </div>
              </Col>
            )
          }
        </Row>
        <div style={{textAlign: 'center'}}>
          <Button type="primary" size="large" className="collections">See other arts</Button>
        </div>
      </div>
      <div className="little_space">
        <h2>Top Photographies</h2>
        <hr />
        <Row gutter={16}>
          {
            collections.map((collection, index) =>
              <Col span={8} className="gutter-row" key={index}>
                <Image src={collection.image} preview={false} className="rectangle6" />
                <div style={{textAlign: 'center'}}>
                  <h3 style={{color: 'black', fontSize: '20px'}}>{collection.name1}</h3>
                  <Row>
                    <Col span={6} offset={6}>
                      <p style={{color: '#2D8E69', fontSize: '12px'}}>{collection.text1}</p>
                      <p style={{color: '#2D8E69', fontSize: '10px'}}>{collection.text2}</p>
                      <hr />
                    </Col>
                    <Col span={6}>
                      <p style={{color: '#2D8E69', fontSize: '12px'}}>{collection.text3}</p>
                      <p style={{color: '#2D8E69', fontSize: '10px'}}>{collection.text4}</p>
                      <hr />
                    </Col>
                    <Col span={6}></Col>
                    <Col span={6} offset={6}>
                      <div className="space-align-block">
                      <p className="artist">ARTIST</p>
                        <Space align="center">
                          <Image src={collection.avatar} preview={false} />
                          <span className="mock-block" style={{color: 'black'}}>{collection.name2}</span>
                        </Space>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="space-align-block" style={{marginTop: '40px'}}>
                        <Space align="center">
                          <Image src="./Vector.svg" preview={false} style={{width: '20px'}} />
                          <span className="mock-block" style={{color: '#C4C4C4'}}>{collection.number}</span>
                        </Space>
                      </div>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                </div>
              </Col>
            )
          }
        </Row>
        <div style={{textAlign: 'center'}}>
          <Button type="primary" size="large" className="collections">See other photographies</Button>
        </div>
      </div>
      <div className="little_space" style={{backgroundColor: '#F3F3F3'}}>
        <Row gutter={32}>
          {
            items.map((item, index) =>
              <Col span={12} className="gutter-row" key={index}>
                <h2>{item.title}</h2>
                <hr />
                <Row justify="space-between">
                  {
                    item.images.map((image, index) =>
                      <Col span={4} key={index}>
                        <Image src={image} preview={false} style={{marginTop: '15px'}} />
                        <div>
                          <p style={{color: 'black', textAlign: 'center'}}>@marcOmatic</p>
                        </div>
                      </Col>
                    )
                  }
                </Row>
              </Col>
            )
          }
        </Row>
      </div>
      <div className="little_space">
        <Row gutter={32}>
          <Col className="gutter-row" span={12} style={{textAlign: 'right'}}>
            <Button type="primary" className="stream" onClick={() => setVisible(true)}>For You</Button>
          </Col>
          <Col className="gutter-row" span={12}>
            <Button type="primary" className="stream" onClick={() => setVisible(false)}>Stream Of Thoughts</Button>
          </Col>
        </Row>
      </div>
      {
        visible ? 
          <div className="little_space" style={{paddingTop: 0}}>
          <Row gutter={12}>
            {
              collections.map((collection, index) =>
                <Col span={8} className="gutter-row" key={index}>
                  <Image src={collection.image} preview={false} className="rectangle6" />
                  <div style={{textAlign: 'center'}}>
                    <h3 style={{color: 'black', fontSize: '20px'}}>{collection.name1}</h3>
                    <p style={{color: 'black', fontSize: '10px'}}>{collection.subtitle}</p>
                    <Row>
                      <Col span={6} offset={6}>
                        <p style={{color: '#2D8E69', fontSize: '12px'}}>{collection.text1}</p>
                        <p style={{color: '#2D8E69', fontSize: '10px'}}>{collection.text2}</p>
                        <hr />
                      </Col>
                      <Col span={6}>
                        <p style={{color: '#2D8E69', fontSize: '12px'}}>{collection.text3}</p>
                        <p style={{color: '#2D8E69', fontSize: '10px'}}>{collection.text4}</p>
                        <hr />
                      </Col>
                      <Col span={6}></Col>
                      <Col span={6} offset={6}>
                        <div className="space-align-block">
                        <p className="artist">ARTIST</p>
                          <Space align="center">
                            <Image src={collection.avatar} preview={false} />
                            <span className="mock-block" style={{color: 'black'}}>{collection.name2}</span>
                          </Space>
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="space-align-block" style={{marginTop: '40px'}}>
                          <Space align="center">
                            <Image src="./Vector.svg" preview={false} style={{width: '20px'}} />
                            <span className="mock-block" style={{color: '#C4C4C4'}}>{collection.number}</span>
                          </Space>
                        </div>
                      </Col>
                      <Col span={6}></Col>
                    </Row>
                  </div>
                </Col>
              )
            }
            {
              collections.map((collection, index) =>
                <Col span={8} className="gutter-row" key={index}>
                  <Image src={collection.image} preview={false} className="rectangle6" />
                  <div style={{textAlign: 'center'}}>
                    <h3 style={{color: 'black', fontSize: '20px'}}>{collection.name1}</h3>
                    <p style={{color: 'black', fontSize: '10px'}}>{collection.subtitle}</p>
                    <Row>
                      <Col span={6} offset={6}>
                        <p style={{color: '#2D8E69', fontSize: '12px'}}>{collection.text1}</p>
                        <p style={{color: '#2D8E69', fontSize: '10px'}}>{collection.text2}</p>
                        <hr />
                      </Col>
                      <Col span={6}>
                        <p style={{color: '#2D8E69', fontSize: '12px'}}>{collection.text3}</p>
                        <p style={{color: '#2D8E69', fontSize: '10px'}}>{collection.text4}</p>
                        <hr />
                      </Col>
                      <Col span={6}></Col>
                      <Col span={6} offset={6}>
                        <div className="space-align-block">
                        <p className="artist">ARTIST</p>
                          <Space align="center">
                            <Image src={collection.avatar} preview={false} />
                            <span className="mock-block" style={{color: 'black'}}>{collection.name2}</span>
                          </Space>
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="space-align-block" style={{marginTop: '40px'}}>
                          <Space align="center">
                            <Image src="./Vector.svg" preview={false} style={{width: '20px'}} />
                            <span className="mock-block" style={{color: '#C4C4C4'}}>{collection.number}</span>
                          </Space>
                        </div>
                      </Col>
                      <Col span={6}></Col>
                    </Row>
                  </div>
                </Col>
              )
            }
          </Row>
        </div>
        :
        <div className="little_space" style={{paddingTop: 0}}>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
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
                  <span className="mock-block" style={{color: 'black'}}>walecyberpunk</span>
                  <span className="mock-block" style={{color: '#C4C4C4'}}>@walecyberpunk - 3h</span>
                </Space>
                <div style={{width: '100%'}}>
                  <Image src="./Art.svg" preview={false} width="100%" />
                </div>
                <Space>
                  <Image src="./img/Vector (2).svg" preview={false} />
                  <span style={{marginRight: '20px'}}></span>
                  <Image src="./Vector.svg" preview={false} />
                  <span style={{color: '#C4C4C4'}}>41</span>
                </Space>
                <div style={{marginTop: '20px'}}>
                  <Space align="center">
                    <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                    <span className="mock-block" style={{color: 'black'}}>walecyberpunk</span>
                    <span className="mock-block" style={{color: '#C4C4C4'}}>@walecyberpunk - 3h</span>
                  </Space>
                </div>
                <h4 style={{marginTop: '20px'}}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
                  printer took a galley of type and scrambled it to 
                </h4>
                <Space>
                  <Image src="./img/Vector (2).svg" preview={false} />
                  <span style={{marginRight: '20px'}}></span>
                  <Image src="./Vector.svg" preview={false} />
                  <span style={{color: '#C4C4C4'}}>41</span>
                </Space>
                <div style={{marginLeft: '40px'}}>
                  <div style={{marginTop: '20px'}}>
                    <Space align="center">
                      <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                      <span className="mock-block" style={{color: 'black'}}>walecyberpunk</span>
                      <span className="mock-block" style={{color: '#C4C4C4'}}>@walecyberpunk - 3h</span>
                    </Space>
                  </div>
                  <h4 style={{marginTop: '20px'}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
                    printer took a galley of type and scrambled it to 
                  </h4>
                  <Space>
                    <Image src="./img/Vector (2).svg" preview={false} />
                    <span style={{marginRight: '20px'}}></span>
                    <Image src="./Vector.svg" preview={false} />
                    <span style={{color: '#C4C4C4'}}>41</span>
                  </Space>
                </div>
                <div style={{marginTop: '20px'}}>
                  <Row gutter={16}>
                    <Col span={2} className="gutter-row" style={{marginTop: '5px'}}>
                      <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                    </Col>
                    <Col span={22} className="gutter-row">
                      <Input defaultValue="write a comment..." className="subscribe" />  
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div className="space-align-block" style={{backgroundColor: "#F3F3F3", padding: '20px 30px'}}>
                <Space align="center">
                  <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                  <span className="mock-block" style={{color: 'black'}}>walecyberpunk</span>
                  <span className="mock-block" style={{color: '#C4C4C4'}}>@walecyberpunk - 3h</span>
                </Space>
                <div style={{width: '100%'}}>
                  <Image src="./Art.svg" preview={false} width="100%" />
                </div>
                <Space>
                  <Image src="./img/Vector (2).svg" preview={false} />
                  <span style={{marginRight: '20px'}}></span>
                  <Image src="./Vector.svg" preview={false} />
                  <span style={{color: '#C4C4C4'}}>41</span>
                </Space>
                <div style={{marginTop: '20px'}}>
                  <Space align="center">
                    <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                    <span className="mock-block" style={{color: 'black'}}>walecyberpunk</span>
                    <span className="mock-block" style={{color: '#C4C4C4'}}>@walecyberpunk - 3h</span>
                  </Space>
                </div>
                <h4 style={{marginTop: '20px'}}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
                  printer took a galley of type and scrambled it to 
                </h4>
                <Space>
                  <Image src="./img/Vector (2).svg" preview={false} />
                  <span style={{marginRight: '20px'}}></span>
                  <Image src="./Vector.svg" preview={false} />
                  <span style={{color: '#C4C4C4'}}>41</span>
                </Space>
                <div style={{marginLeft: '40px'}}>
                  <div style={{marginTop: '20px'}}>
                    <Space align="center">
                      <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                      <span className="mock-block" style={{color: 'black'}}>walecyberpunk</span>
                      <span className="mock-block" style={{color: '#C4C4C4'}}>@walecyberpunk - 3h</span>
                    </Space>
                  </div>
                  <h4 style={{marginTop: '20px'}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
                    printer took a galley of type and scrambled it to 
                  </h4>
                  <Space>
                    <Image src="./img/Vector (2).svg" preview={false} />
                    <span style={{marginRight: '20px'}}></span>
                    <Image src="./Vector.svg" preview={false} />
                    <span style={{color: '#C4C4C4'}}>41</span>
                  </Space>
                </div>
                <div style={{marginTop: '20px'}}>
                  <Row gutter={16}>
                    <Col span={2} className="gutter-row" style={{marginTop: '5px'}}>
                      <Image src="./avatar.svg" preview={false} style={{width: '36.6px'}} />
                    </Col>
                    <Col span={22} className="gutter-row">
                      <Input defaultValue="write a comment..." className="subscribe" />  
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      }
    </Layout>
  );
};
