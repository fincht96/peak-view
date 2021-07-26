import '../styles/globals.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (<ApolloProvider client={client}>
    <Component {...pageProps} />
    </ApolloProvider>)
}

export default MyApp
