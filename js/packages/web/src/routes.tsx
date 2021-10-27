import { HashRouter, Route, Switch } from 'react-router-dom';
import { Providers } from './providers';
import {
  AnalyticsView,
  ArtCreateView,
  ArtistsView,
  ArtistView,
  ArtView,
  ArtsView,
  ArtworksView,
  AuctionCreateView,
  OfferCreateView,
  AuctionView,
  HomeView,
  MarketView,
  MarketAllView,
  PhotoView,
  SignInView,
  CreateView,
} from './views';
import { AdminView } from './views/admin';
import { BillingView } from './views/auction/billing';

export function Routes() {
  return (
    <>
      <HashRouter basename={'/'}>
        <Providers>
          <Switch>
            <Route exact path="/admin" component={() => <AdminView />} />
            {/* <Route
              exact
              path="/market"
              component={() => <MarketView />}
            /> */}
            
            <Route
              exact
              path="/arts"
              component={() => <ArtsView />}
            />
            <Route
              exact
              path="/photography"
              component={() => <PhotoView />}
            />
            <Route
              exact
              path="/analytics"
              component={() => <AnalyticsView />}
            />
            <Route
              exact
              path="/create"
              component={() => <CreateView />}
            />
            <Route
              exact
              path="/art/create/:step_param?"
              component={() => <ArtCreateView />}
            />
            <Route
              exact
              path="/artworks/:id?"
              component={() => <ArtworksView />}
            />
            <Route
              exact
              path="/market/:id?"
              component={() => <MarketView />}
            />
            <Route exact path="/art/:id" component={() => <ArtView />} />
            <Route exact path="/marketall/:id" component={() => <MarketAllView />} />
            <Route exact path="/artists/:id" component={() => <ArtistView />} />
            <Route exact path="/artists" component={() => <ArtistsView />} />
            <Route exact path="/signin" component={() => <SignInView />} />
            <Route
              exact
              path="/auction/create/:step_param?"
              component={() => <AuctionCreateView />}
            />
            <Route
              exact
              path="/offer/create/:step_param?"
              component={() => <OfferCreateView />}
            />
            <Route
              exact
              path="/auction/:id"
              component={() => <AuctionView />}
            />
            <Route
              exact
              path="/auction/:id/billing"
              component={() => <BillingView />}
            />
            <Route path="/" component={() => <HomeView />} />
          </Switch>
        </Providers>
      </HashRouter>
    </>
  );
}
