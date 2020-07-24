import { GraphQLSchema } from 'graphql';
import QueryRoot from './query';
import MutationRoot from './mutations';
import SubscriptionRoot from './subscriptions';

const schema = new GraphQLSchema({ query: QueryRoot, mutation: MutationRoot, subscription: SubscriptionRoot });

export default schema;