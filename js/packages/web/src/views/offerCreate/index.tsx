import React, { useEffect, useState } from 'react';
import {
  Divider,
  Steps,
  Row,
  Button,
  Col,
  Input,
  Statistic,
  Progress,
  Spin,
  Radio,
  Card,
  Select,
  Checkbox,
} from 'antd';
import { ArtCard } from './../../components/ArtCard';
import { QUOTE_MINT } from './../../constants';
import { Confetti } from './../../components/Confetti';
import { ArtSelector } from './artSelector';
import {
  MAX_METADATA_LEN,
  useConnection,
  WinnerLimit,
  WinnerLimitType,
  toLamports,
  useMint,
  Creator,
  PriceFloor,
  PriceFloorType,
  IPartialCreateAuctionArgs,
  MetadataKey,
  StringPublicKey,
} from '@oyster/common';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { MintLayout } from '@solana/spl-token';
import { useHistory, useParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import {
  WinningConfigType,
  AmountRange,
} from '@oyster/common/dist/lib/models/metaplex/index';
import moment from 'moment';
import {
  createAuctionManager,
  SafetyDepositDraft,
} from '../../actions/createAuctionManager';
import BN from 'bn.js';
import { constants } from '@oyster/common';
import { DateTimePicker } from '../../components/DateTimePicker';
import { AmountLabel } from '../../components/AmountLabel';
import { useMeta } from '../../contexts';
import useWindowDimensions from '../../utils/layout';
import { PlusCircleOutlined } from '@ant-design/icons';
import { SystemProgram } from '@solana/web3.js';

const { Option } = Select;
const { Step } = Steps;
const { ZERO } = constants;

export enum OfferCategory {
  InstantSale,
}

export interface OfferState {
  // Min price required for the item to sell
  reservationPrice: number;

  // listed NFTs
  items: SafetyDepositDraft[];
  participationNFT?: SafetyDepositDraft;
  participationFixedPrice?: number;
  // number of editions for this auction (only applicable to limited edition)
  editions?: number;

  // date time when auction should start UTC+0
  startDate?: Date;

  // suggested date time when auction should end UTC+0
  endDate?: Date;

  //////////////////
  category: OfferCategory;

  price?: number;
  priceFloor?: number;
  priceTick?: number;

  startSaleTS?: number;
  startListTS?: number;
  endTS?: number;

  auctionDuration?: number;
  auctionDurationType?: 'days' | 'hours' | 'minutes';
  gapTime?: number;
  gapTimeType?: 'days' | 'hours' | 'minutes';
  tickSizeEndingPhase?: number;

  spots?: number;

  instantSalePrice?: number;
}

export const OfferCreateView = () => {
  const connection = useConnection();
  const wallet = useWallet();
  const { whitelistedCreatorsByCreator } = useMeta();
  const { step_param }: { step_param: string } = useParams();
  const history = useHistory();
  const { width } = useWindowDimensions();
  const [step, setStep] = useState<number>(0);
  const [stepsVisible, setStepsVisible] = useState<boolean>(true);
  const [auctionObj, setAuctionObj] =
    useState<
      | {
          vault: StringPublicKey;
          auction: StringPublicKey;
          auctionManager: StringPublicKey;
        }
      | undefined
    >(undefined);
  const [attributes, setAttributes] = useState<OfferState>({
    reservationPrice: 0,
    items: [],
    category: OfferCategory.InstantSale,
    auctionDurationType: 'minutes',
    gapTimeType: 'minutes',
    startSaleTS: undefined,
    startListTS: undefined,
  });

  useEffect(() => {
    if (step_param) setStep(parseInt(step_param));
    else gotoNextStep(0);
  }, [step_param]);

  const gotoNextStep = (_step?: number) => {
    const nextStep = _step === undefined ? step + 1 : _step;
    history.push(`/offer/create/${nextStep.toString()}`);
  };

  const createAuction = async () => {
    let winnerLimit: WinnerLimit;
    if (attributes.category === OfferCategory.InstantSale) {
      if (attributes.items.length > 0) {
        const item = attributes.items[0];
        if (!attributes.editions) {
          item.winningConfigType =
            item.metadata.info.updateAuthority ===
            (wallet?.publicKey || SystemProgram.programId).toBase58()
              ? WinningConfigType.FullRightsTransfer
              : WinningConfigType.TokenOnlyTransfer;
        }
        item.amountRanges = [
          new AmountRange({
            amount: new BN(1),
            length: new BN(attributes.editions || 1),
          }),
        ];
      }
      winnerLimit = new WinnerLimit({
        type: WinnerLimitType.Capped,
        usize: new BN(attributes.editions || 1),
      });
    }

    const isInstantSale =
      attributes.instantSalePrice &&
      attributes.priceFloor === attributes.instantSalePrice;

    const auctionSettings: IPartialCreateAuctionArgs = {
      endAuctionAt: isInstantSale
        ? null
        : new BN(
            (attributes.auctionDuration || 0) *
              (attributes.auctionDurationType == 'days'
                ? 60 * 60 * 24 // 1 day in seconds
                : attributes.auctionDurationType == 'hours'
                ? 60 * 60 // 1 hour in seconds
                : 60), // 1 minute in seconds
          ), // endAuctionAt is actually auction duration, poorly named, in seconds
      auctionGap: isInstantSale
        ? null
        : new BN(
            (attributes.gapTime || 0) *
              (attributes.gapTimeType == 'days'
                ? 60 * 60 * 24 // 1 day in seconds
                : attributes.gapTimeType == 'hours'
                ? 60 * 60 // 1 hour in seconds
                : 60), // 1 minute in seconds
          ),
      priceFloor: new PriceFloor({
        type: attributes.priceFloor
          ? PriceFloorType.Minimum
          : PriceFloorType.None,
        minPrice: new BN((attributes.priceFloor || 0) * LAMPORTS_PER_SOL),
      }),
      tokenMint: QUOTE_MINT.toBase58(),
      gapTickSizePercentage: attributes.tickSizeEndingPhase || null,
      tickSize: attributes.priceTick
        ? new BN(attributes.priceTick * LAMPORTS_PER_SOL)
        : null,
        instantSalePrice: attributes.instantSalePrice
        ? new BN((attributes.instantSalePrice || 0) * LAMPORTS_PER_SOL)
        : null,
      name: null,
    };
  };

  const categoryStep = (
    <CategoryStep
      confirm={(category: OfferCategory) => {
        setAttributes({
          ...attributes,
          category,
        });
        gotoNextStep();
      }}
    />
  );

  const instantSaleStep = (
    <InstantSaleStep
      attributes={attributes}
      setAttributes={setAttributes}
      confirm={() => gotoNextStep()}
    />
  );

  const reviewStep = (
    <ReviewStep
      attributes={attributes}
      setAttributes={setAttributes}
      confirm={() => {
        setStepsVisible(false);
        gotoNextStep();
      }}
      connection={connection}
    />
  );

  const waitStep = (
    <WaitingStep createAuction={createAuction} confirm={() => gotoNextStep()} />
  );

  const congratsStep = <Congrats auction={auctionObj} />;

  const stepsByCategory = {
    [OfferCategory.InstantSale]: [
      ['Category', categoryStep],
      ['Instant Sale', instantSaleStep],
      ['Review', reviewStep],
      ['Publish', waitStep],
      [undefined, congratsStep],
    ],
  };

  return (
    <>
      <Row style={{ paddingTop: 50 }}>
        {stepsVisible && (
          <Col span={24} md={4}>
            <Steps
              progressDot
              direction={width < 768 ? 'horizontal' : 'vertical'}
              current={step}
              style={{
                width: 'fit-content',
                margin: '0 auto 30px auto',
                overflowX: 'auto',
                maxWidth: '100%',
              }}
            >
              {stepsByCategory[attributes.category]
                .filter(_ => !!_[0])
                .map((step, idx) => (
                  <Step title={step[0]} key={idx} />
                ))}
            </Steps>
          </Col>
        )}
        <Col span={24} {...(stepsVisible ? { md: 20 } : { md: 24 })}>
          {stepsByCategory[attributes.category][step][1]}
          {0 < step && stepsVisible && (
            <Row>
              <Col xl={20}>
                <div style={{ margin: 'auto', width: 'fit-content' }}>
                  <Button style={{ color: 'black' }} onClick={() => gotoNextStep(step - 1)}>Back</Button>
                </div>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

const CategoryStep = (props: {
  confirm: (category: OfferCategory) => void;
}) => {
  const { width } = useWindowDimensions();
  return (
    <>
      <Row className="call-to-action">
        <h2 className="auction-font-color">List an item</h2>
        <p>
          First time listing on Metaplex? <a>Read our sellers' guide.</a>
        </p>
      </Row>
      <Row justify={width < 768 ? 'center' : 'start'}>
        <Col>
          <Row>
            <Button
              className="type-btn"
              size="large"
              onClick={() => props.confirm(OfferCategory.InstantSale)}
            >
              <div>
                <div>Make offer</div>
                <div className="type-btn-description">
                  At a fixed price, sell a single Master NFT or copies of it
                </div>
              </div>
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const InstantSaleStep = (props: {
  attributes: OfferState;
  setAttributes: (attr: OfferState) => void;
  confirm: () => void;
}) => {
  const [copiesChecked, setCopiesChecked] = useState(false);
  const copiesEnabled = React.useMemo(
    () => !!props.attributes?.items?.[0]?.masterEdition?.info?.maxSupply,
    [props.attributes?.items?.[0]],
  );

  let artistFilter = (i: SafetyDepositDraft) =>
    !(i.metadata.info.data.creators || []).find((c: Creator) => !c.verified);

  return (
    <>
      <Row className="call-to-action" style={{ marginBottom: 0 }}>
        <h2 className="auction-font-color">Select which item to sell:</h2>
      </Row>

      <Row className="content-action">
        <Col xl={20}>
          <ArtSelector
            filter={artistFilter}
            selected={props.attributes.items}
            setSelected={items => {
              props.setAttributes({ ...props.attributes, items });
            }}
            allowMultiple={false}
          >
            Select NFT
          </ArtSelector>

          <label className="action-field">
            <Checkbox
              defaultChecked={false}
              checked={copiesChecked}
              disabled={!copiesEnabled}
              onChange={e => setCopiesChecked(e.target.checked)}
            >
              <span className="field-title auction-font-color">
                Create copies of a Master Edition NFT?
              </span>
            </Checkbox>
            {copiesChecked && copiesEnabled && (
              <>
                <span className="field-info auction-font-color">
                  Each copy will be given unique edition number e.g. 1 of 30
                </span>
                <Input
                  autoFocus
                  className="input"
                  placeholder="Enter number of copies sold"
                  allowClear
                  onChange={info =>
                    props.setAttributes({
                      ...props.attributes,
                      editions: parseInt(info.target.value),
                    })
                  }
                />
              </>
            )}
          </label>

          <label className="action-field">
            <span className="field-title">Price</span>
            <span className="field-info">
              This is the instant sale price for your item.
            </span>
            <Input
              type="number"
              min={0}
              autoFocus
              className="input"
              placeholder="Price"
              prefix=""
              suffix="SOL"
              onChange={info =>
                props.setAttributes({
                  ...props.attributes,
                  priceFloor: parseFloat(info.target.value),
                  instantSalePrice: parseFloat(info.target.value),
                })
              }
            />
          </label>
        </Col>
      </Row>
      <Row>
        <Col xl={20}>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              props.confirm();
            }}
            className="action-btn"
          >
            Continue
          </Button>
        </Col>
      </Row>
    </>
  );
};

const ReviewStep = (props: {
  confirm: () => void;
  attributes: OfferState;
  setAttributes: Function;
  connection: Connection;
}) => {
  const [cost, setCost] = useState(0);
  useEffect(() => {
    const rentCall = Promise.all([
      props.connection.getMinimumBalanceForRentExemption(MintLayout.span),
      props.connection.getMinimumBalanceForRentExemption(MAX_METADATA_LEN),
    ]);

    // TODO: add
  }, [setCost]);

  let item = props.attributes.items?.[0];

  return (
    <>
      <Row className="call-to-action">
        <h2 className="auction-font-color auction-font-color">Review and list</h2>
        <p className="auction-font-color">Review your listing before publishing.</p>
      </Row>
      <Row className="content-action">
        <Col xl={12}>
          {item?.metadata.info && (
            <ArtCard pubkey={item.metadata.pubkey} small={true} />
          )}
        </Col>
        <Col className="section" xl={12}>
          <Statistic
            className="create-statistic auction-font-color"
            title="Copies"
            value={
              props.attributes.editions === undefined
                ? 'Unique'
                : props.attributes.editions
            }
          />
          {cost ? (
            <AmountLabel title="Cost to Create" amount={cost} />
          ) : (
            <Spin />
          )}
        </Col>
      </Row>
      <Row style={{ display: 'block' }}>
        <Divider />
        <Statistic
          className="create-statistic"
          title="Start date"
          value={
            props.attributes.startSaleTS
              ? moment
                  .unix(props.attributes.startSaleTS as number)
                  .format('dddd, MMMM Do YYYY, h:mm a')
              : 'Right after successfully published'
          }
        />
        <br />
        {props.attributes.startListTS && (
          <Statistic
            className="create-statistic"
            title="Listing go live date"
            value={moment
              .unix(props.attributes.startListTS as number)
              .format('dddd, MMMM Do YYYY, h:mm a')}
          />
        )}
        <Divider />
        <Statistic
          className="create-statistic auction-font-color"
          title="Sale ends"
          value={
            props.attributes.endTS
              ? moment
                  .unix(props.attributes.endTS as number)
                  .format('dddd, MMMM Do YYYY, h:mm a')
              : 'Until sold'
          }
        />
      </Row>
      <Row>
        <Col span={20}>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            props.setAttributes({
              ...props.attributes,
              startListTS: props.attributes.startListTS || moment().unix(),
              startSaleTS: props.attributes.startSaleTS || moment().unix(),
            });
            props.confirm();
          }}
          className="action-btn"
        >
          {props.attributes.category === OfferCategory.InstantSale
            ? 'List for Sale'
            : 'Publish Auction'}
        </Button>
        </Col>
        <Col span={4}></Col>
      </Row>
    </>
  );
};

const WaitingStep = (props: {
  createAuction: () => Promise<void>;
  confirm: () => void;
}) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const func = async () => {
      const inte = setInterval(
        () => setProgress(prog => Math.min(prog + 1, 99)),
        600,
      );
      await props.createAuction();
      clearInterval(inte);
      props.confirm();
    };
    func();
  }, []);

  return (
    <div
      style={{
        marginTop: 70,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Progress type="circle" percent={progress} />
      <div className="waiting-title auction-font-color">
        Your creation is being listed with Metaplex...
      </div>
      <div className="waiting-subtitle auction-font-color">This can take up to 30 seconds.</div>
    </div>
  );
};

const Congrats = (props: {
  auction?: {
    vault: StringPublicKey;
    auction: StringPublicKey;
    auctionManager: StringPublicKey;
  };
}) => {
  const history = useHistory();

  const newTweetURL = () => {
    const params = {
      text: "I've created a new NFT auction on Metaplex, check it out!",
      url: `${
        window.location.origin
      }/#/auction/${props.auction?.auction.toString()}`,
      hashtags: 'NFT,Crypto,Metaplex',
      // via: "Metaplex",
      related: 'Metaplex,Solana',
    };
    const queryParams = new URLSearchParams(params).toString();
    return `https://twitter.com/intent/tweet?${queryParams}`;
  };

  return (
    <>
      <div
        style={{
          marginTop: 70,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className="waiting-title auction-font-color">
          Congratulations! Your auction is now live.
        </div>
        <div className="congrats-button-container">
          <Button
            className="metaplex-button"
            onClick={_ => window.open(newTweetURL(), '_blank')}
          >
            <span className="auction-font-color">Share it on Twitter</span>
            <span>&gt;</span>
          </Button>
          <Button
            className="metaplex-button"
            onClick={_ =>
              history.push(`/auction/${props.auction?.auction.toString()}`)
            }
          >
            <span className="auction-font-color">See it in your auctions</span>
            <span>&gt;</span>
          </Button>
        </div>
      </div>
      <Confetti />
    </>
  );
};