import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Table,
  Switch,
  Spin,
  Modal,
  Button,
  Input,
  Divider,  
} from 'antd';
import { useMeta } from '../../contexts';
import {
  Store,
  WhitelistedCreator,
} from '@oyster/common/dist/lib/models/metaplex/index';
import {
  MasterEditionV1,
  notify,
  ParsedAccount,
  shortenAddress,
  StringPublicKey,
  useConnection,
  useStore,
  useUserAccounts,
  useWalletModal,
  WalletSigner,
} from '@oyster/common';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { saveAdmin } from '../../actions/saveAdmin';
import {
  convertMasterEditions,
  filterMetadata,
} from '../../actions/convertMasterEditions';
import { Link } from 'react-router-dom';
import { SetupVariables } from '../../components/SetupVariables';
import useWindowDimensions from '../../utils/layout';
import { Line } from '@ant-design/charts';
import {getSolaminterFee, setSolaminterFee, getIncome, getTransactions } from '../../utils/assets';
const { Content } = Layout;
export const LAMPORT_MULTIPLIER = 10 ** 9;
type ChartDataType = {
  time: string,
  value: number
}
type ChartProps = {
  title: string,
  data: Array<ChartDataType>
};
export const AdminView = () => {
  const { store, whitelistedCreatorsByCreator, isLoading } = useMeta();
  const connection = useConnection();
  const wallet = useWallet();
  const { setVisible } = useWalletModal();
  const connect = useCallback(
    () => (wallet.wallet ? wallet.connect().catch() : setVisible(true)),
    [wallet.wallet, wallet.connect, setVisible],
  );
  const { storeAddress, setStoreForOwner, isConfigured } = useStore();
  const { width } = useWindowDimensions();
  const [fee, setFee] = useState('0.01');
  const [incomeData, setIncomeData] = useState<Array<ChartDataType>>([]);
  const [countData, setCountData] = useState<Array<ChartDataType>>([]);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  }

  const handleOk = () => {
    setSolaminterFee(fee);
    setIsConfirmModalVisible(false);
  }

  const handleCancel = () => {
    setIsConfirmModalVisible(false);
  }

  useEffect(() => {
    if (!store && !storeAddress && wallet.publicKey) {
      setStoreForOwner(wallet.publicKey.toBase58());
    }
  }, [store, storeAddress, wallet.publicKey]);
  console.log('@admin', wallet.connected, storeAddress, isLoading, store);
  useEffect(() => {
    const solFeeFunc = async () => {
      const result = await getSolaminterFee();
      let solFee = result / LAMPORT_MULTIPLIER;
      setFee(solFee.toString());      
    }        
    solFeeFunc();    
  },[]);

  useEffect(() => {
    const getIncomeData = async() => {
      const result = await getIncome(null);
      setIncomeData(result);
    }
    getIncomeData();
  },[]);

  useEffect(() => {
    const getCountData = async() => {
      const result = await getTransactions(null);
      setCountData(result);
    }
    getCountData();
  },[]);  

  return (
    <Col style={{padding: '0 10%'}}>
      {!wallet.connected ? (
        <p>
          <Button type="primary" className="app-btn" onClick={connect}>
            Connect
          </Button>{' '}
          to admin store.
        </p>
      ) : !storeAddress || isLoading ? (
        <Spin />
      ) : store && wallet ? (
        <>
          <InnerAdminView
            store={store}
            whitelistedCreatorsByCreator={whitelistedCreatorsByCreator}
            connection={connection}
            wallet={wallet}
            connected={wallet.connected}
          />
          <Row>
            <Col span={width > 992 ? 12 : 24}>
              <ChartView key={1} title="Total Fees Collected (in SOL)" data={incomeData} />
            </Col>
            <Col span={width > 992 ? 12 : 24}>
              <ChartView key={2} title="Total NFTs minted" data={countData} />              
            </Col>
          </Row> 
          <Row>
            <Col style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', marginTop: '40px'}}>
              <h1 className="sol-fee-title"> Solaminter Fee:</h1>
              <Input 
                autoFocus
                className="sol-fee-input"
                value={fee}
                onChange={(e)=> setFee(e.target.value) }
              />
              <h1 className="sol-fee-title">SOL</h1>
              <Button className="sol-fee-confirm-btn" type="primary" onClick={showConfirmModal}>Confirm</Button>
              <Modal title="Set Solaminter Fee" visible={isConfirmModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure that setting Solaminter Fee as {fee} ?</p>               
              </Modal>
            </Col>
          </Row>         
          {/* {!isConfigured && (
            <>
              <Divider />
              <Divider />
              <p>
                To finish initialization please copy config below into{' '}
                <b>packages/web/.env</b> and restart yarn or redeploy
              </p>
              <SetupVariables
                storeAddress={storeAddress}
                storeOwnerAddress={wallet.publicKey?.toBase58()}
              />
            </>
          )} */}
        </>
      ) : (
        <>
          <p>Store is not initialized</p>
          <Link to={`/`}>Go to initialize</Link>
        </>
      )}
    </Col>
  );
};

function ArtistModal({
  setUpdatedCreators,
  uniqueCreatorsWithUpdates,
}: {
  setUpdatedCreators: React.Dispatch<
    React.SetStateAction<Record<string, WhitelistedCreator>>
  >;
  uniqueCreatorsWithUpdates: Record<string, WhitelistedCreator>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAddress, setModalAddress] = useState<string>('');
  return (
    <>
      <Modal
        title="Add New Artist Address"
        visible={modalOpen}
        onOk={() => {
          const addressToAdd = modalAddress;
          setModalAddress('');
          setModalOpen(false);

          if (uniqueCreatorsWithUpdates[addressToAdd]) {
            notify({
              message: 'Artist already added!',
              type: 'error',
            });
            return;
          }

          let address: StringPublicKey;
          try {
            address = addressToAdd;
            setUpdatedCreators(u => ({
              ...u,
              [modalAddress]: new WhitelistedCreator({
                address,
                activated: true,
              }),
            }));
          } catch {
            notify({
              message: 'Only valid Solana addresses are supported',
              type: 'error',
            });
          }
        }}
        onCancel={() => {
          setModalAddress('');
          setModalOpen(false);
        }}
      >
        <Input
          value={modalAddress}
          onChange={e => setModalAddress(e.target.value)}
        />
      </Modal>
      <Button style={{background: '#d976f9'}} onClick={() => setModalOpen(true)}>Add Creator</Button>
    </>
  );
}

function InnerAdminView({
  store,
  whitelistedCreatorsByCreator,
  connection,
  wallet,
  connected,
}: {
  store: ParsedAccount<Store>;
  whitelistedCreatorsByCreator: Record<
    string,
    ParsedAccount<WhitelistedCreator>
  >;
  connection: Connection;
  wallet: WalletSigner;
  connected: boolean;
}) {
  const [newStore, setNewStore] = useState(
    store && store.info && new Store(store.info),
  );
  const [updatedCreators, setUpdatedCreators] = useState<
    Record<string, WhitelistedCreator>
  >({});
  const [filteredMetadata, setFilteredMetadata] =
    useState<{
      available: ParsedAccount<MasterEditionV1>[];
      unavailable: ParsedAccount<MasterEditionV1>[];
    }>();
  const [loading, setLoading] = useState<boolean>();
  const { metadata, masterEditions } = useMeta();

  const { accountByMint } = useUserAccounts();
  useMemo(() => {
    const fn = async () => {
      setFilteredMetadata(
        await filterMetadata(
          connection,
          metadata,
          masterEditions,
          accountByMint,
        ),
      );
    };
    fn();
  }, [connected]);

  const uniqueCreators = Object.values(whitelistedCreatorsByCreator).reduce(
    (acc: Record<string, WhitelistedCreator>, e) => {
      acc[e.info.address] = e.info;
      return acc;
    },
    {},
  );

  const uniqueCreatorsWithUpdates = { ...uniqueCreators, ...updatedCreators };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (val: StringPublicKey) => <span>{val}</span>,
      key: 'address',
    },
    {
      title: 'Activated',
      dataIndex: 'activated',
      key: 'activated',
      render: (
        value: boolean,
        record: {
          address: StringPublicKey;
          activated: boolean;
          name: string;
          key: string;
        },
      ) => (
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={value}
          onChange={val =>
            setUpdatedCreators(u => ({
              ...u,
              [record.key]: new WhitelistedCreator({
                activated: val,
                address: record.address,
              }),
            }))
          }
        />
      ),
    },
  ];

  return (
    <Content>
      <Col style={{ marginTop: 10 }}>
        <Row>
          <Col span={21}>
            <ArtistModal
              setUpdatedCreators={setUpdatedCreators}
              uniqueCreatorsWithUpdates={uniqueCreatorsWithUpdates}
            />
            <Button
              onClick={async () => {
                notify({
                  message: 'Saving...',
                  type: 'info',
                });
                await saveAdmin(
                  connection,
                  wallet,
                  newStore.public,
                  Object.values(updatedCreators),
                );
                notify({
                  message: 'Saved',
                  type: 'success',
                });
              }}
              type="primary"
            >
              Submit
            </Button>
          </Col>
          <Col span={3}>
            <Switch
              style={{background: '#768BF9'}}
              checkedChildren="Public"
              unCheckedChildren="Whitelist Only"
              checked={newStore.public}
              onChange={val => {
                setNewStore(_ => {
                  const newS = new Store(store.info);
                  newS.public = val;
                  return newS;
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Table
            className="artist-whitelist-table custom-whitelist-theme"
            columns={columns}
            dataSource={Object.keys(uniqueCreatorsWithUpdates).map(key => ({
              key,
              address: uniqueCreatorsWithUpdates[key].address,
              activated: uniqueCreatorsWithUpdates[key].activated,
              name:
                uniqueCreatorsWithUpdates[key].name ||
                shortenAddress(uniqueCreatorsWithUpdates[key].address),
              image: uniqueCreatorsWithUpdates[key].image,
            }))}
          ></Table>
        </Row>
      </Col>

      {/* {!store.info.public && (
        <>
          <h1 style={{color: 'black'}}>
            You have {filteredMetadata?.available.length} MasterEditionV1s that
            can be converted right now and{' '}
            {filteredMetadata?.unavailable.length} still in unfinished auctions
            that cannot be converted yet.
          </h1>
          <Col>
            <Row>
              <Button
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  await convertMasterEditions(
                    connection,
                    wallet,
                    filteredMetadata?.available || [],
                    accountByMint,
                  );
                  setLoading(false);
                }}
              >
                {loading ? (
                  <Spin />
                ) : (
                  <span>Convert Eligible Master Editions</span>
                )}
              </Button>
            </Row>
          </Col>{' '}
        </>
      )} */}
    </Content>
  );
}

function ChartView({title, data} : ChartProps) {  

  const config = {
    data,
    // width: 800,
    // height: 400,
    autoFit: true,
    xField: 'time',
    yField: 'value',
    point: {
      size: 8,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  let chart;

  // Export Image
  const downloadImage = () => {
    chart?.downloadImage();
  };  

  return (
    <div>    
      <h2 style={{color: 'black'}}> {title} </h2>  
      <button type="button" onClick={downloadImage} style={{ marginBottom: 20, color: 'black' }}>
        Export Image
      </button>    
      <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
    </div>
  );
};