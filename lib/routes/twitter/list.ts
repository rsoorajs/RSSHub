import { Route } from '@/types';
import api from './api';
import utils from './utils';

export const route: Route = {
    path: '/list/:id/:routeParams?',
    categories: ['social-media'],
    example: '/twitter/list/ladyleet/javascript',
    parameters: { id: 'username', name: 'list name', routeParams: 'extra parameters, see the table above' },
    features: {
        requireConfig: [
            {
                name: 'TWITTER_USERNAME',
                description: '',
            },
            {
                name: 'TWITTER_PASSWORD',
                description: '',
            },
            {
                name: 'TWITTER_COOKIE',
                description: '',
            },
        ],
        requirePuppeteer: false,
        antiCrawler: false,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
    },
    name: 'List timeline',
    maintainers: ['DIYgod', 'xyqfer'],
    handler,
};

async function handler(ctx) {
    const id = ctx.req.param('id');
    const { count } = utils.parseRouteParams(ctx.req.param('routeParams'));
    const params = count ? { count } : {};

    await api.init();
    const data = await api.getList(id, params);

    return {
        title: `Twitter List - ${id}`,
        link: `https://twitter.com/i/lists/${id}`,
        item: utils.ProcessFeed(ctx, {
            data,
        }),
    };
}
