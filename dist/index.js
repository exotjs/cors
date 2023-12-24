import { Exot } from '@exotjs/exot';
export const cors = (options = {}) => {
    const { allowedHeaders = '*', credentials = false, exposedHeaders = '*', maxAge = 600, methods = '*', origin = true, preflight = true, } = options;
    function setAllowOrigin(ctx, originHeader) {
        if (origin === '*') {
            ctx.res.headers.set('vary', '*');
            ctx.res.headers.set('access-control-allow-origin', '*');
        }
        else if (origin === true) {
            ctx.res.headers.set('vary', originHeader ? 'origin' : '*');
            ctx.res.headers.set('access-control-allow-origin', originHeader || '*');
        }
        else if (origin.includes(originHeader)) {
            ctx.res.headers.set('vary', 'origin');
            ctx.res.headers.set('access-control-allow-origin', originHeader);
        }
    }
    function setHeader(ctx, name, value) {
        if (value?.length) {
            ctx.res.headers.set(name, Array.isArray(value) ? value.join(', ') : value);
        }
    }
    return new Exot({
        name: '@exotjs/cors',
    })
        .use((ctx) => {
        const originHeader = ctx.headers.get('origin');
        if (originHeader) {
            setAllowOrigin(ctx, originHeader);
            setHeader(ctx, 'access-control-allow-methods', methods);
            setHeader(ctx, 'access-control-allow-headers', allowedHeaders);
            if (credentials) {
                ctx.res.headers.set('access-control-allow-credentials', 'true');
            }
            if (ctx.method === 'OPTIONS' && preflight) {
                ctx.res.status = 204;
                if (maxAge) {
                    ctx.res.headers.set('access-control-max-age', String(maxAge));
                }
                return '';
            }
            else if (ctx.method !== 'OPTIONS') {
                setHeader(ctx, 'access-control-exposed-headers', exposedHeaders);
            }
        }
    });
};
