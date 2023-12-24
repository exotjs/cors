import { Exot } from '@exotjs/exot';
import type { HTTPMethod, ContextInterface } from '@exotjs/exot/types';
export type Origin = string[] | ((ctx: ContextInterface) => boolean);
export interface CORSOptions {
    allowedHeaders?: '*' | string[];
    credentials?: boolean;
    exposedHeaders?: '*' | string[];
    maxAge?: number;
    methods?: '*' | HTTPMethod[];
    origin?: '*' | true | string[];
    preflight?: boolean;
}
export declare const cors: (options?: CORSOptions) => Exot<{}, {}, {}, {}, ContextInterface<{}, any, any, any, {}>>;
