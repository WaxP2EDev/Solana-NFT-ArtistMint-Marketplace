import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { signIn } from './signIn';
import { Layout, Col, Row, Card, Image, Button} from 'antd';
import { useWallet } from '@solana/wallet-adapter-react';
import { ConnectButton, CurrentUserBadge } from '@oyster/common';

import useWindowDimensions from '../../utils/layout';
import { MenuOutlined } from '@ant-design/icons';
import { useMeta } from '../../contexts';



export const SignInView = () => {
  const wallet = useWallet();
  const {width} = useWindowDimensions();
  const walletOnClick = (walletType) => {
    console.log(walletType)
  }
  return (
    <Layout>
      <Row>
        <Col md={24} style={{textAlign:'center', justifyContent:'center'}}>
          <Image src="./metamaskicon.jpg" preview={false} />
        </Col>
      </Row>
      {/* <Row>
        <Col md={24} style={{ textAlign: 'center', justifyContent: 'center', marginTop: "2rem" }}>
          <Button type="primary">SignIn</Button>
        </Col>
      </Row> */}
      <Row style = {{marginTop:'3rem'}}>
        <Col md={6}></Col>
        <Col md={4} style={{padding:'0.1rem'}}>
          <div className = "wallet-style-border" onClick={()=>walletOnClick(0)}>
            <div>
              <div style={{textAlign:'center', justifyContent:'center'}}>
                <Image src="./phantom.jpg" style={{width:'50px', height:'50px'}}></Image>
              </div>
              <h4 style={{ textAlign: 'center' }}>Phantom Wallet</h4>
              <p style={{ textAlign: 'center' }}>This is for Phantom wallet!</p>
              <div style={{ textAlign: 'center' }}>
                {wallet.connected ? (                    
                <div className="menu_items connect-btn">
                  <CurrentUserBadge
                    showBalance={false}
                    showAddress={false}
                    iconSize={24}
                  />
                </div>              
                ) : (
                  <ConnectButton type="primary" allowWalletChange />
                )}
              </div>

            </div>
          </div>
        </Col>
        <Col md={4} style={{ padding: '0.1rem' }}>
          <div className = "wallet-style-border" onClick={()=>walletOnClick(0)}>
            <div style={{textAlign:'center', justifyContent:'center'}}>
              <Image src="./phantom.jpg" style={{width:'50px', height:'50px'}}></Image>
            </div>
            <h4 style={{ textAlign: 'center' }}>Phantom Wallet</h4>
            <p style={{ textAlign: 'center' }}>This is for Phantom wallet!</p>
            <div style={{ textAlign: 'center' }}>
                <Button type="primary">connect to wallet!</Button>
            </div>
          </div>
        </Col>
        <Col md={4} style={{ padding: '0.1rem' }}>
          <div className = "wallet-style-border" onClick={()=>walletOnClick(0)}>
            <div style={{textAlign:'center', justifyContent:'center'}}>
              <Image src="./phantom.jpg" style={{width:'50px', height:'50px'}}></Image>
            </div>
            <h4 style={{ textAlign: 'center' }}>Phantom Wallet</h4>
            <p style={{ textAlign: 'center' }}>This is for Phantom wallet!</p>
            <div style={{ textAlign: 'center' }}>
                <Button type="primary">connect to wallet!</Button>
            </div>
          </div>
        </Col>
        <Col md={6}></Col>
      </Row>
    </Layout>
  );
};
