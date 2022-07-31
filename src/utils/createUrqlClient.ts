import {
    cacheExchange
} from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import {
    LoginMutation,
    LogoutMutation,
    MeDocument,
    MeQuery,
    RegisterMutation
} from "../../src/generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlCleint = (ssrExchange: any) => ({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
        credentials: "include" as const,
    },
    exchanges: [
        dedupExchange,
        // Replace the default cacheExchange with the new one
        cacheExchange({
            updates: {
                Mutation: {
                    logout: (_result, args, cache, info) => {
                        betterUpdateQuery<LogoutMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            () => ({ me: null })
                        );
                    },
                    login: (_result, args, cache, info) => {
                        // cache.updateQuery({ query: MeDocument }, (data: MeQuery) => {});
                        betterUpdateQuery<LoginMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (result.login.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: result.login.user,
                                    };
                                }
                            }
                        );
                    },
                    register: (_result, args, cache, info) => {
                        // cache.updateQuery({ query: MeDocument }, (data: MeQuery) => {});
                        betterUpdateQuery<RegisterMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (result.register.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: result.register.user,
                                    };
                                }
                            }
                        );
                    },
                },
                Subscription: {
                    subscriptionField: (result, args, cache, info) => {
                        // ...
                    },
                },
            },
        }),
        ssrExchange,
        fetchExchange,
    ],
})